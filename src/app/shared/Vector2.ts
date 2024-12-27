export class Vector2
{
    x:number;
    y:number;

    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }

    add(v:Vector2):Vector2
    {
        let result:Vector2 = new Vector2(this.x + v.x, this.y + v.y);
        return result;
    }

    sub(v:Vector2):Vector2
    {
        let result:Vector2 = new Vector2(this.x - v.x, this.y - v.y);
        return result;
    }

    mul(n:number):Vector2
    {
        let result:Vector2 = new Vector2(this.x * n, this.y * n);
        return result;
    }

    div(n:number):Vector2
    {
        let result:Vector2 = new Vector2(this.x / n, this.y / n);
        return result;
    }

    normalize():Vector2
    {
        return this.div(this.length());
    }

    length():number
    {
        return Math.sqrt(this.lengthSqr());
    }

    lengthSqr():number
    {
        return this.x * this.x + this.y * this.y;
    }
}