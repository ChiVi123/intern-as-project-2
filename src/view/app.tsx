import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { themeConfig } from '~config';
import { store } from '~core';
import { browserRouter } from '~routers/browser-router';

function App() {
    return (
        <Provider store={store}>
            <ConfigProvider theme={themeConfig}>
                <RouterProvider router={browserRouter} />
            </ConfigProvider>
        </Provider>
    );
}

export default App;
