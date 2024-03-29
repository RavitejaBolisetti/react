/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { FINANCE_ARRANGED_BY } from 'constants/financeArrangedBy';
import { YES_NO_FLAG } from 'constants/yesNoFlag';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const checkFinanceType = (type, key) => (type ? type === key : false);

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('commonModules.label.financeDetails.financeArrangedBy')}>{checkAndSetDefaultValue(getCodeValue(typeData?.FNC_ARNGD, formData?.financeArrangedBy), isLoading)}</Descriptions.Item>
                {formData?.financeArrangedBy && !checkFinanceType(formData?.financeArrangedBy, FINANCE_ARRANGED_BY?.CASH?.key) && (
                    <>
                        {/* <Descriptions.Item label="Print Hypothecation Details?">{checkAndSetDefaultValue(formData?.printHypothecationDetails, isLoading, DATA_TYPE?.BOOL?.key)}</Descriptions.Item> */}
                        <Descriptions.Item label={translateContent('commonModules.label.financeDetails.financierName')}>{checkAndSetDefaultValue(formData?.financier, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('commonModules.label.financeDetails.branch')}>{checkAndSetDefaultValue(formData?.branch, isLoading)}</Descriptions.Item>
                        {formData?.financeArrangedBy && checkFinanceType(formData?.financeArrangedBy, FINANCE_ARRANGED_BY?.DEALER?.key) && (
                            <>
                                <Descriptions.Item label={translateContent('commonModules.label.financeDetails.fileNumber')}>{checkAndSetDefaultValue(formData?.fileNumber, isLoading)}</Descriptions.Item>
                                {/* <Descriptions.Item label="Loan Amount">{checkAndSetDefaultValue(formData?.loanAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="EMI">{checkAndSetDefaultValue(formData?.emi, isLoading)}</Descriptions.Item> */}
                                <Descriptions.Item label={translateContent('commonModules.label.financeDetails.DoReceived')}>{checkAndSetDefaultValue(getCodeValue(typeData?.YES_NO_FLG, formData?.doReceived), isLoading)}</Descriptions.Item>
                                {YES_NO_FLAG.YES.key === formData?.doReceived && (
                                    <>
                                        <Descriptions.Item label={translateContent('commonModules.label.financeDetails.DoNumber')}>{checkAndSetDefaultValue(formData?.doNumber, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.financeDetails.DoDate')}>{checkAndSetDefaultValue(formData?.doDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
