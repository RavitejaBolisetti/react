/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { connect } from 'react-redux';
import { Descriptions, Space } from 'antd';
import { AuthorityDetailPanel } from './HierarchyAuthorityDetail';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';

const mapStateToProps = (state) => {
    const {
        data: {
            ManufacturerAdminHierarchy: { authorityVisible },
        },
    } = state;

    let returnValue = {
        authorityVisible,
    };
    return returnValue;
};

export const HierarchyViewMain = ({ viewMode, viewTitle, buttonData, documentTypesList, setDocumentTypesList, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles, authorityVisible }) => {
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
                <Descriptions.Item label="Code">{selectedTreeData?.manufactureAdminCode}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{selectedTreeData?.manufactureAdminShortName}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{selectedTreeData?.manufactureAdminLongName}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.status ? 'Active' : 'InActive'}</Descriptions.Item>
                <Space direction="vertical" size="small" className={styles.accordianContainer}>
                    {documentTypesList && documentTypesList.length > 0 && <AuthorityDetailPanel viewMode={viewMode} selectedTreeData={selectedTreeData} documentTypesList={documentTypesList} setDocumentTypesList={setDocumentTypesList} />}
                </Space>
            </Descriptions>
        </div>
    );
};

export const HierarchyView = connect(mapStateToProps)(HierarchyViewMain);
