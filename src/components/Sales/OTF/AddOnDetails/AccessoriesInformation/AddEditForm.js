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
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;
const { Search } = Input;

function AddEditForm({ onUpdate, isPresent, index, fnSetData, seteditCardForm, editCardForm, selectedOrderId, partNameSearchVisible, setPartNameSearchVisible, handleFormValueChange, showGlobalNotification, onSearchPart, setsearchData, searchData, addButtonDisabled, setaddButtonDisabled, setAddOnItemInfo, AddonPartsData, onCancel, accessoryForm, onFieldsChange, isBtnDisabled }) {
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
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingManagement.validation.providePartNumber') });
                    return;
                }

                const data = { ...values, otfNumber: selectedOrderId, isDeleting: true, id: '' };

                setAddOnItemInfo((prev) => (prev ? [data, ...prev] : [data]));
                accessoryForm.resetFields();
                setsearchData();
                setaddButtonDisabled({ ...addButtonDisabled, partDetailsResponses: false });
                handleFormValueChange();
            })
            .catch((err) => {});
    };

    const handleOnSearch = (value) => {
        onSearchPart(value);
    };

    const handleSelectedData = () => {
        fnSetData({ ...selectedRowData });
        accessoryForm.resetFields(['partName']);
        setSelectedRowData();
        setPartNameSearchVisible(false);
    };

    const customerListProps = {
        isVisible: partNameSearchVisible,
        titleOverride: translateContent('bookingManagement.placeholder.searchResult'),
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
            <Form autoComplete="off" form={accessoryForm} onFieldsChange={onFieldsChange} layout="vertical">
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label="" name="partName">
                            <Search placeholder={preparePlaceholderText(translateContent('bookingManagement.label.partName'), true, translateContent('bookingManagement.label.search'))} maxLength={55} allowClear type="text" onSearch={handleOnSearch} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('bookingManagement.label.partName')} name="partDescription">
                            <TextArea
                                placeholder={preparePlaceholderText(translateContent('bookingManagement.label.partName'))}
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
                        <Form.Item label={translateContent('bookingManagement.label.partNumber')} name="partNumber">
                            <Input {...disableProp} placeholder={translateContent('bookingManagement.label.partNumber')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('bookingManagement.label.partType')} name="type">
                            <Input {...disableProp} placeholder={translateContent('bookingManagement.label.partType')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('bookingManagement.label.sellingPrice')} name="sellingPrice">
                            <Input {...disableProp} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.sellingPrice'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item label={translateContent('bookingManagement.label.mrp')} name="mrp">
                            <Input {...disableProp} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.mrp'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item
                            label={translateContent('bookingManagement.label.requiredQuantity')}
                            name="requiredQuantity"
                            rules={[
                                validateRequiredInputField(translateContent('bookingManagement.label.requiredQuantity')),
                                validationNumber(translateContent('bookingManagement.label.requiredQuantity')),
                                {
                                    validator: (_, value) => {
                                        if (value > 50 || value < 0) {
                                            return Promise.reject(new Error(translateContent('bookingManagement.validation.requiredQuantityLessThan50')));
                                        } else {
                                            return Promise.resolve();
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input type="number" max={50} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.requiredQuantity'))} />
                        </Form.Item>
                    </Col>
                    <Form.Item hidden name="id">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="hsnCode">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="partLocationId">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="gndpPrice">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden name="landedCost">
                        <Input />
                    </Form.Item>
                </Row>
            </Form>
            <Row gutter={20} className={styles.marB20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroup}>
                    {addButtonDisabled?.partDetailsResponses ? (
                        <>
                            <Button disabled={isBtnDisabled} onClick={handleAccesoriesForm} type="primary">
                                {translateContent('global.buttons.add')}
                            </Button>
                            <Button danger onClick={onCancel}>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button type="primary" onClick={() => onUpdate(index, seteditCardForm, editCardForm)}>
                                {translateContent('global.buttons.save')}
                            </Button>
                            <Button danger onClick={onCancel}>
                                {translateContent('global.buttons.cancel')}
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
