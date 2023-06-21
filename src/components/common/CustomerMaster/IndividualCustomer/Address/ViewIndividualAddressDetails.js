import React from 'react';
import { Descriptions } from 'antd';

const ViewIndividualAddressDetailsBase = (props) => {
    const { formData, styles } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Address Type">{formData?.addressType}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 1">{formData?.addressLine1}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 2">{formData?.addressLine2}</Descriptions.Item>
                    <Descriptions.Item label="Pincode">{formData?.pinCode}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{formData?.tehsilCode}</Descriptions.Item>
                    <Descriptions.Item label="City">{formData?.cityCode}</Descriptions.Item>
                    <Descriptions.Item label="District">{formData?.districtCode}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.stateCode}</Descriptions.Item>
                    <Descriptions.Item label="Contact Name">{formData?.contactName}</Descriptions.Item>
                    <Descriptions.Item label="Contact Mobile">{formData?.mobileNumber}</Descriptions.Item>
                    <Descriptions.Item>{formData?.deafultAddressIndicator}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
