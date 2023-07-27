import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints: (builder) => {
    return {
      getAlbums: builder.query({
        providesTags: (result, error, user) => {
              const tags = result.map(album => {
                  return { type: "album", id: album.id }
              });
              tags.push({ type: "addAlbum", id: user.id });
              return tags;
        },
        query: (user) => {
          return {
            url: "albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "addAlbum", id: user.id }];
        },
        query: (user) => {
          return {
            url: "albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useGetAlbumsQuery, useAddAlbumMutation,useDeleteAlbumMutation } = albumsApi;
export { albumsApi };
