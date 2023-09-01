/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useEffect } from 'react';
import { Button, Form, Row, Col, Select, Divider } from 'antd';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';

import { PAYMENT_MODE } from 'components/Sales/Receipts/utils/receiptDetailsPaymentMode';
import { CashForm } from './CashForm';
import { ChequeForm } from './ChequeForm';
import { CreditForm } from './CreditForm';
import { NeftForm } from './NeftForm';

const { Option } = Select;

const PaymentFormContainer = (props) => {
    const { formData, paymentModeType, setIsAdding, setIsListEditing, setShowAddEditForm, handleFormValueChange, paymentMode, setPaymentMode, formActionType, handleSavepaymenttForm, paymentForm } = props;

    useEffect(() => {
        setPaymentMode(formData?.paymentMode);
    }, []);

    const handleCancelFormEdit = () => {
        paymentForm.resetFields();
        setIsAdding(false);
        setIsListEditing(false);
        setShowAddEditForm(false);
    };

    const handlePayment = (value) => {
        setPaymentMode(value);
    };

    const RenderPaymentForm = (formInstance) => {
        // if (!formInstance) return undefined;
        switch (formInstance) {
            case PAYMENT_MODE?.CASH?.KEY: {
                return <CashForm />;
            }
            case PAYMENT_MODE?.CHEQUE_DD?.KEY: {
                return <ChequeForm {...props} />;
            }
            case PAYMENT_MODE?.NEFT?.KEY: {
                return <NeftForm {...props} />;
            }
            case PAYMENT_MODE?.CREDIT_CARD?.KEY: {
                return <CreditForm />;
            }
            default:
                return '';
        }
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <>
            <Form form={paymentForm} autoComplete="off" onFinish={handleSavepaymenttForm} onFieldsChange={handleFormValueChange} layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Payment Mode" name="paymentMode" rules={[validateRequiredSelectField('Payment Mode')]}>
                            {/* {customSelectBox({ data: paymentModeType, placeholder: preparePlaceholderSelect('Payment Mode'), onChange: { handlePayment } })} */}
                            <Select maxLength={50} placeholder={preparePlaceholderSelect('Select')} onChange={handlePayment} {...selectProps}>
                                {paymentModeType?.map((item) => (
                                    <Option key={'dv' + item.key} value={item.key}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                {RenderPaymentForm(formData?.paymentMode || paymentMode)}

                {!formActionType?.viewMode && paymentMode && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Button className={styles.marR20} onClick={handleSavepaymenttForm} type="primary">
                                    Save
                                </Button>
                                <Button className={styles.marB20} onClick={handleCancelFormEdit} danger>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Form>
        </>
    );
};

export default PaymentFormContainer;
