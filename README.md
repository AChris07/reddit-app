# Reddit App

This project is a small demo app to pull top posts from Reddit, display them, and allow them to be dismissed.

## Stack used
  - Create React App
  - React
  - Redux Toolkit
  - Typescript
  - Storybook
  - Storyshots

## Why CRA?
When I started with the development of the page, I decided to go with a SPA, easy-to-deploy page, so either though I'm not a huge fan of the CRA tooling
(and the inflexibility - either you eject and handle a lot of overhead, or don't eject and end up limited in several ways), I erred for it vs something
like Next.js, that even though allows generating SPAs, I think it's better served for larger web apps with server support. Also, CRA is easier to scaffold
out of the box.

Then, I ended up creating a small server, so perhaps going with Next.js at once would have been a better idea.

## Deployment
To deploy, you first need to run `yarn build` to get the production-ready page to be deployed.
After that, you just need to run `yarn start` to initiate a small Express server to serve the page.

### Why does this SPA come with an Express server to deploy it?
This page is currently hosted on Heroku. Thus, a small server able to be started via script seemed the way to go for an easy
way to serve a page. Also, the other main reason is to be able to implement oAuth for the Reddit API server-side: I'd rather not keep
sensitive data clientside, even though it's a demo app.

## Development
It's as easy as running `yarn start:dev`. The app comes with a mocked response of the API for development.
Run `yarn test` to run Unit tests.

## Documentation
All the components are fairly self-explanatory, and are documented and displayed via Storybook.
We also leverage Storybook's stories for Snapshot testing via Storyshots.

## TODO list:
- [ ] Implement Dismiss All animation
- [ ] Clean up the UI
- [ ] Implement Visual Testing via Storyshots
- [ ] Implement E2E tests
