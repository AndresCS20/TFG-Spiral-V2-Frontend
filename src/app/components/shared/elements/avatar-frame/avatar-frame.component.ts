import { animate } from '@angular/animations';
import { Component, Injectable, Input, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-avatar-frame',
  standalone: true,
  imports: [],
  templateUrl: './avatar-frame.component.html',
  styleUrl: './avatar-frame.component.scss'
})
export class AvatarFrameComponent implements OnInit{
  avatar_url ="assets/avatar/frame"
  default_avatar = "assets/avatar/none.png";
  @Input() frame_name: string = "none";
  @Input() profile_picture: string = this.default_avatar;
  @Input() profile_size: string = "10";

  
  avatarClass: string = "avatar-frame";
  avatarBodyClass: string = "avatar-body";
  selectedFrame: any = {};
  ngOnInit(): void {
    this.selectedFrame = this.getProfileFrame(this.frame_name);

    this.avatarBodyClass = `avatar-${this.profile_size}`
    this.avatarClass = `avatar-image ${this.selectedFrame.attributes.rounded} ${this.selectedFrame.attributes.animated || ''}`;
  }

  getProfileFrame(frameName: string) {
    return this.profile_frame.find(frame => frame.name === frameName);
  }

  public getProfileFrameNames(){
    return this.profile_frame.map(frame => frame.name);
  }

  profile_frame = [
    {
      name: "none",
      attributes: {
        image:"",
        rounded: "rounded-lg",
        animated: ""
      }
    },
  {
    name: "glow",
    attributes: {
      image: "assets/avatar/frames/glow.png",
      rounded: "rounded-full",
      animated: "anim-spin"
    }
  },
  {
    name: "fire",
    attributes: {
      image: "assets/avatar/frames/fire.png",
      rounded: "rounded-full",
      animated: "anim-hue"
    }
  },
  {
    name: "flames",
    attributes: {
      image: "assets/avatar/frames/flames-rgb.png",
      rounded: "rounded-full",
    }
  },
  {
    name: "tech",
    attributes: {
      image: "assets/avatar/frames/tech.png",
      rounded: "rounded-full",
      animated: "anim-hue"
    }
  },
];
}