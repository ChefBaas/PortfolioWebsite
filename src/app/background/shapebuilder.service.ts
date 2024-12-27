import { inject, Injectable } from "@angular/core";
import { ArcShape } from "./shapes/arcShape";
import { Shape } from "./shapes/shape";
import { Vector2 } from "../shared/Vector2";
import { RectShape } from "./shapes/rectShape";
import { TriangleShape } from "./shapes/triangleShape";
import { ColorsService } from "../shared/colors.service";

@Injectable({
    providedIn:'root'
})
export class ShapeBuilderService
{
    colorsService:ColorsService = inject(ColorsService);

    gapSizeRatio:number = 0.2;
    spaceSizeRatio:number = 0.75;
    lineSizeRatio:number = 0.15;
    letterWidthRatios:number[] = [
        0.75,   //a
        0.6875, //b
        0.75,   //c
        0.75,   //d
        0.75,   //e
        0.75,   //f
        1,      //g
        0.75,   //h
        0.25,   //i
        0.75,   //j
        0.75,   //k
        0.75,   //l
        0.75,   //m
        0.75,   //n
        1,      //o
        0.5,    //p
        0.5,    //q
        0.75,   //r
        0.6,   //s
        0.5,    //t
        0.75,   //u
        0.75,   //v
        0.75,   //w
        0.75,   //x
        0.75,   //y
        0.75    //z
    ]
    letters:string[] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i', 
        'j', 
        'k', 
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ]

    buildLetter(letter:string, position:Vector2, letterHeight:number):Shape[]
    {
        let br:Vector2 = this.br(letter, position, letterHeight);
        let tr:Vector2 = this.tr(letter, position, letterHeight);
        let tl:Vector2 = this.tl(letter, position, letterHeight);
        let bl:Vector2 = this.bl(letter, position, letterHeight);
        let lineSizeRatio:number = this.lineSizeRatio * letterHeight;
        switch(letter)
        {
            case 'b':
                let arcCoverageB = letterHeight - 3 * lineSizeRatio;
                let rndB1 = this.colorsService.getRandomColor();
                let rndB2 = this.colorsService.getRandomColor();
                let bShape1:ArcShape = new ArcShape(arcCoverageB * 0.25, 0, Math.PI * 2, new Vector2(tl.x + lineSizeRatio + arcCoverageB * 0.5, tl.y + lineSizeRatio + arcCoverageB * 0.25), rndB1);
                let bShape2:RectShape = new RectShape(new Vector2(tl.x + lineSizeRatio + arcCoverageB * 0.25, tl.y + lineSizeRatio + arcCoverageB * 0.25), new Vector2(arcCoverageB * 0.5, arcCoverageB * 0.5), rndB1);
                let bShape3:ArcShape = new ArcShape(arcCoverageB * 0.25, 0, Math.PI * 2, new Vector2(bl.x + lineSizeRatio + arcCoverageB * 0.5, bl.y - lineSizeRatio - arcCoverageB * 0.25), rndB2);
                let bShape4:RectShape = new RectShape(new Vector2(bl.x + lineSizeRatio + arcCoverageB * 0.25, bl.y - lineSizeRatio - arcCoverageB * 0.25), new Vector2(arcCoverageB * 0.5, arcCoverageB * 0.5), rndB2);
                return [bShape1, bShape2, bShape3, bShape4];

            case 'i':
                let iShape:RectShape = new RectShape(new Vector2(position.x, position.y), new Vector2(lineSizeRatio, letterHeight), this.colorsService.getRandomColor());
                return [iShape];

            case 'j':
                let shapeWidthJ:number = this.getLetterWidth(letter, letterHeight) - 2 * lineSizeRatio;
                let rndJ = this.colorsService.getRandomColor();
                let jShape1 = new ArcShape(shapeWidthJ * 0.5, 0, Math.PI * 2, new Vector2(position.x, bl.y - lineSizeRatio - shapeWidthJ * 0.5), rndJ);
                let jShape2 = new RectShape(new Vector2(position.x - lineSizeRatio * 0.5, tl.y + (jShape1.position.y - tl.y) * 0.5), new Vector2(shapeWidthJ + lineSizeRatio, letterHeight - lineSizeRatio - jShape1.radius), rndJ);
                return [jShape1, jShape2];

            case 'm':
                let m1:Vector2 = new Vector2(tl.x + lineSizeRatio, tl.y);
                let m2:Vector2 = new Vector2(tr.x - lineSizeRatio, tl.y);
                let m3:Vector2 = new Vector2(position.x, position.y - lineSizeRatio);
                let mShape1:TriangleShape = new TriangleShape(new Vector2(position.x, position.y), m1, m2, m3, this.colorsService.getRandomColor());

                let rndM1 = this.colorsService.getRandomColor();
                let m4:Vector2 = new Vector2(bl.x + lineSizeRatio, bl.y);
                let m5:Vector2 = new Vector2(br.x - lineSizeRatio, br.y);
                let m6:Vector2 = new Vector2(tl.x + lineSizeRatio, tl.y + lineSizeRatio * 2);
                let mShape2:TriangleShape = new TriangleShape(new Vector2(position.x, position.y), m4, m5, m6, rndM1);

                let m7:Vector2 = new Vector2(br.x - lineSizeRatio, br.y);
                let m8:Vector2 = new Vector2(bl.x + lineSizeRatio, bl.y);
                let m9:Vector2 = new Vector2(tr.x - lineSizeRatio, tr.y + lineSizeRatio * 2);
                let mShape3:TriangleShape = new TriangleShape(new Vector2(position.x, position.y), m7, m8, m9, rndM1);

                return [mShape1, mShape2, mShape3];

            case 'n':
                let n1:Vector2 = new Vector2(bl.x + lineSizeRatio, bl.y);
                let n2:Vector2 = new Vector2(n1.x, tl.y + lineSizeRatio * 2);
                let n3:Vector2 = new Vector2(br.x - lineSizeRatio, n1.y);
                let nShape1:TriangleShape = new TriangleShape(new Vector2(position.x, position.y), n1, n2, n3, this.colorsService.getRandomColor());

                let n4:Vector2 = new Vector2(tr.x - lineSizeRatio, tr.y);
                let n5:Vector2 = new Vector2(n4.x, br.y - lineSizeRatio * 2);
                let n6:Vector2 = new Vector2(n1.x, n4.y);
                let nShape2:TriangleShape = new TriangleShape(new Vector2(position.x, position.y), n4, n5, n6, this.colorsService.getRandomColor());

                return [nShape1, nShape2];

            case 'o':
            default:
                let oShape = new ArcShape((letterHeight - lineSizeRatio) / 2, 0, Math.PI * 2, new Vector2(position.x, position.y), this.colorsService.getRandomColor());
                return [oShape];

            case 's':
                let sShape1 = new ArcShape(letterHeight * 0.25, Math.PI * 0.5, Math.PI * 1.5, new Vector2(tl.x + letterHeight * 0.25, tl.y + letterHeight * 0.25), this.colorsService.getRandomColor());
                // let sShape2 = new ArcShape(letterHeight * 0.16, 0, Math.PI * 2, new Vector2(tr.x - letterHeight * 0.16, tr.y + letterHeight * 0.16), this.colorsService.getRandomColor());
                // let sShape3 = new ArcShape(letterHeight * 0.16, 0, Math.PI * 2, new Vector2(bl.x + letterHeight * 0.16, bl.y - letterHeight * 0.16), this.colorsService.getRandomColor());
                let sShape4 = new ArcShape(letterHeight * 0.25, Math.PI * 1.5, Math.PI * 0.5, new Vector2(br.x - letterHeight * 0.25, br.y - letterHeight * 0.25), this.colorsService.getRandomColor());
                return [sShape1, sShape4];

            case 'u':
                let shapeWidthU:number = this.getLetterWidth(letter, letterHeight) - 2 * lineSizeRatio;
                let rndU = this.colorsService.getRandomColor();
                let uShape1 = new ArcShape(shapeWidthU * 0.5, 0, Math.PI * 2, new Vector2(position.x, bl.y - lineSizeRatio - shapeWidthU * 0.5), rndU);
                let uShape2 = new RectShape(new Vector2(position.x, tl.y + (uShape1.position.y - tl.y) * 0.5), new Vector2(shapeWidthU, letterHeight - lineSizeRatio - uShape1.radius), rndU);
                return [uShape1, uShape2];
        }
    }

    buildWord(word:string, letterHeight:number, position:Vector2):Shape[]
    {
        let currentPosition:Vector2 = new Vector2(position.x, position.y);
        let letters:Shape[] = [];
        for (let i:number = 0; i < word.length; i++)
        {
            if (word[i] == ' ')
            {
                currentPosition.x += this.spaceSizeRatio * letterHeight;
            }
            else
            {
                this.moveCursorHalfLetterSize(currentPosition, word[i], letterHeight);
                let shapes:Shape[] = this.buildLetter(word[i], new Vector2(currentPosition.x, currentPosition.y), letterHeight);
                letters = letters.concat(shapes);
                this.moveCursorHalfLetterSize(currentPosition, word[i], letterHeight);
                currentPosition.x += this.gapSizeRatio * letterHeight;
            }
        }
        return letters;
    }

    private moveCursorHalfLetterSize(cursorPosition:Vector2, letter:string, letterHeight:number):void
    {
        cursorPosition.x += letterHeight * this.letterWidthRatios[this.letters.indexOf(letter)] * 0.5;
    }

    private br(letter:string, position:Vector2, letterHeight:number):Vector2
    {
        return new Vector2(position.x + letterHeight * this.letterWidthRatios[this.letters.indexOf(letter)] * 0.5, position.y + letterHeight * 0.5);
    }

    private bl(letter:string, position:Vector2, letterHeight:number):Vector2
    {
        return new Vector2(position.x - letterHeight * this.letterWidthRatios[this.letters.indexOf(letter)] * 0.5, position.y + letterHeight * 0.5);
    }

    private tl(letter:string, position:Vector2, letterHeight:number):Vector2
    {
        return new Vector2(position.x - letterHeight * this.letterWidthRatios[this.letters.indexOf(letter)] * 0.5, position.y - letterHeight * 0.5);
    }

    private tr(letter:string, position:Vector2, letterHeight:number):Vector2
    {
        return new Vector2(position.x + letterHeight * this.letterWidthRatios[this.letters.indexOf(letter)] * 0.5, position.y - letterHeight * 0.5);
    }

    getLetterWidth(letter:string, letterHeight:number):number
    {
        return letterHeight * this.letterWidthRatios[this.letters.indexOf(letter)];
    }

    getWordWidth(word:string, letterHeight:number):number
    {
        let result:number = 0;

        for (let i:number = 0; i < word.length; i++)
        {
            if (word[i] == ' ')
            {
                result += this.spaceSizeRatio * letterHeight;
            }
            else
            {
                result += this.getLetterWidth(word[i], letterHeight);
            }

            if (i != word.length - 1)
            {
                result += this.gapSizeRatio * letterHeight;
            }
        }

        return result;
    }
}