import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
};

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearItems: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearItems } = itemSlice.actions;
export default itemSlice.reducer;
