import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SmallPlayIcon from "../Icons/SmallPlayIcon";
import PauseIcon from "../Icons/PauseIcon";

const AlbumSearch = () => {
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

        const uniqueAlbumData = res.map((albumName) => {
            return data.find((album) => album[name].name === albumName); // Return the full album object
        });

        console.log("Unique albums: ", uniqueAlbumData);

        return uniqueAlbumData;

    }

    const uniqueAlbum = getUniqueAlbum(result, "album");


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
                    {uniqueAlbum &&
                        uniqueAlbum.map((song, index) => (
                            <div className="d-flex " key={index}>

                                <div className="hvr-grey rounded p-2 ">

                                    <div className="pb-2">
                                        <img src={song?.album?.image} alt="album cover" className="rounded " height={185} width={195} />

                                    </div>
                                    <div className="text-wrap w-175" >{song?.album?.name}</div>


                                     <div key={index} className="text-grey text-wrap w-175">{song?.artist?.name}</div>

                                  

                                </div>

                            </div>
                        ))}
                </div>

            </div>
        </>
    );
};

export default AlbumSearch;
