import { createStore } from 'redux'
import rootReducer from './reducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage
}
export const store = createStore(persistReducer(persistConfig, rootReducer))
export const persistor = persistStore(store)