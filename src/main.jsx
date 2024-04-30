import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store, persistor } from './redux/store.js';
import App from './App.jsx';
import './styles/common.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);
