# Tasktivities
A task and activity manager... a fancy todo list. Mostly a reason for me to better myself.

## Graph Structure

```typescript
type AppSchema = {
User: {
email: string;
password: string;
Collections: {
name: string;
Lists: {
name: string;
Items: {
name: string;
      description?: string;
itemType: 'task' | 'activity';
          itemDate?: number;
          itemDuration?: number;
Tags: {
name: string;
      }[]
       }[]
       }[]
             }[]
      }
}
```

Maybe we'd be better off modeling this at the DB level first.

Assumptions:
- The user model should't have the bulk of the user's app-data nested in it
- Nesting collection all the way down to tags is excessive
- User can have groups
- Lists can have a single group reference
- I guess, really, I just don't know how mongo is "supposed" to be formatted
- I should look at the delivery first database

