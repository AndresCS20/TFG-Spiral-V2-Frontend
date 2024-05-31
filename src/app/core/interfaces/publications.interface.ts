export interface AllPublications {
 status: string;
 body:   Publication[];
}

export interface OnePublication {
 status: string;
 body:   Publication;
}

export interface Publication {
 _id:       string;
 community: Community;
 content:   string;
 author:    Author;
 reactions: BodyReaction[];
 comments:  Comment[];
 images: string[];
 video: string;
 createdAt: Date;
 updatedAt: Date;
}
export interface Author {
 _id:             string;
 username:        string;
 fullname:        string;
 profile_picture: string;
 profile_picture_frame: string
 banner_picture: string
 description:    string;
}
export interface UserComment {
  _id:                   string;
  username:              string;
  profile_picture:       string;
  fullname:              string;
  profile_picture_frame: string;
}

export interface Comment {
 user:     UserComment;
 content?: string;
 date:     Date;
 _id:      string;
 type?:    string;
}

// export interface Reaction {
//  user: string;
//  type: string;
//  date: Date;
//  _id:  string;
// }

export interface BodyReaction {
  type:      string;
  name:      string;
  icon:      string;
  reactions: ReactionReaction[];
  _id:       string;
}

export interface ReactionReaction {
  user: Author;
  date: Date;
  _id:  string;
}
export interface Community {
 _id:             string;
 shortname:       string;
 fullname:        string;
 profile_picture: string;
}


export interface PublicationCreator{
  author: string;
  content: string;
  community?: string;
  images?: string[];
  video?: string;
}