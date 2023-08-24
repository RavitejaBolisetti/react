/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Card, DatePicker, Space, Switch } from 'antd';

import { disableFutureDate } from 'utils/disableDate';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';

import { YES_NO_FLAG } from 'constants/yesNoFlag';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { formData, FinanceLovData, typeData, form, formActionType } = props;
    const [doReceived, setDoReceived] = useState();
    const FINANCE_CONSTANTS = {
        Self: {
            value: 'Self',
            key: 'SLF',
        },
        Dealer: {
            value: 'Dealer',
            key: 'DEL',
        },
        DSA: {
            value: 'DSA',
            key: 'DSA',
        },
        Cash: {
            value: 'Cash',
            key: 'CSH',
        },
    };
    const [financeArranged, setFinanceArranged] = useState({
        customerArranged: formData?.financeArrangedBy === FINANCE_CONSTANTS?.Self?.key,
        dealerArranged: formData?.financeArrangedBy === FINANCE_CONSTANTS?.Dealer?.key,
        cash: formData?.financeArrangedBy === FINANCE_CONSTANTS?.Cash?.key,
        dsa: formData?.financeArrangedBy === FINANCE_CONSTANTS?.DSA?.key,
    });

    useEffect(() => {
        setDoReceived(formData?.doReceived || 'N');
        formData && form.setFieldsValue({ ...formData, doDate: formattedCalendarDate(formData?.doDate) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const datePickerStyle = {
        width: '100%',
    };

    const handleDOChange = (item) => {
        setDoReceived(item);
    };

    const onLoanChange = () => {
        form.validateFields(['emi']);
    };

    const handleFinanceArrangedChange = (value) => {
        switch (value) {
            case FINANCE_CONSTANTS?.Self?.key: {
                setFinanceArranged({ dealerArranged: false, cash: false, dsa: false, customerArranged: true });
                break;
            }
            case FINANCE_CONSTANTS?.Dealer?.key: {
                setFinanceArranged({ dealerArranged: true, cash: false, dsa: false, customerArranged: false });
                break;
            }
            case FINANCE_CONSTANTS?.Cash?.key: {
                setFinanceArranged({ dsa: false, customerArranged: false, cash: true, dealerArranged: false });
                break;
            }
            case FINANCE_CONSTANTS?.DSA?.key: {
                setFinanceArranged({ dsa: true, customerArranged: false, cash: false, dealerArranged: false });
                break;
            }
            default: {
                break;
            }
        }
    };

    const emiLessThanAmount = (value) => {
        if (Number(form.getFieldsValue(['loanAmount'])?.loanAmount) <= Number(value)) {
            return Promise.reject('EMI cannot exceed loan amount');
        } else {
            return Promise.resolve();
        }
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={formData?.financeArrangedBy} name="financeArrangedBy" label="Finance Arranged By">
                                            {customSelectBox({ data: typeData['FNC_ARNGD'], onChange: handleFinanceArrangedChange })}
                                        </Form.Item>
                                    </Col>
                                    {!financeArranged?.cash && (
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item initialValue={formActionType?.editMode ? (formData?.printHyptheticatedDetail === 1 ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="printHyptheticatedDetail" label="Print Hypothecation Details?" valuePropName="checked">
                                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                </Row>
                                {(financeArranged?.dealerArranged || financeArranged?.customerArranged || financeArranged?.dsa) && (
                                    <>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Financier" name="financier" placeholder={preparePlaceholderSelect('Select')}>
                                                    <Select placeholder="Select" options={FinanceLovData} fieldNames={{ label: 'value', value: 'key' }} {...selectProps}></Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.branch} label="Branch" name="branch">
                                                    <Input placeholder={preparePlaceholderText('branch')} maxLength={55} />
                                                </Form.Item>
                                            </Col>

                                            {financeArranged?.dealerArranged && (
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                    <Form.Item initialValue={formData?.fileNumber} label="File Number" name="fileNumber">
                                                        <Input placeholder={preparePlaceholderText('file number')} maxLength={30} />
                                                    </Form.Item>
                                                </Col>
                                            )}
                                        </Row>
                                        {financeArranged?.dealerArranged && (
                                            <>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item initialValue={formData?.loanAmount} onChange={onLoanChange} label="Loan Amount" name="loanAmount" rules={[validateNumberWithTwoDecimalPlaces('loan amount')]}>
                                                            <Input placeholder={preparePlaceholderText('loan amount')} maxLength={10} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item initialValue={formData?.emi} label="EMI" name="emi" rules={[validateNumberWithTwoDecimalPlaces('emi'), { validator: (rule, value) => emiLessThanAmount(value) }]}>
                                                            <Input placeholder={preparePlaceholderText('emi')} maxLength={10} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Form.Item initialValue={formData?.doReceived} label="D.O. Received" name="doReceived">
                                                            {customSelectBox({ data: typeData?.YES_NO_FLG, onChange: handleDOChange })}
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                {doReceived === YES_NO_FLAG?.YES?.key && (
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                            <Form.Item initialValue={formData?.doNumber} label="D.O. Number" name="doNumber">
                                                                <Input placeholder={preparePlaceholderText('d.o. number')}></Input>
                                                            </Form.Item>
                                                        </Col>

                                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                            <Form.Item label="D.O. Date" name="doDate">
                                                                <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('date')} style={datePickerStyle} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
