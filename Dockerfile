# Node.js를 기반으로 하는 빌드용 이미지 설정
FROM node:14 as build

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# 앱 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드를 복사
COPY . .

# 앱 빌드
RUN npm run build

# Nginx를 기반으로 하는 런타임 이미지 설정
FROM nginx:alpine

# Nginx 구성 파일을 제거하고 리액트 애플리케이션 빌드를 복사
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

# 기본 Nginx 설정을 변경
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 포트 80을 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]