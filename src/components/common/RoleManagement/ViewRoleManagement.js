/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewRoleManagementMain = ({ formData, styles, menuTreeData, AccordianTreePanel }) => {
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
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <div className={styles.roleDescription}>
                    <Descriptions {...viewTwoColProps}>
                        <Descriptions.Item label={translateContent('roleManagement.label.roleId')}>{formData?.roleId}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('roleManagement.label.roleName')}>{formData?.roleName}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions {...viewOneColProps}>
                        <Descriptions.Item label={translateContent('roleManagement.label.roleDescription')}>{formData?.roleDescription}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('global.label.status')}>
                        <span className={formData?.status ? styles.activeText : styles?.inactiveText}>{translateContent(formData?.status ? "global.label.active" : "global.label.inActive" )}</span>
                            </Descriptions.Item>
                    </Descriptions>
                </div>
                <div className={styles.subTitleSec}>{translateContent('roleManagement.label.roleDescription')}</div>
                {AccordianTreePanel({ viewMode: true, menuTreeData })}
            </div>
        </>
    );
};

export const ViewRoleManagement = ViewRoleManagementMain;
