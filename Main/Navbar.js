import {Fragment} from 'react';
import Link from 'next/link';
import {isAuthenticated, logout} from '../users/apiUsers';

const Navbar = props => {
	return(
		<nav className="navbar navbar-expand-lg background-purple-alpha navbar-dark white">
		  <div className="container-fluid">
		  	<Link className="navbar-brand white" href='/'>
		   	 Click
		    </Link>
		    <button className="navbar-toggler white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon white"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarSupportedContent">
		      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
		        <Link href='/' className="nav-link active white">
		          Home
		        </Link>
		        <Link href='/medias' className="nav-link active white">
		          Medias
		        </Link>
		        {isAuthenticated() && (
		        	<Fragment>
		        		<Link href={`/user/${isAuthenticated().user._id}`} className="nav-link white">
				          {isAuthenticated().user.username}
				        </Link>
				        <Link href='/create' className="nav-link white">
				          Create Video
				        </Link>	
				        <Link href='/login' className="nav-link white">
				          <span onClick={e => logout(() => {
				          	console.log('user logged out')
				          })} >Logout</span>
				        </Link>	
		        	</Fragment>
	        	)}

	        	{!isAuthenticated() && (
	        		<Fragment>
		        		<Link href='/login' className="nav-link white">
				          Login
				        </Link>
				        <Link href='/register' className="nav-link white">
				          Register
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