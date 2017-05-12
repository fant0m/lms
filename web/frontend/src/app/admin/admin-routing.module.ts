import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesComponent } from './courses/courses.component';
import { AdminGuard } from "../core/admin-guard.service";

const routes: Routes = [
    {
        path: 'admin',
        canActivate: [AdminGuard],
        component: AdminComponent,
        data: {title: 'Admin'},
        children: [
            { path: 'courses/create-course', component: CourseFormComponent },
            { path: 'courses', component: CoursesComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AdminGuard]
})
export class AdminRoutingModule { }