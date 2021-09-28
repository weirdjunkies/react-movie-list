import { configureStore } from '@reduxjs/toolkit';
import movieReducers from '../reducers/movieReducers';

export const store = configureStore({
    reducer: {
        movie: movieReducers
    }
})