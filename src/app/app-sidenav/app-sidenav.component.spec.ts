/**
   Copyright 2018 June Hanabi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidenavComponent } from './app-sidenav.component';

describe('AppSidenavComponent', () => {
    let component: AppSidenavComponent;
    let fixture: ComponentFixture<AppSidenavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppSidenavComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppSidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
