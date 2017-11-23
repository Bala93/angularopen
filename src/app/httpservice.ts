import {Injectable}from  '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers}from'@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpTestService{
    constructor(private _http: Http){}
 	 
    public username:string;

    setUsername(params){
    	this.username = params  || localStorage.getItem('this.username');	
	return this.username;
    }

    getUsername():string{
	console.log(this.username);
	return this.username;
    }

 
    getthumbnails(seriesid):Observable<any>{
        return this._http.get('http://mitradevel.cshl.org/webtools/seriesbrowser/getthumbnails/'+seriesid+'/')
            .map(res=>res.json());
    }
    getsectioninfo(seriesid,sectionid):Observable<any>{
        return this._http.get('http://mitradevel.cshl.org/webtools/seriesbrowser/getsectioninfo/'+seriesid+'/'+sectionid)
            .map(res=>res.json());
    }

    getbraininfo(seriesid):Observable<any>{
        return this._http.get('http://mitradevel.cshl.org/webtools/seriesbrowser/getbraininfo/'+seriesid+'/')
            .map(res=>res.json());
    }

    getinitialsection(seriesid):Observable<any>{
        return this._http.get('http://mitradevel.cshl.org/webtools/seriesbrowser/getinitialsection/'+seriesid+'/')
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

    userLogin(params){
	return this._http.post('http://mitradevel.cshl.org/users/rest-auth/login/',params);
    }
   
    userRegister(params){
	return this._http.post('http://mitradevel.cshl.org/users/rest-auth/registration/',params);
    }

	
    userLogout(){
	return this._http.post('http://mitradevel.cshl.org/users/rest-auth/logout/',{});
    }
   

}

