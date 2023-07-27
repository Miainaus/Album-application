import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/userSlice';
import { albumsApi } from './apis/albumApi';
import { photoApi } from './apis/photoApi';


export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photoApi.reducerPath]: photoApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photoApi.middleware);
    }
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export { useGetAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } from './apis/albumApi';
export { useGetPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } from './apis/photoApi';
