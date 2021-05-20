import {list} from '../../media/apiPost';
import {isAuthenticated} from '../../users/apiUsers';

import VideoThumbnail from "react-thumbnail-player";
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const url = 'http://localhost:8000'


const useStyles = makeStyles((theme) => ({
	root: {
    width: '100%',
    height: '100vh',
    maxWidth: 360,
    backgroundColor: '#212121',
    position: 'relative',
    overflow: 'auto',
    // maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const Medias = props => {
	const classes = useStyles();

	const generateList = () => {
		const allVideos = props.videos.map(video => {
			return(
				<div className='hovering mb-2' style={{width: '300px'}}>
					<Link key={video._id} href={`/medias/${video._id}`}>
					<Grid item xs>
			          
							
						  <VideoThumbnail
					          title={video.title}
					          message={`${video.views} views`}
					          preview={`${url}/media/video/${video._id}`}
					          width={'100%'}
					          muted={true}
					          badge={video.genre}
					          badgeBg="red"
					          classname="height-video"
					        />
						
			        </Grid>
				</Link>
				</div>
			)
		})
		return allVideos
	}
	return(
		<div className='overflow-hidden'>
			<Grid container spacing={2}>
				<Grid item xs={2}>
		          <List className={classes.root} subheader={<li />}>
				      
				      <ul className={classes.ul}>
					      <ListSubheader>
						      <Link href={`/`}>
							      <a className='nav-link'>
							      	<ListItemText primary={`Home`} />
							      </a>
						      </Link>
					      </ListSubheader>
					      <ListItem>
					      {isAuthenticated() && (
					      	<Link href={`/user/${isAuthenticated().user._id}`}>
						      <a className='nav-link'>
						      	<ListItemText primary={`Your Videos`} />
						      </a>
					      	</Link>
				      		)}
	                
			              </ListItem>
		              </ul>
				    {isAuthenticated() && (
				    	<Link href={`/user/${isAuthenticated().user._id}`}><a className='nav-link'></a></Link>
			      	)}
				    </List>
		        </Grid>
		        <Grid item xs={10}>
		         	<h3>Videos</h3>
		          <div className='row'>
		          	{generateList()}
		          </div>
		        </Grid>
			</Grid>
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const res = await list();
	return {props: {videos: res.data}};
}

export default Medias;