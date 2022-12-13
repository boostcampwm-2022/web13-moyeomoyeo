import { NOTIFICATION_TYPE } from '@app/notification/constants/notification.constants';
import { UserNotification } from '@app/notification/entity/user-notification.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserNotificationResult {
  @ApiProperty({ example: 1, description: '알림아이디' })
  id: number;

  @ApiProperty({
    example: NOTIFICATION_TYPE.GROUP_SUCCEED,
    description: '알림타입',
  })
  type: NOTIFICATION_TYPE;

  @ApiProperty({ example: '모임이 성사되었어요', description: '알림 제목' })
  title: string;

  @ApiProperty({ example: '훠궈 먹읍시다', description: '알림 부제목' })
  subTitle: string;

  // TODO: 우선은 알림에 필요한 데이터가 groupArticleId로 고정이라 값으로 추가했습니다.
  // 추후 유동적인 데이터는 그 타입에 맞게 데이터 정의하고 변환될 수 있도록 개발 필요.
  @ApiProperty({ example: 1, description: '모집 게시글 아이디' })
  groupArticleId: number;

  @ApiProperty({
    example: '2022-11-27T16:19:51.706Z',
    description: '알림 생성 날짜',
  })
  createdAt: Date;

  static async from(userNotification: UserNotification) {
    const result = new GetUserNotificationResult();
    result.id = userNotification.id;
    const notification = await userNotification.notification;
    result.type = notification.type;
    result.title = notification.contents.title;
    result.subTitle = notification.contents.subTitle;
    result.groupArticleId = notification.contents.groupArticleId;
    result.createdAt = userNotification.createdAt;
    return result;
  }
}
