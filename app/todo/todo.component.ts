/// <reference path="../models.ts"/>

import {Component, View, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control, AbstractControl} from 'angular2/common';
import {Validators} from 'angular2/common';
import {TodoItem} from '../models';
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
        <input id="toggle-all" type="checkbox" (click)="toggleAll($event)">
        <label for="toggle-all">Mark all as complete</label>
        <form [ngFormModel]="myForm" (submit)="onSubmit()" class="form-inline">
            <div class="form-group"
                [class.has-error]="!newTodo.valid && newTodo.dirty" [class.has-success]="newTodo.valid && newTodo.dirty">
                <input class="form-control" placeholder="What do you need to do?" [ngFormControl]="newTodo">
            </div>

            <button class="btn btn-primary" type="submit" [disabled]="!myForm.valid">Add Todo</button>
        </form>
        <div *ngFor="#todo of todos; #i=index">
            <input id="{{todo._id}}" type="checkbox" [(checked)]="todo.completed">
            <label [attr.for]="i">{{todo.name}}</label>
            <a class="glyphicon glyphicon-remove" (click)="deleteTodo(todo)"></a>
        </div>

        <div *ngIf="!myForm.valid && myForm.dirty" class="bg-warning">Form is invalid</div>
        <div *ngIf="!newTodo.valid && newTodo.dirty" class="bg-warning">newTodo is invalid</div>
    `,
    directives: [
        FORM_DIRECTIVES
    ]
})
export class Todo implements OnInit {
    todos: Array<TodoItem>;
    fb: FormBuilder;
    myForm: ControlGroup;
    newTodo: Control;

    constructor(fb: FormBuilder, private _todoService: TodoService) {
        this.fb = fb;
        this.todos = new Array<TodoItem>();
        this.todos.push(new TodoItem('Hello world', false, 50));

        this.buildForm();
    }

    ngOnInit() {
        console.log('onInit');
        this._todoService.getTodos()
            .subscribe(
                todos => this.todos = todos
            );
    }


    buildForm(): void {
        this.newTodo = new Control('', Validators.required);
        this.myForm = this.fb.group({
            'newTodo': this.newTodo
        });
    }

    removeTodo(item: TodoItem) {
        console.log(item);
        this.todos.splice(this.todos.indexOf(item), 1);
    }

    deleteTodo(item: TodoItem) {
        console.log("front end deleting...");
        this._todoService.deleteTodo(item._id);
    }

    onSubmit(): void {
        if (this.myForm.valid) {
            var postableTodo = {
                name: this.newTodo.value,
                completed: false
            };

            this._todoService.newTodo(JSON.stringify(postableTodo));

            // How in hell do I reset this thing and prevent it from being validated?
            // The only thing that works is rebuilding the whole form/&%¤#""
            this.buildForm();
        }
    }

    toggleAll($event) {
        var isComplete = $event.target.checked;
        // this.todos.forEach(todo => todo.completed = isComplete);
        this.todos.forEach(function(todo) {
            console.log('id: ', todo._id);
            todo.completed = isComplete;
        });
    }
}
