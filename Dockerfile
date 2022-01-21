FROM node:alpine

ARG WORKPLACE=/app
ARG PORT=80

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY ./ $WORKPLACE

WORKDIR $WORKPLACE

RUN npm i -g pnpm && \
    pnpm i -g serve &&  \
    pnpm i --frozen-lockfile &&  \
    pnpm build

RUN mkdir ../to_rm && \
    mv ./* ../to_rm && \
    mv ../to_rm/dist ./ && \
    rm -rf ../to_rm

ENV NODE_ENV=production
ENV PORT=$PORT
EXPOSE $PORT
CMD ["serve", "-s", "dist", "-C"]
