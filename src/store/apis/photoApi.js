import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";


const photoApi = createApi({
    reducerPath: 'photoApi',
    baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:3005'}),
    endpoints: (builder) => {
        return {
           
            getPhotos: builder.query({
                providesTags: (result, error, album) => {
                   
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id };
                    });
                    tags.push({ type: 'AlbumPhoto', id: album.id });
                    return tags;
                  },
                query: (album) => {
                    return {
                        url: "photos",
                        params: {
                            albumId: album.id,
                        },
                        method: "GET",
                    };
                },
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: "AlbumPhoto", id: album.id }];
                  },
                
                query: (album) => {
                    return {
                      url: "photos",
                      method: "POST",
                      body: {
                        albumId: album.id,
                        url: faker.image.urlLoremFlickr(150,150,true),
                      },
                    };
                  },
            }),
            deletePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: "Photo", id: photo.id }];
                  },
                query: (photo) => {
                    return {
                      url: `photos/${photo.id}`,
                      method: "DELETE",
                    };
                  },
            })

        }
    }
    
})

export const { useGetPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photoApi;
export { photoApi };