'use strict';

import _ from 'lodash';
import actions from '../actions';

module.exports = function (state = {}, action = {}) {

  if (action.type === actions.APPEND_OBJS) {
    let obj = _.assign({}, state[action.key], action.value);
    return _.assign({}, state, _.object([[action.key, obj]]));
  }

  if (action.type === actions.SET_OBJS) {
    return _.assign({}, state, _.object([[action.key, action.value]]));
  }

  return state;
};

