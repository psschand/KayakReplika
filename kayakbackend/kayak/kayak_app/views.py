from kayak_app.models import Airline, Airport, TravelClass, Flight, Country
from kayak_app.serializers import AirlineSerializer, AirportSerializer, TravelClassSerializer, FlightSerializer, CountrySerializer
from rest_framework import generics, permissions, viewsets
from django_filters import rest_framework as filters
from rest_framework.response import Response
from rest_framework.views import status, APIView
from datetime import datetime, timedelta
from itertools import product
from django.shortcuts import get_object_or_404, get_list_or_404

# Create your views here.
# AIRLINE

class AirlineNameList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer

    def get(self, request, *args, **kwargs):
        try:
            are = self.queryset.get(airline_name=kwargs["a_name"])
            return Response(AirlineSerializer(are).data)

        except Airline.DoesNotExist:
            return Response(
                data={
                    "message": "Not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

class AirlineList(generics.ListCreateAPIView):
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer

class AirlineDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer

# FLIGHT
class FlightList(generics.ListCreateAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class FlightDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

#COMPLEX LOGIC
class FlightDates(APIView):

    #GET
    def get(self, request, *args, **kwargs):

        amountOfParams = len(self.kwargs)

        if amountOfParams < 2:
            return Response(
                    data={
                        "message": "0 Params"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

        elif amountOfParams == 3:
            try:
                
                origin = self.kwargs['origin']
                departure_date = self.kwargs['departure_date']
                destiny = self.kwargs['destiny']

                #GENERATING THE CLOSER DATE
                #REFACTOR
                departure_date = get_closer_date(departure_date, origin)
                
                flights = Flight.objects.filter(origin=origin, departure_date=departure_date, destiny=destiny)
                serializer = FlightSerializer(flights, many=True)

                return Response(serializer.data)

            except Flight.DoesNotExist:
                return Response(
                    data={
                        "message": "Not results"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
        elif amountOfParams == 4:
            try:
                
                #SACA IDA
                origin = self.kwargs['origin']
                departure_date = self.kwargs['departure_date']
                destiny = self.kwargs['destiny']
                return_date = self.kwargs['return_date']

                departure_date = get_closer_date(departure_date, origin)
                departure_flights = Flight.objects.filter(origin=origin, departure_date=departure_date, destiny=destiny)
                serializer_departure = FlightSerializer(departure_flights, many=True)

                #SACA VUELTA
                back_date = get_closer_date(return_date, destiny)
                back_flights = Flight.objects.filter(origin=destiny, departure_date=back_date, destiny=origin)
                serializer_back = FlightSerializer(back_flights, many=True)

                data_combined = [serializer_departure.data, serializer_back.data]
                data_mixed = list(product(*data_combined))
                return Response(data_mixed)

            except Flight.DoesNotExist:
                return Response(
                    data={
                        "message": "Not results"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

    def post(self, request, *args, **kwargs):
        return Response('POST')
    
    #PUT
    def put(self, request, *args, **kwargs):

        amountOfParams = len(request.data.get('params'))
        paramsArray = request.data.get('params')
        print(request.data)
        print(amountOfParams)


        if amountOfParams == 3:

            try:
                
                flight_departure_id = paramsArray["departure_ticket_id"]
                class_level = paramsArray['class_level']
                quantity = paramsArray['quantity']

                flight = Flight.objects.get(id=flight_departure_id)

                if class_level == 'T':
                    
                    turism_tickets = flight.turist_capacity
                    new_capacity = calculate_tickets(turism_tickets, quantity)
                    serializer = FlightSerializer(instance=flight, data={'turist_capacity':new_capacity}, partial=True)
                    
                elif class_level == 'E':
                    executive_tickets = flight.executive_capacity
                    new_capacity = calculate_tickets(executive_tickets, quantity)
                    serializer = FlightSerializer(instance=flight, data={'executive_capacity':new_capacity}, partial=True)

                if serializer.is_valid(raise_exception=True):
                    flight = serializer.save()

                return Response(data={
                        "message": "Success!"
                    })
            
            except Flight.DoesNotExist:
                return Response(
                    data={
                        "message": "Not results"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
        elif amountOfParams == 4:

            try:
                flight_departure_id = paramsArray["departure_ticket_id"]
                flight_back_id = paramsArray["flight_back_id"]
                class_level = paramsArray['class_level']
                quantity = paramsArray['quantity']

                flight_departure = Flight.objects.get(id=flight_departure_id)
                flight_return = Flight.objects.get(id=flight_back_id)

                if class_level == 'T':
                    
                    turism_tickets_departure = flight_departure.turist_capacity
                    turism_tickets_return = flight_return.turist_capacity

                    new_capacity_departure = calculate_tickets(turism_tickets_departure, quantity)
                    new_capacity_return = calculate_tickets(turism_tickets_return, quantity)

                    serializer_departure = FlightSerializer(instance=flight_departure, data={'turist_capacity':new_capacity_departure}, partial=True)
                    serializer_return = FlightSerializer(instance=flight_return, data={'turist_capacity':new_capacity_return}, partial=True)
                    
                elif class_level == 'E':
                    executive_tickets_departure = flight_departure.executive_capacity
                    executive_tickets_return = flight_return.executive_capacity

                    new_capacity_departure = calculate_tickets(executive_tickets_departure, quantity)
                    new_capacity_return = calculate_tickets(executive_tickets_return, quantity)

                    serializer_departure = FlightSerializer(instance=flight_departure, data={'executive_capacity':new_capacity_departure}, partial=True)
                    serializer_return = FlightSerializer(instance=flight_return, data={'executive_capacity':new_capacity_return}, partial=True)

                if serializer_departure.is_valid(raise_exception=True) and serializer_return.is_valid(raise_exception=True):
                    flight_departure = serializer_departure.save()
                    flight_return = serializer_return.save()

                return Response(data={
                    "message": "Success!"
                })
            
            except Flight.DoesNotExist:
                return Response(
                    data={
                        "message": "Not results"
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            
        else:
            return Response(data={
                        "message": "0 params"
                    })
        
    def delete(self, request, *args, **kwargs):
        return Response('DELETE')

#GET CLOSER DATE FROM GET REQUEST.
def get_closer_date(param_date, origin):
    departure_date = param_date
    gotOneDate = False
    daysCounter = 0
    while gotOneDate != True:
        datesFiltered = Flight.objects.filter(origin=origin, departure_date=departure_date)
        if len(datesFiltered) > 0 or daysCounter > 3:
            gotOneDate = True;  
        else:
            actualDateObject = datetime.strptime(departure_date, '%Y-%m-%d')
            actualDateObject = actualDateObject + timedelta(days=1)
            departure_date = f'{actualDateObject:%Y-%m-%d}'
            daysCounter = daysCounter + 1
    return departure_date

def calculate_tickets(currentCapacity, quantityRequested):

    if int(currentCapacity) >= int(quantityRequested):

        new_capacity = int(currentCapacity) - int(quantityRequested)
        return new_capacity
    else:
        return 'sadfg'

