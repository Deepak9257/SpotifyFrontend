import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import songContext from "../contexts/SongContext";
import playlistContext from "../contexts/PlaylistContext";

const ArtistSearch = () => {



    const { setCurrentSong, setCurrentIndex } = useContext(songContext);
    const { setCurrentPlaylist } = useContext(playlistContext);



    const [result, setResult] = useState([]);

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = location.pathname.split("/")[2];
    console.log("song query:", query);
    useEffect(() => {
        const timer = setTimeout(() => {
            getResult();
            console.log("sending query:", query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const getResult = async () => {
        var res = await axios.get(
            `https://spotify-backend-blue.vercel.app/song/search/?search=` + query
        );

        res = res.data;

        setResult(res.data);
        setLoading(false);
    };


    const getUniqueAlbum = (data, name) => {
        let res = data.map((album) => {
            return album[name].name
        })

        res = [... new Set(res)]

        console.log(res)
        const uniqueData = res.map((artistName) => {
            return data.find((artist) => artist[name].name === artistName); // Return the full album object
        });

        console.log("Unique artist: ", uniqueData);

        return uniqueData;

    }

    const uniqueArtist = getUniqueAlbum(result, "artist");


    if (loading) {
        return (
            <div
                className="mx-1 p-5 justify-content-between text-center gap-2 text-white p-3 rounded overflow-auto scroll"
                style={{ backgroundColor: "#121212", height: "78vh" }}
            >
                Loading.....
            </div>
        );
    }

    if (result.length === 0 || !result) {
        return (
            <div
                className="mx-1 justify-content-between text-center gap-2 text-white p-3 rounded "
                style={{ backgroundColor: "#121212", height: "78vh" }}
            >
                <div className="fs-2 no-search ">No results found for "{query}"</div>{" "}
                <br />
                Please make sure your words are spelled correctly, or use fewer or
                different keywords.
            </div>
        );
    }

    return (
        <>
            <div className="px-4">


                <div className="d-flex flex-wrap">
                    {uniqueArtist &&
                        uniqueArtist.map((song, index) => (
                            <div className="d-flex p " key={index}>

                                <div className="hvr-grey rounded p-2 ">

                                    <div className="pb-2">
                                        <img src={song?.artist?.image} alt="artist cover" className="rounded-pill object-fit-cover " height={185} width={195} />

                                    </div>
                                    <div className="text-wrap w-175" >{song?.artist?.name}</div>


                                    <div key={index} className="text-grey text-wrap w-175">Artist</div>

                                </div>

                                <div className="play">

                                    <div className="smallPlayIcon2"
                                        onClick={() => {
                                            setCurrentPlaylist(uniqueArtist),
                                                setCurrentSong(song),
                                                setCurrentIndex(0);
                                        }}


                                    >
                                        <SmallPlayIcon />
                                    </div>

                                </div>

                            </div>
                        ))}
                </div>

            </div>
        </>
    );
};

export default ArtistSearch;
