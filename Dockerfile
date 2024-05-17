# Node.js를 기반으로 하는 빌드용 이미지 설정
FROM node:14 as build

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# Yarn 설치
RUN npm install -g yarn

# Yarn berry로 Yarn 버전 업데이트
RUN yarn set version berry

# 앱 종속성 설치
RUN yarn install
RUN yarn add @material-tailwind/react
RUN yarn add @mui/material
COPY package.json yarn.lock ./
# yarn add chart.js react-chartjs-2
COPY . .

# 앱 빌드
RUN yarn build

# 앱 실행
EXPOSE 3000

CMD ["yarn", "start"]