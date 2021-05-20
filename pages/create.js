import {useState} from 'react';
import {useRouter} from 'next/router'
import {create} from '../media/apiPost';
import {isAuthenticated} from '../users/apiUsers';

const Create = props => {
	const router = useRouter();
	const [values, setValues] = useState({
		title: '',
		description: '',
		video: '',
		genre: ''
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
		create(userId, formData).then(res => {
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
				<input type="file" name='video' accept='videos/*' className='form-control-file mb-3' onChange={handleChange} />
				
				<input type="text" name='genre' className='form-control mb-3' value={values.genre} onChange={handleChange} placeholder='Genre' />
				<button className='btn btn-primary'>Create</button>
			</form>
		</div>
	)
}

export default Create;