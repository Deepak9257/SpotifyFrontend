import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = ({file}) => (
 <>
 
 
 {/* <audio src={file} controls>
    
    
 </audio>  */}
    
    
   <AudioPlayer
    autoPlay
    src={file} 
    onPlay={e => console.log("onPlay",file)}

    // other props here
  />
    </> 
);

export default Player;