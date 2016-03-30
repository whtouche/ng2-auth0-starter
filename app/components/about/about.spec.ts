import {
    it,
    inject,
    injectAsync,
    describe,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';
import {RouteParams} from 'angular2/router';

import {Component, provide} from 'angular2/core';

// Load the implementations that should be tested
import {About} from './about.component';

describe('About', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        About,
        provide(RouteParams, { useValue: new RouteParams({ id: 'hello, world!' }) }),
    ]);

    it('should log ngOnInit', inject([About], (about) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

        about.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));

    it('the id should match the param', inject([About], (about) => {
        expect(about.id).toEqual('hello, world!');
    }));

});
