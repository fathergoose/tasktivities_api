import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Item } from '../../pages/Workspace';
import ChipsArray, { ChipData } from '../ChipArray';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

type FocusedItemProps = {
  item: Item;
};

const CenteredCardActions = styled(CardActions)`
  justify-content: center;
`;

export default function FocusedItem({ item }: FocusedItemProps) {
  const tagChipData = item.tags.map(
    (tag, index) => ({ key: index, label: tag } as ChipData),
  );
  const [chipData, setChipData] = useState<ChipData[]>(tagChipData);
  const [expanded, setExpanded] = useState(false);
  const extraFields = ['id', 'createdAt', 'updatedAt', 'itemDate', 'duration'];
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant='h6'
          component='div'
          color={item.state === 'PENDING' ? 'text.primary' : 'text.disabled'}
        >
          <Checkbox checked={item.state === 'COMPLETED'} />
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
      <CenteredCardActions>
        <Button size='large' onClick={() => setExpanded(!expanded)}>
          •••
        </Button>
      </CenteredCardActions>
      {expanded && (
        <CardContent>
          <List dense>
            {extraFields.map(field => {
              return (
                <ListItem>
                  <ListItemText
                    primary={field}
                    secondary={item[field as keyof Item] || '-'}
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      )}
    </Card>
  );
}
