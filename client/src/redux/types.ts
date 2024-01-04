export interface IInitialStateSlice {
  user: IUser;
  searchTag: string;
  sortTo: "new" | "popular";
  firstLaunch: boolean;
}

export interface IUser {
  createdAt: string;
  email: string;
  fullName: string;
  passwordHash: string;
  updatedAt: string;
  __v: 0;
  _id: string;
  avatarUrl?: string;
  token: string;
}

export type TypeTags = string[];

export interface IPost {
  imageUrl?: string;
  text: string;
  title: string;
  tags: TypeTags;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  viewsCount: number;
  commentsCount: number;
  __v: number;
  _id: string;
  comments: IComment[];
}

export type IInfoPost = Pick<IPost, "imageUrl" | "text" | "title"> & {
  tags: String;
};

export interface NewUserMutate {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface LoginUserMutate {
  email: string;
  password: string;
}

export interface GetAllPostParams {
  tag: string;
  sortTo: string;
}

export interface UploadImageResponse {
  url: string;
}

export interface AddNewPostMutate {
  token: string;
  infoPost: IInfoPost;
}

export interface RemovePostMutate {
  token: string;
  _id: string;
}

export interface UpdatePostMutate {
  token: string;
  _id: string;
  infoPost: IInfoPost;
}

export interface CreateCommentMutate {
  infoComment: {
    postId: string;
    text: string;
  };
  token: string;
}

export interface IComment {
  _id: string;
  text: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IInfoComment {
  text: string;
  postId: string;
}
