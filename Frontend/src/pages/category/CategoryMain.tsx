import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import AddIcon from '@mui/icons-material/Add';

import { useState } from 'react';

import AddCategory from './AddCategory';
import CategoryList from './CategoryList';
import CategoryHeader from './CategoryHeader';

export interface Category {
  category: string;
  color: string;
}

const CategoryMain: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [color, setColor] = useState('red');

  const [categoryArr, setCategoryArr] = useState<Category[]>(() => {
    const storedCategories = localStorage.getItem('categoryArr');
    return storedCategories ? JSON.parse(storedCategories) : [];
  });

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <Grid
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 6,
      }}
    >
      <CategoryHeader handleOpen={handleOpen} />

      <AddCategory
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        categoryArr={categoryArr}
        setCategoryArr={setCategoryArr}
        color={color}
        setColor={setColor}
      />

      <CategoryList
        categoryArr={categoryArr}
        setCategoryArr={setCategoryArr}
        color={color}
      />
    </Grid>
  );
};

export default CategoryMain;
