/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

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
                    <Descriptions.Item label={translateContent('hierarchyAttribute.label.code')}>{editRow?.hierarchyAttribueCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hierarchyAttribute.label.name')}>{editRow?.hierarchyAttribueName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hierarchyAttribute.label.duplicateAllowed')}>{editRow?.duplicateAllowedAtAttributerLevelInd ? <text className={styles.activeText}>{translateContent('global.label.active')}</text> : <text className={styles.inactiveText}>{translateContent('global.label.inActive')}</text>}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hierarchyAttribute.label.duplicateAllowedDiffParent')}>{editRow?.duplicateAllowedAtOtherParent ? <text className={styles.activeText}>{translateContent('global.label.active')}</text> : <text className={styles.inactiveText}>{translateContent('global.label.inActive')}</text>}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('hierarchyAttribute.label.childAllowed')}>{editRow?.isChildAllowed ? <text className={styles.activeText}>{translateContent('global.label.active')}</text> : <text className={styles.inactiveText}>{translateContent('global.label.inActive')}</text>}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('global.label.status')}>
                   
                        {editRow?.status ? <text className={styles.activeText}>{translateContent('global.label.active')}</text> : <text className={styles.inactiveText}>{translateContent('global.label.inActive')}</text>}
                    
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewHierarchyAttribute = ViewHierarchyAttributeMain;
