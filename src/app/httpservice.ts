import {Injectable}from  '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers}from'@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpTestService{
    constructor(private _http: Http){}
 
    getthumbnails():Observable<any>{
        return this._http.get('http://mitradevel.cshl.org/webtools/seriesbrowser/getthumbnails/4618/')
            .map(res=>res.json());
    }

    postFeatures(params){
        console.log("Saving");
        return this._http.post('http://mitradevel.cshl.org/nisslapi/postdata/',params);
    }

    getfirstpasspolygons(){
        return this._http.get('http://mitradevel.cshl.org/nisslapi/getdata/')
                         .map(res=>res.json());
    }

}

