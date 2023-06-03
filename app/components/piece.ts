import dynamic from "next/dynamic";
import p5Types from "p5";

export default class Piece {
    private x: number;
    private y: number;
    private readonly color: Array<number>;
    private size: number = 50;
    private offset: number = 0;
    private place = -1;
    private isOut = false;
    private readonly colour: string;
    constructor(x: number, y: number, color: Array<number>, colour: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.colour = colour;
    }

    move(n: number, board: number[][], pieces: Piece[][]) {
        if (this.place == -1 && n == 6) { // if piece is not on board and 6 is rolled
            if (this.colour == "red") {
                this.place = 0;
                for (let i = 0; i < 15; i++) {
                    for (let j = 0; j < 15; j++) {
                        if (board[i][j] == 0) {
                            this.x = j;
                            this.y = i;
                        }
                    }
                }
            }
            else if (this.colour == "blue") {
                this.place = 39;
                for (let i = 0; i < 15; i++) {
                    for (let j = 0; j < 15; j++) {
                        if (board[i][j] == 39) {
                            this.x = j;
                            this.y = i;
                        }
                    }
                }
            }
            else if (this.colour == "yellow") {
                this.place = 26;
                for (let i = 0; i < 15; i++) {
                    for (let j = 0; j < 15; j++) {
                        if (board[i][j] == 26) {
                            this.x = j;
                            this.y = i;
                        }
                    }
                }
            }
            else if (this.colour == "green") {
                this.place = 13;
                for (let i = 0; i < 15; i++) {
                    for (let j = 0; j < 15; j++) {
                        if (board[i][j] == 13) {
                            this.x = j;
                            this.y = i;
                        }
                    }
                }
            }
        } else if (this.place != -1) { // if piece is on board
            this.place += n;
            if (this.place > 51) this.place -= 52;
            /*for (let i = 0; i < pieces.length; i++) {
                for (let j = 0; j < pieces[i].length; j++) {
                    if (pieces[i][j].place == this.place && pieces[i][j].colour != this.colour) { // if piece is on same place as another piece and is not the same colour, TODO: add logic for safe spaces
                        pieces[i][j].place = -1;
                        if (pieces[i][j].colour == "red") {
                            pieces[i][j].x = 1;
                            pieces[i][j].y = 4;
                        } else if (pieces[i][j].colour == "blue") {
                            pieces[i][j].x = 10;
                            pieces[i][j].y = 1;
                        } else if (pieces[i][j].colour == "yellow") {
                            pieces[i][j].x = 10;
                            pieces[i][j].y = 10;
                        } else if (pieces[i][j].colour == "green") {
                            pieces[i][j].x = 10;
                            pieces[i][j].y = 1;
                        }
                    } else if (pieces[i][j].place == this.place && pieces[i][j].colour == this.colour) {
                        this.offset = 10;
                        pieces[i][j].setOffset(-this.offset);
                    }
                }
            }*/
            for (let i = 0; i < 15; i++) {
                for (let j = 0; j < 15; j++) {
                    if (board[i][j] == this.place) {
                        this.x = j;
                        this.y = i;
                    }
                }
            }
        }
    }

    display(p: p5Types) {
        p.fill(this.color[0], this.color[1], this.color[2]);
        p.strokeWeight(1)
        p.stroke(100)
        p.beginShape();
        p.vertex(this.x * 50 + 25 + this.offset, this.y * 50 + this.size/5);
        p.vertex(this.x * 50 + 40 + this.offset, this.y * 50 + 40);
        p.vertex(this.x * 50 + 10 + this.offset, this.y * 50 + 40);
        p.endShape(p.CLOSE);
        p.noStroke()
    }

    setOffset(offset: number) {
        this.offset = offset;
    }
}