import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailBase = ({ formData, styles, parameterType }) => {
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
                <Descriptions.Item label="Parent Group Code">{formData?.parentCode}</Descriptions.Item>
                    <Descriptions.Item label="Parent Group Name">{formData?.dealerParentName}</Descriptions.Item>
                    <Descriptions.Item label="Company Code">{formData?.companyCode}</Descriptions.Item>
                    <Descriptions.Item label="Company Name">{formData?.companyName}</Descriptions.Item>
                    <Descriptions.Item label="Company Address">{formData?.address}</Descriptions.Item>
                    <Descriptions.Item label="Pin Code">{formData?.pinCode}</Descriptions.Item>
                    {/* <Descriptions.Item label="City">{formData?.city}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{formData?.tehsil}</Descriptions.Item>
                    <Descriptions.Item label="District">{formData?.district}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.state}</Descriptions.Item> */}
                    <Descriptions.Item label="TIN">{formData?.companyTin}</Descriptions.Item>
                    <Descriptions.Item label="TAN">{formData?.companyTan}</Descriptions.Item>
                    <Descriptions.Item label="PAN">{formData?.companyPan}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
