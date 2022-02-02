import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Item } from '../../pages/Workspace';
import ChipsArray, { ChipData } from '../ChipArray';

type FocusedItemProps = {
  item: Item;
};

export default function FocusedItem({ item }: FocusedItemProps) {
  const tagChipData = item.tags.map(
    (tag, index) => ({ key: index, label: tag } as ChipData),
  );
  const [chipData, setChipData] = React.useState<ChipData[]>(tagChipData);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h6' component='div'>
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {item.description}
        </Typography>
        <ChipsArray
          label='Tags:&nbsp;'
          {...{ chipData }}
          {...{ setChipData }}
        />
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
