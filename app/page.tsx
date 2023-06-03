'use client'

import dynamic from 'next/dynamic'
import p5Types from "p5";
import Piece from "@/app/components/piece";
import Dice from "@/app/components/Dice";
import {useState} from "react";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

export default function Home() {
    let x = 50;
    let y = 50;
    const colors: string[] = ["red", "blue", "yellow", "green"];

    let width: number = 300;

    let diceValue: number = 0;
    let rolled: boolean = false;
    const handleDiceValue = (data: number) => {
        diceValue = data;
        rolled = true;
    }

    let turn: number = 0; // 0 = red, 1 = blue, 2 = yellow, 3 = green

    const board: number[][] = [
        [-1, -1, -1, -1, -1, -1, 10, 11, 12, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 9, -1, 13, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 8, -1, 14, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 7, -1, 15, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 6, -1, 16, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 5, -1, 17, -1, -1, -1, -1, -1, -1],
        [51, 0, 1, 2, 3, 4, -1, -1, -1, 18, 19, 20, 21, 22, 23],
        [50, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24],
        [49, 48, 47, 46, 45, 44, -1, -1, -1, 30, 29, 28, 27, 26, 25],
        [-1, -1, -1, -1, -1, -1, 43, -1, 31, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 42, -1, 32, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 41, -1, 33, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 40, -1, 34, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 39, -1, 35, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, 38, 37, 36, -1, -1, -1, -1, -1, -1]];


    const pieces: Piece[][] = [[], [], [], []];

    const preload = (p5: p5Types) => {

    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(750, 750).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(255);
        let space = p5.width - width * 2;

        // Draw the board
        {
            p5.noStroke();

            p5.fill(100, 149, 237);
            p5.rect(width, p5.height - space * 2 / 3, space * 2 / 3, space / 3)
            p5.rect(width + space / 3, space * 3, space / 3, space * 5 / 3)

            p5.fill(80, 200, 120);
            p5.rect(width + space / 3, space / 3, space * 2 / 3, space / 3)
            p5.rect(width + space / 3, space * 2 / 3, space / 3, space * 5 / 3)

            p5.fill(210, 43, 43);
            p5.rect(space / 3, width + space / 3, space * 5 / 3, space / 3)
            p5.rect(space / 3, width, space / 3, space * 2 / 3)

            p5.fill(250, 218, 94);
            p5.rect(p5.width - width, width + space / 3, space * 5 / 3, space / 3)
            p5.rect(p5.width - space * 2 / 3, width + space / 3, space / 3, space * 2 / 3)

            p5.stroke(100);
            p5.strokeWeight(0.5);

            for (let i = 0; i < 15; i++) {
                p5.line(0, i * space / 3, p5.width, i * space / 3)
                p5.line(i * space / 3, 0, i * space / 3, p5.height)
            }

            p5.noStroke();

            for (let i = 0; i < 2; i++) {
                i === 0 ? p5.fill(210, 43, 43) : p5.fill(100, 149, 237);
                p5.rect(0, i * (p5.height - width), width, width);
                for (let j = 0; j < 2; j++) {
                    p5.fill(255)
                    p5.circle(width / 4, i * (p5.height - width) + width / 4 + j * width / 2, width / 4)
                    p5.circle(width / 4 + width / 2, i * (p5.height - width) + width / 4 + j * width / 2, width / 4)
                }
                i === 0 ? p5.fill(80, 200, 120) : p5.fill(250, 218, 94)
                p5.rect(p5.width - width, i * (p5.height - width), width, width)
                for (let j = 0; j < 2; j++) {
                    p5.fill(255)
                    p5.circle(p5.width - width * 0.75, i * (p5.height - width) + width / 4 + j * width / 2, width / 4)
                    p5.circle(p5.width - width / 4, i * (p5.height - width) + width / 4 + j * width / 2, width / 4)
                }
            }
        }

        //Draw the triangles
        {
            p5.fill(80, 200, 120);
            p5.triangle(width, width, p5.width - width, width, p5.width / 2, p5.height / 2)

            p5.fill(210, 43, 43);
            p5.triangle(width, width, width, p5.height - width, p5.width / 2, p5.height / 2)

            p5.fill(250, 218, 94);
            p5.triangle(p5.width - width, width, p5.width - width, p5.height - width, p5.width / 2, p5.height / 2)

            p5.fill(100, 149, 237);
            p5.triangle(width, p5.height - width, p5.width - width, p5.height - width, p5.width / 2, p5.height / 2)
        }

        // Draw the pieces
        {
            for (let i = 0; i < 4; i++) {
                let piece = new Piece((i % 2 == 0 ? 1 : 4), (i < 2 ? 1 : 4), [215, 40, 40], colors[0]);
                pieces[0].push(piece);
            }

            for (let i = 0; i < 4; i++) {
                let piece = new Piece((i % 2 == 0 ? 1 : 4), (i < 2 ? 10 : 13), [96, 144, 250], colors[1]);
                pieces[1].push(piece);
            }

            for (let i = 0; i < 4; i++) {
                let piece = new Piece((i % 2 == 0 ? 10 : 13), (i < 2 ? 1 : 4), [70, 220, 110], colors[3]);
                pieces[3].push(piece);
            }

            for (let i = 0; i < 4; i++) {
                let piece = new Piece((i % 2 == 0 ? 10 : 13), (i < 2 ? 10 : 13), [255, 223, 84], colors[2]);
                pieces[2].push(piece);
            }

            for (let i = 0; i < pieces.length; i++) {
                pieces[0][i].display(p5);
                pieces[1][i].display(p5);
                pieces[2][i].display(p5);
                pieces[3][i].display(p5);
            }
        }

        // Handle dice change
        {
            if (rolled) {
                if (turn == 0) {
                    if (diceValue != 0) {
                        turn = 1;
                        if (diceValue == 6) {
                            pieces[0][0].move(diceValue, board, pieces);
                            turn = 0;
                        } else {
                            pieces[0][0].move(diceValue, board, pieces);
                        }

                    }
                } else if (turn == 1) {
                    if (diceValue != 0) {
                        turn = 2;
                        if (diceValue == 6) {
                            pieces[1][0].move(diceValue, board, pieces);
                            turn = 1;
                        } else {
                            pieces[1][0].move(diceValue, board, pieces);
                        }
                    }
                } else if (turn == 2) {
                    if (diceValue != 0) {
                        turn = 3;
                        if (diceValue == 6) {
                            pieces[2][0].move(diceValue, board, pieces);
                            turn = 2;
                        } else {
                            pieces[2][0].move(diceValue, board, pieces);
                        }
                    }
                } else if (turn == 3) {
                    if (diceValue != 0) {
                        turn = 0;
                        if (diceValue == 6) {
                            pieces[3][0].move(diceValue, board, pieces);
                            turn = 3;
                        } else {
                            pieces[3][0].move(diceValue, board, pieces);
                        }
                    }
                }
                console.log("Turn: " + colors[turn]);
                rolled = false;
            }
        }
    };

    return (
        <div className={"w-screen h-screen flex justify-center items-center bg-slate-800 gap-10"}>
            <div className={"w-min h-min rounded-2xl overflow-clip"}>
                <Sketch preload={preload} setup={setup} draw={draw} />
            </div>
            <Dice sides={6} setData={handleDiceValue} />
        </div>
    )
}
