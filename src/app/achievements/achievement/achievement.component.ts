import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [],
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.css',
  host: {
    '(mouseenter)':'onShowDescription()',
    '(mouseleave)':'onHideDescription()'
  }
})
export class AchievementComponent 
{
  @Input({required:true}) name!:string;
  @Input({required:true}) description!:string;

  showDescription:boolean = false;

  onShowDescription():void
  {
    console.log("HALLO");
  }

  onHideDescription():void
  {
    console.log("DOEI");  
  }
}
