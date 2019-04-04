import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights: [];
  oneWayFlights: [];
  roundTripFlights: [];
  tripValue = 'Ida y vuelta';
  travelClass = 'Ejecutiva';
  roundTripPrice = 0;
  searchMade = false;
  showTemplate = true;
  currentDetailId;
  lastSearch = 'San Jose';
  travelClassAb = '';
  origin = '';
  destiny = '';
  departure_date = '';
  return_date = '';
  numberOfTickets = 1;
  isRoundTrip = true;
  idFlightDeparture = '';
  idFlightReturn = '';


  constructor(private requestsServices: RequestsService) { }

  flightInformation;

  ngOnInit() {

    this.requestsServices.currentData.subscribe(data => this.flightInformation = data);
    this.lastSearch = localStorage.getItem('lastSearch')
  }

  updateInformation(flightID) {

    let position = parseInt(flightID);
    let currentflightInformation;
    if(this.tripValue == 'Solo ida'){

      currentflightInformation = {

        idFD : this.flights[position]['id'],
        destiny: this.destiny,
        origin: this.origin,
        departure_date: this.flights[position]['departure_date'],
        numberOfTickets: this.numberOfTickets,
        travelClass: this.travelClass,
        travelClassAb : this.travelClassAb,
        isRoundTrip: this.isRoundTrip
    
        };
    }else{
      currentflightInformation = {

      idFD : this.flights[position][0]['id'],
      idFR : this.flights[position][1]['id'],
      destiny: this.destiny,
      origin: this.origin,
      departure_date: this.flights[position][0]['departure_date'],
      return_date: this.flights[position][1]['departure_date'],
      numberOfTickets: this.numberOfTickets,
      travelClass: this.travelClass,
      travelClassAb : this.travelClassAb,
      isRoundTrip: this.isRoundTrip
  
      };
    }
    
    this.requestsServices.changeMessage(currentflightInformation);
  }


  searchOneWayFlight() {
    this.requestsServices.getOneWayFlight(this.travelClassAb, this.origin, this.destiny, this.departure_date)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.flights = res;
        }, (err) => {
          console.log(err);
        }
      );
  }

  searchRoundTripFlight(travelClassAb, origin, destiny, departure_date, return_date) {
    this.requestsServices.getRoundTripFlight(this.travelClassAb, this.origin, this.destiny, this.departure_date, this.return_date)
      .subscribe(
        (res: any) => {
          this.flights = res;
          console.log(res);
        }, (err) => {
          console.log(err);
        }
      );
  }

  onDisplayDetails(infoId) {

    let containsClass = (<HTMLInputElement>document.getElementById("d_" + infoId)).classList.contains('d-block');
    console.log(containsClass);
    if (containsClass == false) {
      (<HTMLInputElement>document.getElementById("d_" + infoId)).classList.add('d-block');
    } else {
      (<HTMLInputElement>document.getElementById("d_" + infoId)).classList.remove('d-block');
    }
  }

  onMakeSearch() {
    
    localStorage.setItem('lastSearch', this.origin);
    if (this.tripValue == 'Ida y vuelta') {
      this.searchRoundTripFlight(this.travelClassAb, this.origin, this.destiny, this.departure_date, this.return_date);
      this.searchMade = true;
      this.showTemplate = true;
    } else {
      this.searchOneWayFlight();
      this.searchMade = true;
      this.showTemplate = false;
    }
  }

  onTripType(tripType: any) {

    if (tripType == 'oneWay') {
      (<HTMLInputElement>document.getElementById("return_date")).disabled = true;
      (<HTMLInputElement>document.getElementById("oneWay")).classList.add('selected');
      (<HTMLInputElement>document.getElementById("roundTrip")).classList.remove('selected');
      this.tripValue = 'Solo ida';
      this.isRoundTrip = false;

    } else {
      (<HTMLInputElement>document.getElementById("return_date")).disabled = false;
      (<HTMLInputElement>document.getElementById("roundTrip")).classList.add('selected');
      (<HTMLInputElement>document.getElementById("oneWay")).classList.remove('selected');
      this.tripValue = 'Ida y vuelta';
      this.isRoundTrip = true;
    }
  }

  onTravelClass(travelClass: any) {

    if (travelClass == 'Ejecutiva') {
      (<HTMLInputElement>document.getElementById("executive")).classList.add('selected');
      (<HTMLInputElement>document.getElementById("turist")).classList.remove('selected');
      this.travelClass = 'Ejecutiva';
      this.travelClassAb = 'E';

    } else {
      (<HTMLInputElement>document.getElementById("turist")).classList.add('selected');
      (<HTMLInputElement>document.getElementById("executive")).classList.remove('selected');
      this.travelClass = 'Turista';
      this.travelClassAb = 'T';
    }
    console.log(this.travelClassAb);
  }

  add(ticket1, ticket2) {
    let val1 = parseInt(ticket1);
    let val2 = parseInt(ticket2);
    let finalPrice = (val1 + val2) * 565;

    return finalPrice;

  }
}
