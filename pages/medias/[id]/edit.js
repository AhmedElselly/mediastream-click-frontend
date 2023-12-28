import {useState} from 'react';
import {useRouter} from 'next/router'
import {read, update} from '../../../media/apiPost';
import {isAuthenticated} from '../../../users/apiUsers';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const Edit = props => {
	const classes = useStyles();
	const router = useRouter();
	const [values, setValues] = useState({
		title: props.video.title,
		description: props.video.description,
		video: '',
		genre: props.video.genre
	})

	const [message, setMessage] = useState('');
	const [mediaId, setMediaId] = useState('');
	const [loaded, setLoaded] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		const formData = new FormData();
		const {title, description, video, genre} = values;
		formData.append('title', title);
		formData.append('description', description);
		formData.append('video', video);
		formData.append('genre', genre);
		const userId = isAuthenticated().user._id;
		update(userId, formData).then(res => {
			console.log(res.data);
			setMediaId(res.data._id)
			setMessage('Video has been created. Redirecting...')
			setLoaded(true);
		})
	}

	const handleChange = e => {
		const value = e.target.name === 'video' ? e.target.files[0] : e.target.value;
		setValues({...values, [e.target.name]: value});
	}

	if(loaded){
		router.push(`/medias/${mediaId}`)
	}

	return(
		<div className='container'>
			{message && (
				<div className='alert alert-success'>
					{message}
				</div>
			)}
			<h1>Create Video</h1>
			<form className='form-group' onSubmit={handleSubmit}>
				<input type="text" name='title' className='form-control mb-3' value={values.title} onChange={handleChange} placeholder='Title' />
				<input type="text" name='description' className='form-control mb-3' value={values.description} onChange={handleChange} placeholder='Description' />
				
				<input
			        accept="videos/*"
			        className={classes.input}
			        id="contained-button-file"
			        multiple
			        name='video'
			        onChange={handleChange}
			        type="file"

			      />
			      <label htmlFor="contained-button-file">
			        <Button variant="contained" color="primary" component="span">
			          Upload
			        </Button>
			      </label>
			      
				<input type="text" name='genre' className='form-control mb-3 mt-3' value={values.genre} onChange={handleChange} placeholder='Genre' />
				<button className='btn btn-primary'>Create</button>
			</form>
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const videoId = await ctx.query.id;
	const res = await read(videoId);

	return {props: {
		video: res.data
	}}
}

export default Edit;