import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApixuService } from "../apixu.service";


@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherData:any='' ;

  vector:any=[];
  alert:boolean;
  selected_item;

  constructor(
    private formBuilder: FormBuilder,
    private apixuService: ApixuService
  ) {}

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });
  }

  sendToAPIXU(formValues) {
    this.alert=false;
    this.apixuService.getWeather(formValues.location).subscribe(data => {
      this.weatherData = data;
      if(this.vector.length<6){
        this.vector.push(this.weatherData);
        console.log(this.vector)
      }else {
        this.alert=true;
      }
      

    });
  }

  getIndependentweather(information){
    this.selected_item=information.location.name
  }

  deleteWeather(){
    for(let i=0;i<this.vector.length;i++){
      if(this.vector[i].location.name===this.selected_item){
        this.vector.splice(i,1);
        console.log(this.vector);
      }
    }
  }




}
