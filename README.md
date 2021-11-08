# [🔗 짤이몽땅](https://zzari-mongddang.vercel.app/)
즐겨찾기와 검색기능을 이용해 짤방의 접근성을 극대화한 SNS 웹 서비스 

<div style="display: flex; justify-content: center">
<img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/> &emsp;
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/> &emsp;
<img alt="Context API" src ="https://img.shields.io/badge/Context API-4dd0e1.svg?&style=for-the-badge&logo=React&logoColor=white"/> &emsp;
<img alt="ESLint" src ="https://img.shields.io/badge/ESLint-4B32C3.svg?&style=for-the-badge&logo=ESLint&logoColor=white"/> &emsp;
<br>
<img alt="Emotion JS" src ="https://img.shields.io/badge/Emotion-af8eb5.svg?&style=for-the-badge&logo=Emotion JS&logoColor=white"/> &emsp;
<img alt="Storybook" src ="https://img.shields.io/badge/Storybook-FF4785.svg?&style=for-the-badge&logo=Storybook&logoColor=white"/> &emsp;
<img alt="Figma" src ="https://img.shields.io/badge/Figma-F24E1E.svg?&style=for-the-badge&logo=Figma&logoColor=white"/> &emsp;
<img alt="Vercel" src ="https://img.shields.io/badge/Vercel-000000.svg?&style=for-the-badge&logo=Vercel&logoColor=white"/>
</div>

</div>

<br>

## 프로젝트 소개
- 프로젝트 명: 짤이몽땅
- 팀명: 기동 1팀
- 프로젝트 기간: 2021.10.15 ~ 2021.11.5
- 기획 이유
  - 짤방은 인터넷이 확산된 이래로 커뮤니티에서부터 널리, 그리고 자주 사용되는 이미지 형식인 동시에 일종의 인터넷 밈(MIME)입니다. 최근 인터넷 사용량의 증가와 뉴미디어의 발달로 인터넷 밈에 대한 관심이 증가함은 물론 광고의 대상으로 쓰이는 등 경제적 효과 또한 확인할 수 있습니다.
  - 현재 짤방에 대한 저장 서비스는 찾아보기 어려운 상황입니다. 기존에 존재하는 짤방 저장 웹사이트의 경우에도 즐겨찾기 기능은 갖추고 있지 않아 사용자는 매번 검색을 해야하는 불편함이 있습니다. 따라서 자주 사용하는 짤방에 대한 즐겨찾기 기능을 제공하고 편리한 검색기능을 탑재한 웹서비스의 필요성이 있습니다.
  - 짤방은 유행의 변화 속도가 빠르고 트랜디한 짤방이 계속적으로 생성되고 있습니다. 사용자가 지속적으로 이러한 흐름을 쫓아가기는 쉽지 않다는 점에서 짤방의 트랜디함을 지속적으로 관찰하고 사용자에게 추천해주는 서비스를 기획하고자 했습니다.

<br>

## 설치 및 실행
- 실행환경: NodeJS 14.18.1
- 설치
  - $ ```yarn install```<br>
- 실행
  - $ ```yarn start```
- 테스트
  - $ ```yarn storybook ```


## 디렉토리 구조

```
.
├── README.md
├── craco.config.js
├── jsconfig.json
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.js
│   ├── assets
│   ├── components
│   │   └── base
│   ├── context
│   ├── domains
│   │   ├── Category
│   │   ├── Comment
│   │   ├── Favorite
│   │   ├── Footer
│   │   ├── Header
│   │   ├── LoginForm
│   │   ├── NotationModal
│   │   ├── Search
│   │   ├── SignUpForm
│   │   ├── Tab
│   │   ├── Uploader
│   │   ├── UploaderTemplate
│   │   ├── UserProfile
│   │   └── Zzal
│   ├── hooks
│   ├── index.js
│   ├── pages
│   │   ├── DetailPage
│   │   ├── LoginPage
│   │   ├── MainPage
│   │   ├── PersonalPage
│   │   ├── SearchPage
│   │   ├── SignUpPage
│   │   └── UploadPage
│   ├── stories
│   │   ├── components
│   │   │   └── base
│   │   ├── domains
│   │   ├── hooks
│   │   └── pages
│   └── utils
│       ├── api
│       ├── constants
│       ├── library
│       └── storage
└── yarn.lock
```
<br>

## API
- programmers dev-course로부터 제공받은 API를 사용하였습니다.
<br>

## Library
- React-router
- Axios
- React-icons
- ReactFreezeFrame
- DiceBear-Avatar
- React-loader-spinner

<br>

## Usage

#### 트렌디 짤방
- 각 카테고리마다 인기순으로 정렬된 트렌디한 짤방을 추천받습니다.
- 로그인시 메인페이지서 바로 글을 작성하거나 짤방 좋아요가 가능합니다.
![메인시연](https://user-images.githubusercontent.com/70619304/140751845-ac4da2b2-ab9b-43ee-bcfa-599fb90f17f2.gif)
#### 짤방 검색
- 검색창에 키워드를 입력하여 관련 짤방과 사용자를 검색할 수 있습니다.
![검색시연](https://user-images.githubusercontent.com/70619304/140749220-97312144-c5a4-4714-9455-d8bfce8620fb.gif)
#### 짤방 복사
- 원클릭을 통한 손쉬운 복사, 복사된 URL을 통해 다른 사이트에 빠르게 짤방을 옮길수 있는 편리함을 제공합니다.
![복사](https://user-images.githubusercontent.com/70619304/140759994-fb0ae09f-558e-4eae-9848-01fb2302d65b.gif)
#### 짤방 담기
- 짤방 좋아요를 통한 개인 아카이빙 기능으로 개인 페이지를 통해 해당 짤방에 바로 접근할 수 있습니다.
![좋아요](https://user-images.githubusercontent.com/70619304/140759923-01bb36f5-b379-43ac-9e99-dc9d51d0c4a6.gif)
#### 짤방 업로드 
- 내 컴퓨터의 짤방을 파일 업로드 또는 drag&drop 하여 사이트 내에서 공유하고, 개인 페이지 내에서 내가 업로드한 짤방을 모아볼 수 있습니다.
![업로드 기능 (1)](https://user-images.githubusercontent.com/70619304/140761571-b2d0a2fe-bdbf-45bf-8ccb-6d6d3466d496.gif)
#### 짤방에 댓글 남기기
- 다른 사람이 올린 짤방에 댓글을 남기고 의견을 공유할 수 있습니다.
![댓글시연](https://user-images.githubusercontent.com/70619304/140761492-f36b2b3d-8802-4840-90d7-5c5e52079f68.gif)
#### 사용자 팔로우
- 다른 사용자 팔로우를 통해 팔로잉하는 사용자의 개인 페이지를 구독할 수 있습니다.
![유저 팔로우 (1)](https://user-images.githubusercontent.com/70619304/140761624-9027dd12-e06a-4682-a02b-29b89fe7c973.gif)

<br>

## Thanks
- programmers dev-course

<br>

## Contributing
김정운_[github](https://github.com/AlangGY) <br>
김현석_[github](https://github.com/dorrdorr9311) <br>
김홍중_[github](https://github.com/HongJungKim-dev) <br>
도가영_[github](https://github.com/young-d) <br>

<br>

## 팀활동 기록 
<a href="https://garnet-trawler-425.notion.site/_1-ae18222393844a8b80d1c099865043ac"><img alt="Notion" src ="https://img.shields.io/badge/Notion-ffffff.svg?&style=for-the-badge&logo=Notion&logoColor=black"/></a>
