import React from 'react';
import { Descriptions } from 'antd';

const ViewUserManagementDealerMain = ({formData,styles}) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        // title: <div className={viewStyle.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Role ID">{formData?.roleId}</Descriptions.Item>
                    <Descriptions.Item label="Role Name">{formData?.roleName}</Descriptions.Item>
                    <Descriptions.Item label="Role Description">{formData?.roleDesceription}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.active === '1' ? 'Active' : 'InActive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewUserManagementDealer = ViewUserManagementDealerMain;

