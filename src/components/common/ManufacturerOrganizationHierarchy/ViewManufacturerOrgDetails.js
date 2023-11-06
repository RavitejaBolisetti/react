/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import { translateContent } from 'utils/translateContent';

export const ViewManufacturerOrgtDetailMain = ({ viewTitle, selectedTreeData, styles }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles?.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('manufacturerOrganisation.label.attributeLevel')}>{selectedTreeData?.hierarchyAttribueName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('manufacturerOrganisation.label.parent')}>{selectedTreeData?.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('manufacturerOrganisation.label.code')}>{selectedTreeData?.manufactureOrgCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('manufacturerOrganisation.label.shortDescription')}>{selectedTreeData?.manufactureOrgShrtName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('manufacturerOrganisation.label.longDescription')}>{selectedTreeData?.manufactureOrgLongName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('global.label.status')}>{selectedTreeData?.active === true ? translateContent('global.label.active') : translateContent('global.label.inActive')}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewManufacturerOrgDetail = ViewManufacturerOrgtDetailMain;
