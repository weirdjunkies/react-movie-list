import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import '../../App.css';
import { selectStateMovie, fetchSearchMovie } from '../../reducers/movieReducers';
import AutoComplete from './AutoComplete';
import PopUpDialog from './PopUpDialog';

const MovieList = (props) => {
    const dispatch = useDispatch();

    const {
        searchResult,
        searchValue,
        page,
        isLoading,
        isError,
        hasMore,
        totalResults,
    } = useSelector(selectStateMovie);

    const [showImage, setShowImage] = useState({
        open: false,
        src: ''
    });

    window.onscroll = () => {
        const innerHeight = Math.floor(window.innerHeight);
        const scrollTop = Math.floor(document.documentElement.scrollTop);
        const offsetHeight = Math.floor(document.documentElement.offsetHeight)

        if (isLoading) return;
        if ((innerHeight + scrollTop === offsetHeight) && hasMore) {
            const tempPage = parseInt(page) + 1;
            fetchData(tempPage);
        }
    }

    const fetchData = useCallback((page) => {
        if ([null, undefined, ""].includes(searchValue)) {
            return
        }
        dispatch(fetchSearchMovie({
            searchValue,
            page
        }));
    }, [searchValue, dispatch]);

    const onClickBtnSearch = (e) => {
        e.preventDefault();
        fetchData(1);
    }

    const openDialog = (src) => () => {
        setShowImage({
            open: true,
            src
        });
    }

    const closeDialog = () => {
        setShowImage({
            open: false,
            src: ''
        });
    }

    return (
        <>
            <PopUpDialog open={showImage.open} onClose={closeDialog}>
                <img src={showImage.src} alt={"poster"}/>
            </PopUpDialog>
            <h1 style={{textAlign: 'center'}}>React Movie</h1>

            <div className="searchContainer">
                <AutoComplete/>
                <button onClick={onClickBtnSearch}>Search</button>
            </div>

            {totalResults !== null && <><label>Total Result&nbsp;:&nbsp;</label><b>{totalResults}</b></>}

            <div className="movieListResultContainer">
                {
                    searchResult.map((movie, index) => {
                        return (
                            <div key={movie.imdbID} className="itemResultContainer">
                                <div className="posterContainer">
                                    <img className="posterMovieListResult" onClick={openDialog(movie.Poster)} src={movie.Poster} alt={movie.Title}/>
                                </div>
                                <h4 style={{margin: "6px 0px 4px"}}>
                                    <Link className="linkTitle" to={`/Detail/${movie.imdbID}`}>{movie.Title}</Link>
                                </h4>
                                <span style={{color: '#949494'}}>{movie.Year}</span>
                            </div>
                        )
                    })
                }
                {isLoading && <b>Loading...</b>}
                {isError && <h2>{isError}</h2>}
            </div>
        </>
    )
}

export default withRouter(MovieList);
