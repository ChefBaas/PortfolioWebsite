import { Vector2 } from "../../shared/Vector2";
import { Ball, BallData } from "../ball";

export class ImageShape extends Ball
{
    image:HTMLImageElement;
    rect:DOMRect;

    constructor(ballData:BallData, image:HTMLImageElement, rect:DOMRect)
    {
        super(ballData, "red");
        this.image = image;
        this.rect = rect;
    }

    override getWidth(): number 
    {
        return this.image.width;
    }

    override updatePosition(x: number, y: number): void 
    {
        this.position.x = x;
        this.position.y = y;
    }
}