import React from 'react';
import  DefaultLayout  from './DefaultLayout/index';

// const Homepage = React.lazy(() => import('./Homepage/Homepage'));
import HomePage from '../containers/Homepage';


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/homepage', name: 'Homepage', component: HomePage },

];

export default routes;
