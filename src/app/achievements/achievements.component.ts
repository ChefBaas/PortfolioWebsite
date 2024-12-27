import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Achievement } from './achievement.model';
import { AchievementComponent } from "./achievement/achievement.component";

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [AchievementComponent],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css',
  host:
  {
    '[class.expanded]':'expandedView',
    'id':'bla'
  }
})
export class AchievementsComponent implements AfterViewInit
{
  @ViewChild('bar')bar!:ElementRef<HTMLHRElement>;
  expandedView:boolean = false;

  achievements:Achievement[] = [
    {
      name:"painter",
      description:"change the colors",
      id:0
    },
    {
      name:"builder",
      description:"let the balls collide with other objects",
      id:1
    },
    {
      name:"painter",
      description:"change the colors",
      id:2
    },
    {
      name:"builder",
      description:"let the balls collide with other objects",
      id:3
    },
    {
      name:"painter",
      description:"change the colors",
      id:4
    },
    {
      name:"builder",
      description:"let the balls collide with other objects",
      id:5
    },
    {
      name:"painter",
      description:"change the colors",
      id:6
    },
    {
      name:"builder",
      description:"let the balls collide with other objects",
      id:7
    }
  ];
  numberCompleted:number = 0;

  ngAfterViewInit(): void 
  {
    
  }

  updateAchievements():void
  {
    // this.numberCompleted = Math.round(Math.random() * 2);
    this.bar.nativeElement.style.width =  this.numberCompleted * 75 + "px";
    this.bar.nativeElement.style.marginRight = (2 - this.numberCompleted) * 75 + "px";
  }

  toggleExpanded():void
  {
    this.expandedView = !this.expandedView;
  }
}
