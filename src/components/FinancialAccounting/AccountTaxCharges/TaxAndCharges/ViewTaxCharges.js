/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import { TAX_CHARGES_TYPE } from 'constants/modules/taxChargesType';
import { TAX_CHARGES_CALCULATION_TYPE } from 'constants/modules/taxChargesCalculationType';
import { CALCULTION_TYPE } from '../../../../constants/modules/AttributeTypeConstant';
import { getCodeValue } from 'utils/getCodeValue';

export const ViewTaxChargesMain = (props) => {
    const { attributeType, calculationType, viewTitle, selectedTreeData, financialAccount, documentDescription, styles } = props;
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Attribute Level">{selectedTreeData?.hierarchyAttribueName}</Descriptions.Item>
                    <Descriptions.Item label="Parent">{selectedTreeData?.parentName || HIERARCHY_DEFAULT_PARENT}</Descriptions.Item>
                    <Descriptions.Item label="Tax/Charge Type Code">{selectedTreeData?.taxChargesTypeCode}</Descriptions.Item>
                    <Descriptions.Item label="Tax/Charge Type Descrption">{selectedTreeData?.taxChargesTypeDescription}</Descriptions.Item>
                    {attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_CALCULATION?.KEY && (
                        <>
                            <Descriptions.Item label="Calculation Type">{getCodeValue(CALCULTION_TYPE, selectedTreeData?.calculationType)}</Descriptions.Item>
                            {calculationType === TAX_CHARGES_CALCULATION_TYPE?.PERCENTAGE?.KEY ? <Descriptions.Item label="Percentage"> {selectedTreeData?.percentage}</Descriptions.Item> : calculationType === TAX_CHARGES_CALCULATION_TYPE?.AMOUNT?.KEY ? <Descriptions.Item label="Amount">{selectedTreeData?.rate}</Descriptions.Item> : null}
                        </>
                    )}
                    {attributeType === TAX_CHARGES_TYPE?.TAX_CHARGES_TYPE_ACCOUNT_AND_DOCUMENT_MAPPING?.KEY && (
                        <>
                            <Descriptions.Item label="Document Description">{getCodeValue(documentDescription, selectedTreeData?.documentTypeCode)}</Descriptions.Item>
                            <Descriptions.Item label="Financial Account Head">{getCodeValue(financialAccount, selectedTreeData?.financialAccountHeadCode)}</Descriptions.Item>
                        </>
                    )}
                    <Descriptions.Item label="Status">{selectedTreeData?.status === true ? 'Active' : 'InActive'}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewTaxCharges = ViewTaxChargesMain;
