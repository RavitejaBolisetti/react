import React from 'react';
import { Descriptions, Row, Col } from 'antd';
import { convertCalenderDate, convertDate } from 'utils/formatDateTime';

const ViewPincodeDetailsMain = ({ formData, styles, parameterType }) => {
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
                    <Descriptions.Item label="PIN Code">{formData?.pinCode}</Descriptions.Item>
                    <Descriptions.Item label="Locality">{formData?.stateName}</Descriptions.Item>
                    <Descriptions.Item label="Within 50 Km of GPO">{formData?.gstCode}</Descriptions.Item>
                    <Descriptions.Item label="Status">{'Active'}</Descriptions.Item>
                    <Descriptions.Item label="Approval Status">{formData?.gstCode}</Descriptions.Item>
             
                    
                </Descriptions>
            </>
        </div>
    );
};

export const ViewPincodeDetails = ViewPincodeDetailsMain;
