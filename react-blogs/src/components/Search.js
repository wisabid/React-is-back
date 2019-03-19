import React from 'react';

const Search = (props) => {
    return (
        <span>
            <input id="search-bar" type="text" placeholder="Search text" value={props.searchval} onChange={props.searchchange}/>
        </span>
    )
}

export default Search;