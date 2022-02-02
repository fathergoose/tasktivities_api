import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({
  chipData,
  setChipData,
  label,
}: {
  chipData: ChipData[];
  setChipData: React.Dispatch<React.SetStateAction<ChipData[]>>;
  label?: string;
}) {
  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips: ChipData[]) =>
      chips.filter(chip => chip.key !== chipToDelete.key),
    );
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component='ul'
    >
      {label && (
        <Typography variant='subtitle2' color='text.secondary'>
          {label}
        </Typography>
      )}

      {chipData.map(data => {
        return (
          <ListItem key={data.key}>
            <Chip
              size={'small'}
              label={data.label}
              onDelete={handleDelete(data)}
              onClick={() => {}}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
