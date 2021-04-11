import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageBackendService {

  private backendUrl: string = "http:/yura/swdb/"; 
  private defaultImage: string[][] = [
    [ 
      "...............................",
      "....ᕗᕗEEEEEEEEEEEEEE...........",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᐛᐛ.........................",
      "....ᐛᐛ.........................",
      "....ᐛᐛ.........................",
      "....ᕕᕕᕕᕕ(ᐛ)ᕗ..................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᕕᕕ.........................",
      "....ᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕ...........",
      "...............................",
    ],
    [ 
      "...............................",
      "....ᕗᕗEEEEEE...................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᐛᐛ.........................",
      "....ᐛᐛ.........................",
      "....ᐛᐛ.........................",
      "....ᕕᕕᕕᕕ(ᐛ)ᕗ..................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᕕᕕ.........................",
      "....ᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕ...........",
      "...............................",
    ],
    [ 
      "...............................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᐛᐛ.........................",
      "....ᐛᐛ.........................",
      "....ᐛᐛ.........................",
      "....ᕕᕕᕕᕕ(ᐛ)ᕗ..................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᕗᕗ.........................",
      "....ᕕᕕ.........................",
      "....ᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕᕕ...........",
      "...............................",
    ],
];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getDefaultImage() {
    return this.defaultImage;
  }

  getImage(imgType: string) {
    return this.http.get(this.backendUrl + 'imgType')
              .pipe(catchError(err => of([this.defaultImage])));
  }
}
