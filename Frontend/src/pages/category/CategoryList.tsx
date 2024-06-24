import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Category } from './CategoryMain';

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
  const [editedCategory, setEditedCategory] = useState<string>('');
  const sameEditedCategoryAlert = useRef<HTMLDivElement>(null);

  const showEditCategory = (idx: number) => {
    editIdx === idx ? setEditIdx(-1) : setEditIdx(idx);
  };

  const editCategory = (cate: string) => {
    setEditedCategory(cate);
  };

  useEffect(() => {
    editCategory(editedCategory);
  }, [editedCategory]);

  return (
    <>
      <Grid sx={{ width: '70%' }}>
        {categoryArr &&
          categoryArr.map((cate: any, idx: number) => (
            <Grid sx={{ display: 'flex', flexDirection: ' column' }}>
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
                    <Grid
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                        ml: 1,
                      }}
                    >
                      <TextField
                        id="standard-basic"
                        label="카테고리 수정"
                        defaultValue={cate.category}
                        variant="standard"
                        InputLabelProps={{
                          sx: {
                            fontSize: 20,
                            color: 'lightgray',
                          },
                        }}
                        InputProps={{
                          sx: {
                            fontSize: 20,
                            pt: 0.5,
                            pb: 0.5,
                          },
                        }}
                        sx={{ width: '90%', mb: 2 }}
                        onChange={(e) => {
                          editCategory(e.target.value);
                        }}
                      />
                      <Grid sx={{ display: ' flex', ml: -6 }}>
                        <IconButton
                          aria-label="color"
                          sx={{ padding: 0, color: color }}
                        >
                          <CircleIcon />
                        </IconButton>
                        <IconButton
                          color="inherit"
                          sx={{ padding: 0, color: 'lightgray' }}
                        >
                          <ArrowDropDownIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                      </Grid>
                      <Button
                        variant="contained"
                        sx={{
                          width: 50,
                          height: 40,
                          color: 'black',
                          backgroundColor: 'lightgray',
                        }}
                        onClick={() => {
                          if (
                            categoryArr.some(
                              (cate: any) => cate.category === editedCategory,
                            ) &&
                            sameEditedCategoryAlert.current
                          ) {
                            sameEditedCategoryAlert.current.style.display =
                              'block';
                          } else if (editedCategory) {
                            cate.category = editedCategory;
                            categoryArr[idx] = cate;
                            localStorage.setItem(
                              'categoryArr',
                              JSON.stringify(categoryArr),
                            );
                            setEditIdx(-1);
                          } else {
                            setEditIdx(-1);
                          }
                        }}
                      >
                        등록
                      </Button>
                    </Grid>

                    <Typography
                      ref={sameEditedCategoryAlert}
                      sx={{ ml: 1, color: 'red', display: 'none' }}
                    >
                      같은 카테고리가 있습니다!
                    </Typography>
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
