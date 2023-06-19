import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailMain = ({ name, data }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={name}>{data?.name}</Descriptions.Item>
                <Descriptions.Item label={name + ' Rate'}>{data?.price}</Descriptions.Item>
            </Descriptions>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
