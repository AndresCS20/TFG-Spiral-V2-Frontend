export interface OneCommunity {
 status: string;
 body:   Community;
}

export interface AllCommunities {
 status: string;
 body:   Community[];
}

export interface CommunityCreate {
 shortname:        string;
 fullname:         string;
 owner:            string;
 description?:     string;
 profile_picture?: string;
 banner_picture?:  string;
}

export interface Community {
 _id:              string;
 shortname:        string;
 fullname:         string;
 owner:            Owner;
 members:          Member[];
 banner_picture?:  string;
 description?:     string;
 profile_picture?: string;
 createdAt:        Date;
 updatedAt:        Date;
 rules:            Rule[];
 buttons:          Button[];
}

export interface Button {
 title: string;
 url:   string;
 icon:  string;
 color: string;
}

export interface Owner {
 _id:                   string;
 username:              string;
 fullname:              string;
 profile_picture:       string;
 profile_picture_frame: string;
}

export interface Member {
 user: User;
 date: Date;
 _id:  string;
}

export interface User {
 _id:                   string;
 username:              string;
 fullname:              string;
 profile_picture:       string;
 profile_picture_frame: string;
 banner_picture: string;
}

export interface Rule {
 title:   string;
 content: string;
}




// export interface Communities {
//  ok:     boolean;
//  status: number;
//  body:   OneCommunity[];
// }

// export interface OneCommunity {
//  _id:              string;
//  shortname:        string;
//  fullname:         string;
//  owner:            string;
//  members:          Member[];
//  createdAt:         Date;
//  updatedAt:         Date;
//  banner_picture?:  string;
//  description?:     string;
//  profile_picture?: string;
// }

// export interface Member {
//  user: string;
//  date: Date;
//  _id:  string;
// }


// export interface Communities {
//  status: string;
//  body:   OneCommunity[];
// }

// export interface OneCommunity {
//  _id:              string;
//  shortname:        string;
//  fullname:         string;
//  owner:            string;
//  members:          Member[];
//  banner_picture?:  string;
//  description?:     string;
//  profile_picture?: string;
//  createdAt:        Date;
//  updatedAt:        Date;
//  rules:            Rule[];
//  buttons:          Button[];
// }

// export interface Button {
//  _id:   string;
//  title: ButtonTitle;
//  url:   string;
//  icon:  Icon;
//  color: Color;
// }

// export enum Color {
//  Primary = "primary",
//  Warning = "warning",
// }

// export enum Icon {
//  FasFaDonate = "fas fa-donate",
//  FasFaSignInAlt = "fas fa-sign-in-alt",
// }

// export enum ButtonTitle {
//  Donate = "Donate",
//  JoinNow = "Join Now",
// }

// export interface Member {
//  user: string;
//  date: Date;
//  _id:  string;
// }

// export interface Rule {
//  _id:     string;
//  title:   RuleTitle;
//  content: Content;
// }

// export enum Content {
//  KeepDiscussionsFocusedOnTechnologyRelatedTopics = "Keep discussions focused on technology-related topics.",
//  TreatEveryoneWithKindnessAndRespect = "Treat everyone with kindness and respect.",
// }

// export enum RuleTitle {
//  RespectOthers = "Respect Others",
//  StayOnTopic = "Stay on Topic",
// }



// // export interface Communities {
// //  ok:     boolean;
// //  status: number;
// //  body:   OneCommunity[];
// // }

// // export interface OneCommunity {
// //  _id:              string;
// //  shortname:        string;
// //  fullname:         string;
// //  owner:            string;
// //  members:          Member[];
// //  createdAt:         Date;
// //  updatedAt:         Date;
// //  banner_picture?:  string;
// //  description?:     string;
// //  profile_picture?: string;
// // }

// // export interface Member {
// //  user: string;
// //  date: Date;
// //  _id:  string;
// // }
