# 짤이몽땅
즐겨찾기와 검색기능을 이용해 짤방의 접근성을 극대화한 SNS 웹 서비스

<br>

<div style="display: flex; justify-content: center">
<img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/> &emsp;
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/> &emsp;
<img alt="Storybook" src ="https://img.shields.io/badge/Storybook-FF4785.svg?&style=for-the-badge&logo=Storybook&logoColor=white"/> &emsp;
<img alt="Yarn" src ="https://img.shields.io/badge/Yarn-2C8EBB.svg?&style=for-the-badge&logo=Yarn&logoColor=white"/> &emsp;
<img alt="Netlify" src ="https://img.shields.io/badge/Netlify-00C7B7.svg?&style=for-the-badge&logo=Netlify&logoColor=white"/>
</div>

<br>

## 프로젝트 소개
#### 프로젝트 명: 짤이몽땅
#### 팀명: 기동 1팀
#### 프로젝트 기간: 2021.10.15 ~ 2021.11.3
#### 기획 이유
- 짤방은 인터넷이 확산된 이래로 커뮤니티에서부터 널리, 그리고 자주 사용되는 이미지 형식인 동시에 일종의 인터넷 밈(MIME)이다. 최근 인터넷 사용량의 증가와 뉴미디어의 발달로 인터넷 밈에 대한 관심이 증가함은 물론 광고의 대상으로 쓰이는 등 경제적 효과 또한 무시할 수는 없는 수준이다.
- 짤방에 대한 저장 서비스는 그다지 많이 제공되고 있지 않다. 원하는 짤방을 사용하기 위해 구글링으로 키워드를 검색해야만하고, 그렇게 찾은 이미지를 나중에 다시 찾기는 쉽지않아 짤방을 자주 사용하는 이용자들은 개인 컴퓨터 내에서 저장, 관리를 하고 있는 상황이다.
또한 기존에 제공하는 짤방 저장 웹사이트의 경우 즐겨찾기와 같은 기능을 갖고 있지않아 결국은 검색를 다시 해야하는 불편함을 감수해야한다. 따라서 자주 사용하는 짤방에 대한 즐겨찾기기능을 제공하고 편리한 검색기능을 탑재한 웹서비스의 필요성이 대두된다.
- 짤방은 유행의 변화 속도가 빠르고 트랜디한 짤방이 계속적으로 생성되고 있다. 사용자가 지속적으로 이러한 흐름을 쫓아가기는 쉽지않다.  따라서 짤방의 트랜디함을 지속적으로 관찰하고 사용자에게 추천해주는 서비스에 대한 요구가 존재한다.

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

<br>

## Library
- Icon: React-icons
- Image: ReactFreezeFrame

<br>

## Usage
#### 짤방 검색
- 태그 / 제목을 통한 짤방 검색
#### 트렌디 짤방
- 즐겨찾기 수를 기반으로한 인기순 정렬로, 최근 트렌디한 짤방을 추천, 제안
#### 짤방 복사
- 원클릭을 통한 손쉬운 복사, 다른 사이트에 빠르게 짤방을 옮길수 있는 편리함 제공
#### 짤방 담기
- 짤방 좋아요를 통한 개인 아카이빙 기능, 즐겨찾기한 짤방은 검색없이 사용자 페이지를 통해 바로 접근 가능
#### 짤방 업로드 
- 짤방을 업로드 함으로서 소지한 짤방을 공유할수 있고, 내 컴퓨터에서 관리할 필요없이 사이트 내에서 손쉽게 접근 가능
#### 유저 팔로우
- 팔로우를 통해 해당 유저가 업로드하는 짤들을 구독하여, 손쉽게 접근 가능

<br>

## Thanks
- programmers dev-course

<br>

## Contributing
김정운_[github]() <br>
김현석_[github]() <br>
김홍중_[github]() <br>
도가영_[github]() <br>
