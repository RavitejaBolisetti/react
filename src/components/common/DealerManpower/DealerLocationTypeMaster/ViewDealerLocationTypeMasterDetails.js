import React from 'react';
import { Descriptions } from 'antd';

const ViewDealerLocationTypeMain = ({ formData, styles, parameterType }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Location Type Description">{formData?.locationDescription}</Descriptions.Item>
                    <Descriptions.Item label="Location Type Code">{formData?.locationCode}</Descriptions.Item>
                    <Descriptions.Item label="Status">{'Active'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDealerLocationType = ViewDealerLocationTypeMain;
