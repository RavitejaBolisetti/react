/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Divider } from 'antd';

const ViewRoleManagementMain = ({ formData, styles, menuTreeData, onTabChange, AccordianTreePanel }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
    };

    const viewTwoColProps = {
        ...viewProps,
        column: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 },
    };
    const viewOneColProps = {
        ...viewProps,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={styles.viewContainer}>
                <div className={styles.roleDescription}>
                    <Descriptions {...viewTwoColProps}>
                        <Descriptions.Item label="Role ID">{formData?.roleId}</Descriptions.Item>
                        <Descriptions.Item label="Role Name">{formData?.roleName}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions {...viewOneColProps}>
                        <Descriptions.Item label="Role Description">{formData?.roleDescription}</Descriptions.Item>
                        <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'InActive'}</Descriptions.Item>
                    </Descriptions>
                </div>
                {/* <Divider /> */}
                <div className={styles.subTitleSec}>Application Access</div>
                {AccordianTreePanel({ viewMode: true, menuTreeData })}
            </div>
        </>
    );
};

export const ViewRoleManagement = ViewRoleManagementMain;
