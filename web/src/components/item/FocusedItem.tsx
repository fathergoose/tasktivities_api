import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Item } from '../../pages/Workspace';

type FocusedItemProps = {
  item: Item;
};

export default function FocusedItem({ item }: FocusedItemProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
            <Typography variant='h6' component='div'>
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {item.description}
            </Typography>
            <Typography variant='body2'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
