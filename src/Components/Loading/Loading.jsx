import './loading.scss';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
	return (
		<div className='loading'>

			<div className="loadinWrap">
			<h2 className='loadHead'>Uploading symptoms to AI</h2>
			<h2 className='loadText'>Just a heartbeat away from your results</h2>
			</div>



    <Box className='loadingBar' sx={{ width: '100%' }}>
      <LinearProgress color="inherit" />
    </Box>
	

		</div>
	);
};

export default Loading;