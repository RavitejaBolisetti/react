import React from 'react';
import { Descriptions, Row, Col } from 'antd';
import { convertCalenderDate, convertDate } from 'utils/formatDateTime';

export const ViewDetail = ({ formData, styles, parameterType }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    console.log('formData', formData);
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="PIN Code">{formData?.pinCode}</Descriptions.Item>
                    <Descriptions.Item label="PIN Category">{formData?.pinCategory || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Locality">{formData?.localityName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{formData?.tehsilName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="City">{formData?.cityName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="District">{formData?.districtName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.stateName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Country">{formData?.countryName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Within 50 Km of GPO">{formData?.withIn50KmFromGpo ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                    <Descriptions.Item label="Approval Status">{formData?.approvalStatus ? 'Approved' : 'Not Approved'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};
