import axios from "axios";
import URL from "../helpers/URL";

export const ADD_ALL_CHARS = "ADD_ALL_CHARS";
export const ADD_ALL_TYPES = "ADD_ALL_TYPES";
export const ADD_NAME_CHARS = "ADD_NAME_CHARS";
export const ADD_PAGE_CHARS = "ADD_PAGE_CHARS";
export const FILTERANDORDER = "FILTERANDORDER";
export const CHANGE_ACTUAL_PAGE = "CHANGE_ACTUAL_PAGE";
export const CHANGE_CANT_PAGES = "CHANGE_CANT_PAGES";

export const addAllChars = (limit) => {
  const pokemonEndpoint = `${URL.BaseUrl}${URL.Pokemons}?limit=${limit}`;
  return (dispatch) => {
    axios
      .get(pokemonEndpoint)
      .then(({ data }) => {
        return dispatch({
          type: ADD_ALL_CHARS,
          payload: data,
        });
      })
      .catch((error) => {
        const { message } = error;
        return dispatch({
          type: ADD_ALL_CHARS,
          payload: message,
        });
      });
  };
};

export const addAllTypes = (types) => {
  const typesEndpoint = `${URL.BaseUrl}${URL.Types}`;
  return (dispatch) => {
    axios
      .get(typesEndpoint)
      .then(({ data }) => {
        return dispatch({
          type: ADD_ALL_TYPES,
          payload: data,
        });
      })
      .catch((error) => {
        const { message } = error;
        return dispatch({
          type: ADD_ALL_TYPES,
          payload: message,
        });
      });
  };
};

export const addPageChars = (offset, limit, filters) => {
  return (dispatch) => {
    return dispatch({
      type: ADD_PAGE_CHARS,
      payload: { offset, limit, filters },
    });
  };
};

export const addNameChars = (characters) => {
  return (dispatch) => {
    return dispatch({
      type: ADD_NAME_CHARS,
      payload: characters,
    });
  };
};

export const changeActualPage = (page) => {
  return (dispatch) => {
    return dispatch({
      type: CHANGE_ACTUAL_PAGE,
      payload: page,
    });
  };
};

export const orderAndFilterChars = (options) => {
  return async (dispatch) => {
    const { type, origin, sortBy, order } = options;
    let opciones = {};
    if (origin === "BDD") {
      const res = await axios.get(
        `${URL.BaseUrl}${URL.Pokemons}?origin=${origin}`
      );

      const pokemons = res.data;
      opciones = {
        type,
        sortBy,
        order,
        BDDChars: pokemons,
      };
      return dispatch({
        type: FILTERANDORDER,
        payload: opciones,
      });
    } else {
      opciones = {
        type,
        sortBy,
        order,
        BDDChars: false,
      };
      return dispatch({
        type: FILTERANDORDER,
        payload: opciones,
      });
    }
  };
};
