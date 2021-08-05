import React from 'react';
import Providers from './navigation';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk))
const App = () => {
  return(
      <Provider store={store}>
        <Providers/>
      </Provider>
    )
}

export default App;