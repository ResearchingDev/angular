import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() { }
  messageConvertor(a,b){
    return b.replace("{TYPE}", a);
  }
}
