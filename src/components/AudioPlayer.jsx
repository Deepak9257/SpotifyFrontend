import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PauseIcon from '../Icons/PauseIcon';
import MusicPlayIcon from '../Icons/MusicPlayIcon';
import './index.css';
import PreviousBtn from '../Icons/PreviousIcon';
import NextBtn from '../Icons/NextIcon';
import { useContext, useEffect, useRef, useState } from 'react';
import songContext from '../contexts/SongContext';
import playlistContext from '../contexts/PlaylistContext';





const Player = () => {

  const { currentSong, setCurrentSong, currentIndex, setCurrentIndex } = useContext(songContext)
  const { currentPlaylist } = useContext(playlistContext)
  const [songSrc, setSongSrc] = useState("")



  useEffect(() => {

    if (!currentSong || currentSong.length === 0) {
      return;
    }
    setSongSrc(currentSong.songfile)
    console.log('rendered')

  }, [currentSong])





  const handleNext = () => {

    if (!currentPlaylist || currentPlaylist.length === 0) {
      return;
    }

    const next = (currentIndex + 1) % currentPlaylist.length
    setCurrentIndex(next)
    setCurrentSong(currentPlaylist[next])


  };

  const handlePrevious = () => {


    if (!currentPlaylist || currentPlaylist.length === 0) {
      return;
    }

    if (currentIndex === 0) {
      setCurrentSong(currentPlaylist[currentPlaylist.length - 1])
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentSong(currentPlaylist[0]);
      }, 0)
      return
    }

    const prev = (currentIndex - 1) % currentPlaylist.length
    setCurrentIndex(prev);
    setCurrentSong(currentPlaylist[prev])

  };


  console.log("song url:", songSrc)



 
  return (

    <>



      <AudioPlayer

        autoPlay

        controls={true}
        src={songSrc}
        onPlay={e => { console.log("Playing now:", currentSong.name) }}

        onEnded={handleNext}
        onClickNext={handleNext}
        onClickPrevious={handlePrevious}

        showSkipControls={true}  // Show Next/Previous buttons
        showJumpControls={false}
        volume={0.5}
        customIcons={{
          play: <div className='playIcon btn btn-light' data-bs-toggle="tooltip">  <MusicPlayIcon /> </div>,


          pause: <div className='playIcon btn btn-light'><PauseIcon /></div>,
          previous: <div className='controls-btn'> <PreviousBtn /> </div>,
          next: <div className='controls-btn'> <NextBtn /> </div>,

        }}

        className='reactPlayer'

      />





    </>
  )
};

export default Player;