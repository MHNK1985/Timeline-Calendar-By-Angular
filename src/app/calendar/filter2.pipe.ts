import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(labels: any, selectedlabeltext: any): any {

var labeltext ;

    //console.log(labels);
    //console.log(selectedlabeltext);


    if (selectedlabeltext === undefined || selectedlabeltext == 0) {
      //console.log('aaa');
      return labels;
    }
    else {
      //console.log('bbb');
      //console.log(selectedlabeltext);
      //console.log('cc');
      
      switch (selectedlabeltext) {
        case '1': {

        

          labeltext= 'Frontend';
          break;
        }
        case '2': {
          labeltext= 'Backend';
          
          break;
        }
        case '3': {
          labeltext= 'Security';          
          break;
        }
        default: {
          return labels;
          break;
        }
      };

      //console.log(labeltext);

      return labels.filter(function (hadi2) {

        return hadi2.text.includes(labeltext);


       
        
      });
    }



  }

}
