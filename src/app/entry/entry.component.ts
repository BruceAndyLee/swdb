import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { SwapiRequesterService } from '../swapi-requester.service';
import { ImageBackendService } from '../image-backend.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.less']
})
export class EntryComponent implements OnInit {

  previousUrls: string[] = [];
  entry: Map<string, string | string[]> = new Map();
  entryKeys = null;
  entryButtons = null;
  entryButtonRefsStates: Map<string, boolean> = new Map();
  entryImage: string[][] = [];

  frameNum: number = 0;
  spinnerVisible: boolean = false;

  constructor(
    private swapi: SwapiRequesterService,
    private imgapi: ImageBackendService,
  ) { }

  ngOnInit(): void {
    this.swapi.getDefaultItem()
      .subscribe(resp => {
        this.unzipEntry(resp);
        console.log(this.entry);});
    
    this.entryImage = this.imgapi.getDefaultImage();
  }
  
  unzipEntry(resp: object) {

    for (const respKey in resp) {
      if (!Array.isArray(resp[respKey]) && resp[respKey].indexOf("http") === 0) {
        const hyperRef = resp[respKey];
        this.entry.set(respKey, [hyperRef]);
        this.swapi.getItemName(hyperRef)
          .subscribe(name => this.entry.set(respKey, [name + '#' + hyperRef]));
      } else {
        this.entry.set(respKey, resp[respKey]);
      }
    }
    // console.log('resp: ', resp);
    // console.log('entry: ', this.entry);

    this.entryKeys = Array.from(this.entry.keys())
                      .filter(key => {
                        const value = this.entry.get(key);
                        return  !Array.isArray(value) &&
                                value.indexOf("http") !== 0;
                      })
                      .filter(key => key !== "created" && key !== "edited");
    // console.log("entry keys: ", this.entryKeys);

    this.entryButtons = Array.from(this.entry.keys())
                        .filter(key => {
                          const value = this.entry.get(key);
                          return  Array.isArray(value) ||
                                value.indexOf("http") === 0;
                        })
                        .filter(key => key !== "films" && key !== "url")
                        .filter(key => this.entry.get(key).length !== 0);
    
    Array.from(this.entryButtons)
      .forEach((buttonKey: string) => {
        this.entryButtonRefsStates.set(buttonKey, false);
        const buttonRefs = this.entry.get(buttonKey) as string[];
        const newButtonRefs = [];
        buttonRefs.forEach(
          ref => this.swapi.getItemName(ref)
                      .subscribe(name => newButtonRefs.push(name + '#' + ref))
        );
        this.entry.set(buttonKey, newButtonRefs);
      });
    // console.log('entryButtons: ', this.entryButtons);
  }

  loadEntry(url: string) {
    this.spinnerVisible = true;
    this.swapi.getItem(url)
      .subscribe(resp => {
        this.previousUrls.push(this.entry.get('url') as string);
        this.cleanEntry();
        this.unzipEntry(resp);
        this.spinnerVisible = false;
        console.log('loaded a new entry: ', this.entry);
      });
  }

  loadPreviousEntry() {
    const url = this.previousUrls.pop();
    if (!url) return;
    this.spinnerVisible = true;
    this.swapi.getItem(url)
      .subscribe(resp => {
        this.cleanEntry();
        this.unzipEntry(resp);
        this.spinnerVisible = false;
        console.log('loaded a previous entry: ', this.entry);
      });
  }

  cleanEntry(): void {

    this.entry.clear();
    this.entryButtonRefsStates.clear();
  }

  isUnknown(key: string): boolean {
    return this.entry.get(key) === "unknown";
  }

  isZero(key: string): boolean {
    return key === "0";
  }

  isRefVisible(buttonName: string): boolean {
    return this.entryButtonRefsStates.get(buttonName);
  }

  toggleRefs(buttonName: string): void {
    const curState = this.entryButtonRefsStates.get(buttonName);
    this.entryButtonRefsStates.set(buttonName, !curState);
  }

  refsActive(buttonName: string): boolean {
    return this.entryButtonRefsStates.get(buttonName);
  }

  rollSprite(): void {

    if (++this.frameNum === 3) {
      this.frameNum  = 0;
    }
  }

}
