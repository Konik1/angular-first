import { Injectable } from "@angular/core";

import {EventEmitter} from '@angular/core';

@Injectable() 
export class IdService {

    private id:string;
    onClick:EventEmitter<string> = new EventEmitter();
    
    public doClick(id: string){
       this.onClick.emit(this.id = id);
      }
}