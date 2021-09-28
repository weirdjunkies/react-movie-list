import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams, Link } from 'react-router-dom';
import { fetchDetailMovie, selectStateMovie } from '../../reducers/movieReducers';
import "./style.css";


const DetailMovie = (props) => {
    const {imdbID} = useParams();
    const dispatch = useDispatch();

    const {detailMovie} = useSelector(selectStateMovie);

    const {
        Title,
        Year,
        Rated,
        Runtime,
        Poster,
        Genre,
        Plot,
        Director,
        Writer,
        Actors,

    } = detailMovie;

    useEffect(() => {
        dispatch(fetchDetailMovie(imdbID));
    }, [imdbID, dispatch]);

    return (
        <div>
            <div className="detailTitleWrapper">
                <h3><Link to="">Back</Link></h3>
                <h1 style={{margin:0}}>{Title}</h1>
                <div className="subtitleBlock">
                    <div className="subtitle">
                        <div>*{Year}</div>&nbsp;
                        <div>*{Rated}</div>&nbsp;
                        <div>*{Runtime}</div>
                    </div>
                </div>

                <div><img src={Poster} alt={Title}/></div>
                
                <div className="chip">
                    <div className="chip-content">
                        {Genre}
                    </div>
                </div>

                <p>{Plot}</p>

                <div className="roleContainer">
                    <ul>
                        <li>
                            <b>Director</b>&nbsp; <label>{Director}</label>
                        </li>
                        <li>
                            <b>Writers</b>&nbsp; <label>{Writer}</label>
                        </li>
                        <li>
                            <b>Stars</b>&nbsp; <label>{Actors}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(DetailMovie)
