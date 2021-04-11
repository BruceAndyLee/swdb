import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiRequesterService } from '../swapi-requester.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.less']
})
export class GreetingComponent implements OnInit {

  constructor(
    private swapi: SwapiRequesterService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToEntry() {
    // alert('Wowee, perhaps the archives are incomplete!');
    this.swapi.getDefaultItem()
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/entry']);
      });
  }

}
