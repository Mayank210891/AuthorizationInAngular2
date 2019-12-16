import { Component, OnInit } from '@angular/core';
import { FetchService } from "../fetch.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private fetchService: FetchService) { }

  ngOnInit() {
  }

  public name: string;

  public GetData() {
    this.fetchService.fetchData()
    .subscribe(res => {
      console.log(res);
    },
    err => console.log(err))
  }

}
