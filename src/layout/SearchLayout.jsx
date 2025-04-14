import { Outlet } from "react-router-dom";
import SearchNav from "../components/SearchNav";
import { useEffect, useState } from "react";


const SearchLayout = () => {



    return (<>


        <div className="rounded gap-2 text-white rounded-bottom scroll" style={{ backgroundColor: "#121212", height: "78vh" }}>

            <SearchNav />

           
           <Outlet />
           

        </div>



    </>)
}

export default SearchLayout;