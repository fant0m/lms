import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdToolbarModule, MdButtonModule, MdIconModule, MdSnackBarModule, MdCardModule, MdInputModule } from '@angular/material';

import { UsersRoutingModule } from "./users-routing.module";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    imports: [
        CommonModule,
        MdToolbarModule,
        MdButtonModule,
        MdIconModule,
        MdSnackBarModule,
        MdCardModule,
        MdInputModule,
        FormsModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [LoginComponent, RegisterComponent]
})
export class UsersModule { }
