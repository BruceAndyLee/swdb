import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiRequesterService {

  private resp = null;

  private defaultJson = {
    "name": "Benzine Bubble",
    "homeworld": "unknown",
    "race": "hooman",
    "height": "181",
    "mass": "70",
    "vehicles": [
      "http://swapi.dev/api/vehicles/1/",
      "http://swapi.dev/api/vehicles/2/",
      "http://swapi.dev/api/vehicles/3/"
    ],
    "planets": [
      "http://swapi.dev/api/planets/1/",
      "http://swapi.dev/api/planets/3/",
      "http://swapi.dev/api/planets/2/"
    ],
    "url": "BenzineBubbleURL"
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getItem(url: string) {
    return this.http.get(url)
      .pipe(catchError(err => of(this.defaultJson)))
      .pipe(tap(resp => this.resp = resp))
      .pipe(delay(4000));
  }

  getItemName(url: string) {
    return this.http.get(url)
      .pipe(catchError(err => of(this.defaultJson)))
      .pipe(map(resp => resp["name"]));
  }

  getDefaultItem() {
    return this.http.get('https://swapi.dev/api/people/10/')
      .pipe(catchError(err => of(this.defaultJson)))
      .pipe(tap(resp => this.resp = resp));
  }

  getLastRetrievedEntry() {
    if (this.resp) {
      return this.resp;
    } else {
      return this.getDefaultItem();
    }
  }
}
