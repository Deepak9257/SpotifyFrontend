import { NavLink, useParams, useLocation, Link } from "react-router-dom";

const SearchNav = () => {



    const { q } = useParams()
    const query = q || ""
    

    console.log("query:",query)


    return (
        <>


           { query && <div className="d-flex column-gap-3 btn-div py-3 px-5 sticky-top" style={{ backgroundColor: "#121212" }}>
                <div>
                    <NavLink
                        to={`/search/${query}`}
                        end 
                        className={({ isActive }) => isActive ? "searchNav" : ""}
                    >
                        <button className="text-white rounded-pill py-1">
                            All
                        </button>
                    </NavLink>
                </div>

                <div>

                    <NavLink to={`/search/${query}/song`} className={({ isActive }) => {
                        return isActive ? "searchNav" : ""
                    }} >
                        <button className="text-white rounded-pill py-1">Songs</button>
                    </NavLink>
                </div>

                <div>
                    <NavLink to={`/search/${query}/album`} className={({ isActive }) => isActive ? "searchNav" : ""}>
                        <button className="text-white rounded-pill py-1">Albums</button>
                    </NavLink>
                </div>
                <div>
                    <NavLink to={`/search/${query}/artist`} className={({ isActive }) => {
                        return isActive ? "searchNav" : ""
                    }}>
                        <button className="text-white rounded-pill py-1">Artists</button>
                    </NavLink>
                </div>
            </div>}

        </>
    )
}

export default SearchNav;