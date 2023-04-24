import React from 'react';
import { Descriptions } from 'antd';

const ViewQualificationListMain = ({formData,styles}) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
            {console.log(formData)}
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Qualification Code">{formData?.qualificationCode}</Descriptions.Item>
                    <Descriptions.Item label="Qualification Name">{formData?.qualificationName}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status === '1' ? 'Active' : 'InActive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewQualificationList = ViewQualificationListMain;

{
    /* </div> */
}
