import { ObjectId } from 'mongodb';
import { Callback, CallbackError } from 'mongoose';
import AppUsers from '../db/models/Users';
import Items from '../db/models/Item';
import ItemLists from '../db/models/ItemList';
import UserCollections from '../db/models/UserCollection';

export type Item = {
  id: string;
  name: string;
  itemType?: string;
  tags: string[];
  description?: string;
  itemDate?: Date;
  duration?: number;
  createdAt: Date;
};

export type CreateItemInput = {
  itemListId: string;
  userId: string;
  name: string;
  itemType: string;
  pending?: boolean;
  tags?: string[];
  description?: string;
  itemDate?: Date;
  duration?: number;
};

export type ItemList = {
  id: string;
  name: string;
  items: Item[];
}

  
export type UserCollection = {
  id: string;
  name: string;
  childCollections: UserCollection[];
  childItemLists: ItemList[];
  userId: AppUser;
};

type AppUser = {
  username: string;
  password: string;
  email: string;
};

export default {
  Query: {
    Items: (_: unknown) => {
      return new Promise((resolve, reject) => {
        Items.find((err, items) => {
          if (err) reject(err);
          else resolve(items);
        });
      });
    },

    Item: (_: unknown, { id }: { id: string }) => {
      return new Promise((resolve, reject) => {
        Items.findOne({ _id: id }, (err: CallbackError, items: Item[]) => {
          if (err) reject(err);
          else resolve(items[0]);
        });
      });
    },

    ItemList: (_: unknown, { id }: { id: string }) => {
      return new Promise((resolve, reject) => {
        ItemLists.findOne({ _id: id })
          .populate({ path: 'items', model: 'Items' })
          .exec((err: CallbackError, list: ItemList) => {
            if (err) reject(err);
            else resolve(list);
          });
      });
    },
    RootUserCollection: (_: unknown, { user_id }: { user_id: string }) => {
      return new Promise((resolve, reject) => {
        UserCollections.find({ userId: user_id })
          .populate({ path: 'childCollections', model: 'UserCollections' })
          .populate({ path: 'itemLists', model: 'ItemList' })
          .populate({ path: 'items', model: 'Items' })
          .exec((err: CallbackError, items: Item[]) => {
            if (err) reject(err);
            else resolve(items);
          });
      });
    },
    UserCollection: (_: unknown, { id }: { id: string }) => {
      return new Promise((resolve, reject) => {
        UserCollections.findOne({ _id: id })
          .populate({ path: 'childCollections', model: 'UserCollections' })
          .exec((err: CallbackError, collection: UserCollection) => {
            if (err) reject(err);
            else resolve(collection);
          });
      });
    },
    ChildItemLists: (parent: UserCollection) => {
      return new Promise((resolve, reject) => {
        ItemLists.where({ userCollectionId: parent.id })
          .populate({ path: 'items', model: 'Items' })
          .exec((err: CallbackError, lists: ItemList[]) => {
            console.log(lists);
            if (err) reject(err);
            else resolve(lists);
          });
      });

    }
  },
  UserCollection: {
    childItemLists: (parent: UserCollection) => {
      return new Promise((resolve, reject) => {
        ItemLists.where({ userCollectionId: parent.id })
          .populate({ path: 'items', model: 'Items' })
          .exec((err: CallbackError, lists: ItemList[]) => {
            if (err) reject(err);
            else resolve(lists);
          });
      });
    }

  },

  Mutation: {
    createItem: (_: unknown, { input }: { input: CreateItemInput }) => {
      const item = new Items(input);

      item.id = item._id;

      return new Promise((resolve, reject) => {
        item.save((err: CallbackError) => {
          if (err) reject(err);
          else resolve(item);
        });
      });
    },
  },
};
