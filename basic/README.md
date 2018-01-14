# typescript-basic

🚀 Basic starter code for a scalable, production-ready GraphQL server written in TypeScript.

![](https://imgur.com/LG6r1q1.png)

## Features

- **Scalable GraphQL Server:** `graphql-yoga` based on Apollo Server & Express
- **GraphQL-native database:** Includes GraphQL database binding to Prisma (running on MySQL)
- Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [Tracing](https://github.com/apollographql/apollo-tracing)
- Simple data model – easy to adjust
- Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup

## Requirements

You need to have the following things installed:

* Node 8+ & TypeScript
* GraphQL CLI: `npm i -g graphql-cli`

## Getting started

```sh
# Bootstrap GraphQL server in directory `my-app`, based on `typescript-basic` boilerplate
graphql create my-app --boilerplate typescript-basic

# Navigate to the new project
cd my-app

# Deploy the Prisma database
prisma deploy

# Start server (runs on http://localhost:4000)
yarn start

# Open Playground to explore GraphQL API
yarn playground
```

### Commands

* `yarn start` starts GraphQL server
* `yarn playground` opens the GraphQL Playground
* `yarn deploy` deploys GraphQL server to [`now`](https://now.sh)

### Project structure

#### `/` (_root directory_)

- [`.graphqlconfig.yml`](./.graphqlconfig.yml) GraphQL configuration file containing the endpoints and schema configuration. Used by the [`graphql-cli`](https://github.com/prisma/graphql-cli) and the [GraphQL Playground](https://github.com/prisma/graphql-playground). See [`graphql-config`](https://github.com/prisma/graphql-config) for more information.
- [`prisma.yml`](./prisma.yml): The root configuration file for your database service ([documentation](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)).

#### `/database`

- [`database/datamodel.graphql`](./database/datamodel.graphql) contains the data model that you define for the project (written in [SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)).
- [`database/schema.generated.graphql`](./database/schema.generated.graphql) defines the **database schema**. It contains the definition of the CRUD API for the types in your data model and is generated based on your `datamodel.graphql`. **You should never edit this file manually**, but introduce changes only by altering `datamodel.graphql` and run `prisma deploy`.

#### `/src`

- [`src/schema.graphql`](src/schema.graphql) defines your **application schema**. It contains the GraphQL API that you want to expose to your client applications.
- [`src/index.ts`](src/index.ts) is the entry point of your server, pulling everything together and starting the `GraphQLServer` from [`graphql-yoga`](https://github.com/prisma/graphql-yoga).

## Contributing

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions, join the [`#graphql-boilerplate`](https://prisma.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://prisma.slack.com/).
