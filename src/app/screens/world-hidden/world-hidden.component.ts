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
    selector: 'screen-world-hidden',
    templateUrl: './world-hidden.component.pug',
    styleUrls: ['./world-hidden.component.scss'],
})
export class WorldHiddenComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
        public gd: GameDataService
    ) { }

    ngOnInit() {

    }

    get items() {
        return this.gd.file("hiddenItems").data;
    }

    get coins() {
        return this.gd.file("hiddenCoins").data;
    }

    get itemsFiltered() {
        const items = this.items;

        if (this.search == "")
            return items;

        return _.filter(items, (el: any) => {
            const nameUpper = _.upperCase(el.map);
            const searchUpper = _.upperCase(this.search);
            return nameUpper.includes(searchUpper);
        });
    }

    get paginatedItems() {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        return this.itemsFiltered.slice(start, end);
    }

    getItem(index: number): boolean {
        return this.fileService.fileDataExpanded.world.hidden.ownedHidenItems[index];
    }

    getCoin(index: number): boolean {
        return this.fileService.fileDataExpanded.world.hidden.ownedHiddenCoins[index];
    }

    setItem(index: number, value: boolean) {
        this.fileService.fileDataExpanded.world.hidden.ownedHidenItems[index] = value;
    }

    setCoin(index: number, value: boolean) {
        this.fileService.fileDataExpanded.world.hidden.ownedHiddenCoins[index] = value;
    }

    toggleItem(index: number) {
        this.setItem(index, !this.getItem(index));
    }

    toggleCoin(index: number) {
        this.setCoin(index, !this.getCoin(index));
    }

    itemToIndex(item: any) {
        for(let i = 0; i < this.items.length; i++) {
            const _item = this.items[i];
            if(item.map == _item.map &&
                item.x == _item.x &&
                item.y == _item.y) {
                    return i;
                }
        }

        return null;
    }

    toggleAllItems() {
        const item0 = this.getItem(0);

        const count = this.gd.file("hiddenItems").data.length;

        for (let i = 0; i < count; i++) {
            this.setItem(i, !item0);
        }
    }

    toggleAllCoins() {
        const coin0 = this.getCoin(0);

        const count = this.gd.file("hiddenCoins").data.length;

        for (let i = 0; i < count; i++) {
            this.setCoin(i, !coin0);
        }
    }

    paginatorChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
    }

    public pageIndex: number = 0;
    public pageSize: number = 10;
    public search: string = "";
}
