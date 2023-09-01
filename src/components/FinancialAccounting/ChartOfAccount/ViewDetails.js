/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { ATTRIBUTE_TYPE } from 'constants/modules/ChartOfAccount/attributeType';

export const ViewMain = (props) => {
    const { viewTitle, viewData, styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const accountType = viewData?.accountType === ATTRIBUTE_TYPE?.[0]?.key ? ATTRIBUTE_TYPE?.[0]?.value : viewData?.accountType === ATTRIBUTE_TYPE?.[1]?.key ? ATTRIBUTE_TYPE?.[1]?.value : null;
    const parentName = viewData?.parentAccountDescription ? viewData?.parentAccountDescription : 'DMS';

    return (
        <div className={styles.viewContainer}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{accountType}</Descriptions.Item>
                <Descriptions.Item label="Parent">{parentName}</Descriptions.Item>
                <Descriptions.Item label="Code">{viewData?.accountCode}</Descriptions.Item>
                <Descriptions.Item label="Description">{viewData?.accountDescription}</Descriptions.Item>
                {viewData?.accountType === ATTRIBUTE_TYPE?.[1]?.key && (
                    <>
                        <Descriptions.Item label="Opening Balance Cr.">{viewData?.openingBalanceCredit}</Descriptions.Item>
                        <Descriptions.Item label="Opening Balance Dr">{viewData?.openingBalanceDebit}</Descriptions.Item>
                    </>
                )}

                <Descriptions.Item label="Status">{viewData?.status === true ? 'Active' : 'Inactive'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewDetails = ViewMain;
