import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service'
import { Router, ActivatedRoute } from "@angular/router"
import { Observable } from 'rxjs';
import { IdService } from './id.service'
import {DomSanitizer} from '@angular/platform-browser';

declare var google: any;

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  taitelPerson: string = "";
  personList: Observable<object>;
  dialogName: string;
  dialogDescription: string;
  user:string = "";

  constructor(private personService: PersonService, 
    private idService: IdService, 
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer) {}

  openDialog(name:string, description:string) {
    this.dialogName = name;
    this.dialogDescription = description
  }

  display: boolean = false;
  showDialog() {
      this.display = true;
  }

  /* Google maps */
  options: any;
  overlays: any[];
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taitelPerson = params.get('id');
      });

    this.personList =  this.personService.getPerson();
     
    /* this.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    + this.toImage);  */


      this.options = {
          center: {lat: 56.501861, lng: 85.003960}, 
          zoom: 17
      };

      this.overlays = [
        new google.maps.Marker({position: {lat: 56.501861, lng: 85.003960}, title:"tomsk dosaaf"})
      ];
  }
}
