import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormArray} from '@angular/forms';
import { MdSnackBar } from "@angular/material";
import { Course } from "../../shared/course";
import { CourseService } from "../../shared/course.service";


@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.less']
})
export class CourseFormComponent {
    items: number[];
    form: FormGroup;
    file : File;
    course: Course;
    title: String;
    config = {
        toolbarGroups: [
            { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'forms', groups: [ 'forms' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'links', groups: [ 'links' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'tools', groups: [ 'tools' ] },
            { name: 'others', groups: [ 'others' ] },
            { name: 'about', groups: [ 'about' ] }
        ],
        removeButtons: 'Source,Save,Templates,NewPage,Preview,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,RemoveFormat,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,PageBreak,Iframe,Maximize,ShowBlocks,About',
        filebrowserUploadUrl: '/uploader/'
    };

    constructor(
        private router: Router,
        private snackBar: MdSnackBar,
        private fb: FormBuilder,
        private courseService: CourseService
    ) {
        this.title= 'Create a new course';
        this.items = [0];

        this.form = fb.group({
            'name': ['', Validators.required],
            'description': ['', Validators.required],
            'price': ['', Validators.required],
            'lessons': fb.array([
                this.createLesson()
            ])
        });
    }

    private createLesson() {
        return this.fb.group({
            'title': ['', Validators.required],
            'content': ['', Validators.required]
        })
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.courseService.create(this.form.getRawValue(), this.file)
                .then(message => {
                    this.snackBar.open(message, 'ok', {duration: 4500});
                    this.router.navigate(['/admin/courses']);
                })
                .catch(result => {
                    this.snackBar.open(result.message, 'ok', {duration: 4500});
                });
        }
    }

    onRemoveRow(index: number): void {
        const arrayControl = <FormArray>this.form.controls['lessons'];
        arrayControl.removeAt(index);

        var index = this.items.indexOf(index);
        this.items.splice(index, 1);
    }

    private findIndex(): number {
        for (let i = 0; i < this.items.length; i++) {
            if (i !== this.items[i]) {
                return i;
            }
        }

        return this.items.length;
    }

    onAddRow(): void {
        const max = this.findIndex();
        this.items.push(max);

        const arrayControl = <FormArray>this.form.controls['lessons'];
        arrayControl.push(this.createLesson());
    }

    onChange(event){
        this.file = event.target.files[0];
    }

}
