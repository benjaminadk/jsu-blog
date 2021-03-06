require('dotenv').config()
const http = require('http')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const cookieParser = require('cookie-parser')
const isUserSignedIn = require('./middleware/isUserSignedIn')
const addUserToRequest = require('./middleware/addUserToRequest')
const { prisma } = require('./generated')
const resolvers = require('./resolvers')
const { NODE_ENV, FRONTEND_DEV, FRONTEND_PROD, PORT } = process.env

const app = express()
const path = '/graphql'
const cors = {
  origin: NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD,
  credentials: true
}
const server = new ApolloServer({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers,
  context: ({ req, res }) => ({
    prisma,
    res,
    userId: req.userId,
    user: req.user
  })
})

app.use(cookieParser(), isUserSignedIn, addUserToRequest)
server.applyMiddleware({ app, path, server, cors })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`Server @ http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions @ ws://localhost:${PORT}${server.subscriptionsPath}`)
})
