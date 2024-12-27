import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Ball } from './ball';
import { Vector2 } from '../shared/Vector2';
import { CanvasUtils } from '../shared/CanvasUtils';
import { AchievementsComponent } from "../achievements/achievements.component";
import { ShapeBuilderService } from './shapebuilder.service';
import { Shape } from './shapes/shape';
import { ColorsService } from '../shared/colors.service';
import { ImageShape } from './shapes/imageShape';
import { DraggableImageComponent } from "./draggable-image/draggable-image.component";
import { CanvasBackgroundService } from './canvas-background.service';

@Component({
  selector: 'app-background',
  standalone: true,
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
  imports: [DraggableImageComponent]
})
export class BackgroundComponent implements AfterViewInit
{
  @ViewChild('canvas') canvas!:ElementRef<HTMLCanvasElement>;
  canvasBackgroundSerivce:CanvasBackgroundService = inject(CanvasBackgroundService);
  static deltaTime:number = 1000 / 144;

  showPhoto:boolean = true;
  /*private last:number = 0;
  private biggest:number = 0;

  context!:CanvasRenderingContext2D | null;

  // balls:Ball[] = [];
  // colors:string[] = ["red", "green", "yellow", "skyblue", "orange"];
  nBalls:number = 3;
  canvasDimensions:Vector2 = new Vector2(0,0);
  oldCanvasDimensions:Vector2 = new Vector2(0,0);

  shapeBuilder:ShapeBuilderService = inject(ShapeBuilderService);
  colorsService:ColorsService = inject(ColorsService);
  
  letterShapes:Shape[] = [];
  name:string = "simon buijs";
  nameWidth:number = 0;
  nameHeight:number = 80;*/

  /*@ViewChild('photo') photo!:ElementRef<HTMLImageElement>;
  photoBall!:ImageShape;
  draggingPhoto:boolean = false;
  showPhoto:boolean = false;
  mouseDragStart:Vector2 = new Vector2(0,0);
  mouseDragOffset:Vector2 = new Vector2(0,0);*/

  ngAfterViewInit(): void
  {
    this.canvasBackgroundSerivce.canvas = this.canvas;
    this.canvasBackgroundSerivce.init();
  }

  onHidePhoto():void
  {
    this.showPhoto = false;
  }

  /*onDragPhotoStart(event:MouseEvent):void
  {
    this.draggingPhoto = true;
    let photoRect:DOMRect = this.photo.nativeElement.getBoundingClientRect();
    this.mouseDragStart.x = event.clientX;
    this.mouseDragStart.y = event.clientY;
    this.mouseDragOffset.x = photoRect.left - event.clientX;
    this.mouseDragOffset.y = photoRect.top - event.clientY;
  }
  
  onDragPhotoEnd(event:MouseEvent):void
  { 
    let canvasRect:DOMRect = this.canvas.nativeElement.getBoundingClientRect();
    let photoRect:DOMRect = this.photo.nativeElement.getBoundingClientRect();
    let direction:Vector2 = new Vector2(event.clientX - this.mouseDragStart.x, event.clientY - this.mouseDragStart.y).normalize();

    this.photoBall = new ImageShape(new Vector2(event.clientX - canvasRect.left + photoRect.height * 0.5 + this.mouseDragOffset.x, event.clientY - canvasRect.top + photoRect.height * 0.5 + this.mouseDragOffset.y), direction, this.photo.nativeElement, photoRect);
    this.draggingPhoto = true;
    
    this.balls.push(this.photoBall);
    this.showPhoto = true;
  }*/
}