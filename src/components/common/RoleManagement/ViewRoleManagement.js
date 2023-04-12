import React from 'react';
import { Descriptions } from 'antd';

const ViewRoleManagementMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner}`}>
            <Descriptions {...viewProps}>
                
                <Descriptions.Item label="Role ID">{record.roleId}</Descriptions.Item>
                <Descriptions.Item label="Role Name">{recoed.roleName}</Descriptions.Item>
                <Descriptions.Item label="Role Description">{record.roleTitle}</Descriptions.Item>
                <Descriptions.Item label="Status">{record?.active === '1' ? 'Active' : 'InActive'}</Descriptions.Item>
              
            </Descriptions>
        </div>
    );
};

export const ViewRoleManagement = ViewRoleManagementMain;
