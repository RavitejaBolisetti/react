import React from 'react';
import { Descriptions } from 'antd';

const ViewCriticalityGroupMain = ({formData,styles}) => {
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
                    <Descriptions.Item label="Criticality Group Id">{formData?.qualificationCode}</Descriptions.Item>
                    <Descriptions.Item label="Criticality Group Name">{formData?.qualificationName}</Descriptions.Item>
                    <Descriptions.Item label="Default Group">{formData?.status === '1' ? 'Active' : 'InActive'}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status === '1' ? 'Active' : 'InActive'}</Descriptions.Item>

                </Descriptions>
            </>
        </div>
    );
};

export const ViewCriticalityGroup = ViewCriticalityGroupMain;

