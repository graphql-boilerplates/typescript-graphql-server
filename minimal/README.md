<h1 align="center"><strong>Boilerplate for a Minimal GraphQL Server w/ TypeScript</strong></h1>

<br />

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /></div>

<div align="center"><strong>🚀 Bootstrap your GraphQL server within seconds</strong></div>
<div align="center">Minimal starter kit for a flexible GraphQL server for TypeScript - based on best practices from the GraphQL community.</div>

## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Simple Hello World example:** Where it either returns `Hello <name>!` or `Hello World!` if no name argument is provided.
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup

Read more about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).
  
## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```

## Getting started

```sh
# 1. Bootstrap GraphQL server in directory `my-app`, based on `typescript-basic` boilerplate
graphql create my-app --boilerplate typescript-minimal

# 2. Run yarn install or npm install

# 3. Navigate to the new project
cd my-app

# 4. Start server (runs on http://localhost:4000) and open GraphQL Playground
yarn dev
```

![](https://imgur.com/hElq68i.png)

## Documentation

### Commands

* `yarn start` or `npm run start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` or `npm run dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground

### Project structure

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>| 
| :--  | :--         |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── index.ts` | The entry point for your GraphQL server |


## Contributing

The GraphQL boilerplates are maintained by the GraphQL community, with official support from the [Apollo](https://dev-blog.apollodata.com) & [Graphcool](https://blog.graph.cool/) teams.

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the [`#graphql-boilerplate`](https://graphcool.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://graphcool.slack.com/).
