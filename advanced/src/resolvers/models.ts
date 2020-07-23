export const models = [
  {
    name: "Post",
    pubSub: {
      publishCreate: true,
      publishUpdate: true,
      publishDelete: true,
    },
  },
  {
    name: "User",
    pubSub: {
      publishCreate: true,
      publishUpdate: true,
      publishDelete: true,
    },
  },
]
