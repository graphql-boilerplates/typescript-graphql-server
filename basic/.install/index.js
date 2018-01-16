const fs = require('fs')
const {
  replaceInFiles,
  deploy,
  writeEnv,
  getInfo,
} = require('graphql-boilerplate-install')

module.exports = async ({ project, projectDir }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFiles(
    ['src/index.ts', 'package.json', 'database/prisma.yml'],
    templateName,
    project,
  )

  console.log('Running $ prisma deploy...')
  await deploy(false)
  const info = await getInfo()

  replaceInFiles(['src/index.ts'], '__PRISMA_ENDPOINT__', info.httpEndpoint)

  console.log(`\
You can now start local server and open a GraphQL Playground by running: \`yarn dev\`
`)
}

/*
Next steps:
  1. Change directory: \`cd ${projectDir}\`
  2. Start local server and open Playground: \`yarn dev\`
`)
*/
