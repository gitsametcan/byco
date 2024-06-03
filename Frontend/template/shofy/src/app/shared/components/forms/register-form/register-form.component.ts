import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  isShowPass = false;

  handleShowPass () {
    this.isShowPass = !this.isShowPass;
  }

  public registerForm!: FormGroup;
  public formSubmitted = false;

  constructor(private toastrService: ToastrService, private router: Router) { }

  ngOnInit () {
    this.registerForm = new FormGroup({
      name:new FormControl(null,[Validators.required]),
      surname:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      tel:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
      type: new FormControl(null,Validators.compose([Validators.pattern("bireysel"), Validators.pattern("kurumsal")])),
      vkno: new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }

  kaydol(name:string,surname:string,email:string, tel:string, password:string, type:string, vkno:string){
    if(name.length>0&&surname.length>0&&email.length>0&&password.length>=6){
        console.log(name +" " + surname + " " +email + " "+password)
        fetch(`https://bycobackend.online:5001/api/User/RegisterUser`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(
              {
                ad: name, 
                soyad: surname, 
                email: email, 
                password: password, 
                telefon: tel,
                tip: type, 
                vergi_no_kimlik_no: vkno
              }
            ), 
          }
        ).then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            this.gec();
          }
        );
    }
  }

  gec(){
    this.router.navigate(['/pages/login']);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      console.log('register-form-value', this.registerForm.value);
      this.toastrService.success(`Message sent successfully`);

      // Reset the form
      this.registerForm.reset();
      this.formSubmitted = false; // Reset formSubmitted to false
    }
  }

  get name() { return this.registerForm.get('name') }
  get surname() { return this.registerForm.get('surname') }
  get email() { return this.registerForm.get('email') }
  get tel() {return this.registerForm.get('tel')}
  get password() { return this.registerForm.get('password') }
  get type() { return this.registerForm.get('type') }
  get vkno() { return this.registerForm.get('vkno') }
}
