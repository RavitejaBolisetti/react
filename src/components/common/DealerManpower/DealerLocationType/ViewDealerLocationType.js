import React from 'react';
import { Descriptions } from 'antd';

export const ViewDealerLocationTypeMain = ({ formData, viewTitle, selectedTreeData, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner}`}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Location Type Description">{formData?.locationDescription}</Descriptions.Item>
                <Descriptions.Item label="Location Type Code">{formData?.locationCode}</Descriptions.Item>
                <Descriptions.Item label="Status">{formData?.isActive ? 'Active' : 'InActive'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewDealerLocationType = ViewDealerLocationTypeMain;
