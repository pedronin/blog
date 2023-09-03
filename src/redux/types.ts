export interface IInitialStateSlice {
  user: IUser,
  searchTag: string,
  sortTo: 'new' | 'popular',
  firstLaunch: boolean
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
  token: string
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

export interface IInfoPost {
  imageUrl?: string;
  text: string;
  title: string;
  tags: TypeTags;
}

export interface IInfoUser {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface IComment {
  _id: string;
  text: string;
  // postId: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IInfoComment {
  text: string;
  postId: string;
}
