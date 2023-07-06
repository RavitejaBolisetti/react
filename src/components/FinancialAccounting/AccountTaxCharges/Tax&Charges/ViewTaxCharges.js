/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';

export const ViewTaxChargesMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
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
                <Descriptions.Item label="Attribute Level">{selectedTreeData?.hierarchyAttribueName}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData?.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                <Descriptions.Item label="Code">{selectedTreeData?.manufactureOrgCode}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{selectedTreeData?.manufactureOrgShrtName}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{selectedTreeData?.manufactureOrgLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.active === true ? 'Active' : 'InActive'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewTaxCharges = ViewTaxChargesMain;
