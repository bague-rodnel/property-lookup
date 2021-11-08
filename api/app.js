const express = require("express");
const app = express();
const path = require("path");

const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./graphql/graphql");

const publicPath = path.join(__dirname, "..", "build");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log(`We're connected to MongoDB Database`);
  } catch (error) {
    console.log(error);
  }

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  app.use(express.static(publicPath));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.use("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
})();

module.exports = app;
