/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { configureStore } from './store/configureStore';
import { App } from './App';
import './i18n';

import './index.scss';

const store = configureStore({});
const root = ReactDOM.createRoot(document.getElementById('root'));

const providerWrapper = (
    <Provider store={store}>
        <App />
    </Provider>
);
root.render(process.env.NODE_ENV === 'development' ? providerWrapper : <React.StrictMode>{providerWrapper}</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
