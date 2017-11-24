import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpTestService } from '../httpservice';


@Component({
    //moduleId: module.id,
    templateUrl: 'register.component.html',
    providers:[HttpTestService],
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    status;

    constructor(
        private router: Router,
        private _httpService:HttpTestService)
        { }

    

do_registration(){
   
   var params = {'username':this.model.username,'email':this.model.email,'password1':this.model.password1,'password2':this.model.password2}; 
   this._httpService.userRegister(params).subscribe(
        
        data=>{
	   this.router.navigate(['/login']);	
        },

       err  => {
        this.status = Object.values(JSON.parse(err._body));
      }

 );

}


}
