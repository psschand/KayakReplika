import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  airlines: [];

  constructor(private requestsServices: RequestsService) { }

  ngOnInit() {
    this.getAirlines();

  }

  getAirlines() {
    this.requestsServices.getAirlines()
      .subscribe(
        (res: any) => {
          this.airlines = res;
        }, (err) => {
          console.log(err);
        }
      );
  }
}
