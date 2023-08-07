/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Space } from 'antd';
import { AuthorityDetailPanel } from './HierarchyAuthorityDetail';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import { generateList, findParentName } from './generateList';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

export const HierarchyViewMain = ({ viewMode, isLoading, viewTitle, authTypeDropdownData, manufacturerAdminHierarchyData, documentTypesList, setDocumentTypesList, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    const manufacturerAdminHierarchyDataFlat = generateList(manufacturerAdminHierarchyData, { children: 'subManufactureAdmin' });
    const finalParentName = findParentName(manufacturerAdminHierarchyDataFlat, selectedTreeData?.manufactureAdminParntId) ?? HIERARCHY_DEFAULT_PARENT;
    const status = selectedTreeData?.status ? 'Active' : 'InActive';
    return (
        <div className={styles.viewContainer}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{checkAndSetDefaultValue(selectedTreeData?.hierarchyAttribueName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData?.parentName ? checkAndSetDefaultValue(selectedTreeData?.parentName, isLoading) : checkAndSetDefaultValue(finalParentName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Code">{checkAndSetDefaultValue(selectedTreeData?.manufactureAdminCode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{checkAndSetDefaultValue(selectedTreeData?.manufactureAdminShortName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{checkAndSetDefaultValue(selectedTreeData?.manufactureAdminLongName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Status">{checkAndSetDefaultValue(status, isLoading)}</Descriptions.Item>
                <Space direction="vertical" size="small" className={styles.accordianContainer}>
                    {documentTypesList && documentTypesList.length > 0 && <AuthorityDetailPanel viewMode={viewMode} selectedTreeData={selectedTreeData} documentTypesList={documentTypesList} setDocumentTypesList={setDocumentTypesList} authTypeDropdownData={authTypeDropdownData} />}
                </Space>
            </Descriptions>
        </div>
    );
};

export const HierarchyView = HierarchyViewMain;
