import { GameDataService } from './../../data/gameData.service';
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

import { Component, OnInit } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";
import { PageEvent } from '@angular/material';

//@ts-ignore
const _ = window.require("lodash");

@Component({
    selector: 'screen-world-missables',
    templateUrl: './world-missables.component.pug',
    styleUrls: ['./world-missables.component.scss'],
})
export class WorldMissablesComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService
    ) { }

    ngOnInit() {

    }

    get missables() {
        return this.gd.file("missables").data;
    }

    get missablesFiltered() {
        const missables = this.missables;

        if (this.search == "")
            return missables;

        return _.filter(missables, (el: any) => {
            const nameUpper = _.upperCase(el.name);
            const searchUpper = _.upperCase(this.search);
            return nameUpper.includes(searchUpper);
        });
    }

    get paginatedMissables() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        return this.missablesFiltered.slice(start, end);
    }

    getMissable(index: number): boolean {
        return this.fileService.fileDataExpanded.world.missables.missableObjectFlags[index];
    }

    setMissable(index: number, value: boolean) {
        this.fileService.fileDataExpanded.world.missables.missableObjectFlags[index] = value;
    }

    toggleMissable(index: number) {
        this.setMissable(index, !this.getMissable(index));
    }

    toggleAllMissables() {
        const missable0 = this.getMissable(0);

        const count = this.gd.file("missables").data.length;

        for (let i = 0; i < count; i++) {
            this.setMissable(i, !missable0);
        }
    }

    missableToIndex(missable: any) {
        for(let i = 0; i < this.missables.length; i++) {
            const _missable = this.missables[i];
            if(missable.name == _missable.name) {
                return i;
            }
        }

        return null;
    }

    paginatorChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
    }

    public pageIndex: number = 0;
    public pageSize: number = 10;
    public search: string = "";
}
