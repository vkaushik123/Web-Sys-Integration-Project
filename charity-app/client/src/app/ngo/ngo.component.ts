/**
 * Created by Vasuki on 10/31/2017.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ngo, NgoService } from '../shared';

@Component({
  selector: 'ngo-page',
  templateUrl: './ngo.component.html',
  styleUrls:['./ngo.component.css']
})

export class NgoComponent implements OnInit{
  ngo: Ngo = new Ngo();
   constructor(private _ngoService: NgoService){}

  openCheckout(){
    var handler = (<any>window).StripeCheckout.configure({
      key:'pk_test_G1ger4QImeCjypjO0SAvTsU1',
      locale:'auto',
      token: function(token:any){

      }
    });

    handler.open({
      name:'Payment Gateway',
      description: 'Help a NGO',
      amount : 2000
    });
  }
   ngOnInit(){
     this._ngoService.getData()
       .subscribe(resNgoData => this.ngo = resNgoData);
   }
}
