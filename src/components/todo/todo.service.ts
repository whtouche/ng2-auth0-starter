import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
// import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class TodoService {
    constructor(private _http: Http) { }

    getTodos() {
        return this._http.get('http://localhost:3002/api/todo')
            .map((response: Response) => response.json().data);
    }

    newTodo(todo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('http://localhost:3002/api/todo',
            JSON.stringify(todo),
            { headers: headers })
                .map((response: Response) => response.json())
                .subscribe(
                    data => console.log(data),
                    err => console.log(err),
                    () => console.log('newTodo Posted')
                );
    }
}