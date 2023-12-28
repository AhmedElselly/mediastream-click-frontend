import {useState} from 'react';
import {useRouter} from 'next/router';
import {login, authenticate} from '../users/apiUsers';

const Login = props => {
	const router = useRouter();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const [loaded, setLoaded] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		login(email, password).then(res => {
			console.log(res.data);
			authenticate(res.data, () => {
				console.log('user logged in');
				setMessage('user logged in and redirecting...');
				setLoaded(true);
			})
		})
	}

	const handleChange = e => {
		if(e.target.name === 'email'){
			setEmail(e.target.value)
		}
		if(e.target.name === 'password'){
			setPassword(e.target.value)
		}
	}

	if(loaded){
		router.push('/medias')
	}

	return(
		<div className='container'>
			{message && (
				<div className='alert alert-success'>
					{message}
				</div>
			)}
			<h1>Login</h1>
			<form className='form-group' onSubmit={handleSubmit}>

				<input type="email" placeholder='Email' className='form-control' name='email' value={email} onChange={handleChange}/>
				<input type="password" placeholder='Password' className='form-control' name='password' value={password} onChange={handleChange}/>
				<button className='btn btn-success' >{loaded ? ('Loading...') : ('Login')}</button>
			</form>
		</div>
	)
}

export default Login;