import { Grid } from '@mui/material';

import { useState } from 'react';

import CategoryHeader from './categoryHeader/CategoryHeader';
import CategoryList from './categoryList/CategoryList';
import { Category } from './type';

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
      <CategoryHeader
        handleOpen={handleOpen}
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
