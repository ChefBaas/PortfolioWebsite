import { ArcShape } from "../background/shapes/arcShape";
import { ImageShape } from "../background/shapes/imageShape";
import { RectShape } from "../background/shapes/rectShape";
import { Shape } from "../background/shapes/shape";
import { TriangleShape } from "../background/shapes/triangleShape";
import { Vector2 } from "./Vector2";

export class CanvasUtils
{
  static drawLine(context:CanvasRenderingContext2D, start:Vector2, end:Vector2, color:string):void
  {
    if (context)
    {
      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y)
      context.stroke();
      context.closePath();
    }
  }

  static drawImage(context:CanvasRenderingContext2D, image:HTMLImageElement, rect:DOMRect, position:Vector2)
  {
    if (context)
    {
      context.drawImage(image, position.x - rect.width * 0.5, position.y - rect.height * 0.5, rect.width, rect.height);
    }
  }

  static drawCircle(context:CanvasRenderingContext2D, position:Vector2, radius:number, startAngle:number, endAngle:number, color:string):void
  {
    if (context)
    {
      context.beginPath();
      context.arc(position.x, position.y, radius, startAngle, endAngle, false);
      context.fillStyle = color;
      context.fill();
      context.closePath();
    }
  }

  static drawRect(context:CanvasRenderingContext2D, position:Vector2, size:Vector2, color:string):void
  {
    if (context)
    {
      context.fillStyle = color;
      context.fillRect(position.x - size.x / 2, position.y - size.y / 2, size.x, size.y);
    }
  }

  static drawTriangle(context:CanvasRenderingContext2D, a:Vector2, b:Vector2, c:Vector2, color:string):void
  {
    if (context)
    {
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.lineTo(c.x, c.y);
      context.fillStyle = color;
      context.fill();
      context.closePath();
    }
  }

  static drawShape(context:CanvasRenderingContext2D, shape:Shape):void
  {
    if (shape instanceof ImageShape)
    {
      let image:ImageShape = (shape as ImageShape);
      this.drawImage(context, image.image, image.rect, image.position);
    }
    else if (shape instanceof ArcShape)
    {
      let arc:ArcShape = (shape as ArcShape);
      this.drawCircle(context, arc.position, arc.radius, arc.startAngle, arc.endAngle, arc.color);
    }
    else if  (shape instanceof RectShape)
    {
      let rect:RectShape = (shape as RectShape);
      this.drawRect(context, rect.position, rect.size, rect.color);
    }
    else if (shape instanceof TriangleShape)
    {
      let triangle:TriangleShape = (shape as TriangleShape);
      this.drawTriangle(context, triangle.a, triangle.b, triangle.c, triangle.color);
    }
  }
}