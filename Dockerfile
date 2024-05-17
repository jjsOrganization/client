# Node.js를 기반으로 하는 빌드용 이미지 설정
FROM node:14 as build

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 앱 종속성 설치
RUN npm install
RUN npm install @material-tailwind/react
RUN npm install @mui/material
#RUN npm install --save chart.js react-chartjs-2
#npm i react-chartjs-2 chart.js
COPY package*.json ./


# 소스 코드를 복사
COPY . .

# 앱 빌드
RUN npm run build


# 앱 실행
EXPOSE 3000