export interface NotificationContents {
  title: string;
  subTitle: string;
}

export interface GroupSucceedContents extends NotificationContents {
  groupArticleId: number;
}

export interface GroupFailedContents extends NotificationContents {
  groupArticleId: number;
}
