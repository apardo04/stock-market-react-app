import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons'

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
        <div className="flex justify-center">
            <form className="search top-0 mt-16">
                <div className="search-icon">
                    <FontAwesomeIcon icon={faSearch} color="black" />
                </div>
                <input placeholder="Search" value={searchValue} onChange={handleSearchInputChanges} type="text" className="py-2 px-4 pl-10 border border-blue-700 rounded-full outline-none text-black" />
                <div className="arrow-right" onClick={callSearchFunction}>
                    <FontAwesomeIcon icon={faArrowRight} color="black" />
                </div>
                <input type="submit" className="hidden" onClick={callSearchFunction} />
            </form>
        </div>
    )
}

export default Search;