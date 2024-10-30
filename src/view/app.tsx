import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { themeConfig } from '~config';
import { persistor, store } from '~core';
import { browserRouter } from '~routers/browser-router';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConfigProvider theme={themeConfig}>
                    <RouterProvider router={browserRouter} />
                </ConfigProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
