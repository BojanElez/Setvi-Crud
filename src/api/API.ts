import { PostObjectType } from '../utils/types/types';

// TO DO
export enum Data {
  POSTS = 'posts',
}

type ParamIdAPI = string | undefined;

const requestHeaders = {
  'Accept': 'application/json',
  'Access-Control-Allow-Origin':'*',
  'Content-Type': 'application/json',
  'RequestMode': 'no-cors'
}

const baseURL = 'https://jsonplaceholder.typicode.com/'

export const getAllData = async (data: Data, startIndex?:number, endIndex?:number) => {
  const settings = {
    method: 'GET',
    headers: requestHeaders,
  };
  try {
    const endpoint = await fetch(
      `${baseURL}${data}?_start=${startIndex}&_limit=${endIndex}`,
      settings);
    const results = await endpoint.json();

    return results;
  } catch (error) {
    return error;
  }
}

export const getDataByID = async (data: Data | string, id: ParamIdAPI) => {
  const settings = {
    method: 'GET',
    headers: requestHeaders,
  };
  try {
    const endpoint = await fetch(`${baseURL}${data}/${id}`, settings);
    const results = await endpoint.json();
    return results;
  } catch (error) {
    return error;
  }
}

export const addData = async (data: Data, object: PostObjectType) => {
  const settings = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(object)
  };
  try {
    const endpoint = await fetch(`${baseURL}${data}`, settings);
    const results = await endpoint.json();
    return results;
  } catch (error) {
    return error;
  }
}

export const updateData = async (data: Data, object: PostObjectType, id: ParamIdAPI) => {
  const settings = {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(object),
  };
  try {
    const fetchResponse = await fetch(`${baseURL}${data}/${id}`, settings);
    const results = await fetchResponse.json();
    return results;
  } catch (error) {
    return error;
  }
}

export const deleteData = async (data: Data, id: ParamIdAPI) => {
  const settings = {
    method: 'DELETE',
    headers: requestHeaders,
  };
  try {
    const fetchResponse = await fetch(`${baseURL}${data}/${id}`, settings);
    const results = await fetchResponse.json();
    return results;
  } catch (e) {
    return e;
  }
}