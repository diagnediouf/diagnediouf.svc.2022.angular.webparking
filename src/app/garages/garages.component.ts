import { Component, OnInit } from '@angular/core';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.css']
})
export class GaragesComponent implements OnInit {

  constructor(public garageService:GarageService) { }

  ngOnInit(): void {
  }

}
