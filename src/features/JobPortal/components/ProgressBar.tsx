import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar({show}:{show:boolean}) {
  return (
    <Box sx={{ width: '100%' }}>
      {show && <LinearProgress />}
    </Box>
  );
}