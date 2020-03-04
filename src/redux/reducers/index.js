import {combineReducers} from 'redux';
import ListRoomReducer from './ListRoom';
import HistoryReducer from './History';
import PaymentReducer from './Payment';

const reducers = combineReducers({
  ListRoom: ListRoomReducer,
  history: HistoryReducer,
  payment: PaymentReducer,
});

export default reducers;
