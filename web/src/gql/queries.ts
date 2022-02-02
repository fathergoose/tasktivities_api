import { gql } from '@apollo/client';

export const ITEM_BY_ID_QUERY = gql`
  query GetItem($id: ID!) {
    Item(id: $id) {
      id
      name
      description
      type
      itemDate
      duration
      tags
    }
  }
`;

export const ITEM_LIST_QUERY = gql`
  query GetItemList($itemListId: ID!) {
    ItemList(id: $itemListId) {
      name
      items {
        id
        name
        description
      }
    }
  }
`;

export const ROOT_USER_COLLECTION_QUERY = gql`
  query GetRootCollection($userId: ID!) {
    rootUserCollection(userId: $userId) {
      name
      childItemLists {
        name
        id
        items {
          id
          name
          description
          type
          tags
          createdAt
          updatedAt
          itemDate
          duration
          state
        }
      }
      childCollections {
        name
        id
        childItemLists {
          name
          id
          items {
            id
            name
            description
            type
            tags
            createdAt
            updatedAt
            itemDate
            duration
            state
          }
        }
        childCollections {
          name
          id
          childItemLists {
            name
            id
            items {
              id
              name
              description
              type
              tags
              createdAt
              updatedAt
              itemDate
              duration
              state
            }
          }
        }
      }
    }
  }
`;
