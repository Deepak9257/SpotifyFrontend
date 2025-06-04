import { Outlet, useNavigate } from "react-router-dom";
import SearchNav from "../components/SearchNav";
import { useEffect, useRef } from "react";
import { use } from "react";


const SearchLayout = () => {

    const navigate = useNavigate()

    const handleChange = (e) => {
        const value = e.target.value?.trim() || ""

        if (value === "") {
            navigate("/search")
        } else (
            navigate(`/search/${value}`)
        )
    }

    const inputRef = useRef(null);

    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus();
        }
    },[])


    return (<>


        <div className="mob-searchlayout rounded gap-2 text-white rounded-bottom scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>

            {/* for small screen */}
            <div className="mob-search-input sticky-top d-none">

                <input
                    ref={inputRef}
                    className="search-input p-2 rounded-pill border-0 txt w-100"
                    placeholder="What do you want to listen to?"
                    onChange={(e) => { handleChange(e); }}
                />
            </div>

            <SearchNav />

            <Outlet />


        </div>



    </>)
}

export default SearchLayout;