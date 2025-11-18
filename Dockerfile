FROM oven/bun:1 AS base
ARG DIR=usr/src/app

ARG DIR
RUN mkdir -p ${DIR}

WORKDIR /${DIR}
COPY package*.json ./
COPY bun.lockb ./

RUN bun install --frozen-lockfile
COPY . ./
RUN bun run build

EXPOSE 4173
CMD ["bun", "run", "start"]