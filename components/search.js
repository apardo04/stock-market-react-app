import React, { useState } from "react";

const Search = (props) => { 
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        console.log("handleSearchInputChanges")
        setSearchValue(e.target.value)
    }

    const resetInputField = () => { 
        setSearchValue("")
    }

    const callSearchFunction = (e) => {
        e.preventDefault()
        props.search(searchValue)
        console.log("callSearchFunction searchValue = " + searchValue)
        resetInputField()
    }

    return (
        <form className="search">
            <input value={searchValue} onChange={handleSearchInputChanges} type="text" className="py-2 px-4 border border-blue-700" />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" /> 
        </form>
    )
}

export default Search;