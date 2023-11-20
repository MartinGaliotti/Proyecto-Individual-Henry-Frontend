import {
  ADD_ALL_CHARS,
  ADD_ALL_TYPES,
  ADD_NAME_CHARS,
  ADD_PAGE_CHARS,
  CHANGE_ACTUAL_PAGE,
  FILTERANDORDER,
} from "./actions";

const initialState = {
  allTypes: [],
  allCharacters: [],
  orderAndFilterChars: false,
  shownCharacters: [],
  actualPage: false,
  cantPages: false,
};

const rootReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_ALL_CHARS:
      if (typeof payload === "object") {
        return {
          ...state,
          allCharacters: payload,
          actualPage: 0,
        };
      } else {
        return {
          ...state,
          actualPage: payload,
        };
      }
      break;

    case ADD_ALL_TYPES:
      if (typeof payload === "object") {
        return {
          ...state,
          allTypes: payload,
        };
      } else {
        return {
          ...state,
          allTypes: payload,
        };
      }
      break;

    case ADD_PAGE_CHARS:
      const { offset, limit, filters } = payload;
      let aux = [];
      let auxCantPages = 0;
      if (state.orderAndFilterChars && filters !== "all") {
        if (state.orderAndFilterChars.length > 12) {
          aux = [...state.orderAndFilterChars].splice(offset, limit);
          auxCantPages = state.orderAndFilterChars.length / limit - 1;
        } else {
          aux = [...state.orderAndFilterChars];
          auxCantPages = state.orderAndFilterChars.length / limit - 1;
        }
      } else {
        aux = [...state.allCharacters].splice(offset, limit);
        auxCantPages = state.allCharacters.length / limit - 1;
      }
      return {
        ...state,
        shownCharacters: aux,
        cantPages: auxCantPages,
      };
      break;

    case ADD_NAME_CHARS:
      return {
        ...state,
        orderAndFilterChars: payload,
      };
      break;

    case CHANGE_ACTUAL_PAGE:
      return {
        ...state,
        actualPage: payload,
      };
      break;

    case FILTERANDORDER:
      const { type, BDDChars, sortBy, order } = payload;
      let momentary = [];
      if (BDDChars) {
        momentary = BDDChars;
      } else {
        momentary = [...state.allCharacters];
      }
      if (type !== "nothing") {
        momentary = momentary.filter((pokemon) => {
          if (pokemon.types.includes(type)) {
            return pokemon;
          }
        });
      }

      if (sortBy === "attack" && order !== "nothing") {
        momentary = momentary.sort((a, b) =>
          order === "upward" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
        );
      } else if (sortBy === "name" && order !== "nothing") {
        momentary = momentary.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) {
            return order === "upward" ? 1 : -1;
          }
          if (a[sortBy] < b[sortBy]) {
            return order === "upward" ? -1 : 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        orderAndFilterChars: momentary,
        actualPage: 0,
      };
      break;

    default:
      return { ...state };
      break;
  }
};

export default rootReducer;
