import { ApolloServer } from 'apollo-server';
import express, { Response, Request } from 'express';
import { environment } from './config/config';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => {
    const env = process.env.NODE_ENV || 'development';

    mongoose.connect(environment[env].dbString);

    let db = mongoose.connection;
    db.on('error', e => {
      console.error('Error while connecting to DB');
      console.error(e);
    });

    db.on('connected', conn => {
      console.log('Connected to MongoDB');
    });

    console.log(`#=> Server ready at ${url}`);
  })
  .catch(e => console.error(e));
