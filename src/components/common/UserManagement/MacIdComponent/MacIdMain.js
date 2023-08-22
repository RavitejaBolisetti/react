/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card } from 'antd';

import MacIdForm from './MacIdForm';
import MacIdList from './MacIdList';

const MacIdMain = ({ finalFormdata, setfinalFormdata }) => {
    const [accessMacid, setAccessMacid] = useState([]);

    const handleDelete = (event, key) => {
        const newAccessid = [...accessMacid];
        const index = accessMacid?.find((el) => el?.macId === key);
        newAccessid?.splice(index, 1);
        setAccessMacid(newAccessid);
        setfinalFormdata((prev) => ({ ...prev, userDevices: [...newAccessid] }));
    };

    const formProps = {
        accessMacid,
        handleDelete,
        setAccessMacid,
        finalFormdata,
        setfinalFormdata,
    };

    return (
        <>
            <Card>
                <MacIdForm {...formProps} />
                {accessMacid?.length > 0 && <MacIdList {...formProps} />}
            </Card>
        </>
    );
};

export default MacIdMain;
