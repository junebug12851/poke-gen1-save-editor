import { MapService } from './../../data/map.service';
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

import { Component } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

@Component({
    selector: 'screen-area-warps',
    templateUrl: './area-warps.component.pug',
    styleUrls: ['./area-warps.component.scss'],
})
export class AreaWarpsComponent {

    constructor(
        public fileService: SaveFileService,
        public mapService: MapService
    ) { }

    get warpPoints() {
        return this.fileService.fileDataExpanded.area.warpData;
    }

    addListItem() {
        this.fileService.fileDataExpanded.area.warpData.push({
            y: 0,
            x: 0,
            destWarp: 0,
            destMap: 0,
        });
    }

    remListItem(index: number) {
        this.fileService.fileDataExpanded.area.warpData.splice(index, 1);
    }

    trackByFn(index: number) {
        return index;
    }
}
