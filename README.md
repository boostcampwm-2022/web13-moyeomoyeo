<p align="center">
  <img src="https://user-images.githubusercontent.com/38908080/204069974-76b3b75a-1600-40ee-b361-059995c8fe3c.svg" width="1200px"/>
</p>

<div align="center">
  <a href="https://brawny-zydeco-6b6.notion.site/Cho-Sim-He-688c8884e0f74616abfdbcb73ea6fc09">노션</a>　|　
  <a href="https://www.moyeomoyeo.com">배포 링크</a>　|　
  <a href="https://github.com/boostcampwm-2022/web13-moyeomoyeo/wiki">위키</a>　|　
  <a href="https://brawny-zydeco-6b6.notion.site/efeb883ee0b244249ea25fb1bdc14763?v=8316943be18c4321b6251cc1c9773cdb">백로그</a>　|　
  <a href="https://brawny-zydeco-6b6.notion.site/56ca79567a6340bc9f926c55f97a5cbb?v=1b1e1ddf75514904a1acdfda218db835">회고록</a>
</div>

<br></br>

<div align="center">
  <img src="https://img.shields.io/badge/Node-16.18.1-339933?logo=node.js">
  <img src="https://img.shields.io/badge/Typescript-4.8.4-0984e3?logo=typescript">
  <img src="https://img.shields.io/badge/React-17.0.2-00a8ff?logo=react">
  <img src="https://img.shields.io/badge/NextJS-12.3.3-353b48?logo=next.js">
  <img src="https://img.shields.io/badge/NestJS-9.0.0-eb4d4b?logo=nestjs">
</div>


# ✨ 프로젝트 소개

> **모여모여**는 개발자들의 모임 활성화를 위한 서비스입니다.
>
> 스터디, 프로젝트, 번개 모임 등 다양한 개발자 동료들과 함께해보세요!

<br></br>

# 🎯 프로젝트 목표

- 실제로 수요가 있는 서비스를 개발하고 팀원들이 애정을 가질 수 있는 프로젝트를 만들자.
- 지속적인 코드 리뷰를 통한 코드 일관성을 확보하고 품질을 높이자.
- 리팩토링을 통해 프로젝트 코드와 서비스의 성능을 개선하자.
- CI/CD, 배포 자동화를 통해 개발 생산성을 높이자.


<br></br>

# ✨ 주요 기능

[👉🏻 시연영상 보러가기](https://www.youtube.com/watch?v=FR3IAFBxvO4)

<table>
    <tr>
      <td align="center" width="25%">모집게시글 목록 조회</td>
      <td align="center" width="25%">모집 게시글 등록</td>
      <td align="center" width="25%">모집 신청 참가/취소</td>
      <td align="center" width="25%">모집 성사 알림, 오픈채팅방 링크</td>
    </tr>
    <tr>
      <td><img src="https://user-images.githubusercontent.com/67570061/207778404-43ffe050-fdeb-41a0-a77e-db3977ab4a1c.gif"/></td>
      <td><img src="https://user-images.githubusercontent.com/67570061/207778608-54e0a59a-5998-413b-8650-c9a8839a4179.gif"/></td>
      <td><img src="https://user-images.githubusercontent.com/67570061/207778658-2bf27fc2-b55c-4621-8776-f8c72c8ca9ea.gif"/></td>
      <td><img src="https://user-images.githubusercontent.com/67570061/207779175-1ca1f5f6-0cf4-4b96-bfa2-cbbe1cb494e3.gif"/></td>
    </tr>
    <tr>
      <td>무한 스크롤을 통한 페이지네이션이 적용되어 있으며, 필터링이 가능합니다.</td>
      <td>원하는 모임 모집 게시글을 작성할 수 있습니다.</td>
      <td>모집중인 모임에 참가 신청/취소 할 수 있습니다.</td>
      <td>모집이 완료되면 알림이 발송되며, 오픈채팅방 링크를 통해 모임 채팅방에 참여할 수 있습니다.</td>
    </tr>
 </table>

 

<br></br>


# 🫵 프로젝트 포인트

- 중복 게시글 조회 방지를 위해 페이지네이션 방식 변경 및 쿼리 개선을 진행했습니다. [👉🏻보러가기](https://boostcamp-wm.notion.site/feat-2a1dd8ea684d44ebb7176d5efbbc8aeb)
- `custom hook`, `error class`, `ErrorBoundary`를 이용하여 API 핵심 로직과 에러 처리의 관심사를 분리하였고,<br/>사용자에게 적절한 오류 화면을 보여주도록 했습니다. [👉🏻보러가기](https://boostcamp-wm.notion.site/957e4b7034d64d0c8fa59f47e58c112d)
- 성능 및 사용자 경험 개선을 위해 이미지 최적화와 SSR, Blur, Skeleton을 적용 했습니다. [👉🏻보러가기](https://boostcamp-wm.notion.site/e959fbc871514fb29a407dfe3f2447b9)
- 컴포넌트의 체계적인 설계와 문서화를 통해 개발자 경험을 향상시키고자 스토리북을 도입했습니다. [👉🏻보러가기](https://boostcamp-wm.notion.site/a54eb762007f4ec185ee008a396d7a82)
- CI/CD 파이프라인을 구축하고 지속적으로 개선했습니다. CI 시간을 약 40s 단축했습니다. [👉🏻보러가기](https://boostcamp-wm.notion.site/CI-CD-e6f15386baa34b238884678928ff3c61)

<br></br>

# 📚 기술 스택

<div align="center">
  <img src="https://user-images.githubusercontent.com/38908080/205450796-dcf1b0e3-6f70-4edb-8359-9c0023d0da08.png"/>
</div>


<br></br>

# 👥 팀원 소개

| J031 김명일 | J074 박민경 | J087 박종혁 | J113 양승찬 |
|:--------:|:--------:|:--------:|:--------:|
| ![img](https://avatars.githubusercontent.com/u/67570061?v=4) | ![img](https://avatars.githubusercontent.com/u/37508296?v=4) | ![img](https://avatars.githubusercontent.com/u/90585081?v=4) | ![img](https://avatars.githubusercontent.com/u/38908080?v=4) |
| [username1103](https://github.com/username1103) | [kong430](https://github.com/kong430) | [pythonstrup](https://github.com/pythonstrup) | [yangseungchan](https://github.com/yangseungchan) |
| 내 이름은 김명일 탐정이죠! | 막내는 슬퍼요 | 신도림 김밥 VIP | 모기 사냥꾼 |
| 🐢 거북이 | 🐰 토끼 | 🦫 비버 | 🦙 알파카 |
| ![image](https://user-images.githubusercontent.com/90585081/202906164-87810106-3b71-417a-ad79-97fdfa74736d.png) | ![image](https://user-images.githubusercontent.com/90585081/202906064-3c1b3f26-b9bb-4de4-9304-341afc12507b.png) | ![image](https://user-images.githubusercontent.com/90585081/202906106-28c2dc14-e2c7-4504-b638-6763548f473f.png) | ![image](https://user-images.githubusercontent.com/90585081/202906134-6017203f-2f29-40a1-8223-5ecd6ae063b3.png) |
