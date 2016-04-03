import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
// import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {TodoItem} from '../models';

@Injectable()
export class TodoService {
    constructor(private _http: Http) { }

    getTodos() {
        return this._http.get('http://localhost:3002/api/todo')
            .map((response: Response) => <TodoItem[]>response.json().data)
            .do(data => console.log(data));
    }

    newTodo(todo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:3002/api/todo',
            todo,
            { headers: headers })
            .map((response: Response) => response.json())
            .subscribe(
                data => console.log('data: ', data),
                err => console.log('err: ', err),
                () => console.log('newTodo Posted')
            );
    }

    deleteTodo(id) {
        console.log('back end deleting...');
        return this._http.delete('http://localhost:3002/api/todo/' + id)
            .subscribe(response => console.log(response));
    }
}