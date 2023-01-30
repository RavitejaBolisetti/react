import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';

import Login from 'components/Auth/Login/Login';
import { ROUTING_DASHBOARD } from 'constants/routing';

export const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            navigate(ROUTING_DASHBOARD);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
