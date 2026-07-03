import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '@interfaces/users.interface';
import { ExploreDataService } from '@services/data/explore-data.service';
import { UserBoxComponent } from 'src/app/components/shared/elements/user-box/user-box.component';

@Component({
  selector: 'app-meet-people',
  standalone: true,
  imports: [UserBoxComponent],
  templateUrl: './meet-people.component.html',
  styleUrl: './meet-people.component.scss'
})
export class MeetPeopleComponent implements OnInit{

  globalUsers: User[] | null = null
  constructor(private exploreDataService: ExploreDataService, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.exploreDataService.currentMeetPeopleList.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(users=>{
      if(users){
        this.globalUsers = users;
      }
    })
  }

}
