import { createSlice } from '@reduxjs/toolkit';

const loadProgress = () => {
    const saved = localStorage.getItem('library_reading_progress');
    return saved ? JSON.parse(saved) : {};
};

const initialState = {
    activeBookId: null,
    progress: loadProgress(), // { bookId: { page: 1, lastRead: timestamp } }
    settings: {
        fontSize: 16,
        theme: 'light', // 'light' | 'dark'
    },
};

const readerSlice = createSlice({
    name: 'reader',
    initialState,
    reducers: {
        setActiveBook: (state, action) => {
            state.activeBookId = action.payload;
        },
        updateProgress: (state, action) => {
            const { bookId, page } = action.payload;
            state.progress[bookId] = {
                page,
                lastRead: Date.now(),
            };
            localStorage.setItem('library_reading_progress', JSON.stringify(state.progress));
        },
        updateSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload };
        },
    },
});

export const { setActiveBook, updateProgress, updateSettings } = readerSlice.actions;
export default readerSlice.reducer;
