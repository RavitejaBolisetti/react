/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import { TAX_CHARGES_TYPE } from 'constants/modules/taxChargesType';
import { CALCULTION_TYPE } from '../../../../constants/modules/AttributeTypeConstant'
import { getCodeValue } from 'utils/getCodeValue';


export const ViewTaxChargesMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, financialAccount, calculationType,documentDescription,handleChildBtn, handleSiblingBtn, setClosePanels, styles,calType }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner} ${styles.viewProductDetail}`}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{selectedTreeData?.hierarchyAttribueName}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData?.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                <Descriptions.Item label="Tax/Charge Type Code">{selectedTreeData?.taxChargesTypeCode}</Descriptions.Item>
                <Descriptions.Item label="Tax/Charge Type Descrption">{selectedTreeData?.taxChargesTypeDescription}</Descriptions.Item>
                <Descriptions.Item label="Status">{selectedTreeData?.status === true ? 'Active' : 'InActive'}</Descriptions.Item>
                {TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_CALCULATION?.KEY === selectedTreeData?.attributeTypeCode &&
                ( <>
                    <Descriptions.Item label="Calculation Type">{selectedTreeData?.calculationType}</Descriptions.Item>
                    {calculationType === CALCULTION_TYPE[1]?.key ? (
                    <Descriptions.Item label="Percentage">{getCodeValue(CALCULTION_TYPE, selectedTreeData?.percentage)}</Descriptions.Item>
                    ):( calculationType === CALCULTION_TYPE[0]?.key ? (
                    <Descriptions.Item label="Amount">{getCodeValue(CALCULTION_TYPE, selectedTreeData?.rate)}</Descriptions.Item>):null)}
                </>)}
                {TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_ACCOUNT_AND_DOCUMENT_MAPPING?.KEY === selectedTreeData?.attributeTypeCode && (<>
                <Descriptions.Item label="Document Description">{getCodeValue(documentDescription, selectedTreeData?.documentTypeCode)}</Descriptions.Item>
                <Descriptions.Item label="Financial Account Head">{getCodeValue(financialAccount, selectedTreeData?.financialAccountHeadCode)}</Descriptions.Item>
                </>)}
            </Descriptions>
        </div>
    );
};

export const ViewTaxCharges = ViewTaxChargesMain;
