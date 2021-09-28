import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchSearchMovie, fetchSuggestionMovie, selectStateAutcomplete, selectStateMovie, setAutocompleteState, setSearchValue } from '../../reducers/movieReducers';
import '../../App.css';

const AutoComplete = (props) => {
    const dispatch = useDispatch();
    const {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
    } = useSelector(selectStateAutcomplete);

    const wrapperRef = React.useRef(null);
    // let timer = null;
    const {searchValue} = useSelector(selectStateMovie);

    const closeSuggestion = () => {
        dispatch(setAutocompleteState({
            activeSuggestion:0,
            showSuggestions: false,
        }));
    }

    // Show suggestion every time value in input changed
    const onChange = e => {
        // clearTimeout(timer);
        // timer = setTimeout(() => {
        const value = e.target.value;
        dispatch(setSearchValue(value));
        if(!value) {
            dispatch(setAutocompleteState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
            }))
            return;
        }
        dispatch(fetchSuggestionMovie(value));
        // }, 1000)
    }

    // Show suggestion everytim input clicked
    const onClickInput = (e) => {
        dispatch(setAutocompleteState({
            showSuggestions: true,
        }))
    }

    // Handle keyboard event when user press down, up, esc, and enter
    const onKeyDown = (e) => {
        if(e.keyCode === 13) {
            const tempSearchValue = (activeSuggestion < 0 || activeSuggestion > filteredSuggestions.length) ? searchValue : filteredSuggestions[activeSuggestion];
            dispatch(setSearchValue(tempSearchValue));
            if(![null,undefined,""].includes(tempSearchValue))
                dispatch(fetchSearchMovie({searchValue: tempSearchValue, page: 1}));
            closeSuggestion();
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            dispatch(setAutocompleteState({
                activeSuggestion: activeSuggestion - 1
            }))
        } else if (e.keyCode === 40) {
            if (showSuggestions === false) {
                // show suggestion if down keyboard pressed
                dispatch(setAutocompleteState({
                    showSuggestions: true
                }))
            }
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                return;
            }
            dispatch(setAutocompleteState({
                activeSuggestion: activeSuggestion + 1
            }))
        } else if (e.keyCode === 27) {
            closeSuggestion();
        }
    }

    // handle if click outside component => close suggestion
    useEffect(() => {
        function handleClickOutside (event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                closeSuggestion();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrapperRef]);

    const onSuggestionClick = (value) => () => {
        dispatch(setSearchValue(value));
        if (![null,undefined,""].includes(value))
            dispatch(fetchSearchMovie({searchValue: value, page: 1}));
        closeSuggestion();
    }

    return (
        <div ref={wrapperRef}>
            <input
             value={searchValue}
             onChange={onChange}
             onKeyDown={onKeyDown}
            //  type="text"
             className="inputSearchFullWidth"
             onClick={onClickInput}
             placeholder="Type here to search"
            />
            {(showSuggestions && filteredSuggestions.length > 0) && <ul className="suggestions">
                {filteredSuggestions.map((suggest, index) => {
                    let className;
                    if (index === activeSuggestion) className = "suggestion-active";
                    return (
                        <li className={className} key={suggest+index} onClick={onSuggestionClick(suggest)}>
                            {suggest}
                        </li>
                    );
                })}
            </ul>}

            {(showSuggestions && filteredSuggestions.length === 0) && <div className="no-suggestions">
                <em>No suggestions available.</em>
            </div>}
        </div>
    )
}

export default AutoComplete