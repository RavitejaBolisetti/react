/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';

import { Row, Col, Card } from 'antd';
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
                        return <Card style={{ backgroundColor: '#E6E6E6' }} key={uploadData.id} title={uploadData?.documentName} extra={<FiEye style={{color: '#ff3e5b'}} onClick={() => downloadFile(uploadData)} />}></Card>;
                    })}
                </Card>
            ) : (
                <div>No Data Found</div>
            )}
        </>
    );
};
