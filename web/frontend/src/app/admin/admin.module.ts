import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdButtonModule, MdIconModule, MdSnackBarModule, MdCardModule, MdInputModule } from '@angular/material';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        MdToolbarModule,
        MdButtonModule,
        MdIconModule,
        MdSnackBarModule,
        MdCardModule,
        MdInputModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [AdminComponent, CourseFormComponent, CoursesComponent]
})
export class AdminModule { }
