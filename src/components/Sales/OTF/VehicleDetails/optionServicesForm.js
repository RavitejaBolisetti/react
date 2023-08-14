/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';

import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validateRequiredSelectField } from 'utils/validation';

const OptionServicesFormMain = (props) => {
    const { typeData, handleCancel, handleFormValueChange, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, showGlobalNotification, formData, optionForm } = props;
    const [serviceOptions, setserviceOptions] = useState(typeData['OPT_SRV']);
    const [includedOption, setincludedOption] = useState([]);
    // console.log("Type Data: "+JSON.stringify(typeData['OPT_SRV']))
    useEffect(() => {
        if (serviceOptions && serviceOptions?.length) {
            const arr = [];
            optionsServiceModified?.map((element) => {
                arr.push(element?.serviceName);
            });
            setincludedOption(arr);

            setserviceOptions(
                serviceOptions?.map((element) => {
                    if (includedOption?.includes(element?.value)) {
                        return { ...element, disabled: true };
                    } else {
                        return element;
                    }
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceOptions, optionsServiceModified]);
    const isServiceNamePresent = (serviceName) => {
        let found = false;
        optionsServiceModified?.find((element, index) => {
            if (element?.serviceName?.trim()?.toLowerCase() === serviceName?.trim()?.toLowerCase()) {
                showGlobalNotification({ notificationType: 'error', title: 'ERROR', message: 'Duplicate service Name' });
                found = true;
                return;
            }
        });
        return found;
    };
    const onFinish = () => {
        optionForm
            .validateFields()
            .then(() => {
                const values = optionForm.getFieldsValue();
                if (isServiceNamePresent(values?.serviceName)) {
                    return;
                }

                const data = { ...values, id: '' };
                setoptionsServiceModified([data, ...optionsServiceModified]);
                setoptionsServicesMapping([...optionsServicesMapping, data]);
                optionForm.resetFields();
                handleFormValueChange();
            })
            .catch((err) => {});
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form autoComplete="off" layout="vertical" form={optionForm} onFinish={onFinish} data-testid="logRole">
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="serviceName" label="Service Name" initialValue={formData?.serviceName} rules={[validateRequiredSelectField('Service Name')]}>
                                    <Select options={serviceOptions} fieldNames={{ label: 'value', value: 'value' }} placeholder={preparePlaceholderSelect('Service Name')} allowClear />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Amount" name="amount" rules={[validateRequiredInputField('Amount'), validateNumberWithTwoDecimalPlaces('Amount')]}>
                                    <Input maxLength={7} placeholder={preparePlaceholderText('Amount')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.marT30}>
                                <Button className={styles.marR20} onClick={onFinish} type="primary">
                                    Save
                                </Button>
                                <Button onClick={handleCancel} danger>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export const OptionServicesForm = OptionServicesFormMain;
