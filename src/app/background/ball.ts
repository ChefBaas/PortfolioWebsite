import { MathUtils } from "../shared/MathUtils";
import { Vector2 } from "../shared/Vector2";
import { BackgroundComponent } from "./background.component";
import { ArcShape } from "./shapes/arcShape";

export type BallData =
{
    size:number;
    position:Vector2;
    direction:Vector2;
    speed:number;
}

export class Ball extends ArcShape
{
    direction:Vector2;
    speed:number;

    constructor(ballData:BallData, color:string)
    {
        super(ballData.size, 0, Math.PI * 2, ballData.position, color);
        this.direction = ballData.direction;
        this.speed = ballData.speed;
    }

    move():void
    {
        this.position = this.position.add(this.direction.mul(this.speed * BackgroundComponent.deltaTime));
    }

    checkBallCollision(other:Ball):boolean
    {
        let p:Vector2 = other.position;
        let r:number = other.radius;
        let distanceSqr:number = (p.x - this.position.x) * (p.x - this.position.x) + (p.y - this.position.y) * (p.y - this.position.y);
        let radiiSqr:number = (this.radius + r) * (this.radius + r);
    
        return distanceSqr < radiiSqr;
    }

    resolveCollisionWithBall(other:Ball, otherDirection:Vector2):void
    {
        let d:Vector2 = this.position.sub(other.position);
        let perp:Vector2 = new Vector2(-d.y, d.x);
        let c:Vector2 = other.position.add(d.mul(other.radius / (this.radius + other.radius)));

        let closestPoint:Vector2 = MathUtils.closestPointOnLine(c.sub(perp.mul(100)), c.add(perp.mul(100)), this.position);
        let closestPointNextFrame:Vector2 = MathUtils.closestPointOnLine(c.sub(perp.mul(100)), c.add(perp.mul(100)), this.position.add(this.direction));

        // if we would be farther from the collision line next frame, we only need to take the average of both directions
        if (closestPoint.sub(this.position).lengthSqr() < closestPointNextFrame.sub(this.position.add(this.direction)).lengthSqr())
        {
            this.direction = this.direction.add(otherDirection).normalize();
        }
        // otherwise we resolve the collision as if we collided with the collision line
        else
        {
            let hypoCol1:Vector2 = MathUtils.getLineIntersection(this.position, this.position.add(this.direction), c, c.add(perp));
            let mirror1:Vector2 = this.position.add(hypoCol1.sub(this.position).mul(2));
            let reMirror1:Vector2 = MathUtils.mirrorPoint(c.sub(perp.mul(100)), c.add(perp.mul(100)), mirror1);
            this.direction = reMirror1.sub(hypoCol1).normalize();
        }
    }
}