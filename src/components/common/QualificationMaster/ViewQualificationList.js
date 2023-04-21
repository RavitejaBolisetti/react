import React from 'react';
import { Descriptions } from 'antd';

const ViewQualificationListMain = ({formData,viewStyle}) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        // title: <div className={viewStyle.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${viewStyle.viewContainer} ${viewStyle.hierarchyRightContaners}`}>
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
