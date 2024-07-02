import { Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import AddCategory from './AddCategory';
import { CategoryHeaderPropsType } from '../type';

export interface CategoryHeaderType extends CategoryHeaderPropsType {
  handleOpen: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderType> = ({
  color,
  categoryArr,
  handleClose,
  handleOpen,
  open,
  setColor,
  setCategoryArr,
  setOpen,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid className="w-4/5 flex justify-between items-center min-w-sm">
        <IconButton
          aria-label="back"
          color="inherit"
          onClick={() => {
            navigate('/');
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography className="font-bold" variant="h5">
          카테고리
        </Typography>
        <IconButton aria-label="add" color="inherit" onClick={handleOpen}>
          <AddIcon className="text-3xl" />
        </IconButton>
      </Grid>

      <AddCategory
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        categoryArr={categoryArr}
        setCategoryArr={setCategoryArr}
        color={color}
        setColor={setColor}
      />
    </>
  );
};

export default CategoryHeader;
