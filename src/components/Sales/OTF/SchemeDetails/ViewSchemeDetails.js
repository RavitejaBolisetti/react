import React from 'react';
import { Descriptions } from 'antd';

const ViewSchemeDetailsBase = ({ formData, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Scheme Type">{formData?.addressType}</Descriptions.Item>
                    <Descriptions.Item label="Scheme Catagory">{formData?.address}</Descriptions.Item>
                    <Descriptions.Item label="Total Amount">{formData?.address2}</Descriptions.Item>
                    <Descriptions.Item label="Valid From">{formData?.pincode}</Descriptions.Item>
                    <Descriptions.Item label="Valid To">{formData?.tehsil}</Descriptions.Item>
                    <Descriptions.Item label="Description">{formData?.city}</Descriptions.Item>

                    {/* <Descriptions.Item>{formData?.defaultaddress}</Descriptions.Item> */}
                </Descriptions>
            </>
        </div>
    );
};

export const ViewSchemeDetails = ViewSchemeDetailsBase;
