import { Component, OnInit } from '@angular/core';
import { CourseService } from "../shared/course.service";
import { Course } from "../shared/course";
import { ActivatedRoute, Params }   from '@angular/router';
import { UserService } from "../users/shared/user.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {
    course: Course;
    userInfo: any;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private courseService: CourseService,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.courseService.getCourse(params['slug']))
            .subscribe(course => {
                this.course = course;
            });

        this.userService
            .getUserInfo()
            .then(info => {
                this.userInfo = info;
            });
    }

    onEnroll() {
        this.courseService.enroll(this.course.id)
            .then(message => {
                this.snackBar.open(message, 'ok', {duration: 4500});
                this.userService
                    .getUserInfo()
                    .then(info => {
                        this.userInfo = info;
                    });
            })
            .catch(result => {
                this.snackBar.open(result.message, 'ok', {duration: 4500});
            });
    }

    private checkEnroll() {
        const c = this.course;

        let stop = false;
        this.userInfo.enrolledCourses.forEach(function(value) {
            if (value.id == c.id) {
                stop = true;
            }
        });

        if (stop) return false;


        this.userInfo.adminCourses.forEach(function(value) {
            if (value.id === c.id) {
                stop = true;
            }
        });

        if (stop) return false;

        return true;
    }
}
