'use strict';

import {createStore, combineReducers} from 'redux';
import visitor from './reducers/visitor';
import vars from './reducers/vars';
import objs from './reducers/objs';
import lists from './reducers/lists';
import banners from './reducers/banners';

var mainReducer = combineReducers({
  visitor,
  vars,
  banners,
  lists,
  objs,
});

module.exports = createStore(mainReducer);
