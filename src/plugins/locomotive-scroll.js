// src/plugins/locomotive-scroll.js

import LocomotiveScroll from 'locomotive-scroll';

export default {
  install(app) {
    app.config.globalProperties.$locomotiveScroll = LocomotiveScroll;
  }
};
