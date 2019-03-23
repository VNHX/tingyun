'use strict';

import _ from 'lodash';
import actions from '../actions';

module.exports = function (state = {}, action = {}) {

  if (action.type === actions.SET_BANNERS) {
    return _.assign({}, state, _.object([[action.bannerType, action.banners]]));
  }

  return state;
};

