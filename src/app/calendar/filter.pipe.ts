import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes: any, labeltext: any,noteday: any): any {
  

    if (labeltext===undefined && labeltext===noteday) return notes;

    return notes.filter(function(hadi){
      //console.log(hadi.startDate);
      

      var dateString = moment.unix(hadi.startDate).format("DD.MM.");
      

      //console.log(dateString);
      //console.log(noteday);
   
      
      return hadi.labels.includes(labeltext) && dateString.includes(noteday) ;
    });
    

    
  }

}
