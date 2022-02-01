import { gql } from 'apollo-server-express';

export default gql`
  type UserCollection {
    name: String
    childCollections: [UserCollection]
    childItemLists: [ItemList]
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
    name: String
    description: String
    tags: [String]
    type: ItemType!
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
    item(id: ID!): Item
    itemList(id: ID!): ItemList
    userCollection(id: ID!): UserCollection
    rootUserCollection(userId: ID!): UserCollection
  }

  type Mutation {
    createItem(input: CreateItemInput): Item
  }
`;
