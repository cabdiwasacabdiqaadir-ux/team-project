import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import wishlistReducer from './wishlistSlice';
import readerReducer from './readerSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
        wishlist: wishlistReducer,
        reader: readerReducer,
    },
});
