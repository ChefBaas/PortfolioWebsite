import { Vector2 } from "../../shared/Vector2";
import { Shape } from "./shape"

export class RectShape extends Shape
{
    size:Vector2;
    color:string;

    constructor(position:Vector2, size:Vector2, color:string)
    {
        super(position);
        this.size = size;
        this.color = color;
    }

    override getWidth(): number 
    {
        return this.size.x;    
    }

    override updatePosition(x: number, y: number): void 
    {
        this.position.x = x;
        this.position.y = y;    
    }
}