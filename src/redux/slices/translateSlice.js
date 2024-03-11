import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions/translateAction";


const initialState = {
    isLoading: false,
    isError: false,
    text: '',
};


const translateSlice = createSlice({
    name: 'translate',
    initialState,
    //senkron aksiyon için yazılan reducer
    reducers: {
        //payload değerini texte aktar aşağıda da export ettik
        updateText: (state, action) => {
            state.text = action.payload;
        },
    },
    //asenkron aksiyonlar için
    extraReducers: (builder) => {
        builder.addCase(translateText.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(translateText.rejected, (state, action) => {
            alert(
                'işlem gerçekleşirken bir sorun oluştu lütfen daha sonra tekrar deneyiniz'
            )
            state.isLoading = false;
            state.isError = action.payload;
        });
        builder.addCase(translateText.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.text = action.payload
        })

    },
});

export default translateSlice.reducer;
export const { updateText } = translateSlice.actions;