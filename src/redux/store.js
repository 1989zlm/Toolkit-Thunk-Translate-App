import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/languageSlice";
import translate from "./slices/translateSlice";





export default configureStore({ reducer: { language, translate } })


// export default configureStore({ reducer: { languageReducer, translateReducer } })diyede yazabilirdik kısalttık