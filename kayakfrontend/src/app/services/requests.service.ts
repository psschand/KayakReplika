import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private dataSource = new BehaviorSubject<any>('Default data');
  currentData = this.dataSource.asObservable();


  constructor(private http: HttpClient) { }

  changeMessage(data: any) {
    this.dataSource.next(data);
  }


  getAirlines() {
    return this.http.get('http://127.0.0.1:8000/airline/', {})
      .map(
        (response: any) => {
          return response;
        }
      );
  }
  
  getOneWayFlight(travelClassAb, origin, destiny, departure_date) {
    return this.http.get('http://127.0.0.1:8000/search/'+origin+'/'+departure_date+'/'+destiny+'/', {})
      .map(
        (response: any) => {
          return response;
        }
      );
  }

  getRoundTripFlight(travelClassAb, origin, destiny, departure_date, return_date) {
    return this.http.get('http://127.0.0.1:8000/search/'+origin+'/'+departure_date+'/'+destiny+'/'+return_date+'/', {})
      .map(
        (response: any) => {
          return response;
        }
      );
  }

  putOneWayFlight(flight_departure_id,class_level,quantity) {
    let httpParams = new HttpParams().set('departure_ticket_id', flight_departure_id);
    // let data = { 'departure_ticket_id': flight_departure_id, 'class_level': class_level, 'quantity': quantity };
    return this.http.put('http://127.0.0.1:8000/reserve/', {
      params: httpParams
    })
      .map(
        (response: any) => {
          console.log(response)
          return response;
        }
      );
  }

  putRoundTripFlight(flight_departure_id, flight_back_id,class_level,quantity) {
    let data = { 'departure_ticket_id': flight_departure_id, 'flight_back_id': flight_back_id, 'class_level': class_level, 'quantity': quantity };
    return this.http.put('http://127.0.0.1:8000/reserve/', {
      params: data
    })
      .map(
        (response: any) => {
          console.log(response)
          return response;
        }
      );
  }
}
