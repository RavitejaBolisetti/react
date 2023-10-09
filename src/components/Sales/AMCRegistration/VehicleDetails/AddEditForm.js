/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Form, Row, Col, Select, Input, Checkbox, Divider, DatePicker } from 'antd';
import { validateLettersWithWhitespaces, validateEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, duplicateValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;

const AddEditForm = (props) => {
    const { isReadOnly = false, onSaveFormData, handleVinSearch, contactform, setShowAddEditForm, setIsEditing, typeData, customerType, formActionType, handleFormValueChange, setIsAdding, contactData, editingData } = props;

    const disabledProps = { disabled: true || formActionType?.viewMode };

    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    const handleNumberValidation = (event) => {
        const Mno = event.target.value;
        const regex = new RegExp('^([5-9]){1}([0-9]){9}$');
        if (Mno?.length === 10 && regex.test(Mno)) {
            // setmobileLoader(true);
            // setTimeout(() => {
            //     setIsModalOpen(true);
            // }, 1000);
        } else {
            // setmobileLoader(false);
        }
    };

    // const onCloseActionOnContinue = () => {
    //     setIsModalOpen(false);
    //     setmobileLoader(false);
    //     setContinueWithOldMobNo(true);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setmobileLoader(false);
    //     setContinueWithOldMobNo(false);
    //     setIsAdding(false);
    // };

    // const modalProps = {
    //     isVisible: isModalOpen,
    //     icon: <BiLockAlt />,
    //     titleOverride: 'Mobile Number Validation',
    //     closable: false,
    //     onCloseAction: handleCancel,
    //     onCloseActionOnContinue,
    // };

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="VIN" name="vin">
                            <Search placeholder={preparePlaceholderText('VIN')} onSearch={handleVinSearch} allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Vehicle Registration Number" name="vehicleRegistrationNumber">
                            <Input disabled maxLength={10} placeholder={preparePlaceholderText('Vehicle Registration Number')} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Org. Warranty Start Date" name="orignallyWarrantyStartDate">
                            <DatePicker disabled placeholder={preparePlaceholderText('Org. Warranty Start Date')} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Model Group" name="modelGroup">
                            <Input disabled placeholder={preparePlaceholderText('Model Group')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Model Family" name="modelFamily">
                            <Input disabled placeholder={preparePlaceholderText('Model Family')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Model Description" name="modelDescription">
                            <Input disabled placeholder={preparePlaceholderText('Model Description')} />
                        </Form.Item>
                    </Col>
                </Row>

                {!formActionType?.viewMode && (
                    <Row gutter={20} className={styles.marB20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupLeft}>
                            <Button onClick={onSaveFormData} type="primary">
                                Add
                            </Button>
                            <Button onClick={handleCancelFormEdit} danger>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </>
    );
};

export default AddEditForm;
