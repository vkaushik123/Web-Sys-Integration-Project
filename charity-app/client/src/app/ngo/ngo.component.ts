/**
 * Created by Vasuki on 10/31/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ngo, NgoService } from '../shared';

@Component({
  selector: 'ngo-page',
  templateUrl: './ngo.component.html'
})

export class NgoComponent implements OnInit{
  ngo: Ngo = new Ngo();
   constructor(private _ngoService: NgoService){}

   ngOnInit(){
     this._ngoService.getData()
       .subscribe(resNgoData => this.ngo = resNgoData);
   }
}
