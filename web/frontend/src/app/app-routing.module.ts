import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesComponent } from './courses/courses.component';
import {LessonComponent} from './lesson/lesson.component'

const routes: Routes = [
    { path: '', component: HomepageComponent, data: {title: 'Homepage'} },
    { path: 'course/:slug', component: CoursesComponent, data: {title: 'Course'} },
    { path: 'course/:slug/lesson/:id', component: LessonComponent, data: {title: 'Lesson'} }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}