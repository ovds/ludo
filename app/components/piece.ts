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
        p.beginShape();
        p.vertex(this.x + 25, this.y + 10);
        p.vertex(this.x + 40, this.y + 40);
        p.vertex(this.x + 10, this.y + 40);
        p.endShape(p.CLOSE);
    }
}