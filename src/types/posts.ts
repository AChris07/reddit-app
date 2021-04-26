export enum PostStatusEnum {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export type Post = {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  entryDate: number;
  numComments: number;
  isRead: boolean;
};
