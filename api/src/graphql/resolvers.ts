import { CallbackError } from 'mongoose';
import Items, { CreateItemInput, Item } from '../db/models/Item';
import Tags from '../db/models/Tag';

export default {
  Query: {
    getAllItems: (_: unknown) => {
      return new Promise((resolve, reject) => {
        Items.find((err, items) => {
          if (err) reject(err);
          else resolve(items);
        });
      });
    },
    findItem: (_: unknown, { id }: { id: string }) => {
      return new Promise((resolve, reject) => {
        Items.findOne({ _id: id }, (err: CallbackError, items: Item[]) => {
          if (err) reject(err);
          else resolve(items);
        });
      });
    },
  },
  Mutation: {
    createItem: (_: unknown, { input }: { input: CreateItemInput }) => {
      const item = new Items({
        name: input.name,
        description: input.description,
        createdAt: Math.round(Date.now() / 1000),
      });

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
