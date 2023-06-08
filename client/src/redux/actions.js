import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_TEMP = "GET_TEMP";
export const GET_DELETE_DOGS = "GET_DELETE_DOGS";
export const GET_MODIFY_DOGS = "GET_MODIFY_DOGS";
export const GET_ITEM_BY_ID = "GET_ITEM_BY_ID";
export const GET_ITEM_BY_NAME = "GET_ITEM_BY_NAME";
export const ORDER_BY_AZ = "ORDER_BY_AZ";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";

export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dog`);
      console.log("Response data:", response.data);
      dispatch({ type: GET_DOGS, payload: response.data });
    } catch (error) {
      console.log("Get getDogs Actions Error:", error);
    }
  };
}

export function getTemp() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/temperament`);
      console.log("Response data:", response.data);
      dispatch({ type: GET_TEMP, payload: response.data });
    } catch (error) {
      console.log("Get getTemp Actions Error:", error);
    }
  };
}

export function getDeleteDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dog`);
      const createdDogs = response.data.filter((dog) => dog.create);
      dispatch({ type: GET_DELETE_DOGS, payload: createdDogs });
    } catch (error) {
      console.log("Get getDeleteDogs Actions Error:", error);
    }
  };
}

export function getModifyDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dog`);
      const createdDogs = response.data.filter((dog) => dog.create);
      dispatch({ type: GET_MODIFY_DOGS, payload: createdDogs });
    } catch (error) {
      console.log("Get getModifyDogs Actions Error:", error);
    }
  };
}

export function getItemById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dog/${id}`);
      dispatch({ type: GET_ITEM_BY_ID, payload: response.data });
      console.log("Response data:", response.data);
    } catch (error) {
      dispatch({ type: GET_ITEM_BY_ID, payload: null });
    }
  };
}

export function getItemByName(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/dog?name=` + payload);
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: "not found",
      });
    }
  };
}

export function FilterByTemp(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

export function FilterByCreated(payload) {
  if (payload === "All") {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload,
    };
  } else {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload === "true",
    };
  }
}

export function orderByAZ(payload) {
  return {
    type: "ORDER_BY_AZ",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function clearSearch() {
  return { type: CLEAR_SEARCH };
}
