/// <reference path="../../models.ts"/>

import {Component, View, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl} from 'angular2/common';
import {Validators} from 'angular2/common';
import {TodoItem} from '../../models';
import {TodoService} from './todo.service';

@Component({
    selector: 'todo',
    viewProviders: [FormBuilder],
    providers: [
        TodoService
    ]
})
@View({
    template: `
        <div *ngFor="#todo of todos; #i=index">
            <input id="{{i}}" type="checkbox" [(checked)]="todo.completed">
            <label [attr.for]="i">{{todo.text}}</label>
            <a class="glyphicon glyphicon-remove" (click)="removeTodo(todo)"></a>
        </div>

        <form [ngFormModel]="myForm" (submit)="onSubmit()" class="form-inline">
            <div class="form-group"
                [class.has-error]="!newTodo.valid && newTodo.dirty" [class.has-success]="newTodo.valid && newTodo.dirty">
                <input class="form-control" placeholder="What do you need to do?" [ngFormControl]="newTodo">
            </div>

            <button class="btn btn-primary" type="submit" [disabled]="!myForm.valid">Add Todo</button>
        </form>

        <input id="toggle-all" type="checkbox" (click)="toggleAll($event)">
        <label for="toggle-all">Mark all as complete</label>

        <div *ngIf="!myForm.valid && myForm.dirty" class="bg-warning">Form is invalid</div>
        <div *ngIf="!newTodo.valid && newTodo.dirty" class="bg-warning">newTodo is invalid</div>
    `,
    directives: [FORM_DIRECTIVES]
})
export class Todo implements OnInit {
    ngOnInit() {
        var todo = { name: 'Arnold', completed: false };
        this._todoService.newTodo(todo);

        console.log('onInit');
        this._todoService.getTodos()
            .subscribe(
            response => console.log(response)
            );
    }
    todos: Array<TodoItem>;

    fb: FormBuilder;
    myForm: ControlGroup;
    newTodo: Control;

    constructor(fb: FormBuilder, private _todoService: TodoService) {
        this.fb = fb;
        this.todos = new Array<TodoItem>();
        this.todos.push(new TodoItem('Hello world', false));

        this.buildForm();
    }

    buildForm(): void {
        this.newTodo = new Control('', Validators.required);

        this.myForm = this.fb.group({
            'newTodo': this.newTodo
        });
    }

    removeTodo(item: TodoItem) {
        this.todos.splice(this.todos.indexOf(item), 1);
    }

    onSubmit(): void {
        if (this.myForm.valid) {
            this.todos.push(new TodoItem(this.newTodo.value, false));

            // How in hell do I reset this thing and prevent it from being validated?
            // The only thing that works is rebuilding the whole form/&%¤#""
            this.buildForm();
        }
    }

    toggleAll($event) {
        var isComplete = $event.target.checked;
        this.todos.forEach(function(todo) {
            todo.completed = isComplete;
        });
    }
}
