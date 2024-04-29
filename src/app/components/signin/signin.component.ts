import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });

  }

  get loginControl() { return this.loginForm.controls; }
 
  handleLogin(){
    console.log(this.loginControl);
    if(this.loginForm.invalid) return
    const {email, password} = this.loginForm.value

     this.userService.loginCall(email, password).subscribe((res) => {
      console.log(res)
      localStorage.setItem("AuthToken", res.data)
      this.router.navigate(["/dashboard/notes"])
    },
      (err) => console.log(err)
    )
  }

}
