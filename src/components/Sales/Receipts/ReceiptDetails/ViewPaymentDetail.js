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
import { PAYMENT_MODE } from 'components/Sales/Receipts/utils/receiptDetailsPaymentMode';

import PaymentFormContainer from './PaymentDetails/PaymentFormContainer';
import { translateContent } from 'utils/translateContent';

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
                        <Descriptions.Item label={translateContent('receipts.label.receiptDetails.paymentMode')}>{checkAndSetDefaultValue(getCodeValue(paymentModeType, formData?.paymentMode))}</Descriptions.Item>
                        <br />
                        <br />
                        {formData?.paymentMode === PAYMENT_MODE?.CASH?.KEY || PAYMENT_MODE?.CREDIT_CARD?.KEY || PAYMENT_MODE?.CHEQUE_DD?.KEY || PAYMENT_MODE?.NEFT?.KEY || PAYMENT_MODE?.WALLET?.KEY ? <Descriptions.Item label={translateContent('receipts.label.receiptDetails.receiveAmount')}>{checkAndSetDefaultValue(formData?.receivedAmount, isLoading)}</Descriptions.Item> : null}
                        {formData?.paymentMode === PAYMENT_MODE?.CASH?.KEY ? <Descriptions.Item label={translateContent('receipts.label.receiptDetails.transactionDate')}>{checkAndSetDefaultValue(formData?.transactionDate, isLoading, DATA_TYPE?.DAYJS?.key)}</Descriptions.Item> : null}

                        {formData?.paymentMode === PAYMENT_MODE?.CREDIT_CARD?.KEY && (
                            <>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.creditCardTransactionsNumber')}>{checkAndSetDefaultValue(formData?.creditCardTransNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.serviceChargePercentage')}>{checkAndSetDefaultValue(formData?.ccServiceChargePercentage, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.serviceChargeAmount')}>{checkAndSetDefaultValue(formData?.ccServiceChargeAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.taxOnServiceCharge')}>{checkAndSetDefaultValue(formData?.taxChargeAmount, isLoading)}</Descriptions.Item>
                            </>
                        )}

                        {formData?.paymentMode === PAYMENT_MODE?.CHEQUE_DD?.KEY && (
                            <>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.chequeDDNumber')}>{checkAndSetDefaultValue(formData?.ddCheckNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.chequeDDDate')}>{checkAndSetDefaultValue(formData?.ddCheckDate, isLoading, DATA_TYPE?.DAYJS?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.bankName')}>{checkAndSetDefaultValue(formData?.bankName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.bankLocation')}>{checkAndSetDefaultValue(formData?.bankLocationName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.paymentBankPartyId')}>{checkAndSetDefaultValue(formData?.paymentBankPartyId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.paymentBankName')}>{checkAndSetDefaultValue(formData?.paymentBankName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.paymentBankLocation')}>{checkAndSetDefaultValue(formData?.paymentBankLocation, isLoading)}</Descriptions.Item>
                            </>
                        )}

                        {formData?.paymentMode === PAYMENT_MODE?.NEFT?.KEY || formData?.paymentMode === PAYMENT_MODE?.WALLET?.KEY ? (
                            <>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.transactionNumber')}>{checkAndSetDefaultValue(formData?.transactionNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.transactionDate')}>{checkAndSetDefaultValue(formData?.transactionDate, isLoading, DATA_TYPE?.DAYJS?.key)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.paymentBankPartyId')}>{checkAndSetDefaultValue(formData?.paymentBankPartyId, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.paymentBankName')}>{checkAndSetDefaultValue(formData?.paymentBankName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('receipts.label.receiptDetails.paymentBankLocation')}>{checkAndSetDefaultValue(formData?.paymentBankLocation, isLoading)}</Descriptions.Item>
                            </>
                        ) : null}
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
