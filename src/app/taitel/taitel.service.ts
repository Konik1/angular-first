import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Taitel , Taitel2 } from '../persons/person'

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

 interface taitel {
    id: string,
    url: string,
    name: string
  }  
  
@Injectable() 
export class TaitelService {
    
    readonly URL_DB = 'http://localhost:3000/api/home';
    
    constructor(private http: HttpClient) { }

    getTaitel(): Observable<Array<taitel>> {
       return this.http.get<any>(this.URL_DB).pipe(map(x => x.data))     
    }

    postTaitel(taitel: Taitel){
        const body = {id: taitel.id, name: taitel.name, data64: taitel.data64};
        return this.http.post(this.URL_DB, body)
        .subscribe( data => { data = taitel } ); 
    }

    putTaitel(taitel: Taitel2):Observable<any>{
        const body = {
            _id: taitel._id, 
            id: taitel.id, 
            name: taitel.name,
            data64: taitel.data64
        };
        return this.http.put(this.URL_DB, body, httpOptions)
    }
    
    deleteTaitel(id: string){
        let url = 'http://localhost:3000/api/home/'+id
        console.log("тест удаление", url);
        return this.http.delete(url, httpOptions)
    }
}