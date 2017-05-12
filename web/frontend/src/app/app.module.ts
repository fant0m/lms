import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdToolbarModule, MdButtonModule, MdIconModule, MdSnackBarModule, MdCardModule, MdInputModule, MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from "./app-routing.module";
import { UserService } from "./users/shared/user.service";
import { UsersModule } from "./users/users.module";
import { AdminModule } from "./admin/admin.module";
import { CourseService } from "./shared/course.service";
import { CoursesComponent } from './courses/courses.component';
import { LessonComponent } from './lesson/lesson.component';
import {SafeHtmlModule} from "./shared/safe-html.module";
import {TitleService} from './shared/title.service';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        CoursesComponent,
        LessonComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MdToolbarModule,
        MdButtonModule,
        MdIconModule,
        MdSnackBarModule,
        MdCardModule,
        MdInputModule,
        AppRoutingModule,
        UsersModule,
        BrowserAnimationsModule,
        AdminModule,
        MdTooltipModule,
        SafeHtmlModule,
        ReactiveFormsModule
    ],
    providers: [UserService, CourseService, TitleService],
    bootstrap: [AppComponent]
})
export class AppModule { }

