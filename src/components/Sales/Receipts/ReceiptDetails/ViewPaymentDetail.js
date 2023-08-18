/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { PAYMENT_MODE } from 'constants/modules/receiptDetailsPaymentMode';

import PaymentFormContainer from './PaymentDetails/PaymentFormContainer';

const ViewPaymentDetailBase = (props) => {
    const { formData, styles } = props;
    const { setShowAddEditForm, setPaymentDataList, onFinish, paymentModeType, paymentForm, isLoading, isListEditing } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    const formProps = {
        setShowAddEditForm,
        setPaymentDataList,
        onFinish,
        paymentForm,
        ...props,
    };

    return (
        <div className={styles.viewDrawerContainer}>
            {!isListEditing ? (
                <>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Payment Mode">{checkAndSetDefaultValue(getCodeValue(paymentModeType, formData?.paymentMode))}</Descriptions.Item>
                        <br />
                        <br />
                        {formData?.paymentMode === PAYMENT_MODE?.CASH?.KEY || PAYMENT_MODE?.CREDIT_CARD?.KEY || PAYMENT_MODE?.CHEQUE_DD?.KEY || PAYMENT_MODE?.RTGS?.KEY ? <Descriptions.Item label="Receive Amount">{checkAndSetDefaultValue(formData?.receivedAmount, isLoading)}</Descriptions.Item> : null}
                        {formData?.paymentMode === PAYMENT_MODE?.CASH?.KEY ? <Descriptions.Item label="Transaction Date">{checkAndSetDefaultValue(formData?.transactionDate, isLoading, DATA_TYPE?.DAYJS?.key)}</Descriptions.Item> : null}

                        {formData?.paymentMode === PAYMENT_MODE?.CREDIT_CARD?.KEY && (
                            <>
                                <Descriptions.Item label="Credit Card Transaction No.">{checkAndSetDefaultValue(formData?.creditCardTransNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Service Charge Percentage">{checkAndSetDefaultValue(formData?.ccServiceChargePercentage, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Service Charge Amount">{checkAndSetDefaultValue(formData?.ccServiceChargeAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Tax On Service Charge">{checkAndSetDefaultValue(formData?.taxChargeAmount, isLoading)}</Descriptions.Item>
                            </>
                        )}

                        {formData?.paymentMode === PAYMENT_MODE?.CHEQUE_DD?.KEY && (
                            <>
                                <Descriptions.Item label="Cheque/DD No.">{checkAndSetDefaultValue(formData?.ddCheckNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Cheque/DD Date">{checkAndSetDefaultValue(formData?.ddCheckDate, isLoading, DATA_TYPE?.DAYJS?.key)}</Descriptions.Item>
                                <Descriptions.Item label="Bank Name">{checkAndSetDefaultValue(formData?.bankName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Bank Location">{checkAndSetDefaultValue(formData?.bankLocationName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Bank Party ID">{checkAndSetDefaultValue(formData?.paymentBankPartyId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Bank Name">{checkAndSetDefaultValue(formData?.partyName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Bank Location">{checkAndSetDefaultValue(formData?.partyLocationCode, isLoading)}</Descriptions.Item>
                            </>
                        )}

                        {formData?.paymentMode === PAYMENT_MODE?.RTGS?.KEY && (
                            <>
                                <Descriptions.Item label="Transaction No.">{checkAndSetDefaultValue(formData?.transactionNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Transaction Date">{checkAndSetDefaultValue(formData?.transactionDate, isLoading, DATA_TYPE?.DAYJS?.key)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Bank Party ID">{checkAndSetDefaultValue(formData?.paymentBankPartyId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Bank Name">{checkAndSetDefaultValue(formData?.partyName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Payment Bank Location">{checkAndSetDefaultValue(formData?.partyLocationCode, isLoading)}</Descriptions.Item>
                            </>
                        )}
                    </Descriptions>
                </>
            ) : (
                <>
                    <PaymentFormContainer {...formProps} />
                </>
            )}
        </div>
    );
};

export const ViewPaymentDetail = ViewPaymentDetailBase;
