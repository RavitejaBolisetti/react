/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Input, Form, Col, Row, Button, Divider } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';

const { TextArea } = Input;

function AddEditForm({ onUpdate, onSearchPart, setsearchData, searchData, addButtonDisabled, setaddButtonDisabled, setAddOnItemInfo, addOnItemInfo, AddonPartsData, onCancel, accessoryForm, onFieldsChange, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const disableProp = { disabled: true };
    useEffect(() => {
        if (searchData?.length) {
            accessoryForm.setFieldsValue({
                ...searchData['0'],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);
    console.log('AddonPartsData', AddonPartsData);
    const handleAccesoriesForm = () => {
        accessoryForm
            .validateFields()
            .then((values) => {
                setAddOnItemInfo((prev) => [values, ...prev]);
                accessoryForm.resetFields();
                setsearchData([]);
                setaddButtonDisabled({ ...addButtonDisabled, partDetailsResponses: false });
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
        <Form form={accessoryForm} onFieldsChange={onFieldsChange} layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Part Number" name="partNumber" rules={[validateRequiredInputField('part number')]}>
                        <Input.Search onSearch={handleOnSearch} placeholder={preparePlaceholderText('part number')} className={styles.searchField} />
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
                                minRows: 2,
                                maxRows: 2,
                            }}
                            showCount
                            maxLength={300}
                        />
                    </Form.Item>
                </Col>

                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
            </Row>
            {!isEditing ? (
                <Button disabled={isBtnDisabled} onClick={() => handleAccesoriesForm()} type="primary" danger>
                    Add
                </Button>
            ) : (
                <Row gutter={20}>
                    <Button type="primary" onClick={onUpdate}>
                        Save
                    </Button>
                    <Button danger onClick={() => onCancel()}>
                        Cancel
                    </Button>
                </Row>
            )}
        </Form>
    );
}

export default AddEditForm;
