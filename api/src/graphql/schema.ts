import { gql } from 'apollo-server-express';

export default gql`
  type UserCollection {
    name: String
    childCollections: [UserCollection]
    itemLists: [ItemList]
  }

  type AppData {
    root: UserCollection
  }

  type TempCollection {
    name: String
    username: String
  }

  type TempAppData {
    root: TempCollection
  }

  type ItemList {
    id: ID!
    name: String!
    items: [Item]!
  }

  type Item {
    id: ID!
    createdAt: String
    updatedAt: String
    name: String!
    description: String
    tags: [String]
    itemType: ItemType!
    itemDate: String
    duration: Int
  }

  enum ItemType {
    TASK
    ACTIVITY
  }

  input CreateItemInput {
    itemListId: String!
    userId: String!
    name: String!
    itemType: ItemType!
    pending: Boolean
    description: String
    tags: [String]
    itemDate: Int
    duration: Int
  }

  type Query {
    getAllItems: [Item]
    findItem(id: ID!): Item
    getAppData(userId: ID!): TempAppData
  }

  type Mutation {
    createItem(input: CreateItemInput): Item
  }
`;
