import React from 'react';
import { ConfigProvider } from 'antd';
// import { useNavigate } from 'react-router-dom';

import Login from 'components/Auth/Login/Login';
// import { ROUTING_HOME, ROUTING_DASHBOARD } from 'constants/routing';

export const LoginPage = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     isLoggedIn ? navigate(ROUTING_DASHBOARD) : navigate(ROUTING_HOME);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoggedIn]);

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#e31837',
                    },
                }}
            >
                <Login />
            </ConfigProvider>
        </>
    );
};
