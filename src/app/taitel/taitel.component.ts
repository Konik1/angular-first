import { Component, OnInit} from '@angular/core';
import { TaitelService } from './taitel.service'
import { Router } from "@angular/router"
import { Observable } from 'rxjs';
import { IdService } from '../persons/id.service'

@Component({
  selector: 'app-taitel',
  templateUrl: './taitel.component.html',
  styleUrls: ['./taitel.component.css']
})
export class TaitelComponent implements OnInit{

  id:string;
  taitelList: Observable<object>;

  constructor(private idService: IdService, 
    private taitelService: TaitelService, 
    private router: Router) {
    this.idService.onClick.subscribe(cnt => this.id = cnt);
  }
  
  getTaitelIdClick(id: string) { this.router.navigate(["home", id]); this.idService.doClick(id); }
  getTaitelId(id: string) { this.id = id; }
  setTaitelId() { return this.id; }

  ngOnInit() {
   this.taitelList =  this.taitelService.getTaitel()
  }
}