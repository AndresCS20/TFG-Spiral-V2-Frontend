export interface AllUsers {
 status: string;
 body:   User[];
}

export interface OneUser {
 status: string;
 body:   User;
}

export interface User {
 _id:                   string;
 username:              string;
 fullname:              string;
 email:                 string;
 profile_picture_frame: string; 
 profile_picture:      string;
 banner_picture?:       string;
 following:             Follow[];
 followers:             Follow[];
 communities:           CommunityList[];
 social_networks:       SocialNetworks[];
 interests:             string[];
 description:          string;
 birth_date:            Date;
 link:                 string;
 ubication:            string; 
 createdAt:             Date;
 updatedAt:             Date;
}


export interface UpdateUser{
 fullname?: string;
 email?: string;
 password?: string;
 profile_picture?: string;
 profile_picture_frame?: string;
 banner_picture?: string;
 description?: string;
 interests?: string[];
 birth_date?: Date;
 link?: string;
 ubicaion?: string;
 social_networks?: SocialNetworks[];
}

export interface SocialNetworks {
 name: string;
 link:    string;
}


export interface CommunityList {
 community: OneUserCommunity;
 date:      Date;
 _id:       string;
}

export interface OneUserCommunity {
 _id:             string;
 shortname:       string;
 fullname:        string;
 banner_picture?:  string;
 profile_picture: string;
 members?:         Member[];
 createdAt?:       Date;
}

export interface Follow {
 _id:                    string;
 username:               string;
 fullname:               string;
 profile_picture_frame?: string;
 profile_picture?:       string;
 banner_picture?:        string;
}

export interface Member {
 user: string;
 date: Date;
 _id:  string;
}
