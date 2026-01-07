import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
    const saved = localStorage.getItem('library_wishlist');
    return saved ? JSON.parse(saved) : [];
};

const initialState = {
    items: loadWishlist(),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            // Check if already exists
            if (!state.items.find(item => item.id === action.payload.id)) {
                state.items.push(action.payload);
                localStorage.setItem('library_wishlist', JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('library_wishlist', JSON.stringify(state.items));
        },
        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem('library_wishlist');
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
