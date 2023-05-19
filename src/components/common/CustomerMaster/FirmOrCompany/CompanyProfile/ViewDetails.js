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
                    <Descriptions.Item label="Firm/Company Name">{formData?.companyName}</Descriptions.Item>
                    <Descriptions.Item label="Parent Firm/Company Name">{formData?.companyName}</Descriptions.Item>
                    <Descriptions.Item label="Parent Firm/Company Code">{formData?.companyCode}</Descriptions.Item>
                    <Descriptions.Item label="PAN">{formData?.panNumber}</Descriptions.Item>
                    <Descriptions.Item label="GSTIN">{formData?.gstinNumber}</Descriptions.Item>
                    <Descriptions.Item label="Membership Type">{formData?.membershipType}</Descriptions.Item>
                    <Descriptions.Item label="M1-MMFSL">{formData?.m1mmfsl}</Descriptions.Item>
                    <Descriptions.Item label="Facebook Link">{formData?.facebookId}</Descriptions.Item>
                    <Descriptions.Item label="Twitter Link">{formData?.twitterId}</Descriptions.Item>

                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
