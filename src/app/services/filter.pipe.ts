import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue:any): any {

    if (!searchValue) return value;
    return value.filter((v:any) => v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.operationName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.id.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}