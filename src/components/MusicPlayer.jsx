import { useContext, useEffect, useRef, useState } from "react";
import songContext from "../contexts/SongContext";
import AddIcon from "../Icons/AddIcon";
import ShuffleOff from "../Icons/shuffleOff";
import PreviousBtn from "../Icons/PreviousIcon";
import PlayIcon from "../Icons/PlayIcon";
import NextIcon from "../Icons/NextIcon";
import RepeatIcon from "../Icons/RepeatIcon";
import NowPlayingIcon from "../Icons/NowPlayingIcon";
import VolumeIcon from "../Icons/VolumeIcon";
import FullScreenIcon from "../Icons/FullScreenIcon";
import React from "react";
import PauseIcon from "../Icons/PauseIcon";
import playlistContext from "../contexts/PlaylistContext";
import RepeatOne from "../Icons/RepeatOne";
import DefaultScreenIcon from "../Icons/DefaultScreenIcon";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FastAverageColor } from 'fast-average-color';

const MyMusicPlayer = () => {


    const { currentSong,
        setCurrentSong,
        currentIndex,
        setCurrentIndex,
        songContainer,
        setSongContainer,
        fullMode,
        setFullMode,
        isPlaying,
        setIsPlaying
    } = useContext(songContext);



    const { currentPlaylist } = useContext(playlistContext)


    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(30);
    const [shuffledSongs, setShuffledSongs] = useState([]);
    const [shuffledIndex, setShuffledIndex] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [prevVolume, setPrevVolume] = useState(30);
    const [repeatAll, setRepeatAll] = useState(false);
    const [bgColor, setBgColor] = useState('hsl(0,0%,0%)');
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [lastSongChange, setLastSongChange] = useState(false);

    // use Ref hooks //

    const filledBarRef = useRef(null);
    const seekbarRef = useRef(null);
    const audioRef = useRef(null);
    const isSeeking = useRef(false);
    const volumeInputRef = useRef(null);
    const volumeFilledRef = useRef(null);
    const bufferedRef = useRef(null);
    const fullscreenModePlayer = useRef(null);
    const songImageRef = useRef(null);
    const songNameRef = useRef(null);
    const controlsRef = useRef(null);


    // dynamic fullscreen background color //


    // function to convert color format hex to hsl format//
    const HEXtoHSL = hex => {
        hex = hex.replace(/#/g, '');
        if (hex.length === 3) {
            hex = hex.split('').map(function (hex) {
                return hex + hex;
            }).join('');
        }
        var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
        if (!result) {
            return null;
        }
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        s = s * 100;
        s = Math.round(s);
        l = l * 100;
        l = Math.round(l);
        h = Math.round(360 * h);

        return {
            h: h,
            s: s,
            l: l
        };
    };
    // extract dominant color function from song image//
    useEffect(() => {
        // Initialize FastAverageColor
        const fac = new FastAverageColor();

        const extractColor = () => {
            if (songImageRef.current && fullMode) {
                // Extract the dominant color from the image using FastAverageColor
                fac.getColorAsync(songImageRef.current)
                    .then((color) => {
                        // Extract the hex color
                        const colorHex = color.hex;

                        // Convert hex to HSL
                        const colorHSL = HEXtoHSL(colorHex);

                        if (colorHSL) {
                            // console.log('Extracted HSL color:', colorHSL);
                            // You can now use colorHSL to set the background or for any other use case
                            setBgColor(colorHSL);
                        } else {
                            console.error('Failed to convert HEX to HSL');
                        }

                    })
                    .catch((error) => {
                        console.error('Error extracting color: ', error);
                    });
            }
        };

        // Wait for the image to load and then extract color
        if (songImageRef.current && songImageRef.current.complete) {
            extractColor(); // Extract color immediately if image is already loaded
        } else {
            if (songImageRef.current) {
                songImageRef.current.onload = extractColor; // Set onload handler to extract color when image loads
            }
        }

    }, [fullMode, currentSong]);

    // toggle fullscreen 

    const toggleFullscreen = () => {

        let elem = document.getElementById('music-player')

        elem.requestFullscreen = elem.requestFullscreen || elem.mozRequestFullscreen
            || elem.msRequestFullscreen || elem.webkitRequestFullscreen;

        if (!document.fullscreenElement) {
            elem.requestFullscreen().then({}).catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {

            if (document.exitFullscreen) {

                document.exitFullscreen();

            }
        }
    }

    // set fullmode state on fullscreen change by listening fullscreen change event //

    useEffect(() => {

        const handleMode = () => {
            if (document.fullscreenElement) {
                setFullMode(true);
            } else {
                setFullMode(false)
            }
        }

        document.addEventListener('fullscreenchange', handleMode)


        return () => {
            document.removeEventListener('fullscreenchange', handleMode)

        }

    }, [])

    // function for changing the range color of volume and song bar dynamically

    const handleInput = () => {
        if (seekbarRef.current && filledBarRef.current) {

            const seekbar = seekbarRef.current;
            const filledBar = filledBarRef.current;

            const value = currentTime;
            const max = isNaN(duration) ? 0 : duration;
            const percentage = (value / max) * 100;

            seekbar.style.background = `linear-gradient(to right, #1db954 ${currentTime === 0 ? 0 : percentage}%, ${fullMode ? '#76767600' : '#4d4d4d'} ${currentTime === 0 ? 0 : percentage}%)`;
            filledBar.style.width = `${currentTime === 0 ? 0 : percentage}%`;

            // console.log(currentTime, duration)

            const volumeFilledBar = volumeFilledRef.current
            const volumeInputBar = volumeInputRef.current


            const maxVolumeValue = 100;
            const volumePercantage = (volume / maxVolumeValue) * 100;

            volumeInputBar.style.background = `linear-gradient(to right, #1db954 ${isMute ? 0 : volumePercantage}%, #4d4d4d ${isMute ? 0 : volumePercantage}%)`;
            volumeFilledBar.style.width = `${isMute ? 0 : volumePercantage}%`

            // console.log(volumePercantage, volume)

        }
    };

    // dynamically change the input range color  and set the volume//
    useEffect(() => {

        handleInput();

    }, [currentTime, duration, volume, fullMode, isMute])

    // handle time update //
    const timeUpdate = () => {
        if (audioRef.current) {
            // console.log('time update')

            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration

            if (!isSeeking.current) {
                setCurrentTime(currentTime)
            }

            setDuration(duration)



        }
    }


    // listen time update function
    useEffect(() => {
        if (audioRef.current) {

            audioRef.current.addEventListener('timeupdate', timeUpdate);

            // Clean up event listener on unmount
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('timeupdate', timeUpdate);
                }
            };
        }
    }, []);


    // handle song's seekbar dynamically
    const handleSeek = (e) => {

        e.preventDefault();
        isSeeking.current = true;
        setCurrentTime(e.target.value);

        // set audio current time after mouseup to give best song output //
        const onMouseUp = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = e.target.value;
                isSeeking.current = false;
            }

            seekbarRef.current.removeEventListener('mouseup', onMouseUp);
        }

        seekbarRef.current.addEventListener('mouseup', onMouseUp);

    };

    // format the song time format in (mm:ss) 
    const formatDuration = (durationSeconds) => {
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`
    }

    // change audio source when current song changes

    useEffect(() => {
        if (audioRef.current && currentSong.songfile) {
            audioRef.current.src = currentSong.songfile;

        }
    }, [currentSong]);

    // Play the song
    const play = () => {

        if (audioRef.current) {

            audioRef.current.play();   // Play the current song
            setIsPlaying(true);

        }
    };

    // pause the song
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    // control play/pause by pressing space bar //

    useEffect(() => {

        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                if (isPlaying) {
                    pause();
                } else {
                    play();
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {

            window.removeEventListener('keydown', handleKeyDown);


        }
    }, [isPlaying])

    // toggle between play pause
    const handlePlayPause = () => {
        if (currentSong?._id) {
            if (isPlaying) {
                pause();
            } else {
                play()
            }
        }
    }

    // handle play/pause from anywhere within the app //

    useEffect(() => {

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    }, [isPlaying]);

    // change isPlaying state on currentSong changes
    useEffect(() => {
        if (currentSong._id) {
            
            if(lastSongChange){
                setLastSongChange(false);
                setIsPlaying(false);
                return;
            }

            setIsPlaying(true);

        };
    }, [currentSong])   


    // Function to handle next song next logic//

    const next = () => {

        setIsPlaying(true);

        if (!currentPlaylist || currentPlaylist.length === 0) {
            return; // Do nothing if currentPlaylist is empty or undefined
        }

        const lastSong = currentPlaylist.length > 0 ? currentPlaylist[currentPlaylist.length - 1] : shuffledSongs[shuffledSongs.length - 1]

        if (!isNextClicked && !repeatAll && currentSong === lastSong) {
            setLastSongChange(true);
            setCurrentSong(currentPlaylist.length > 0 ? currentPlaylist[0] : shuffledSongs[0]);
            setCurrentIndex(0);
            pause();
            handleInput();
            console.log('last song rendered')
            return;
        }

        // condition : "if" for shuffled playlist is on and "else" for normal playlist song  //

        if (shuffledSongs && shuffledSongs.length > 0) {

            const newShuffledIndex = (shuffledIndex + 1) % shuffledSongs.length;  // play first song if next clicked on last song

            if (currentSong === shuffledSongs[newShuffledIndex]) { // skip if next song is same after shuffled or not//

                const skipIndex = (newShuffledIndex + 1) % shuffledSongs.length;

                setShuffledIndex(skipIndex);
                setCurrentSong(shuffledSongs[skipIndex]);

            } else {
                setShuffledIndex(newShuffledIndex);
                setCurrentSong(shuffledSongs[newShuffledIndex]);
            }

        } else {

            const nextIndex = (currentIndex + 1) % currentPlaylist.length;  // play first song if next clicked on last song

            if (currentSong === currentPlaylist[nextIndex]) {

                const skipIndex = (nextIndex + 1) % currentPlaylist.length;

                setCurrentIndex(skipIndex);
                setCurrentSong(currentPlaylist[skipIndex]);

            } else {
                setCurrentIndex(nextIndex);
                setCurrentSong(currentPlaylist[nextIndex]);
            }


        }
    };

    // console.log('shuffled songs', shuffledSongs)

    // Function to handle previous song
    const previous = () => {

        if (!currentPlaylist || currentPlaylist.length === 0) {
            return; // Do nothing if currentPlaylist is empty or undefined
        }

        // logic for shuffled songs
        if (shuffledSongs && shuffledSongs.length > 0) {

            const prevIndex = (shuffledIndex - 1 + shuffledSongs.length) % shuffledSongs.length;  // Wrap around if we go before the first song

            if (currentSong === shuffledSongs[prevIndex]) {

                const skipIndex = (prevIndex - 1 + shuffledSongs.length) % shuffledSongs.length;

                setShuffledIndex(skipIndex);
                setCurrentSong(shuffledSongs[skipIndex])

            } else {
                setShuffledIndex(prevIndex);
                setCurrentSong(shuffledSongs[prevIndex]);
            }

        } else {
            // logic for normal playlist songs


            const prevIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;  // Wrap around if we go before the first song

            if (currentSong === currentPlaylist[prevIndex]) {

                const skipIndex = (prevIndex - 1 + currentPlaylist.length) % currentPlaylist.length;

                setCurrentIndex(skipIndex);
                setCurrentSong(currentPlaylist[skipIndex]);

            } else {
                setCurrentIndex(prevIndex);
                setCurrentSong(currentPlaylist[prevIndex]);
            }




        }
    };

    // volume bar logic start //

    //  mute logic //

    useEffect(() => {

        if (isMute) {
            setPrevVolume(volume);
            setVolume(0);

        } else {
            if (prevVolume == 0 && volume == 0) {
                setVolume(30);

            } else {
                setVolume(prevVolume)

            }

        }

    }, [isMute])

    // set audio current volume when volume state changes //

    useEffect(() => {

        const volumeValue = volume / 100

        if (audioRef.current) {
            audioRef.current.volume = volumeValue
        }
    }, [volume])


    // set audio current volume function // 

    const handleVolumeSeek = (e) => {
        if (volumeInputRef.current) {
            // console.log(e.target.value)
            const volumeValue = volume / 100

            if (audioRef.current) {
                audioRef.current.volume = volumeValue // set audio current volume 

                if (volume === 0 || volume === "0") {
                    setIsMute(true)
                    console.log('e.target.value =', e.target.value)
                } else {
                    setIsMute(false)
                    setPrevVolume(e.target.value);

                }
            }

            setVolume(e.target.value);

            // setPrevVolume(e.target.volume);
            // console.log(audioRef.current.volume)
        }
    }
    // volume bar logic end //


    // shuffle logic //
    const handleShuffle = (songs) => {

        if (currentSong?._id) {
            if (shuffledSongs && shuffledSongs.length > 0) { return setShuffledSongs([]) }

            for (let i = songs.length - 1; i > 0; i--) {

                const randomIndex = Math.floor(Math.random() * (i + 1));

                [songs[i], songs[randomIndex]] = [songs[randomIndex], songs[i]];
            }
            return setShuffledSongs(songs);
        }

    }



    // repeat song logic //

    const handleRepeat = () => {

        if (currentSong?._id) {

            if (!repeatAll && !isRepeat) {
                setRepeatAll(true);
            } else if (repeatAll) {
                setRepeatAll(false);
                setIsRepeat(true);
            } else {
                setRepeatAll(false);
                setIsRepeat(false);
            }

        }


    }


    // display downloaded song range using progress and buffered methods//

    const handleProgress = () => {
        if (audioRef.current) {
            const buffered = audioRef.current.buffered;
            const bufferedEnd = buffered.end(buffered.length - 1);
            const duration = audioRef.current.duration;

            if (duration > 0) {

                if (!fullMode) {
                    bufferedRef.current.style.width = ((bufferedEnd / duration) * 100) + "%"
                }
            }


        }
    }


    // animation on fullscreen for song image //

    const tl = gsap.timeline();

    useGSAP(() => {
        if (songImageRef.current && fullMode) {
            tl.from(songImageRef.current, {
                duration: 1,
                y: 100,
            })

            tl.from(songImageRef.current, {
                duration: 2,
                height: 350,
                width: 350,
            });

        }

    }, [fullMode]);

    // fade in/out animation on song image when song change //

    useGSAP(() => {
        if (songImageRef.current) {

            gsap.set(songImageRef.current, { opacity: 0 });

            gsap.to(songImageRef.current, {
                opacity: 1,
                duration: 1,
            })


            if (fullscreenModePlayer.current) {

                gsap.set('.fullscreen-bg', {
                    opacity: 1,
                });

                gsap.killTweensOf('.fullscreen-bg');

                gsap.to('.fullscreen-bg', {
                    opacity: 0,
                    duration: 3,

                });
            }
        }
    }, [currentSong, bgColor]);


    // fullscreen audio controls visibility effect //

    useEffect(() => {

        if (fullscreenModePlayer.current && fullMode) {

            const handleMouseMove = () => {
                if (controlsRef.current) {
                    controlsRef.current.style.visibility = "visible";
                    controlsRef.current.classList.add('visible'); // Add 'visible' class for smooth transition

                }
            };

            const handleMouseIdle = () => {
                if (controlsRef.current) {
                    controlsRef.current.style.visibility = "hidden"
                    controlsRef.current.classList.remove('visible'); // remove 'visible' class for smooth transition

                }
            };

            let idleTimeout;

            const resetTimer = () => {
                clearTimeout(idleTimeout);

                idleTimeout = setTimeout(() => {
                    handleMouseIdle();
                }, 1500);
            }
            // event listeners //
            fullscreenModePlayer.current.addEventListener("mousemove", handleMouseMove);
            fullscreenModePlayer.current.addEventListener("click", handleMouseMove);
            fullscreenModePlayer.current.addEventListener("mousemove", resetTimer);
            fullscreenModePlayer.current.addEventListener("click", resetTimer);

            resetTimer();

            return () => {
                if (controlsRef.current) {

                    fullscreenModePlayer.current.removeEventListener("mousemove", handleMouseMove);
                    fullscreenModePlayer.current.removeEventListener("click", handleMouseMove);
                    fullscreenModePlayer.current.removeEventListener("mousemove", resetTimer);
                    fullscreenModePlayer.current.removeEventListener("click", resetTimer);
                    clearTimeout(idleTimeout);

                }

            }
        }

    }, [fullMode])


    // function for handle next button //
    const handleNext = () => {
        setIsNextClicked(true);
    };

    useEffect(() => {

        if (isNextClicked) {
            next();
            setIsNextClicked(false);
        }
    }, [isNextClicked]);



    return <>

        {/* audio element  */}
        <audio
            ref={audioRef}
            autoPlay={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={next}
            loop={isRepeat}
            onProgress={handleProgress}
            muted={isMute}
        />



        {fullMode ?

            // fullscreen mode player
            <div id="music-player"
                style={{

                    backgroundImage: `linear-gradient(
                        180deg,
                        hsl(0deg 0% 7%) 0%,
                        hsl(${bgColor.h}deg ${bgColor.s - 14}% ${bgColor.l - 15}%) 0%,
                        hsl(${bgColor.h}deg ${bgColor.s - 14}% ${bgColor.l - 14}%) 1%,
                        hsl(${bgColor.h}deg ${bgColor.s - 14}% ${bgColor.l - 13}%) 2%,
                        hsl(${bgColor.h}deg ${bgColor.s - 14}% ${bgColor.l - 12}%) 5%,
                        hsl(${bgColor.h}deg ${bgColor.s - 14}% ${bgColor.l - 11}%) 8%,
                        hsl(${bgColor.h}deg ${bgColor.s - 14}% ${bgColor.l - 10}%) 13%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 14}% ${bgColor.l - 9}%) 18%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 14}% ${bgColor.l - 8}%) 23%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 14}% ${bgColor.l - 7}%) 30%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 14}% ${bgColor.l - 6}%) 36%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 14}% ${bgColor.l - 5}%) 43%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 14}% ${bgColor.l - 4}%) 51%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 13}% ${bgColor.l - 3}%) 58%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 12}% ${bgColor.l - 2}%) 65%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 11}% ${bgColor.l - 2}%) 71%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 10}% ${bgColor.l - 1}%) 77%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 9}% ${bgColor.l - 1}%) 83%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 8}% ${bgColor.l - 1}%) 87%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 7}% ${bgColor.l - 1}%) 91%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 6}% ${bgColor.l}%) 95%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 5}% ${bgColor.l}%) 97%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 4}% ${bgColor.l}%) 99%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s - 3}% ${bgColor.l}%) 100%,
                        hsl(${bgColor.h + 1}deg ${bgColor.s}% ${bgColor.l}%) 100%
                      )`,



                }}
                ref={fullscreenModePlayer}
                className={` ${fullMode ? 'fullmode pb-5' : 'bg-black'}  playerDiv d-flex align-items-center flex-column-reverse  px-2  text-white`}>

                <div className="fullscreen-bg"></div>

                <div className={`${fullMode ? 'fullmode-music-player' : ''}    px-2    w-100`}>

                    {/* song image */}
                    <div className="audio-info col d-flex align-items-center gap-2 user-select-none px-5">

                        {currentSong && currentSong.name ? <>

                            <div className="song-image">
                                <img ref={songImageRef}
                                    src={currentSong.image}
                                    height={150} width={150}
                                    className="rounded fade-in-element" alt="song image"
                                    crossOrigin="anonymous"
                                />
                            </div>

                            <div className="song-title px-2 ">

                                <div ref={songNameRef} className="fw-bold fs-1">{currentSong.name} </div>

                                <div className="fs-small fw-bold text-grey">{currentSong?.artist?.name}</div>

                            </div>


                        </> : null}


                    </div>

                    <div className="fullmode-controls" ref={controlsRef} >

                        {/* seekbar */}
                        <div className="song-time mt-5  d-flex align-items-center justify-content-center gap-2 px-5 my-3 w-100 text-white">

                            <div className="user-select-none ">{formatDuration(currentTime)}</div>

                            <div className="fullmode-seekbar rounded w-100">

                                <input type="range" ref={seekbarRef} id="seekbar"
                                    min="0"
                                    max={isNaN(duration) ? 0 : duration}
                                    value={currentTime}
                                    onChange={handleSeek}
                                />

                                <div className="bg-white h-100 position-absolute rounded" ref={filledBarRef} id="filledBar">  </div>
                            </div>


                            <div className="user-select-none ">{formatDuration(isNaN(duration) ? 0 : duration)}</div>

                        </div>

                        {/* audio controls */}
                        <div className="d-flex pe-3 ps-5 align-items-center " >

                            {/* add icon  */}

                            <div className={`${currentSong?._id ? 'd-flex' : 'not-allowed'}  col-2`}>
                                <span className="d-flex pressed pointer">
                                    <AddIcon fill={'#b3b3b3'} height={20} width={20} />
                                </span>
                            </div>

                            {/* play/pause controls */}
                            <div className="audio-controls col ">

                                <div className="play-pause-controls d-flex justify-content-center align-items-center gap-4">

                                    <div onClick={() => handleShuffle([...currentPlaylist])} className={`${currentSong?._id ? 'pointer ' : 'not-allowed'} ${shuffledSongs.length > 0 ? 'repeat' : 'pressed'} d-flex`}>

                                        <ShuffleOff fill={shuffledSongs.length > 0 ? "#1ed760" : "#b3b3b3"} />

                                    </div>

                                    <div onClick={previous} className={`${currentSong?._id ? 'pointer pressed ' : 'not-allowed'} d-flex`} > <PreviousBtn fill={"#b3b3b3"} /></div>

                                    <div className={`${currentSong?._id ? 'pointer bg-white toggle-pressed' : 'not-allowed bg-grey'} rounded-circle d-flex p-3`} onClick={handlePlayPause} >

                                        {isPlaying ? <PauseIcon height={20} width={20} fill={'black'} /> : <PlayIcon height={20} width={20} fill={'black'} />}

                                    </div>

                                    <div onClick={handleNext} className={`${currentSong?._id ? 'pointer pressed ' : 'not-allowed'} d-flex`}> <NextIcon fill={"#b3b3b3"} /> </div>

                                    {/* repeat btn */}

                                    <div onClick={handleRepeat} className={`d-flex repeat ${currentSong?._id ? 'pointer' : 'not-allowed'} ${!isRepeat && !repeatAll && 'pressed'}`}>

                                        {isRepeat ? <RepeatOne fill={"#1ed760"} /> : repeatAll ? <RepeatIcon fill={'#1ed760'} /> : <RepeatIcon />}

                                    </div>
                                </div>

                            </div>


                            {/* volume & other controls */}
                            <div className="other-controls  col-2 d-flex align-items-center justify-content-center gap-3">

                                <div onClick={() => setSongContainer(!songContainer)} className="pressed d-flex"> {!fullMode && <NowPlayingIcon fill={"#b3b3b3"} />}</div>


                                <div className="volume-bar d-flex align-items-center justify-content-center gap-2">

                                    <div onClick={() => { setIsMute(!isMute) }} className="pressed d-flex"> <VolumeIcon fill={'#b3b3b3'} volume={volume} /> </div>

                                    <div className="volume-input-div d-flex aling-items-center ">

                                        <div ref={volumeFilledRef} className="volume-seek-bar bg-white rounded">

                                            <input type="range" ref={volumeInputRef} id="seekbar"
                                                min={0}
                                                max={100}
                                                value={volume}
                                                step={5}
                                                onChange={handleVolumeSeek}
                                                onClick={handleVolumeSeek}
                                            />

                                        </div>
                                    </div>

                                </div>

                                <div className="pressed d-flex" onClick={() => { toggleFullscreen() }}>
                                    {fullMode ? <DefaultScreenIcon /> : <FullScreenIcon fill={'#b3b3b3'} />}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>


            </div>


            :

            // normal mode player
            <div id="music-player" className={` ${fullMode ? 'fullmode pb-5' : 'bg-black'} playerDiv d-flex align-items-center flex-column-reverse  px-2  text-white`}>

                <div key={fullMode} className={`${fullMode ? 'mb-5' : ''} playerDiv d-flex align-items-center  px-2  w-100`}>
                    <div className="audio-info col d-flex align-items-center gap-2 user-select-none">

                        {currentSong && currentSong.name ? <>
                            {/* re render the element after full mode off */}
                            {fullMode === false &&
                                <div key={fullMode} className="song-image">
                                    <img
                                        src={currentSong.image}
                                        height={56}
                                        width={56}
                                        className="rounded fade-in-element"
                                        alt="song image"
                                    />
                                </div>
                            }

                            <div className="song-title px-2 ">

                                <div className="fw-bold fs-small">{currentSong.name} </div>

                                <div className="fs-small text-secondary">{currentSong?.artist?.name}</div>

                            </div>

                            <div className={`${currentSong?._id ? 'pointer pressed d-flex ' : 'not-allowed'}`}>
                                <AddIcon fill={'#b3b3b3'} height={16} width={16} />
                            </div>
                        </> : null}


                    </div>

                    <div className="audio-controls col-6">

                        <div className="play-pause-controls d-flex justify-content-center align-items-center gap-4">

                            <div onClick={() => handleShuffle([...currentPlaylist])} className={`${currentSong?._id ? 'pointer ' : 'not-allowed'} ${shuffledSongs.length > 0 ? 'repeat' : 'pressed'} d-flex`}>

                                <ShuffleOff fill={shuffledSongs.length > 0 ? "#1ed760" : "#b3b3b3"} />

                            </div>
                            <div onClick={previous} className={`${currentSong?._id ? 'pointer pressed ' : 'not-allowed'} d-flex`} ><PreviousBtn fill={"#b3b3b3"} /></div>

                            <div className={`${currentSong?._id ? 'pointer bg-white toggle-pressed' : 'not-allowed bg-grey'} rounded-circle d-flex p-2`} onClick={handlePlayPause} >

                                {isPlaying ? <PauseIcon fill={'black'} /> : <PlayIcon fill={'black'} />}

                            </div>

                            <div onClick={handleNext} className={`${currentSong?._id ? 'pointer pressed ' : 'not-allowed'} d-flex`}><NextIcon fill={"#b3b3b3"} /></div>

                            {/* repeat btn */}

                            <div onClick={handleRepeat} className={`d-flex repeat ${currentSong?._id ? 'pointer' : 'not-allowed'} ${!isRepeat && !repeatAll && 'pressed'}`}>

                                {isRepeat ? <RepeatOne fill={"#1ed760"} /> : repeatAll ? <RepeatIcon fill={'#1ed760'} /> : <RepeatIcon />}

                            </div>
                        </div>

                        <div className="song-time d-flex align-items-center justify-content-center gap-2 w-100">

                            <div className="user-select-none fs-small text-secondary">{formatDuration(currentTime)}</div>


                            <div className="seekbar rounded w-75">

                                <input type="range" ref={seekbarRef} id="seekbar"
                                    min="0"
                                    max={isNaN(duration) ? 0 : duration}
                                    value={currentTime}
                                    onChange={handleSeek}
                                />

                                <div className="bg-white h-100 position-absolute rounded" ref={filledBarRef} id="filledBar">  </div>
                                <span ref={bufferedRef} className="buffered-range d-block rounded h-100"></span>
                            </div>

                            <div className="user-select-none fs-small text-secondary">{formatDuration(isNaN(duration) ? 0 : duration)}</div>

                        </div>
                    </div>

                    <div className="other-controls col d-flex align-items-center justify-content-center gap-3">

                        <div onClick={() => setSongContainer(!songContainer)} className={`d-flex ${songContainer ?'scale-lg' :'pressed '}`}>
                            {!fullMode && <NowPlayingIcon fill={`${songContainer ? '#1ed760' : '#b3b3b3'}`} />}
                        </div>


                        <div className="volume-bar d-flex align-items-center justify-content-center gap-2">

                            <div onClick={() => { setIsMute(!isMute) }} className="pressed d-flex"> <VolumeIcon fill={'#b3b3b3'} volume={volume} /> </div>

                            <div className="volume-input-div d-flex aling-items-center ">

                                <div ref={volumeFilledRef} className="volume-seek-bar bg-white rounded">

                                    <input type="range" ref={volumeInputRef} id="seekbar"
                                        min={0}
                                        max={100}
                                        value={volume}
                                        step={5}
                                        onChange={handleVolumeSeek}
                                        onClick={handleVolumeSeek}
                                    />

                                </div>
                            </div>

                        </div>

                        <div className="pressed d-flex" onClick={() => { toggleFullscreen() }}>
                            {fullMode ? <DefaultScreenIcon /> : <FullScreenIcon fill={'#b3b3b3'} />}
                        </div>

                    </div>
                </div>

            </div>

        }
    </>
}
export default MyMusicPlayer;

