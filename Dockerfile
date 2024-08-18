# Node.js 버전을 고정하여 사용 (18-alpine은 경량화된 버전)
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사
COPY package.json package-lock.json ./

# npm을 사용하여 종속성 설치
RUN npm install --frozen-lockfile

# 나머지 소스 파일 복사
COPY . .

# 앱 빌드
RUN npm run build:prod

RUN ls -al /app/build

# 앱 실행을 위한 포트 설정
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]
