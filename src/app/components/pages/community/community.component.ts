import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CommunitiesService } from '@services/communities.service';
import { Community, OneCommunity } from '@interfaces/communities.interface';
import { CommuniyDataService } from '@services/data/communiy-data.service';
import { StorageService } from '@services/storage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-community',
  standalone: true,
  imports: [RouterModule, AboutUsComponent, RouterLink],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private _communitiesService: CommunitiesService,
    private communityDataService: CommuniyDataService
  ) {}
  isMemberOfTheCommunity = false;
  communityShortName!: string | null;
  isOwnerOfCommunity = false;
  community!: Community;
  user : any
  ngOnInit(): void {
    let route = this.route;
    while (route.firstChild) route = route.firstChild;
    this.communityShortName = route.snapshot.paramMap.get('shortname');
    if (this.communityShortName) {
      this.getCommunity(this.communityShortName);
      
      // Actualiza el usuario
      this.user = this.storageService.getUser();

      // Verifica si el usuario está definido antes de llamar a checkIsMember
      if (this.user) {
        this.checkIsMember(this.communityShortName, this.user.id);
        this.checkIsOwner(this.communityShortName, this.user.id);
      } else {
        console.error('User is undefined');
      }
    } else {
      console.error('No community shortname provided');
    }

  }

  changeOwner(){

  }

  deleteCommunity(){
  }
  leaveCommunity(){
    if(this.communityShortName !== null){
      this._communitiesService.leaveCommunity(this.communityShortName, this.user.id).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Has abandonado la comunidad',
            showConfirmButton: false,
            timer: 1500
          })
          this.isMemberOfTheCommunity = false
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: error.error.error,
          })
        },
      })

    }
  }

  joinCommunity(){
    if(this.communityShortName !== null){
    this._communitiesService.joinCommunity(this.communityShortName, this.user.id).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Te has unido a la comunidad',
          showConfirmButton: false,
          timer: 1500
        })
        this.isMemberOfTheCommunity = true
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error.error.error,
        })
      },
    })
  }
  }

  private checkIsOwner(shortname:string, userId: string){
    this._communitiesService.checkIsCommunityOwner(shortname, userId).subscribe({
      next: (data) => {
        this.isOwnerOfCommunity = true
        this.communityDataService.changeIsCommunityOnwner(true);
      },
      error: (error) => {
        this.isOwnerOfCommunity = false
        this.communityDataService.changeIsCommunityOnwner(false);
        console.log(error); 
      },
    })
  }

  private checkIsMember(shortname:string, userId: string){
    this._communitiesService.checkIsCommunityMember(shortname, userId).subscribe({
      next: (data) => {
        this.isMemberOfTheCommunity = true
      },
      error: (error) => {
        this.isMemberOfTheCommunity = false;
        console.log(error); 
      },
    })
  }

  private getCommunity(communityShortName: string) {
    this._communitiesService.getOneCommunity(communityShortName).subscribe({
      next: (data: OneCommunity) => {
        this.community = data.body;
        this.communityDataService.changeCommunity(this.community);
      },
      error: (error) => {
        this.router.navigate(['/communities']);
        console.log(error);
      },
    });
  }
}
