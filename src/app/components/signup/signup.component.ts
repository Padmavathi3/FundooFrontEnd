import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

}
get signupControl() { return this.signupForm.controls; }
 
handleSignup() {
  if (this.signupForm.invalid) return;

  const { firstname, lastname, email, password } = this.signupForm.value;

  this.userService.signupCall({firstName: firstname, lastName: lastname, emailId: email, password: password})
    .subscribe(
      result => {
        console.log(result);

      },
      error => {
        console.log(error);
        // Handle error response here
      }
    );
}

 

}
