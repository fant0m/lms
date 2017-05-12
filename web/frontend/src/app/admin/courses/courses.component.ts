import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../shared/course.service";
import { Course } from "../../shared/course";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {
    courses: Course[];

    constructor(private courseService: CourseService) {
        this.courses = [];
    }

    ngOnInit() {
        this.courseService
            .getAdminCourses()
            .then(courses => this.courses = courses);
    }
}
