/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'components/common/Common.module.css';

export const AdvanceForm = (props) => {
    const { advanceSearchForm, AdvanceformData, setAdvanceformData } = props;
    const { typeData, handleCancel, handleFormValueChange, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, showGlobalNotification, aggregateForm } = props;
    const { serviceNameOptions, setserviceNameOptions, MakeOptions, setMakeOptions, MakefieldNames, serviceNames, setAdvanceSearchVisible } = props;
    const { handleSelect, isVisible, UpdateIndex, setisEditing, isEditing } = props;
    const isServiceNamePresent = (serviceName) => {
        let found = false;
        optionsServiceModified?.find((element, index) => {
            if (element?.serviceName?.trim()?.toLowerCase() === serviceName?.trim()?.toLowerCase()) {
                showGlobalNotification({ notificationType: 'error', title: 'ERROR', message: 'Duplicate item Name' });
                found = true;
                return;
            }
        });
        return found;
    };
    useEffect(() => {
        if (AdvanceformData && isVisible) {
            aggregateForm.setFieldsValue({
                serviceName: AdvanceformData?.serviceName ?? '',
                make: AdvanceformData?.make ?? '',
                amount: AdvanceformData?.amount ?? '',
                serviceNameValue: AdvanceformData?.serviceNameValue ?? '',
                makeValue: AdvanceformData?.makeValue ?? '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AdvanceformData]);

    const onFinish = () => {
        aggregateForm
            .validateFields()
            .then(() => {
                const values = aggregateForm.getFieldsValue();

                if (!isEditing) {
                    if (isServiceNamePresent(values?.serviceName)) {
                        return;
                    }

                    const data = { ...values, serviceName: values?.serviceNameValue, make: values?.makeValue, id: '' };
                    setoptionsServiceModified([data, ...optionsServiceModified]); //Adding data to table

                    setoptionsServicesMapping([...optionsServicesMapping, data]);
                    aggregateForm.resetFields();
                    handleFormValueChange();
                    setAdvanceSearchVisible(false);
                } else {
                    const data = { ...values, serviceName: values?.serviceNameValue, make: values?.makeValue, id: '' };
                    const newarr = [...optionsServiceModified];
                    newarr[AdvanceformData?.index] = data;
                    setoptionsServiceModified(newarr);
                    setAdvanceSearchVisible(false);
                    setisEditing(false);
                }
                setAdvanceformData();
            })
            .catch((err) => {});
    };
    const onFinishFailed = () => {
        return;
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={aggregateForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="serviceName" label="Item" rules={[validateRequiredSelectField('Item')]}>
                                <Select onChange={(codeValue, serviceObject) => handleSelect(codeValue, serviceObject, 'Item')} allowClear placeholder={preparePlaceholderSelect('item')} options={serviceNameOptions} fieldNames={serviceNames} />
                                {/* placeholder="Select item" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }}  */}
                            </Form.Item>
                            <Form.Item name="serviceNameValue" hidden>
                                {/* placeholder="Select item" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }}  */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Make" name="make" rules={[validateRequiredInputField('Make')]}>
                                <Select onChange={(codeValue, makeObject) => handleSelect(codeValue, makeObject, 'make')} allowClear placeholder={preparePlaceholderSelect('Make')} fieldNames={MakefieldNames} options={MakeOptions} />
                                {/* placeholder="Select make" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }} */}
                            </Form.Item>
                            <Form.Item name="makeValue" hidden>
                                {/* placeholder="Select item" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }}  */}
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="Serial No." name="amount" rules={[validateRequiredInputField('Srl no'), validationFieldLetterAndNumber('Srl no')]}>
                                <Input maxLength={30} placeholder={preparePlaceholderText('Srl no')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                            <Button onClick={handleCancel} danger>
                                Cancel
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                            <Button onClick={onFinish} type="primary">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};

export const AggregateForm = withModal(AdvanceForm, {});
