import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
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

  ngAfterViewInit(): void
  {
    this.canvasBackgroundSerivce.canvas = this.canvas;
    this.canvasBackgroundSerivce.init();
  }

  onHidePhoto():void
  {
    this.showPhoto = false;
  }
}