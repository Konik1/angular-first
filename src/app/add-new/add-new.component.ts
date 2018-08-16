import { Component, OnInit } from '@angular/core';
import { TaitelService } from '../taitel/taitel.service'
import { Observable } from 'rxjs';
import { PersonService } from '../persons/person.service'
import { Person3, Person2, Taitel, Taitel2 } from '../persons/person'

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  disabled:boolean = true;
  taitelList: Observable<object>;
  personList: Observable<object>;

  constructor(private taitelService: TaitelService, private personService: PersonService) {   }

  ngOnInit() {
    this.taitelList =  this.taitelService.getTaitel()
    this.personList =  this.personService.getPerson()
  }

  display: boolean = false;
  dialogName:string;
  dialogText:string;
  id:number;
  blockSpace: RegExp = /[^\s]/;
  base64textString: string = "";

  getNewTaitel(id:string){this.id = +id, this.display = true; this.base64textString="";
    this.dialogName = "Добавить новый тайтл"; this.dialogText = "test"}
  getEditTaitel(id:string){this.id = +id, this.display = true; this.base64textString="";
    this.dialogName = "Редактировать тайтл"; this.dialogText = "test"}
  getDeleteTaitel(id:string){this.id = +id, this.display = true; this.base64textString="";
    this.dialogName = "Удалить тайтл"; this.dialogText = "test"}
  
  getNewPerson(id:string){this.id = +id, this.display = true; this.base64textString="";
    this.dialogName = "Добавить нового персонажа"; this.dialogText = "test"}
  getEditPerson(id:string){this.id = +id, this.display = true; this.base64textString="";
  this.dialogName = "Редактировать персонажа"; this.dialogText = "test"}
  getDeletePerson(id:string){this.id = +id, this.display = true; this.base64textString="";
  this.dialogName = "Удалить персонажа"; this.dialogText = "test"}
  
  test:string = "kek";
  postTaitelProp: Taitel=new Taitel();
  postTaitelFile64(){ this.postTaitelProp.data64 = this.base64textString;
    this.base64textString=""; }
  postTaitel(taitel: Taitel){
    this.taitelService.postTaitel(taitel);
    console.log(taitel.id)
    this.display = false;
  }

  putTaitelProp: Taitel2=new Taitel2();
  putTaitelFile64(){ this.putTaitelProp.data64 = this.base64textString;
    this.base64textString=""; }
  putTaitel(taitel: Taitel2){
    this.taitelService.putTaitel(this.putTaitelProp).subscribe(() => { })
    this.display = false;
}

  deleteTaitelProp: Taitel2=new Taitel2();
  deleteTaitel(taitel: Taitel2){
    this.taitelService.deleteTaitel(taitel._id).subscribe(() => { })
    this.display = false;
  }

  taitelNamePostPerson: Taitel;
  postPersonProp: Person3=new Person3();
  onChangePostPerson(){
    this.postPersonProp.id=this.taitelNamePostPerson.id; }
  postPersonFile64(){ this.postPersonProp.data64 = this.base64textString;
    this.base64textString=""; }
  postPerson(person: Person3){
    this.personService.postPerson(person); 
    console.log("добавление персонажа");
    this.display = false;
    
  }
  
  taitelNamePutPerson: Taitel2;
  putPersonProp: Person2=new Person2();
  onChangePutPerson(){
    this.putPersonProp.id=this.taitelNamePutPerson.id; }
  onChangePutPerson2(){
    this.putPersonProp.putName=this.putPersonProp.name; }
  putPersonFile64(){ this.putPersonProp.data64 = this.base64textString;
      this.base64textString=""; }
  putPerson(person: Person2){
    this.personService.putPerson(this.putPersonProp).subscribe(() => { }); 
    this.display = false;
  }

  deletePersonProp: Person2=new Person2();
  deletePerson(person: Person2){
    this.personService.deletePerson(person._id).subscribe(() => { })
    this.display = false;
  }
  
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
            
    }

}