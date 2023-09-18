/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Input, Form, Col, Row, Button, Divider } from 'antd';

import { validateRequiredInputField, validationNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { PartNameListModal } from './PartNameListModal';

const { TextArea } = Input;
const { Search } = Input;

function AddEditForm({ onUpdate, isPresent, index, fnSetData, seteditCardForm, editCardForm, formData, selectedOrderId, partNameSearchVisible, setPartNameSearchVisible, handleFormValueChange, showGlobalNotification, onSearchPart, setsearchData, searchData, addButtonDisabled, setaddButtonDisabled, setAddOnItemInfo, addOnItemInfo, AddonPartsData, onCancel, accessoryForm, onFieldsChange, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const disableProp = { disabled: true };
    const [selectedRowData, setSelectedRowData] = useState();

    useEffect(() => {
        if (searchData) {
            accessoryForm.setFieldsValue({
                ...searchData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData]);
    const handleAccesoriesForm = () => {
        accessoryForm
            .validateFields()
            .then((values) => {
                if (isPresent(values?.partNumber)) {
                    return;
                }

                if (!values?.partNumber) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please provide part number' });
                    return;
                }

                const myvalues = { ...values, otfNumber: selectedOrderId, isDeleting: true, id: '' };
                if (!values?.partNumber) {
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Part Number to continue' });
                    return;
                }

                setAddOnItemInfo((prev) => (prev ? [myvalues, ...prev] : [myvalues]));
                accessoryForm.resetFields();
                setsearchData();
                setaddButtonDisabled({ ...addButtonDisabled, partDetailsResponses: false });
                handleFormValueChange();
            })
            .catch((err) => {});
    };

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleOnSearch = (value) => {
        if (isPresent(value)) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Duplicate Part Name' });
            return;
        } else {
            onSearchPart(value);
        }
    };

    const handlePartSearch = (values) => {
        accessoryForm.resetFields(['requiredQuantity', 'type', 'sellingPrice', 'mrp', 'partDescription']);
    };

    const handleSelectedData = (e) => {
        fnSetData({ ...selectedRowData });
        setSelectedRowData();
        setPartNameSearchVisible(false);
    };

    const customerListProps = {
        isVisible: partNameSearchVisible,
        titleOverride: 'Search Result',
        onCloseAction: () => {
            setPartNameSearchVisible(false);
        },
        data: AddonPartsData,
        handleFormValueChange,
        fnSetData,
        selectedRowData,
        setSelectedRowData,
        handleSelectedData,
    };

    return (
        <>
            <Form autoComplete="off" form={accessoryForm} onFieldsChange={onFieldsChange} layout="vertical" onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Part Name" name="partName">
                            <Search placeholder={preparePlaceholderText('Part Name')} maxLength={55} allowClear type="text" onSearch={handleOnSearch} onChange={handlePartSearch} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                        <Form.Item label="Part Name" name="partDescription">
                            <TextArea
                                placeholder={preparePlaceholderText('Part Description')}
                                {...disableProp}
                                autoSize={{
                                    minRows: 1,
                                    maxRows: 2,
                                }}
                                maxLength={300}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="Part Number" name="partNumber">
                            <Input {...disableProp} placeholder={preparePlaceholderText('part number')} />
                        </Form.Item>
                    </Col>
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
                        <Form.Item label="Required Quantity" name="requiredQuantity" rules={[validateRequiredInputField('required quantity'), validationNumber('required quantity')]}>
                            <Input type="number" placeholder={preparePlaceholderText('required quantity')} />
                        </Form.Item>
                    </Col>

                    <Form.Item hidden name="id">
                        <Input />
                    </Form.Item>
                </Row>
            </Form>
            <Row gutter={20} className={styles.marB20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroup}>
                    {addButtonDisabled?.partDetailsResponses ? (
                        <>
                            <Button disabled={isBtnDisabled} onClick={handleAccesoriesForm} type="primary">
                                Add
                            </Button>
                            <Button danger onClick={onCancel}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button type="primary" onClick={() => onUpdate(index, seteditCardForm, editCardForm)}>
                                Save
                            </Button>
                            <Button danger onClick={onCancel}>
                                Cancel
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
            <PartNameListModal {...customerListProps} />
        </>
    );
}

export default AddEditForm;
