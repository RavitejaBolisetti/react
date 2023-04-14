import React from 'react';
import { Descriptions } from 'antd';

const ViewRoleManagementMain = ({ viewData, viewStyle }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        // title: <div className={viewStyle.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        // <div className={`${viewStyle.viewContainer} ${viewStyle.hierarchyRightContaner}`}>
            <Descriptions {...viewProps}>
                
                <Descriptions.Item label="Role ID">{viewData.roleId}</Descriptions.Item>
                <Descriptions.Item label="Role Name">{viewData.roleName}</Descriptions.Item>
                <Descriptions.Item label="Role Description">{viewData.roleTitle}</Descriptions.Item>
                <Descriptions.Item label="Status">{viewData?.active === '1' ? 'Active' : 'InActive'}</Descriptions.Item>
              
            </Descriptions>
    );
};

export const ViewRoleManagement = ViewRoleManagementMain;

{/* </div> */}