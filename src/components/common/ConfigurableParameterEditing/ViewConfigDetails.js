import React from 'react';
import { Descriptions } from 'antd';

const ViewConfigDetailsMain = ({formData,styles,parameterType}) => {
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
                    <Descriptions.Item label="Control ID">{formData?.controlId}</Descriptions.Item>
                    <Descriptions.Item label="Control Description">{formData?.controlDescription}</Descriptions.Item>
                    <Descriptions.Item label="Control Group">{formData?.controlGroup}</Descriptions.Item>
                    <Descriptions.Item label="Configurable Parameter Type">{parameterType}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewConfigDetails = ViewConfigDetailsMain;

