import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent {
    form: FormGroup;

    constructor(
        private snackBar: MdSnackBar,
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.form = fb.group({
            'email': ['', Validators.required],
            'username': ['', Validators.required],
            'password': ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(form: any): void {
        if (this.form.valid) {
            this.userService.register(form.email, form.username, form.password)
                .then(message => {
                    this.snackBar.open(message, 'ok', {duration: 4500});
                    this.router.navigate(['/']);
                })
                .catch(result => {
                    this.snackBar.open(result.message, 'ok', {duration: 4500});
                });
        }
    }
}