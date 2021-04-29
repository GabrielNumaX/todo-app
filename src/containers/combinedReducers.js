import { combineReducers } from 'redux';
// import appReducer from './app/reducer'; 
// import productReducer from './product/reducer'
// import categoryReducer from './category/reducer'
// import managerReducer from './manager/reducer'
// import homeReducer from './home/reducer'
// import bannerReducer from './banner/reducer';
// import testimonialReducer from './testimonial/reducer';

import mainReducer from './Main/MainReducer';
import appReducer from './App/AppReducer';

export default combineReducers({
    main: mainReducer,
    app: appReducer,
    //   product: productReducer,
    //   category: categoryReducer,
    //   banner: bannerReducer,
    //   testimonial: testimonialReducer,
    //   manager: managerReducer,
    //   home: homeReducer
});