import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }
  messageConvertor(a,b,c){
    return b.replace(c, a);
  }
}
