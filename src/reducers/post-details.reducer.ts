import { PostObjectType } from '../utils/types/types';

export interface IAllPosts {
  data: {
		title: string;
		body: string;
	}
}

export const AllPostsInitialState:IAllPosts = {
  data: {
    title: '',
    body: '',
  },
}

export type FetchDetailsActionTypes =
  | { type: 'FECTH_SUCCESS_DATA_BY_ID'; payload: PostObjectType | null }
export function FetchAllDataReducer(state: IAllPosts, action: FetchDetailsActionTypes) {
  switch (action.type) {
  case 'FECTH_SUCCESS_DATA_BY_ID':
    return {...state, data: action.payload, error: '', loading: true };
  default:
    return state;
  }
}