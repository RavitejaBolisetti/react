/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { COA_ACCOUNT_TYPE } from 'constants/modules/ChartOfAccount/coaAccountType';
import { translateContent } from 'utils/translateContent';

export const ViewMain = (props) => {
    const { viewTitle, viewData, styles } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const accountTypeTitle = Object.values(COA_ACCOUNT_TYPE).find((i) => i.key === viewData?.accountType)?.title || '';
    const parentName = viewData?.parentAccountDescription ? viewData?.parentAccountDescription : 'DMS';

    return (
        <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('chartOfAccount.label.attributeLevel')}>{accountTypeTitle}</Descriptions.Item>
                <Descriptions.Item label={translateContent('chartOfAccount.label.parent')}>{parentName}</Descriptions.Item>
                <Descriptions.Item label={translateContent('chartOfAccount.label.code')}>{viewData?.accountCode}</Descriptions.Item>
                <Descriptions.Item label={translateContent('chartOfAccount.label.description')}>{viewData?.accountDescription}</Descriptions.Item>
                {viewData?.accountType === COA_ACCOUNT_TYPE?.LEDGER_ACCOUNT?.key && (
                    <>
                        <Descriptions.Item label={translateContent('chartOfAccount.label.openingBalanceCr')}>{viewData?.openingBalanceCredit?.toFixed(2)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('chartOfAccount.label.openingBalanceDr')}>{viewData?.openingBalanceDebit?.toFixed(2)}</Descriptions.Item>
                    </>
                )}
                <Descriptions.Item label={translateContent('chartOfAccount.label.status')}>{viewData?.status === true ? 'Active' : 'Inactive'}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewDetails = ViewMain;
