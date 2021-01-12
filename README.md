# News Scraper

## Setup

```shell

git clone git_url
cd nameofapp
yarn && cd client && yarn && cd .. && yarn dev
```

## Deploy

```shell
heroku create
heroku buildpacks:set heroku/nodejs
heroku buildpacks:add jontewks/puppeteer
git push heroku master

```
