import {
    it,
    inject,
    injectAsync,
    describe,
    beforeEachProviders,
    TestComponentBuilder
} from 'angular2/testing';

import {Component} from 'angular2/core';

// Load the implementations that should be tested
import {Profile} from './profile.component';

describe('Profile', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        Profile
    ]);

    it('should log ngOnInit', inject([Profile], (profile) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

        profile.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));

    it('the id should match the param', inject([Profile], (profile) => {
        expect(profile.id).toEqual('hello, world!');
    }));

});
