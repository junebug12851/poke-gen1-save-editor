import { ValueAccessorBase } from './../abstract/ValueAccessorBase';
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

declare var window: {
    require: any;
}

import { Component, OnInit, Input } from '@angular/core';

import {
    NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { GameDataService } from './../../data/gameData.service';
import { Map } from '../../../assets/data/maps.d';

const _: any = window.require("lodash");

@Component({
    selector: 'select-map',
    templateUrl: './select-map.component.pug',
    styleUrls: ['./select-map.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: SelectMapComponent, multi: true }
    ],
})
export class SelectMapComponent extends ValueAccessorBase<string> implements OnInit {

    constructor(
        public gd: GameDataService
    ) {
        super();
    }

    ngOnInit() {

    }

    @Input()
    public disabled: boolean = false;

    @Input()
    public noneSelectable: boolean = false;

    @Input()
    public label: string = "Select Map";

    get mapList() {
        const maps: Map[] = this.gd.file("maps").data;

        let mapListNormal: Map[] = _.filter(maps, (value: Map) => {
            if (!value.glitch)
                return true;

            return false;
        });

        mapListNormal = _.sortBy(mapListNormal, ['name']);

        let mapListGlitch: Map[] = _.filter(maps, (value: Map) => {
            if (value.glitch)
                return true;

            return false;
        });

        mapListGlitch = _.sortBy(mapListGlitch, ['name']);

        return [
            { name: "--- Normal Maps ---", ind: 0x100, disable: true },
            ...mapListNormal,
            { name: "--- Glitch Maps ---", ind: 0x100, disable: true },
            ...mapListGlitch
        ];
    }

    trackByFn(index: number) {
        return index;
    }
}
