from rest_framework import serializers
from kayak_app.models import Airline,Airport,TravelClass,Flight,Country

class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airline
        fields = ('airline_name', 'aircraft_type')

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ('airport_name', 'location', 'country')

class TravelClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelClass
        fields = ('class_level', 'class_price')

class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('id', 'destiny', 'airline_name', 'departure_date', 'departure_time', 'departure_airport', 'ticket_price', 'executive_capacity', 'turist_capacity')

        def update(self, instance, validated_data):
            instance.executive_capacity = validated_data.get('executive_capacity', instance.executive_capacity)
            instance.turist_capacity = validated_data.get('turist_capacity', instance.turist_capacity)
            instance.ticket_price = validated_data.get('ticket_price', instance.ticket_price)
            
            instance.save()
            return instance

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Airline
        fields = ('state_location', 'country_name')