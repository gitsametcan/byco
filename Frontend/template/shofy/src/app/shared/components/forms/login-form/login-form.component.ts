import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Services } from 'src/app/httpservices/services';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  isShowPass = false;
  benimUrl = "https://bycobackend.online:5001/api";

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public loginForm!: FormGroup;
  public formSubmitted = false;
  //public httpServices: Services;

  constructor(private toastrService: ToastrService, private router: Router) { }

  ngOnInit () {
    this.loginForm = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      console.log('login-form-value', this.loginForm.value);

      this.toastrService.success(`Message sent successfully`);

      // Reset the form
      this.loginForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
    }
  }

  giris(email:string,password:string){
    //console.log(email +"    "+password);
    this.sendRequest('User/LogIn','POST', {email: email, password: password})
    .then(response => {
      console.log(response);
      this.setCookie("session_key",response.session_key,1)
      //document.cookie = "session_key=" + response.session_key + ";";
      this.router.navigate(['/pages/profile']);
    })
    .catch(err => {
      console.error("Error: " + err);
    })
  }

  setCookie(name:string,value:string,days:number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

  sendRequest(url: string, method: string, data?:any): Promise<any> {
    
    return fetch(`${this.benimUrl}/${url}`, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data), 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
      return response.json();
  })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
