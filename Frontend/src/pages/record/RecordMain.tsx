import { Grid, IconButton } from '@mui/material';
import RecordTime from './RecordTime';
import TimeTable from './TimeTable';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const RecordMain: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <IconButton
        className="flex mb-5"
        aria-label="back"
        color="inherit"
        onClick={() => {
          navigate('/');
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Grid className="w-screen flex flex-col items-center md:items-stretch xl:items-center md:ml-5 pr-3">
        <RecordTime />
        <TimeTable />
      </Grid>
    </>
  );
};

export default RecordMain;
