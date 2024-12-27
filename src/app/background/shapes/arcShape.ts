import { inject } from "@angular/core";
import { ColorsService } from "../../shared/colors.service";
import { Vector2 } from "../../shared/Vector2";
import { Shape } from "./shape";

export class ArcShape extends Shape
{
    radius:number;
    startAngle:number;
    endAngle:number;
    color:string;

    constructor(radius:number, startAngle:number, endAngle:number, position:Vector2, color:string)
    {
        super(position);
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.color = color;
    }

    override getWidth(): number 
    {
        return this.radius * 2;
    }

    override updatePosition(x: number, y: number): void
    {
        this.position.x = x;
        this.position.y = y;
    }
}