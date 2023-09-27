/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import styles from 'assets/sass/app.module.scss';

const ViewHierarchyAttributeMain = ({ editRow, style }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Code">{editRow?.hierarchyAttribueCode}</Descriptions.Item>
                    <Descriptions.Item label="Name">{editRow?.hierarchyAttribueName}</Descriptions.Item>
                    <Descriptions.Item label="Duplicate Allowed?">{editRow?.duplicateAllowedAtAttributerLevelInd ? <text className={styles.activeText}>Active</text> : <text className={styles.inactiveText}>InActive</text>}</Descriptions.Item>
                    <Descriptions.Item label="Duplicate Allowed under different Parent?">{editRow?.duplicateAllowedAtOtherParent ? <text className={styles.activeText}>Active</text> : <text className={styles.inactiveText}>InActive</text>}</Descriptions.Item>
                    <Descriptions.Item label="Child Allowed?">{editRow?.isChildAllowed ? <text className={styles.activeText}>Active</text> : <text className={styles.inactiveText}>InActive</text>}</Descriptions.Item>
                    <Descriptions.Item label="Status">{editRow?.status ? <text className={styles.activeText}>Active</text> : <text className={styles.inactiveText}>InActive</text>}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewHierarchyAttribute = ViewHierarchyAttributeMain;
