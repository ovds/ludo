import dynamic from "next/dynamic";
import p5Types from "p5";

export default class Piece {
    private x: number;
    private y: number;
    private color: Array<number>;
    private size: number = 50;
    constructor(x: number, y: number, color: Array<number>) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    move(n: number) {
        //add logic for moving
    }

    display(p: p5Types) {
        p.fill(this.color[0], this.color[1], this.color[2]);
        p.stroke(0);
        p.rect(this.x, this.y, this.size, this.size);
    }
}