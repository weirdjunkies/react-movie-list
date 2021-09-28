import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    searchResult: [],
    searchValue: '',
    hasMore: false,
    page: 0,
    isLoading: false,
    isError: '',
    detailMovie: {},
    detailIsLoading: false,
    autocomplete: {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
    }
}

export const fetchSuggestionMovie = createAsyncThunk(`movie/fetchSuggestionMovie`,
    (data) => axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&s=${data}&page=1`)
)

export const fetchSearchMovie = createAsyncThunk(`movie/fetchSearchMovie`,
    (data) => axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&s=${data.searchValue}&page=${data.page}`)
)

export const fetchDetailMovie = createAsyncThunk(`movie/fetchDetailMovie`,
    (data) => axios.get(`https://www.omdbapi.com/?apikey=faf7e5bb&i=${data}`)
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setAutocompleteState: (state, action) => {
            state.autocomplete = {...current(state.autocomplete), ...action.payload};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchMovie.pending, (state, action) => {
            if(action.meta.arg.page === 1) state.searchResult = [];
            state.isLoading = true;
        })
        .addCase(fetchSearchMovie.fulfilled, (state, action) => {
            const response = action.payload.data;
            let result = [];
            if (response.Response === "True") {
                result = response.Search;
                state.isError = "";
            }
            if (response["Error"]) {
                state.isError = response["Error"];
            }
            let newSearchResult = [];

            // jika page satu jangan di append, tapi di ganti
            if (action.meta.arg.page === 1) newSearchResult = result
            else newSearchResult = [...current(state.searchResult), ...result];
            state.isLoading = false;
            state.searchResult = newSearchResult;
            if (newSearchResult.length < response.totalResults) {
                state.hasMore = true;
                state.page = action.meta.arg.page;
            } else {
                state.hasMore = false;
            }
            state.autocomplete = {
                activeSuggestion: 0,
                filteredSuggestions: state.autocomplete.filteredSuggestions,
                showSuggestions: false,
            }
        })
        .addCase(fetchSearchMovie.rejected, (state, action) => {
            state.searchResult = [];
            state.searchValue = '';
            state.hasMore = true;
            state.page = 1;
            state.isLoading = false;
            state.isError = action.error.message;
        })
        .addCase(fetchDetailMovie.pending, (state, action) => {
            state.detailMovie = {};
            state.detailIsLoading = true;
        })
        .addCase(fetchDetailMovie.fulfilled, (state, action) => {
            state.detailIsLoading = false;
            state.detailMovie = action.payload.data;
        })
        .addCase(fetchSuggestionMovie.pending, (state, action) => {
            if(!action.meta.arg)
            state.autocomplete = {
                activeSuggestion: 0,
                showSuggestions: false,
                filteredSuggestions: []
            };
        })
        .addCase(fetchSuggestionMovie.fulfilled, (state, action) => {
            if(action.payload.data.Response === "True") {
                state.autocomplete = {
                    activeSuggestion: 0,
                    filteredSuggestions: action.payload.data.Search.map((a) => a.Title),
                    showSuggestions: true,
                }
            }
        })
    }
});

export const selectStateMovie = state => state.movie;
export const selectStateAutcomplete = state => state.movie.autocomplete;

export const {
    setSearchValue,
    setSearchResult,
    setBeginFetch,
    setAutocompleteState,
} = movieSlice.actions;

export default movieSlice.reducer;