import _ from "lodash";

type Bonus = "DL" | "TL" | "DW" | "TW";
type Place = {row: number, col: number};

interface Tile {
    isBlank: boolean;
    letter: string;
};

const score: {[letter: string]: number} = {
    "A": 1, "B": 3, "C": 3, "D": 2, "E": 1, "F": 4, "G": 2, "H": 4, "I": 1, "J": 8, "K": 5, "L": 1, "M": 3, "N": 1, "O": 1, "P": 3, "Q": 10, "R": 1, "S": 1, "T": 1, "U": 1, "V": 4, "W": 4, "X": 8, "Y": 4, "Z": 10
};

class Board {
    length: number;
    start: Place;
    bonuses: (Bonus | null)[][];
    tiles: (Tile | null)[][];
    constructor(style: "tiny" | "small" | "standard") {
        switch(style) {
            case "tiny":
                this.length = 9;
                this.start = {row: 4, col: 4};
                this.bonuses = [
                    ["TW", null, null, null, "DL", null, null, null, "TW"],
                    [null, "DW", null, "TL", null, "TL", null, "DW", null],
                    [null, null, null, null, null, null, null, null, null],
                    [null, "TL", null, "DL", null, "DL", null, "TL", null],
                    ["DL", null, null, null, "DW", null, null, null, "DL"],
                    [null, "TL", null, "DL", null, "DL", null, "TL", null],
                    [null, null, null, null, null, null, null, null, null],
                    [null, "DW", null, "TL", null, "TL", null, "DW", null],
                    ["TW", null, null, null, "DL", null, null, null, "TW"],
                ];
                break;
        }
        this.tiles = Array(this.length).fill(null).map(() => Array(this.length).fill(null));
    }
    // Returns whether the place is inside the length*length board
    private IsPlaceValid(place: Place) {
        return place.col >= 0 && place.col < this.length && place.row >= 0 && place.row < this.length;
    }
    TryPlacement(tiles: [Tile, Place][]): string[] {
        const rows = new Set();
        const cols = new Set();
        for (const [tile, {row, col}] of tiles) {
            if (!this.IsPlaceValid({row, col})) {
                // place is outside the board
                return [];
            }
            if (this.tiles[row][col] !== null) {
                // overlapping tiles
                return [];
            }
            rows.add(row);
            cols.add(col);
        }
        if (rows.size > 1 && cols.size > 1) {
            return [];
        }

    }

    // TryPlacement(place: Place, dir: "Row" | "Column", word: string): string[] {
    //     // length must be at least 2
    //     if (word.length < 2) {
    //         return [];
    //     }
    //     if (this.tiles.every(row => row.every(cell => cell === null))) {
    //         // If board is empty
    //         let centerized = false;
    //         [...word].forEach((char, i) => {
    //             const row = this.start.row + (dir === "Column" ? i : 0);
    //             const col = this.start.col + (dir === "Row" ? i : 0);
    //             if (!this.IsPlaceValid({row, col})) {
    //                 return [];
    //             }
    //             if (_.isEqual({row, col}, this.start)) {
    //                 centerized = true;
    //             }
    //         });
    //         if (centerized) {
    //             return [word];
    //         }
    //         else {
    //             return [];
    //         }
    //     }
    //     else {
    //         // if board is not empty
    //         let hasNewTile = false;
    //         let hasConnection = false;
    //         [...word].forEach((char, i) => {
    //             const row = this.start.row + (dir === "Column" ? i : 0);
    //             const col = this.start.col + (dir === "Row" ? i : 0);
    //             if (!this.IsPlaceValid({row, col})) {
    //                 // out of bounds
    //                 return [];
    //             }
    //             const tile = this.tiles[row][col];
    //             if (tile === null) {
    //                 hasNewTile = true;
    //             }
    //             else {
    //                 hasConnection = true;
    //                 if (tile.letter !== char) {
    //                     // tile is incompatible
    //                     return [];
    //                 }
    //             }
    //             [[0, 1], [1, 0], [0, -1], [-1, 0]].forEach(([dr, dc]) => {
    //                 const r = row + dr;
    //                 const c = col + dc;
    //                 if (this.IsPlaceValid({row: r, col: c}) && this.tiles[r][c] !== null) {
    //                     hasConnection = true;
    //                 }
    //             });
    //         });
    //         if (!hasNewTile || !hasConnection) {
    //             return [];
    //         }

    //     }
    // }
};