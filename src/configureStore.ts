import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./features/product/productSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1
};

const rootReducers = combineReducers({
  product: productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default () => {
  let store = configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    reducer: persistedReducer,
  })

  let persistor = persistStore(store)
  return { store, persistor }
}
