import {
    it,
    iit,
    describe,
    ddescribe,
    expect,
    inject,
    injectAsync,
    TestComponentBuilder,
    beforeEachProviders
} from 'angular2/testing';

import {MockBackend} from 'angular2/http/testing';
import {ResponseOptions} from 'angular2/http';

import {Http, Response, Headers, HTTP_PROVIDERS, XHRBackend} from 'angular2/http';

import {provide} from 'angular2/core';
import {TodoService} from './todo.service';
import {TodoItem} from '../../models';
import {MockConnection} from 'angular2/src/http/backends/mock_backend';

describe('MyService Service', () => {

    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, { useClass: MockBackend }),
            TodoService
        ];
    });

    it('should get todos', inject([XHRBackend, TodoService], (mockBackend, todoService) => {
        mockBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: [
                            {
                                id: 666,
                                text: 'write a passing test',
                                completed: true
                            }]
                    }
                    )));
            });

        // todoService.getTodos()
        //     .subscribe((todosData: TodoItem[]) => {
        //         console.log('todosData: ', todosData);
        //         expect(todosData.length).toBe(1);
        //     });

        todoService.getTodos()
            .subscribe((todos: TodoItem[]) => {
                this.todos = todos;
                console.log('this dot todos: ', this.todos);
            });

        // todoService.getTodos()
        //     .subscribe((todos: TodoItem[]) => {
        //         expect(todos.length).toBe(1);
        //         expect(todos[0]._id).toBe(666);
        //     });

    }));
});

