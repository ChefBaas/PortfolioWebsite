import { Vector2 } from "./Vector2";

export class MathUtils
{
    static mirrorPoint(start:Vector2, end:Vector2, point:Vector2):Vector2
    {
      let closestPoint:Vector2 = this.closestPointOnLine(start, end, point);
      return point.add(closestPoint.sub(point).mul(2));
    }
  
    static closestPointOnLine(start:Vector2, end:Vector2, point:Vector2):Vector2
    {
      let ab:Vector2 = end.sub(start);
      let ap:Vector2 = point.sub(start);
      let abSquared:number = ab.x * ab.x + ab.y * ab.y;
      let dotABAP:number = ab.x * ap.x + ab.y * ap.y;
      let ratio:number = dotABAP / abSquared;
      return start.add(ab.mul(ratio));
    }

    static getLineIntersection(start1:Vector2, end1:Vector2, start2:Vector2, end2:Vector2):Vector2
    {
      let dir1:Vector2 = end1.sub(start1).normalize();
      let dir2:Vector2 = end2.sub(start2).normalize();
      
      let normal1:Vector2 = new Vector2(-dir1.y, dir1.x);
      let normal2:Vector2 = new Vector2(-dir2.y, dir2.x);
      let d1:number = normal1.x * start1.x + normal1.y * start1.y;
      let d2:number = normal2.x * start2.x + normal2.y * start2.y;
  
      let x:number = (normal2.y * d1 - normal1.y * d2) / (normal1.x * normal2.y - normal2.x * normal1.y);
      let y:number = (normal1.x * d2 - normal2.x * d1) / (normal1.x * normal2.y - normal2.x * normal1.y);
  
      return new Vector2(x, y);
    }
}