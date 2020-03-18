const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Task {
    description: String!
    date: String!
    progress: String!
  }

  
  type Query {
    getTasks(progresses: [String!]!): [Task!]!
    signIn (email: String!, password: String!): String
  }

  type Mutation {
    signUp (email: String!, password: String!): String
    createTask(task: Task!): Task!
    updateTask(task: Task!): Task!
    deleteTask(taskId: Int!): Task!
  }
`

//module.exports = makeExecutableSchema({ typeDefs, resolvers })