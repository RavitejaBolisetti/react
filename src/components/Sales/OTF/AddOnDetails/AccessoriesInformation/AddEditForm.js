/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Input, Form, Col, Row, Button, Divider, Space } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';

const { TextArea } = Input;
const { Search } = Input;

function AddEditForm({ onUpdate, isPresent, index, seteditCardForm, editCardForm, selectedOrderId, handleFormValueChange, showGlobalNotification, onSearchPart, setsearchData, searchData, addButtonDisabled, setaddButtonDisabled, setAddOnItemInfo, addOnItemInfo, AddonPartsData, onCancel, accessoryForm, onFieldsChange, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const disableProp = { disabled: true };

    useEffect(() => {
        if (searchData) {
            accessoryForm.setFieldsValue({
                ...searchData,
            });
        }
        console.log('searchData', searchData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);
    const handleAccesoriesForm = () => {
        accessoryForm
            .validateFields()
            .then((values) => {
                if (isPresent(values?.partNumber)) {
                    return;
                }
                const myvalues = { ...values, otfNumber: selectedOrderId, isDeleting: true };
                if (!values?.type) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Part Number to continue' });
                    return;
                }

                setAddOnItemInfo((prev) => [myvalues, ...prev]);
                accessoryForm.resetFields();
                setsearchData();
                setaddButtonDisabled({ ...addButtonDisabled, partDetailsResponses: false });
                handleFormValueChange();
            })
            .catch(() => {});
    };

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleOnSearch = (value) => {
        onSearchPart(value);
    };

    return (
        <>
            <Form form={accessoryForm} onFieldsChange={onFieldsChange} layout="vertical" onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                        <Form.Item label="Part Number" name="partNumber" rules={[validateRequiredInputField('part number')]}>
                            <Search placeholder={preparePlaceholderText('customer id')} style={{ width: '100%' }} maxLength={35} allowClear type="text" onSearch={handleOnSearch} onChange={() => accessoryForm.resetFields(['type', 'sellingPrice', 'mrp', 'partDescription'])} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Part Type" name="type">
                            <Input {...disableProp} placeholder={preparePlaceholderText('part type')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Selling Price" name="sellingPrice">
                            <Input {...disableProp} placeholder={preparePlaceholderText('selling price')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="MRP" name="mrp">
                            <Input {...disableProp} placeholder={preparePlaceholderText('mrp')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Required Quantity" name="requiredQuantity" rules={[validateRequiredInputField('required quantity')]}>
                            <Input placeholder={preparePlaceholderText('required quantity')} />
                        </Form.Item>
                    </Col>
                    {/* </Row>
            <Row gutter={20}> */}

                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                        <Form.Item label="Part Description" name="partDescription">
                            <TextArea
                                {...disableProp}
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 2,
                                }}
                                maxLength={300}
                            />
                        </Form.Item>
                    </Col>

                    <Form.Item hidden name="id">
                        <Input />
                    </Form.Item>
                </Row>
            </Form>
            <Row gutter={20}>
                {addButtonDisabled?.partDetailsResponses ? (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Space size="large" style={{ marginBottom: '20px' }}>
                            <Button style={{ marginRight: '12px', height: '36px' }} disabled={isBtnDisabled} onClick={() => handleAccesoriesForm()} type="primary" danger>
                                Add
                            </Button>
                            <Button danger onClick={() => onCancel()}>
                                Cancel
                            </Button>
                        </Space>
                    </Col>
                ) : (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Space className={styles.accessoryFormButton} size="large" style={{ marginBottom: '20px' }}>
                            <Button style={{ marginRight: '12px', height: '36px' }} type="primary" onClick={() => onUpdate(index, seteditCardForm, editCardForm)}>
                                Save
                            </Button>
                            <Button danger onClick={() => onCancel()}>
                                Cancel
                            </Button>
                        </Space>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default AddEditForm;
