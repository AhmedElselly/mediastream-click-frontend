import {Fragment} from 'react';
import Link from 'next/link';
import {isAuthenticated, logout} from '../users/apiUsers';

const Navbar = props => {
	return(
		<nav className="navbar navbar-expand-lg background-purple-alpha navbar-dark white">
		  <div className="container-fluid">
		  	<Link href='/'>
		   	 <a className="navbar-brand white">Click</a>
		    </Link>
		    <button className="navbar-toggler white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon white"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarSupportedContent">
		      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
		        <Link href='/' className="nav-item">
		          <a className="nav-link active white" aria-current="page">Home</a>
		        </Link>
		        <Link href='/medias' className="nav-item">
		          <a className="nav-link active white" aria-current="page">Medias</a>
		        </Link>
		        {isAuthenticated() && (
		        	<Fragment>
		        		<Link href={`/user/${isAuthenticated().user._id}`} className="nav-item">
				          <a className="nav-link white">{isAuthenticated().user.username}</a>
				        </Link>
				        <Link href='/create' className="nav-item">
				          <a className="nav-link white">Create Video</a>
				        </Link>	
				        <Link href='/login' className="nav-item">
				          <span onClick={e => logout(() => {
				          	console.log('user logged out')
				          })} className="nav-link white">Logout</span>
				        </Link>	
		        	</Fragment>
	        	)}

	        	{!isAuthenticated() && (
	        		<Fragment>
		        		<Link href='/login' className="nav-item">
				          <a className="nav-link white">Login</a>
				        </Link>
				        <Link href='/register' className="nav-item">
				          <a className="nav-link white">Register</a>
				        </Link>	
		        	</Fragment>
        		)}	        
		      </ul>		      
		    </div>
		  </div>
		</nav>
	)
}

export default Navbar;