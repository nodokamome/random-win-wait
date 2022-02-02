# ベースイメージを指定
FROM node:16.13.0

# ディレクトリを移動する
WORKDIR /usr/src/app

# ポート3000番を開放する
EXPOSE 3000

COPY . .

RUN npm ci && npm run build
