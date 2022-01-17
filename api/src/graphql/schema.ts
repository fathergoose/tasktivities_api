import { gql } from 'apollo-server-express';

export default gql`
  type Item {
    id: ID!
    createdAt: Int!
    name: String!
    description: String
    tags: [Tag]
    itemType: ItemType
    itemDate: Int
    duration: Int
  }

  type Tag {
    id: ID!
    name: String!
  }

  enum ItemType {
    TASK
    ACTIVITY
  }

  input ItemInput {
    id: ID
    name: String!
    description: String
    tags: [TagInput]
    itemType: ItemType
    itemDate: Int
    duration: Int
  }

  input TagInput {
    id: ID
    name: String
  }

  type Query {
    getAllItems: [Item]
    findItem(id: ID): Item
    getAllTags: [Tag]
  }

  type Mutation {
    createItem(input: ItemInput): Item
  }
`;
