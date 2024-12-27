import { Vector2 } from "../../shared/Vector2";
import { Shape } from "./shape";

export class TriangleShape extends Shape
{
    a:Vector2;
    b:Vector2;
    c:Vector2;
    color:string;

    constructor(position:Vector2, a:Vector2, b:Vector2, c:Vector2, color:string)
    {
        super(position);
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = color;
    }

    override getWidth(): number 
    {
        return 0;
    }

    override updatePosition(x: number, y: number): void 
    {
        this.a.x += (x - this.position.x);
        this.a.y += (y - this.position.y);
        this.b.x += (x - this.position.x);
        this.b.y += (y - this.position.y);
        this.c.x += (x - this.position.x);
        this.c.y += (y - this.position.y);
    }
}