'use client'

import dynamic from 'next/dynamic'
import p5Types from "p5";
import Piece from "@/app/components/piece"; //Import this for typechecking and intellisense

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

export default function Home() {
    let x = 50;
    let y = 50;

    let width: number = 300;

    const preload = (p5: p5Types) => {

    }

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(750, 750).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(255);
        let space = p5.width - width * 2;

        // Draw the board
        p5.noStroke();

        p5.fill(100, 149, 237);
        p5.rect(width, p5.height - space * 2/3, space * 2/3, space/3)
        p5.rect(width + space/3, space * 3, space/3, space * 5/3)

        p5.fill(80, 200, 120);
        p5.rect(width + space/3, space/3, space * 2/3, space/3)
        p5.rect(width + space/3, space * 2/3, space/3, space * 5/3)

        p5.fill(210, 43, 43);
        p5.rect(space/3, width + space/3, space * 5/3, space/3)
        p5.rect(space/3, width, space/3, space * 2/3)

        p5.fill(250, 218, 94);
        p5.rect(p5.width - width, width + space/3, space * 5/3, space/3)
        p5.rect(p5.width - space * 2/3, width + space/3, space/3, space * 2/3)

        p5.stroke(100);
        p5.strokeWeight(0.5);

        for (let i = 0; i < 15; i++) {
            p5.line(0, i * space/3, p5.width, i * space/3)
            p5.line(i * space/3, 0, i * space/3, p5.height)
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
                p5.circle(p5.width - width/4, i * (p5.height - width) + width / 4 + j * width / 2, width / 4)
            }
        }

        p5.fill(80, 200, 120);
        p5.triangle(width, width, p5.width - width, width, p5.width/2, p5.height/2)

        p5.fill(210, 43, 43);
        p5.triangle(width, width, width, p5.height - width, p5.width/2, p5.height/2)

        p5.fill(250, 218, 94);
        p5.triangle(p5.width - width, width, p5.width - width, p5.height - width, p5.width/2, p5.height/2)

        p5.fill(100, 149, 237);
        p5.triangle(width, p5.height - width, p5.width - width, p5.height - width, p5.width/2, p5.height/2)

        // Draw the pieces
        for (let i = 0; i < 4; i++) {
            let piece = new Piece(space/3 + (i % 2 == 0? 0 : space), space/3 + (i < 2? 0 : space), [210, 43, 43]);
            piece.display(p5);
        }

        for (let i = 0; i < 4; i++) {
            let piece = new Piece(space/3 + (i % 2 == 0? 0 : space), space/3 + (i < 2? space + width : space * 2 + width), [100, 149, 237]);
            piece.display(p5);
        }

        for (let i = 0; i < 4; i++) {
            let piece = new Piece(space/3 + (i % 2 == 0? space + width : space * 2 + width), space/3 + (i < 2? 0 : space), [80, 200, 120]);
            piece.display(p5);
        }

        for (let i = 0; i < 4; i++) {
            let piece = new Piece(space/3 + (i % 2 == 0? space + width : space * 2 + width), space/3 + (i < 2? space + width : space * 2 + width), [250, 218, 94]);
            piece.display(p5);
        }
    };

    return (
        <div className={"w-screen h-screen flex justify-center items-center bg-slate-800"}>
            <div className={"w-min h-min rounded-2xl overflow-clip"}>
                <Sketch preload={preload} setup={setup} draw={draw} />
            </div>
        </div>
    )
}
