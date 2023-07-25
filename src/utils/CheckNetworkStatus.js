/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';

export const CheckNetworkStatus = () => {
    const [online, setOnline] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setOnline(navigator.onLine);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return online === false ? <div>You’re Offline. Check Your Connection</div> : undefined;
};
