import Express from 'express';
import ExpressGraphQL from 'express-graphql';
import mongoose from 'mongoose';

const app = Express();
const MONGO_CONNECTION = 'mongodb://localhost:27017/tasktivities';
mongoose
  .connect(MONGO_CONNECTION)
  .then(() => console.log(`Connected to ${MONGO_CONNECTION}`))
  .catch(e =>
    console.error(`There was a problem connecting to mongodb - ${e.message}`),
  );
