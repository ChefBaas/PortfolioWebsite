import { Vector2 } from "../../shared/Vector2";

export abstract class Shape
{
    position:Vector2;

    constructor(position:Vector2)
    {
        this.position = position;
    }

    abstract getWidth():number;
    abstract updatePosition(x:number, y:number):void;
}