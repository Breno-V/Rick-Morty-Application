import api from "../config/api.js";

export const getAllCharacters = async (page = 1) => {
    const response = await api.get(`/character/?page=${page}`);
    return response.data;
}

export const getCharacterByPk = async (id) => {
    const response = await api.get(`/character/${id}`);
    return response.data;
}

export const searchCharactersByName = async (name) => {
  const response = await api.get(`/character/?name=${name}`);
  return response.data;
};