# Node.js 공식 이미지를 사용
FROM node:latest

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사
COPY package.json package-lock.json ./

# npm을 사용하여 종속성 설치
RUN npm install

# 필요한 경우 추가 패키지 설치
RUN npm install @material-tailwind/react @mui/material

# 나머지 소스 파일 복사
COPY . .

# 앱 빌드
RUN npm run build

# 앱 실행을 위한 포트 설정
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]
