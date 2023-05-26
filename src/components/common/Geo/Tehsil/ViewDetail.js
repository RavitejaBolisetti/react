import React from 'react';
import { Descriptions } from 'antd';
import { convertDateTime } from 'utils/formatDateTime';

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
                    <Descriptions.Item label="State Name">{formData?.stateName}</Descriptions.Item>
                    <Descriptions.Item label="District Name">{formData?.districtName}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil Code">{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil Name">{formData?.name}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil Category">{formData?.tehsilCategory}</Descriptions.Item>
                    <Descriptions.Item label="Included On">{convertDateTime(formData?.includedOn)}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
