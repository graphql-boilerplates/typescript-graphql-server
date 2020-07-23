import { loadConfig } from 'graphql-config'

export async function getProjectConfig() {
  const projectConfig = await loadConfig({
    rootDir: process.cwd(),
    extensions: [
      () => ({ name: 'graphback' })
    ]
  });

  return projectConfig.getDefault();
}