

import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import moment from "moment";
import * as moment from 'moment';
//import DateTime from 'luxon/src/datetime.js'
import { DateTime } from 'luxon';
import { MatSliderModule } from '@angular/material/slider';
import { ThemePalette } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import noteApi from './api' 
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
//import axios from 'axios'
//import "angular-async-await";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare var require: any

  




interface Label {
  id: number;
  text: string;
}

interface NoteResponse {
  notes: Note[];
}

interface Note {
  id: number;
  title: string;
  startDate: number;
  endDate: number;
  labels: any[];
  summary: string;
}






@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})
export class CalendarComponent implements OnInit {
  constructor(private http: HttpClient) { }

  
  items = Array.from({ length: 10 }).map((_, i) => `Item #${i}`);
  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;


  notes: any[] = [];
  labels: any[] = [];

  CalendarWeek: number = DateTime.local().weekNumber;

  NoteUpdateResult: string;
  CrntWeek: number = DateTime.local().weekNumber;
  CrntYear: number = DateTime.local().weekYear;

  dropselectvalue: number = 0;

  dark() {
    console.log(this.checked);

  }


  myFunction() {

    console.log('sss');
    var element = document.body;
    element.classList.toggle("dark-mode");
  }




  editnote(noteid: number, summary: string, startdate: string, enddate: string, labels: number[], title: string): string {

    console.log('111');

    var startdatets = moment(startdate, "YYYY/MM/DD HH:mm:ss").valueOf();
    var enddatets = moment(enddatets, "YYYY/MM/DD HH:mm:ss").valueOf();

    var NoteUpdatedTs;
    var errorMessage;

    const body = { summary: summary, startDate: startdatets, endDate: enddatets, labels: labels, title: title };
    this.http.put<any>('https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api/notes/' + noteid, body)
      .subscribe({
        next: data => {

          NoteUpdatedTs = data.updated;
          console.log(data);
          console.log(NoteUpdatedTs);

          alert(' Note #' + noteid + ' Updated. Update Timestamp is : ' + NoteUpdatedTs)

        },
        error: error => {

          errorMessage = error.message;
          console.error('There was an error!', error);
          alert(' Note #' + noteid + 'Not Updated. Error is : ' + errorMessage)
        }
      });

    return NoteUpdatedTs;


  }



  loadNotes() {
    //console.log("hi");

    this.http
      .get("https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api/noteLabels")
      .subscribe((labels: any) => {
        this.labels = labels;
        //console.log(this.labels);

        this.http
          .get("https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api/notes")
          .subscribe((data: any) => {
            this.notes = data.notes.map((note: { labels: string[] | number[]; }) => {
              note.labels = this.labels
                .filter((elem: any) => {
                  // @ts-ignore
                  return note.labels.indexOf(elem.id) > -1;
                })
                .map((l) => l.text);
              return note;
            });
          });
      });

  }

  ngOnInit() {
    this.loadNotes();
    //console.log(this.dropselectvalue);
  }


  
  

  toDate(d: number): string {

    var dateString = moment.unix(d).format("DD.MM.");
    return dateString;

  }

  subtext(mytype: number, mytext: string): string {

    // mytype = 1 is for title
    // mytype = 2 is for summary

    var textmaxleng;

    switch (mytype) {
      case 1: {
        textmaxleng = 20;
        break;
      }
      case 2: {
        textmaxleng = 50;
        break;
      }
      default: {
        textmaxleng = mytext.length;
        break;
      }
    }


    let length = mytext.length;


    //console.log(mytype);
    //console.log(mytext);
    //console.log(length);

    if (length <= textmaxleng) {
      return mytext;
    }
    else {
      return mytext.substring(0, textmaxleng) + ' ...';
    }





  }

  calculateDuration(s: number, e: number) {
    //s=1651791600;
    //e=1652223600;
    var CurationDays: number=0;
    var date = moment.unix(s).toDate();
    var days = moment.duration(moment(e * 1000).diff(moment(s * 1000))).asDays();

    while (days > 0) {
      //console.log('c');
      //console.log(days);
      date = moment(date).add(1, "days").toDate();
      CurationDays = CurationDays + 1;
      //console.log('a');
      if (moment(date).isoWeekday() == 6 || moment(date).isoWeekday() == 7) {
        //console.log('b');
        CurationDays = CurationDays - 1;
        
      }
      days -= 1;
    }

    return CurationDays;
  }

  getCurrentWeek(weeknumber: number) {

    //var currentDate = moment();
    //console.log('s');
    //console.log(currentDate); 

    //weeknumber =1 ;

    //var date = 
    var weekStart = moment().isoWeek(weeknumber || 1).startOf("isoWeek");
    //var weekStart = currentDate.clone().startOf("isoWeek");

    //console.log(weekStart); 
    //console.log('t');
    //console.log(date); 



    //var currentDate = moment();


    //var weekEnd = currentDate.clone().endOf("isoWeek");
    var weekEnd = moment().isoWeek(weeknumber || 1).endOf("isoWeek");


    //console.log(weekEnd);
    var days = [];

    for (var i = 0; i <= 4; i++) {
      days.push(moment(weekStart).add(i, "days").format("DD.MM."));
    }
    //console.log(days);
    return days;
  }
}

