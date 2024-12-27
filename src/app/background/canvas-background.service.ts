import { ElementRef, inject, Injectable, ViewChild } from "@angular/core";
import { Ball, BallData } from "./ball";
import { Vector2 } from "../shared/Vector2";
import { Shape } from "./shapes/shape";
import { ColorsService } from "../shared/colors.service";
import { ShapeBuilderService } from "./shapebuilder.service";
import { CanvasUtils } from "../shared/CanvasUtils";

@Injectable({
    providedIn:'root'
})
export class CanvasBackgroundService
{
    canvas!:ElementRef<HTMLCanvasElement>;
    context!:CanvasRenderingContext2D | null;

    balls:Ball[] = [];
    nBalls:number = 3;
    canvasDimensions:Vector2 = new Vector2(0,0);
    oldCanvasDimensions:Vector2 = new Vector2(0,0);

    shapeBuilder:ShapeBuilderService = inject(ShapeBuilderService);
    colorsService:ColorsService = inject(ColorsService);
    
    letterShapes:Shape[] = [];
    name:string = "simon buijs";
    nameWidth:number = 0;
    nameHeight:number = 80;

    now:number = 0;
    last:number = 0;
    deltaTime:number = 0;
    count:number = 0;
    frames:number = 0;

    init():void
    {
        // this.last = Date.now();
        this.context = this.canvas.nativeElement.getContext('2d', { alpha: false});
        this.canvasDimensions = this.getCanvasDimensions();
        this.configureBalls();
        this.update();

        this.nameWidth = this.shapeBuilder.getWordWidth(this.name, this.nameHeight);
        console.log(this.canvasDimensions.x / 2 - this.nameWidth / 2);
        this.letterShapes = this.shapeBuilder.buildWord(this.name, this.nameHeight, new Vector2(this.canvasDimensions.x * 0.5 - this.nameWidth * 0.5, 300));
    }

    update():void
    {
        this.canvasDimensions = this.getCanvasDimensions();
        if (this.canvasDimensions.x != this.oldCanvasDimensions.x || this.canvasDimensions.y != this.oldCanvasDimensions.y)
        {
            this.canvas.nativeElement.setAttribute('width', this.canvasDimensions.x + "px");
            this.canvas.nativeElement.setAttribute('height', this.canvasDimensions.y + "px");
        }
        this.now = Date.now();
        this.deltaTime = this.now - this.last;

        // this.reportFrames();

        // BackgroundComponent.deltaTime = Date.now() - this.last;
        if (this.context)
        {
            this.context.clearRect(0, 0, this.canvasDimensions.x, this.canvasDimensions.y);

            CanvasUtils.drawRect(this.context, new Vector2(this.canvasDimensions.x / 2, this.canvasDimensions.y / 2), this.canvasDimensions, 'white');          

            for (let i:number = 0; i < this.balls.length; i++)
            {
                let ball:Ball = this.balls[i];
                CanvasUtils.drawShape(this.context, ball);
                ball.move();

                this.checkEdgeCollisions(ball);

                for (let j:number = i + 1; j < this.balls.length; j++)
                {
                    if (this.balls[i].checkBallCollision(this.balls[j])) 
                    {
                        this.resolveBallCollision(this.balls[i], this.balls[j]);
                    }
                }
            }
        }

        for (let i:number = 0; i < this.letterShapes.length; i++)
        {
            let shape:Shape = this.letterShapes[i];
            shape.updatePosition(shape.position.x - (this.oldCanvasDimensions.x - this.canvasDimensions.x) * 0.5, shape.position.y);
            CanvasUtils.drawShape(this.context!, shape);
        }

        this.last = Date.now();
        this.oldCanvasDimensions = new Vector2(this.canvasDimensions.x, this.canvasDimensions.y);
        requestAnimationFrame(() => this.update());
    }

    checkEdgeCollisions(ball:Ball):void
    {
        if (ball.position.x > this.canvasDimensions.x - ball.radius)
        {
            ball.direction.x *= -1;
            ball.updatePosition(this.canvasDimensions.x - ball.radius, ball.position.y);
        }
        else if (ball.position.x < ball.radius)
        {
            ball.direction.x *= -1;
            ball.updatePosition(ball.radius, ball.position.y);
        }
        if (ball.position.y > this.canvasDimensions.y - ball.radius)
        {
            ball.direction.y *= -1;
            ball.updatePosition(ball.position.x, this.canvasDimensions.y - ball.radius);
        }
        else if (ball.position.y < ball.radius)
        {
            ball.direction.y *= -1;
            ball.updatePosition(ball.position.x, ball.radius);
        }
    }

    getCanvasDimensions():Vector2
    {
        let widthString:string = getComputedStyle(this.canvas.nativeElement).width;
        while (isNaN(+widthString))
        {
        widthString = widthString.substring(0, widthString.length - 1);
        }

        let heightString:string = getComputedStyle(this.canvas.nativeElement).height;
        while (isNaN(+heightString))
        {
        heightString = heightString.substring(0, heightString.length - 1);
        }

        return new Vector2(+widthString, +heightString);
    }

    configureBalls():void
    {
        for (let i:number = 0; i < this.nBalls; i++)
        {
            const ballData:BallData = this.getNewBallData();

            this.balls.push(new Ball(ballData, this.colorsService.colors[i]));
        }
    }

    getNewBallData(chosenSize:number = -1, chosenPosition:Vector2 = new Vector2(0,0), chosenDirection:Vector2 = new Vector2(0,0), chosenSpeed:number = -1):BallData
    {
        let size:number = chosenSize === -1 ? 100 + Math.random() * 25 : chosenSize;
        let position:Vector2 = (chosenPosition.x === 0 && chosenPosition.y === 0) ? new Vector2(2 * size + Math.random() * (this.canvasDimensions.x - 4 * size), size + Math.random() * (this.canvasDimensions.y - 4 * size)) : chosenPosition;
        let direction:Vector2 = (chosenDirection.x === 0 && chosenDirection.y === 0) ? new Vector2(-1 * Math.random() * 2, -1 + Math.random() * 2).normalize() : chosenDirection;
        let speed:number = chosenSpeed === -1 ? 0.1 + Math.random() * 0.2 : chosenSpeed;

        return {size: size, position: position, direction: direction, speed: speed}
    }

    resolveBallCollision(b1:Ball, b2:Ball):void
    {
        let direction1:Vector2 = b1.direction;
        let direction2:Vector2 = b2.direction;

        b1.resolveCollisionWithBall(b2, direction2);
        b2.resolveCollisionWithBall(b1, direction1);
    }

    reportFrames():void
    {
        this.frames++;
        this.count += this.deltaTime;
        if (this.count >= 1000)
        {
            console.log("Number of frames last second: ", this.frames);
            this.count = 0;
            this.frames = 0;
        }
    }
}