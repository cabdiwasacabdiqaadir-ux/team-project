import { createSlice } from '@reduxjs/toolkit';
import { books } from '../data/books';

// Load from local storage if needed, otherwise use mock data
const loadBooks = () => {
    const saved = localStorage.getItem('library_books');
    if (saved) return JSON.parse(saved);
    return books;
};

const initialState = {
    books: loadBooks(),
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push({ ...action.payload, id: Date.now() });
            localStorage.setItem('library_books', JSON.stringify(state.books));
        },
        removeBook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
            localStorage.setItem('library_books', JSON.stringify(state.books));
        },
    },
});

export const { addBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
