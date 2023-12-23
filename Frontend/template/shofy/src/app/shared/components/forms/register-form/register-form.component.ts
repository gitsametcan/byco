import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup,Validators } from '@angular/forms';

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

  constructor(private toastrService: ToastrService) { }

  ngOnInit () {
    this.registerForm = new FormGroup({
      name:new FormControl(null,[Validators.required]),
      surname:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }

  kaydol(name:string,surname:string,email:string,password:string){
    if(name.length>0&&surname.length>0&&email.length>0&&password.length>=6){
        console.log(name +" " + surname + " " +email + " "+password)
    }
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
  get password() { return this.registerForm.get('password') }
}
