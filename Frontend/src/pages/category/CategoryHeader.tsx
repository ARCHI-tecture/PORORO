import { Grid, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';

interface CategoryHeaderType {
  handleOpen: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderType> = ({ handleOpen }) => {
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
    </>
  );
};

export default CategoryHeader;
