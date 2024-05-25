import { Component, OnInit } from '@angular/core';
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
  constructor(private exploreDataService: ExploreDataService) { }

  ngOnInit(): void {
    this.exploreDataService.currentMeetPeopleList.subscribe(users=>{
      if(users){
        this.globalUsers = users;
      }
    })
  }

}
