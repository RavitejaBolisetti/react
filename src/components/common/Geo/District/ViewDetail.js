import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailMain = ({ formData, styles, parameterType }) => {
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
                    <Descriptions.Item label="District Code">{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label="District Name">{formData?.name}</Descriptions.Item>
                    {/* <Descriptions.Item label="GST State Code">{formData?.gstCode}</Descriptions.Item> */}
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
