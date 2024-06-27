import { Button, Grid, IconButton } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import EditCategory from './EditCategory';
import { Category } from '../type';

interface CategoryListType {
  categoryArr: Category[];
  setCategoryArr: React.Dispatch<React.SetStateAction<Category[]>>;
  color: string;
}

const CategoryList: React.FC<CategoryListType> = ({
  categoryArr,
  setCategoryArr,
  color,
}) => {
  const [editIdx, setEditIdx] = useState<number>(-1);

  const showEditCategory = (idx: number) => {
    editIdx === idx ? setEditIdx(-1) : setEditIdx(idx);
  };

  return (
    <>
      <Grid sx={{ width: '70%' }}>
        {categoryArr &&
          categoryArr.map((cate: any, idx: number) => (
            <Grid sx={{ display: 'flex', flexDirection: ' column' }} key={idx}>
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  mt: 3,
                }}
                key={idx}
              >
                <Grid
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    sx={{
                      color: cate.color,
                      backgroundColor: 'lightgray',
                      borderRadius: 20,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                    onClick={() => {
                      showEditCategory(idx);
                    }}
                  >
                    {cate.category}
                  </Button>
                  <Grid>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        showEditCategory(idx);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        const newCategoryArr = categoryArr.filter(
                          (item: any) =>
                            item.category !== categoryArr[idx].category,
                        );
                        setCategoryArr(newCategoryArr);
                        localStorage.setItem(
                          'categoryArr',
                          JSON.stringify(newCategoryArr),
                        );
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                {editIdx === idx && (
                  <>
                    <EditCategory
                      color={color}
                      categoryArr={categoryArr}
                      cate={cate}
                      idx={idx}
                      setEditIdx={setEditIdx}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default CategoryList;
