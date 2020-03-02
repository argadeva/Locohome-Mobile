import {combineReducers} from 'redux';
import ListRoomReducer from './ListRoom';

const reducers = combineReducers({
  ListRoom: ListRoomReducer,
});

export default reducers;
