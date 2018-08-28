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
import { scripts } from '../../data/scripts';

@Component({
    selector: 'screen-world-scripts',
    templateUrl: './world-scripts.component.pug',
    styleUrls: ['./world-scripts.component.scss'],
})
export class WorldScriptsComponent implements OnInit {

    constructor(
        public fileService: SaveFileService,
    ) { }

    ngOnInit() {

    }

    get scripts() {
        return scripts;
    }
}