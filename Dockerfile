# Node.js 공식 이미지를 사용
FROM node:latest

# 작업 디렉토리 설정
WORKDIR /app

# Yarn 설치
RUN yarn install

# Yarn 버전을 Berry로 업그레이드
RUN yarn set version berry

# package.json과 yarn.lock을 먼저 복사
COPY package.json yarn.lock ./

# 앱 종속성 설치
RUN yarn install

# 필요한 경우 추가 패키지 설치
RUN yarn add @material-tailwind/react @mui/material

# 나머지 파일 복사
COPY . .

# 앱 빌드
RUN yarn build

# 앱 실행
EXPOSE 3000
CMD ["yarn", "start"]