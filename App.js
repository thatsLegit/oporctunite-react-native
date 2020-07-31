import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import AppNavigator from './navigation/AppNavigator';
import sousCategReducer from './store/reducers/sousCateg';
import categReducer from './store/reducers/categ';
import evalReducer from './store/reducers/evaluation';
import bilanReducer from './store/reducers/bilan';
import testReducer from './store/reducers/test';
import authReducer from './store/reducers/auth';
import { init } from './helper/db';


//Create some tables
init().then(() => {
  console.log('Initialized database.');
}).catch(err => {
  console.log('Initializing db failed.');
  console.log(err);
});

const rootReducer = combineReducers({
  sousCateg: sousCategReducer,
  categ: categReducer,
  eval: evalReducer,
  bilan: bilanReducer,
  test: testReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={(err) => console.log(err)} />
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
