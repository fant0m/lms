import { Component, OnInit } from '@angular/core';
import { Course } from "../shared/course";
import { CourseService } from "../shared/course.service";

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
    courses: Course[];

    constructor(private courseService: CourseService) { }

    ngOnInit() {
        this.courseService
            .getCourses()
            .then(courses => this.courses = courses);
    }
}
