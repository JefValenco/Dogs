import {
  GET_DOGS,
  GET_TEMP,
  GET_DELETE_DOGS,
  GET_MODIFY_DOGS,
  GET_ITEM_BY_ID,
  GET_ITEM_BY_NAME,
  ORDER_BY_AZ,
  ORDER_BY_WEIGHT,
  CLEAR_SEARCH,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_CREATED,
} from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temps: [],
  deleteItem: [],
  modifyItem: [],
  itemById: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_TEMP:
      return {
        ...state,
        temps: action.payload,
      };
    case GET_DELETE_DOGS:
      return {
        ...state,
        deleteItem: action.payload,
      };

    case GET_MODIFY_DOGS:
      return {
        ...state,
        modifyItem: action.payload,
      };

    case GET_ITEM_BY_ID:
      return {
        ...state,
        itemById: action.payload,
      };

    case GET_ITEM_BY_NAME:
      let search;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        search = action.payload;
      } else {
        search = [];
      }
      return {
        ...state,
        dogs: search,
      };

    case FILTER_BY_TEMPERAMENT:
      const allTemperament = state.allDogs;
      const filteredTemperament =
        action.payload === "All"
          ? allTemperament
          : allTemperament.filter(
              (el) => el.temperament && el.temperament.includes(action.payload)
            );
      return {
        ...state,
        dogs: filteredTemperament,
      };

    case FILTER_BY_CREATED:
      const allCreated = state.allDogs;
      const filteredCreated =
        action.payload === "All"
          ? allCreated
          : allCreated.filter((el) => el.create === action.payload);
      return {
        ...state,
        dogs: filteredCreated,
      };

    case ORDER_BY_AZ:
      const allAlphabet = state.allDogs;
      let sortedArr;
      if (action.payload === "des") {
        sortedArr = state.dogs.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      } else if (action.payload === "asc") {
        sortedArr = state.dogs.slice().sort(function (a, b) {
          return b.name.localeCompare(a.name);
        });
      } else if (action.payload === "clear") {
        sortedArr = allAlphabet;
      }

      return { ...state, dogs: sortedArr };

    case ORDER_BY_WEIGHT:
      const allItems = state.allDogs;
      let sortedItems;
      if (action.payload === "asc") {
        sortedItems = state.dogs.slice().sort(function (a, b) {
          return b.weight - a.weight;
        });
      } else if (action.payload === "des") {
        sortedItems = state.dogs.slice().sort(function (a, b) {
          return a.weight - b.weight;
        });
      } else if (action.payload === "clear") {
        sortedItems = allItems;
      }

      return { ...state, dogs: sortedItems };

    case CLEAR_SEARCH:
      return {
        ...state,
        allDogs: state.initialCountries,
      };

    default:
      return state;
  }
};

export default rootReducer;
