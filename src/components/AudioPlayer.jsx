import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PauseIcon from '../Icons/PauseIcon';
import MusicPlayIcon from '../Icons/MusicPlayIcon';
import './index.css';




const Player = ({file}) => (
 <>
 

   <AudioPlayer
    autoPlay
    src={file} 
    onPlay={e => console.log("onPlay",file)}
    onClickNext={e => console.log("next")}
    onClickPrevious={e => console.log("previous")}
    showSkipControls={true}  // Show Next/Previous buttons
    showJumpControls={false}
    volume={0.5}
    customIcons={{
      play: <div className='playIcon'> <MusicPlayIcon/> </div>,
      pause: <span className='playIcon' ><PauseIcon/></span>,
      
    }}

    className='reactPlayer'
  />

    </>
);

export default Player;