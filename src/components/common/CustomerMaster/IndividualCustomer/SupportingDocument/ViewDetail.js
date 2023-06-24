/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { Card } from 'antd';
import { FiEye } from 'react-icons/fi';

export const ViewDetail = (props) => {
    const { supportingData, handlePreview, viewDocument, showGlobalNotification } = props;

    const downloadFile = (uploadData) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your donload will start soon' });

        handlePreview(uploadData);
        let a = document.createElement('a');
        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };
    return (
        <>
            {supportingData.length > 0 ? (
                <Card style={{ backgroundColor: '#F2F2F2' }}>
                    {supportingData.map((uploadData) => {
                        return <Card style={{ backgroundColor: '#E6E6E6' }} key={uploadData.id} title={uploadData?.documentName} extra={<FiEye style={{ color: '#ff3e5b' }} onClick={() => downloadFile(uploadData)} />}></Card>;
                    })}
                </Card>
            ) : (
                <div>No Data Found</div>
            )}
        </>
    );
};
