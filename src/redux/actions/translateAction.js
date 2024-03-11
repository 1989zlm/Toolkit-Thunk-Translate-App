import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { languageOptions } from "../../constants";


// asenkron thunk aksiyonları (dillerin apiden gelişi)
export const getLanguages = createAsyncThunk('language/getLanguages', async () => {
    // const options = {
    //     method: 'GET',
    //     url: 'https://text-translator2.p.rapidapi.com/getLanguages',
    //     headers: {
    //       'X-RapidAPI-Key': 'ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63',
    //       'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    //     }
    //   };//!bunu buradan alıp indexte yazdık
    //apiden dil verilerini al
    const res = await axios.request(languageOptions);
    // console.log(res.data.data.languages);//!bu işlemden sonra app.jsxte dispach ile reducera haber verdik

    //aksiyonun payloadını belirle return 'res.data yani payload'
    return res.data.data.languages; //bu işlemden sonra ise languageslice gidip extrareducerda state in nasıl değişeceğine karar veriyoruz.
});

// çeviri için api isteği atmak için

export const translateText = createAsyncThunk('translate/translateText',
    async (action_params) => {
        //aksiyonu dispatch ederken gönderilen parametrelere erişme
        const { sourceLang, targetLang, text } = action_params;

        // console.log(sourceLang);
        // console.log(targetLang);
        // console.log(text);
        // params.set('source_language', 'en');
        // params.set('target_language', 'tr');
        // params.set('text', 'What is your name?'); //!böyleydi dinamik yaptık
        //gçnderilecek parametreleri belirle
        const params = new URLSearchParams();
        params.set('source_language', sourceLang.value);
        params.set('target_language', targetLang.value);
        params.set('text', text);

        //axios istek ayarlarını belirle

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: params,
        };

        //axios isteği at
        const res = await axios.request(options);
        console.log(res.data.data.translatedText)

        // return 'payload';bunu veri gelince değiştiriyoruz.
        return res.data.data.translatedText;
    })