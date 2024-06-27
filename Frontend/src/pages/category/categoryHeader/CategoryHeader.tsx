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
      <Grid
        sx={{
          width: '80%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IconButton
          aria-label="back"
          color="inherit"
          onClick={() => {
            navigate('/');
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          카테고리
        </Typography>
        <IconButton aria-label="add" color="inherit" onClick={handleOpen}>
          <AddIcon sx={{ fontSize: 32 }} />
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
