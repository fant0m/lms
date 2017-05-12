import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from "@angular/material";

import { CourseService } from "../shared/course.service";
import { Lesson } from "../shared/lesson";

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.less']
})
export class LessonComponent implements OnInit {
    lesson: Lesson;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private courseService: CourseService
    ) {
        this.form = fb.group({
            'text': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.courseService.getLesson(params['id']))
            .subscribe(lesson => {
                this.lesson = lesson;
            });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.courseService.postComment(this.lesson.id, this.form.value.text)
                .then(message => {
                    this.form.reset();
                    this.snackBar.open(message, 'ok', {duration: 4500});
                    this.courseService.getLesson(this.lesson.id)
                        .then(lesson => this.lesson = lesson);
                })
                .catch(result => {
                    this.snackBar.open(result.message, 'ok', {duration: 4500});
                });
        }
    }
}
