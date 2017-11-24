import { Component,Input,Output,OnInit,EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpTestService } from '../httpservice';
import { FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import { MapComponent} from '../map/map.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpTestService],
})

//@Injectable()
export class LoginComponent implements OnInit{
	
status;
//loading = false;
model:any={};
params;

constructor(private _httpService: HttpTestService,private router:Router) { 
	
} 


ngOnInit(){

}

do_login(){

   //this.loading=true;
   this.params = {'username':this.model.username,'password':this.model.password};
  
   this._httpService.userLogin(this.params).subscribe(

      data =>{
				  var app;
					//console.log(this.model.username);
					this.router.navigate(['/map/4189/']);
			   	app = window["app"];
					app.username = this.model.username;
					//uname['uname'] = 'balamurali';				
				  //this.update_username(this);
      },

     err  => {
					 this.status = Object.values(JSON.parse(err._body));
    }

   );

}

/*
update_username(this_){
    var uname = this_.params['username'];
		this_._httpService.setUsername(uname).subscribe();
}*/

	


}  
  


