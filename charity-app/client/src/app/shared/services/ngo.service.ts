/**
 * Created by Vasuki on 10/31/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class NgoService {
  private _url: string = "http://ec2-52-90-176-159.compute-1.amazonaws.com:9000/user"
  constructor(private _http: Http) {}
  getData(){
     return this._http.get(this._url)
       .map((resp:Response) => resp.json());
  }
}
