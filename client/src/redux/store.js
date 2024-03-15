import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
// import persistStore from 'redux-persist/es/persistStore';

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
});


// const rootReducer = combineReducers({
//     user: userReducer,
// });

// const persistConfig = {
//     key: 'root',
//     storage,
//     version: 1,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);


// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) => 
//         getDefaultMiddleware({ serializableCheck: false })
// });

// export const persistor = persistStore(store);