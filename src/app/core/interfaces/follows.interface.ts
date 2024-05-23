export interface FollowList {
 status: string;
 body:   FollowInfo[];
}

export interface FollowInfo {
 user: FollowUser;
 date: Date;
 _id:  string;
}

export interface FollowUser {
 _id:                    string;
 username:               string;
 fullname:               string;
 profile_picture_frame?: string;
 profile_picture?:       string;
 banner_picture?:        string;
 following:              Follow[];
 followers:              Follow[];
}

export interface Follow {
 user: string;
 date: Date;
 _id:  string;
}