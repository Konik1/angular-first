import { Injectable } from "@angular/core";
import { Person, Person2, Person3 } from './person'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

interface person {
    id: string,
    url: string,
    name: string,
    description: string,
    data64: string
}

@Injectable() 
export class PersonService {
    readonly URL_DB = 'http://localhost:3000/api/person';
    
    constructor(private http: HttpClient) { }
    
    /* postImg(file64){
        
        return this.http.post(this.URL_IMG, file64)
        .subscribe( () => {} ); 
        
    }  */

    getPerson(): Observable<Array<person>> {
       return this.http.get<any>(this.URL_DB).pipe(map(x => x.data))
    }

    postPerson(person: Person3){
        const body = {id: person.id, name: person.name, description: person.description, data64: person.data64};
        console.log("тест ", body.data64);
        return this.http.post(this.URL_DB, body)
        .subscribe( data => { data = person } ); 
        

    }

    putPerson(person: Person2):Observable<any>{
        const body = { 
            _id: person._id, 
            id: person.id, 
            name: person.name,
            putName: person.putName, 
            description: person.description,
            data64: person.data64 
        };
        return this.http.put(this.URL_DB, body, httpOptions)
    }

    deletePerson(id: string){
        let url = 'http://localhost:3000/api/person/'+id
        console.log( url);
        return this.http.delete(url, httpOptions)
    }
}

