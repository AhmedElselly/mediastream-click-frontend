import {useState, useEffect, useRef, Fragment} from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import {
	IconButton,
	Icon,
	LinearProgress
} from '@material-ui/core';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

const useStyles = makeStyles(theme => ({
  flex:{
    display:'flex'
  },
  primaryDashed: {
    background: 'none',
    backgroundColor: theme.palette.secondary.main
  },
  primaryColor: {
    backgroundColor: '#6969694f'
  },
  dashed: {
    animation: 'none'
  },
  controls:{
    position: 'relative',
    backgroundColor: '#ababab52'
  },
  rangeRoot: {
    position: 'relative',
    width: '100%',
    top: '2px',
    zIndex: '3456',
    '-webkit-appearance': 'none',
    backgroundColor: 'red'
  },
  videoError: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.primary.light
  }
}))

const MediaPlayer = props => {
	const classes = useStyles();
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [muted, setMuted] = useState(false);
	const [duration, setDuration] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1.0);
	const [loop, setLoop] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
	const [videoError, setVideoError] = useState(false);
	const [values, setValues] = useState({
		played: 0,
		loaded: 0, 
		ended: false
	});

	useEffect(() => {
		if(screenfull.enabled){
			screenfull.on('change', () => {
				let fullscreen = screenfull.isFullScreen ? true : false;
				setFullscreen(fullscreen);
			})
		}
	}, []);

	let playerRef = useRef(null)

	const ref = player => {
		playerRef = player;
	}


	const showVideoError = e => {
		console.log(e);
		setVideoError(true);
	}

	useEffect(() => {
		setVideoError(false);
	}, [props.srcUrl])

	const options = () => {
		return(
			<div onClick={playPause}>
				{playing ?  <PauseIcon/> : (values.ended ? (<ReplayIcon/>) : (<PlayArrowIcon/>))}
			</div>
		)
	}

	const changeVolume = e => {
		setVolume(parseFloat(e.target.value))
	}

	const playNextUrl = () => {
		return(
			<div>
				<Link href={`http://localhost:3000/${props.nextUrl}`}>
					<SkipNextIcon/>
				</Link>
			</div>
		)
	}

	const mute = () => {
		return(
			<div className='d-flex center'>
				<div onClick={toggleMute}>
					{volume > 0 && !muted && <VolumeUpIcon/> || muted && <VolumeOffIcon/> || volume === 0 && <VolumeMuteIcon/>}
				</div>
				<div className="progress" style={{marginTop: '20px'}}>
				  <div 
				  className="progress-bar bg-secondary" 
				  role="progressbar" 
				  style={{width: '100%', background: '#26C6DA'}} 
				  aria-valuenow={values.played * 100} 
				  aria-valuemin="0" 
				  aria-valuemax="100">
				  	<input type="range"
						min={0}
						max={1}
						value={values.played}
						step='any'
						value={muted ? 0 : volume}
						onChange={changeVolume}
						className='slider-volume'
					/>
				  </div>
				</div>
				
			</div>
		)
	}

	const progressLine = () => {
		return(
			<Fragment>
				{/*<LinearProgress color="primary" variant="buffer"
					value={values.played*100}
					valueBuffer={values.loaded*100}
					style={{width: '100%'}}
					classes={{
					colorPrimary: classes.primaryColor,
					dashedColorPrimary : classes.primaryDashed,
					dashed: classes.dashed
					}}
				/>*/}
				<div className="progress">
				  <div 
				  className="progress-bar bg-secondary" 
				  role="progressbar" 
				  style={{width: '100%', background: '#26C6DA'}} 
				  aria-valuenow={values.played * 100} 
				  aria-valuemin="0" 
				  aria-valuemax="100">
				  	<input type="range"
						min={0}
						max={1}
						value={values.played}
						step='any'
						onMouseDown={onSeekMouseDown}
						onChange={onSeekChange}
						onMouseUp={onSeekMouseUp}
						style={{width: '100%'}}
						className='slider'
					/>
				  </div>
				</div>
				
			</Fragment>
		)
	}

	const fullScreenIcon = () => {
		return(
			<FullscreenIcon onClick={onClickFullscreen}/>
		)
	}

	const onSeekMouseDown = e => {
		setSeeking(true)
	}

	const onSeekChange = (e) => {
		setValues({...values, played: parseFloat(e.target.value), ended: parseFloat(e.target.value) >= 1})
	}

	const onSeekMouseUp = (e) => {
		setSeeking(false);
		playerRef.seekTo(parseFloat(e.target.value));
	}

	const onClickFullscreen = () => {
		screenfull.request(findDOMNode(playerRef))
	}

	

	const onEnded = e => {
		if(loop){
			setPlaying(true);
		} else {
			setValues({...values, ended: true});
			setPlaying(false)
		}
	}

	const playPause = e => {
		console.log(playing)
		setPlaying(!playing)
	}

	const toggleMute = e => {
		setMuted(!muted)
	}

	const onProgress = progress => {
		if(!seeking){
			setValues({...values, played: progress.played, loaded: progress.loaded})
		}
	}

	const onDuration = e => {

	}


	return(
		<div className='rounded mt-5'>
			
			<div onClick={playPause} class="card bg-dark text-white">
			  <ReactPlayer
					ref={ref}
					width={fullscreen ? '100%' : '100%'}
					height={fullscreen ? '100%' : '1000px'}
					style={fullscreen ? {position: 'relative'} : {maxHeight: '500px'}}
					config={{attribute: {style: {height: '100%', width: '100%'}}}}
					url={props.srcUrl}
					playing={playing}
					loop={loop}
					playbackRate={playbackRate}
					volume={volume}
					muted={muted}
					onEnded={onEnded}
					onError={showVideoError}
					onProgress={onProgress}
					onDuration={onDuration}
				/>
			  <div class="card-img-overlay">
			    <h5 class="card-title">{props.title}</h5>
			    
			  </div>
			</div>
				
			
			<div className='d-flex background-purple position-relative justify-content-around'
				style={{lineHeight: '50px', marginTop: '-10px'}}
			>
				<div className='d-flex'>
					{options()}
					{playNextUrl()}
				</div>
				<div style={{width: '100%', marginTop: '20px'}}>
					{progressLine()}
				</div>
				<div className='d-flex'>
					{mute()}
					<div>
					{fullScreenIcon()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MediaPlayer;