import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private requestsServices: RequestsService,
    private router: Router,
    private route: ActivatedRoute) { }

  flightInformation;
  isRoundTrip = true;
  flights: [];
  flight_departure_id;
  flight_back_id;
  class_level;
  quantity;

  passport = '';
  username = '';
  email = '';
  ngOnInit() {

    // this.reserveOneWayFlight();
    // this.reserveRoundTripFlight();

    this.requestsServices.currentData.subscribe(data => this.flightInformation = data);
    this.isRoundTrip = this.flightInformation.isRoundTrip;
  }

  reserveTickets() {
    if (this.passport == '' || this.username == '' || this.email == '') {
      alert('Por favor rellene todos los espacios requeridos.');
    } else {
      this.flight_departure_id = this.flightInformation.idFD;
      this.class_level = this.flightInformation.travelClass;
      this.quantity = this.flightInformation.numberOfTickets;

      if (this.class_level == 'Turista') {
        this.class_level = 'T'
      } else {
        this.class_level = 'E'
      }

      if (this.isRoundTrip) {
        this.flight_back_id = this.flightInformation.idFR;
        this.reserveRoundTripFlight();
      } else {
        this.reserveOneWayFlight();
      }
    }
  }

  reserveOneWayFlight() {
    this.requestsServices.putOneWayFlight(this.flight_departure_id, this.class_level, this.quantity)
      .subscribe(
        (res: any) => {
          this.flights = res;
          if (res.status = 200) {
            this.router.navigate(['success'], { relativeTo: this.route });
          } else {
            this.router.navigate(['error'], { relativeTo: this.route });
          }
        }, (err) => {
          if(err.status = 400){
            this.router.navigate(['error'], { relativeTo: this.route });
          }
          console.log(err);
        }
      );
  }

  reserveRoundTripFlight() {
    this.requestsServices.putRoundTripFlight(this.flight_departure_id, this.flight_back_id, this.class_level, this.quantity)
      .subscribe(
        (res: any) => {
          this.flights = res;
          if (res.status = 200) {
            this.router.navigate(['success'], { relativeTo: this.route });
          }
        }, (err) => {
          if(err.status = 400){
            this.router.navigate(['error'], { relativeTo: this.route });
          }
        }
      );

  }
}
