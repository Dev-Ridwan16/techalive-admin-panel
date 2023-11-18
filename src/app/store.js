import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import loadingSliceReducer from "../features/loadingSlice"
import userSliceReducer from "../features/userSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
}

const rootReducer = combineReducers({
  loading: loadingSliceReducer,
  user: userSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export default store
