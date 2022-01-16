import mongoose, { Schema } from 'mongoose';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
  GraphQLScalarType,
  Kind,
} from 'graphql';

const itemSchema = new Schema({
  name: String,
  itemType: String,
  tags: [String],
  description: String,
  date: Date,
  duration: Number,
  createdAt: Date,
});

const ItemModel = mongoose.model('item', itemSchema);

const TaskType = new GraphQLEnumType({
  name: 'ItemType',
  values: { TASK: { value: 'task' }, ACTIVITY: { value: 'activity' } },
});

const DateType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: { getTime?: () => number }) {
    // Convert outgoing Date to integer for JSON
    return value.getTime();
  },
  parseValue(value: number | unknown) {
    // Convert incoming integer to Date
    if (typeof value === 'number') return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: {
    name: { type: GraphQLString },
    type: { type: TaskType },
    description: { type: GraphQLString },
    date: {
      type: DateType,
    },
    duration: { type: GraphQLString },
    createdAt: { type: DateType },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    item: {
      type: new GraphQLList(ItemType),
      resolve: () => ItemModel.find().exec(),
    },
    allItems: {
      type: ItemType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: id => ItemModel.find(id).exec(),
    },
  },
});

export const AppSchema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [ItemType, TaskType, DateType],
});
