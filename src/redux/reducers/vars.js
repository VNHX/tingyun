'use strict';

import _ from 'lodash';
import actions from '../actions';

module.exports = function (state = {}, action = {}) {

  if (action.type === actions.SET_VARS) {
  	var obj={};
  	obj[action.key]=action.value;
    return _.assign({}, state, obj);
  }

  return state;
};

