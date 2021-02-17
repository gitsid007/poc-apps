import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './autosearch.scss';

import MoviesList from './movieslist';

const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

const AutoSearch = () => {

    const [movies, setMovies] = useState(null);

    const debounceOnChange = useCallback(debounce(onSearch, 500), []);

    function onSearch(val) { 
        axios.get(`http://localhost:4000/movies?q=${val}`)
            .then(res => {
                setMovies(res.data);
            })
            .catch(error => {
            console.log("ERROR", error);
        });
    }

    return (
        <div className="container">
            <div className="container-name">
                <h1>Auto Search Bar</h1>
            </div>
            <input type="text" className="input" onChange={(e) => debounceOnChange(e.target.value)} placeholder="search" />
            <MoviesList list={movies} />
        </div>
    );

}


export default AutoSearch;
