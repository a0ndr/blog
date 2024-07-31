FROM debian:12-slim AS build

RUN apt-get update && apt-get install -y curl wget gnupg openssl
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -
RUN apt-get -y install nodejs && wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN . ~/.bashrc

WORKDIR /app
COPY . .

RUN /root/.local/share/pnpm/pnpm i
RUN /root/.local/share/pnpm/pnpm prisma generate
RUN /root/.local/share/pnpm/pnpm prisma migrate dev --name init
RUN /root/.local/share/pnpm/pnpm build

FROM node:20-slim AS prod

RUN apt-get update && apt-get install -y openssl
COPY --from=build /app .

EXPOSE 4173
CMD ["npm", "run", "prod"]
