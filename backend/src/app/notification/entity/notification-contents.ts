export interface NotificationContents {
  title: string;
  subTitle: string;
}

export interface GroupSucceedContents extends NotificationContents {
  groupArticleId: number;
}
