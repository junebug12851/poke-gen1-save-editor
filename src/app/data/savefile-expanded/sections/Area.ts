import { MapConnData } from './../fragments/MapConnData';
import { SignData } from '../fragments/SignData';
import { SaveFileService } from '../../savefile.service';

export interface WildPokemon {
    level: number,
    pokemon: number,
};

export class Area {
    constructor(saveFile: SaveFileService) {
        const curMap = saveFile.getByte(0x260A).toString(16).padStart(2, "0").toUpperCase();
        const mapHeight = saveFile.getByte(0x2614).toString().padStart(2, "0");
        const mapWidth = saveFile.getByte(0x2615).toString().padStart(2, "0");
        const mapDataPtr = saveFile.getWord(0x2616, true).toString(16).padStart(4, "0").toUpperCase();
        const mapTextPtr = saveFile.getWord(0x2618, true).toString(16).padStart(4, "0").toUpperCase();
        const mapScriptPtr = saveFile.getWord(0x261A, true).toString(16).padStart(4, "0").toUpperCase();
        const map2x2Height = saveFile.getByte(0x27D0).toString().padStart(2, "0");
        const map2x2Width = saveFile.getByte(0x27D1).toString().padStart(2, "0");

        this.curMap = `${curMap}_${mapHeight}_${mapWidth}_${map2x2Height}_${map2x2Width}_${mapDataPtr}_${mapTextPtr}_${mapScriptPtr}`;


        this.currentTileBlockMapViewPointer = saveFile.getWord(0x260B, true).toString(16).padStart(2, "0").toUpperCase();
        this.yCoord = saveFile.getByte(0x260D);
        this.xCoord = saveFile.getByte(0x260E);
        this.yBlockCoord = saveFile.getByte(0x260F);
        this.xBlockCoord = saveFile.getByte(0x2610);

        this.mapConn = {
            east: saveFile.getBit(0x261C, 1, 0),
            west: saveFile.getBit(0x261C, 1, 1),
            south: saveFile.getBit(0x261C, 1, 2),
            north: saveFile.getBit(0x261C, 1, 3),
        };

        // @ts-ignore
        this.mapConnData = {};

        if (this.mapConn.north)
            this.mapConnData.north = new MapConnData(saveFile, 0x261D);
        else
            // @ts-ignore
            this.mapConnData.north = MapConnData.empty;

        if (this.mapConn.south)
            this.mapConnData.south = new MapConnData(saveFile, 0x2628);
        else
            // @ts-ignore
            this.mapConnData.south = MapConnData.empty;

        if (this.mapConn.west)
            this.mapConnData.west = new MapConnData(saveFile, 0x2633);
        else
            // @ts-ignore
            this.mapConnData.west = MapConnData.empty;

        if (this.mapConn.east)
            this.mapConnData.east = new MapConnData(saveFile, 0x263E);
        else
            // @ts-ignore
            this.mapConnData.east = MapConnData.empty;

        this.signData = [];
        for (let i = 0; i < saveFile.getByte(0x275C) && i < 16; i++) {
            this.signData.push(new SignData(saveFile, i));
        }

        this.yOffsetSinceLastSpecialWarp = saveFile.getByte(0x278E);
        this.xOffsetSinceLastSpecialWarp = saveFile.getByte(0x278F);
        this.mapViewVRAMPointer = saveFile.getWord(0x27D2, true).toString(16).padStart(2, "0").toUpperCase();
        this.playerMoveDir = saveFile.getByte(0x27D4);
        this.playerLastStopDir = saveFile.getByte(0x27D5);
        this.playerCurDir = saveFile.getByte(0x27D6);
        this.walkBikeSurf = saveFile.getByte(0x29AC);
        this.safariSteps = saveFile.getWord(0x29B9);
        this.playerJumpingYScrnCoords = saveFile.getByte(0x29C0);
        this.strengthOutsideBattle = saveFile.getBit(0x29D4, 1, 0);
        this.surfingAllowed = saveFile.getBit(0x29D4, 1, 1);
        this.usedCardKey = saveFile.getBit(0x29D4, 1, 7);
        this.pauseWildEncounters3Steps = saveFile.getBit(0x29D8, 1, 0);
        this.tradeCenterSpritesFaced = saveFile.getBit(0x29D9, 1, 0);
        this.npcsFaceAway = saveFile.getBit(0x29D9, 1, 5);
        this.isBattle = saveFile.getBit(0x29D9, 1, 6);
        this.isTrainerBattle = saveFile.getBit(0x29D9, 1, 7);
        this.noBattles = saveFile.getBit(0x29DA, 1, 4);
        this.battleEndedOrBlackout = saveFile.getBit(0x29DA, 1, 5);
        this.usingLinkCable = saveFile.getBit(0x29DA, 1, 6);
        this.scriptedNPCMovement = saveFile.getBit(0x29DA, 1, 7);
        this.npcSpriteMovement = saveFile.getBit(0x29DC, 1, 0);
        this.ignoreJoypad = saveFile.getBit(0x29DC, 1, 5);
        this.joypadSimulation = saveFile.getBit(0x29DC, 1, 7);
        this.forceBikeRide = saveFile.getBit(0x29DE, 1, 5);
        this.blackoutDest = saveFile.getBit(0x29DE, 1, 6);
        this.runningTestBattle = saveFile.getBit(0x29DF, 1, 0);
        this.trainerWantsBattle = saveFile.getBit(0x29DF, 1, 3);
        this.curMapNextFrame = saveFile.getBit(0x29DF, 1, 4);
        this.flyOutofBattle = saveFile.getBit(0x29DF, 1, 7);
        this.standingOnDoor = saveFile.getBit(0x29E2, 1, 0);
        this.movingThroughDoor = saveFile.getBit(0x29E2, 1, 1);
        this.standingOnWarp = saveFile.getBit(0x29E2, 1, 2);
        this.finalLedgeJumping = saveFile.getBit(0x29E2, 1, 6);
        this.spinPlayer = saveFile.getBit(0x29E2, 1, 7);
        this.cardKeyDoorY = saveFile.getByte(0x29EB);
        this.cardKeyDoorX = saveFile.getByte(0x29EC);
        this.firstTrashcanLock = saveFile.getByte(0x29EF);
        this.secondTrashcanLock = saveFile.getByte(0x29F0);

        this.grassRate = saveFile.getByte(0x2B33);
        const grassPokemon = saveFile.getRange(0x2B34, 20);

        this.grassPokemon = [];
        //if (gr > 0) // Unverified
        for (let i = 0; i < 20; i += 2) {

            // List ends with 0x00 or until 10 is reached
            // Unverified
            // if (grassPokemon[i] == 0x00 || grassPokemon[i + 1] == 0x00)
            //     break;

            // Add Grass Pokemon
            this.grassPokemon.push({
                level: grassPokemon[i],
                pokemon: grassPokemon[i + 1],
            });
        }

        this.waterPokemonRate = saveFile.getByte(0x2B50);
        const waterPokemon = saveFile.getRange(0x2B51, 20);

        this.waterPokemon = [];
        //if (wr > 0) // Unverified
        for (let i = 0; i < 20; i += 2) {

            // List ends with 0x00 or until 10 is reached
            // Unverified
            // if (waterPokemon[i] == 0x00 || waterPokemon[i + 1] == 0x00)
            //     break;

            // Add Water Pokemon
            this.waterPokemon.push({
                level: waterPokemon[i],
                pokemon: waterPokemon[i + 1],
            });
        }

        this.trainerHeaderPtr = saveFile.getHex(0x2CDC, 0x2, false, true);
        this.oppAfterWrongAnsw = saveFile.getByte(0x2CE4);
        this.curMapScript = saveFile.getByte(0x2CE5);
        this.safariGameOver = saveFile.getByte(0x2CF2) == 1;
        this.safariBallCount = saveFile.getByte(0x2CF3);
    }

    // Signs
    public signData: SignData[];

    /**
     * Player (Complete)
    */

    // Direction
    // if the player is moving, the current direction
    // if the player is not moving, zero
    // None     0
    // Right    1
    // Left     2
    // Down     4
    // Up       8
    public playerMoveDir: number;

    // the direction in which the player was moving before the player last stopped
    public playerLastStopDir: number;

    // if the player is moving, the current direction
    // if the player is not moving, the last the direction in which the player moved
    public playerCurDir: number;

    // Coords
    public yCoord: number;
    public xCoord: number;
    public yBlockCoord: number;
    public xBlockCoord: number;
    public playerJumpingYScrnCoords: number;

    // Safari
    public safariGameOver: boolean;
    public safariBallCount: number;
    public safariSteps: number;

    // HMs
    public strengthOutsideBattle: boolean;
    public surfingAllowed: boolean;
    public flyOutofBattle: boolean;

    // Battle
    public isBattle: boolean;
    public isTrainerBattle: boolean;
    public noBattles: boolean;
    public battleEndedOrBlackout: boolean;

    // Warps
    public yOffsetSinceLastSpecialWarp: number;
    public xOffsetSinceLastSpecialWarp: number;
    public standingOnDoor: boolean;
    public movingThroughDoor: boolean;
    public standingOnWarp: boolean;

    // Misc

    // 0x00 = walking
    // 0x01 = biking
    // 0x02 = surfing
    public walkBikeSurf: number;
    public finalLedgeJumping: boolean;
    public spinPlayer: boolean;
    public usedCardKey: boolean;
    public usingLinkCable: boolean;

    /**
     * Map
     */

    // Area In
    public curMap: string;

    // pointer to the upper left corner of the current view in the tile block map
    public currentTileBlockMapViewPointer: string;

    // the address of the upper left corner of the visible portion of the BG tile map in VRAM
    public mapViewVRAMPointer: string;

    // index of current map script, mostly used as index for function pointer array
    // mostly copied from map - specific map script pointer and written back later
    public curMapScript: number;

    // use variable "Current Map Script" instead of the index for next frame's
    // map script
    public curMapNextFrame: boolean;

    // Area Around
    public mapConn: {
        east: boolean,
        west: boolean,
        south: boolean,
        north: boolean,
    };
    public mapConnData: {
        north: MapConnData,
        south: MapConnData,
        west: MapConnData,
        east: MapConnData,
    };

    // Misc
    public forceBikeRide: boolean;

    // Map destination is last blackout map
    public blackoutDest: boolean;
    public cardKeyDoorY: number;
    public cardKeyDoorX: number;

    /**
     * NPC
     */

    // Sprites
    public npcsFaceAway: boolean;
    public scriptedNPCMovement: boolean;
    public npcSpriteMovement: boolean;
    public tradeCenterSpritesFaced: boolean;

    // Controls
    public ignoreJoypad: boolean;
    public joypadSimulation: boolean;

    // Battle
    public runningTestBattle: boolean;
    public trainerWantsBattle: boolean;
    public trainerHeaderPtr: string;

    /**
     * Pokemon
     *
     * Rate is how likely to encounter Pokemon
     * higher number = higher chance
     * A rate of 0 means no wild pokemon on map
     *
     * The Pokemon list is in order from most common to most rare
     * Pokemon 0: 19.9% chance
     * Pokemon 1: 19.9% chance
     * Pokemon 2: 15.2% chance
     * Pokemon 3: 9.8% chance
     * Pokemon 4: 9.8% chance
     * Pokemon 5: 9.8% chance
     * Pokemon 6: 5.1% chance
     * Pokemon 7: 5.1% chance
     * Pokemon 8: 4.3% chance
     * Pokemon 9: 1.2% chance
     */
    public grassRate: number;
    public grassPokemon: WildPokemon[];
    public waterPokemonRate: number;
    public waterPokemon: WildPokemon[];
    public pauseWildEncounters3Steps: boolean;

    // Puzzle
    public firstTrashcanLock: number;
    public secondTrashcanLock: number;
    public oppAfterWrongAnsw: number;
}
