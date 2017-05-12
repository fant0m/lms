import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from "@angular/material";

import { UserService } from '../shared/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent {
    form: FormGroup;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private snackBar: MdSnackBar,
        private router: Router
    ) {
        this.form = fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.userService.login(this.form.value.email, this.form.value.password)
                .then(message => {
                    this.snackBar.open('Login was successful.', 'ok', {duration: 4500});
                    this.router.navigate(['/']);
                })
                .catch(result => {
                    this.snackBar.open(result.message, 'ok', {duration: 4500});
                });
        }
    }
}
