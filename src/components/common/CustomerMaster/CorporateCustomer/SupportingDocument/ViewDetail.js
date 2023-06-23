/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';

import { Row, Col, Card } from 'antd';
import { FiEye } from 'react-icons/fi';

export const ViewDetail = (props) => {
    const { supportingData } = props;
    return (
        <>
            <Card style={{ backgroundColor: '#F2F2F2' }}>
                {supportingData.map((uploadData) => {
                    return <Card key={uploadData.id} title={uploadData?.documentTitle} extra={<FiEye />}></Card>;
                })}
            </Card>
        </>
    );
};
