import { ACTION_TYPES } from "../actions/types";

const initialState = {
  data: [],
  loading: true,
  error: null,
  categories: [],
  authors: [],
  favorites: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.booksRequested:
      return {
        ...state,
        data: [],
        loading: true,
        error: null,
      };

    case ACTION_TYPES.booksLoaded:
      return { ...state, data: payload, loading: false, error: null };

    case ACTION_TYPES.booksError:
      return {
        ...state,
        data: [],
        loading: false,
        error: payload,
      };

    case ACTION_TYPES.addBook:
      return { ...state, data: [...state.data, payload] };

    case ACTION_TYPES.loadCategories:
      return {
        ...state,
        categories: payload,
      };

    case ACTION_TYPES.loadAuthors:
      return {
        ...state,
        authors: payload,
      };

    case ACTION_TYPES.loadFavorites:
    case ACTION_TYPES.setFavorite:
      return {
        ...state,
        favorites: payload,
      };

    case ACTION_TYPES.loadUserFavoritesBooks:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
