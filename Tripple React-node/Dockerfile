#i떤 이미지로부터 새로운 이미지를 생성할지를 지정
FROM node:6.2.2

#Dockerfile 을 생성/관리하는 사람
MAINTAINER jwh <eu81273@gmail.com>

# /app 디렉토리 생성
RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app
# npm install 을 실행
RUN npm install

#환경변수 NODE_ENV 의 값을 development 로 설정
ENV NODE_ENV development

#가상 머신에 오픈할 포트
EXPOSE 3000 80

CMD ["npm", "build","development"]
