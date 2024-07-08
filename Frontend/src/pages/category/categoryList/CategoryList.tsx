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

  const deleteCategory = (idx: number) => {
    const newCategoryArr = categoryArr.filter(
      (item: any) => item.category !== categoryArr[idx].category,
    );
    setCategoryArr(newCategoryArr);
    localStorage.setItem('categoryArr', JSON.stringify(newCategoryArr));
  };

  return (
    <>
      <Grid className="w-2/3 min-w-64 max-w-3xl">
        {categoryArr &&
          categoryArr.map((cate: any, idx: number) => (
            <Grid className="flex flex-col" key={idx}>
              <Grid className="flex flex-col items-start mt-5" key={idx}>
                <Grid className="w-full flex justify-between">
                  <Button
                    className="bg-gray-300 rounded-3xl text-lg font-bold"
                    sx={{
                      color: cate.color,
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
                        deleteCategory(idx);
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
