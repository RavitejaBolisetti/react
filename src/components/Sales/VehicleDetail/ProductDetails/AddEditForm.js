/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { Button, Collapse, Form, Typography, Row, Col, Space, Input, Divider, DatePicker } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { DataTable } from 'utils/dataTable';
import { addToolTip } from 'utils/customMenuLink';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AggregateAddEditForm } from './AggregateAddEditForm';
import { tableColumn } from './tableCoulmn';

import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { NoDataFound } from 'utils/noDataFound';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { isReadOnly, setIsReadOnly, typeData } = props;
    const { itemOptions, setitemOptions, makeOptions, setmakeOptions } = props;
    const { formData, formActionType, handleCollapse, showGlobalNotification, selectedRecordId, form, openAccordian, setOpenAccordian, optionsServiceModified, setoptionsServiceModified, handleFormValueChange, tooltTipText } = props;
    const { MakefieldNames, ItemFieldNames, bindCodeValue } = props;
    const { collapseProps, disabledProps, bindStatus } = props;

    const [aggregateForm] = Form.useForm();
    const [connectedForm] = Form.useForm();
    const [InnerCollapse, setInnerCollapse] = useState();

    const [isEditing, setisEditing] = useState(false);
    const [AdvanceformData, setAdvanceformData] = useState();
    const AggregateModuleTitle = `Aggregates`;

    useEffect(() => {
        if (formData?.productAttributeDetail) {
            form.setFieldsValue({
                ...formData?.productAttributeDetail,
                manufacturerInvoiceDate: formattedCalendarDate(formData?.productAttributeDetail?.manufacturerInvoiceDate),
                manufacturerWarrantyStartDate: formattedCalendarDate(formData?.productAttributeDetail?.manufacturerWarrantyStartDate),
            });
        }
        if (formData?.connectedVehicle?.length) {
            formData?.connectedVehicle?.map((element, index) => {
                connectedForm.setFieldsValue({ [index]: { ...element, esimStatus: bindStatus(element, 'esimStatus', { active: 'Active', inactive: 'Inctive' }), kycStatus: bindStatus(element, 'kycStatus', { active: 'Recieved', inactive: 'Not Recieved' }) } });
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const addContactHandeler = (e) => {
        aggregateForm.resetFields();
        setOpenAccordian('Aggregates');
        setIsReadOnly(true);
    };

    const handleCanceler = () => {
        setIsReadOnly(false);
        setisEditing(false);
        aggregateForm.resetFields();
    };

    const handleInnerCollapse = (key) => {
        setInnerCollapse((prev) => (prev === key ? '' : key));
    };
    const AggregateFormProps = {
        handleCancel: handleCanceler,
        aggregateForm,
        showGlobalNotification,
        selectedRecordId,
        formData,
        setOpenAccordian,
        addContactHandeler,
        handleFormValueChange,
        MakefieldNames,
        ItemFieldNames,
    };
    const advanceFilterProps = {
        ...AggregateFormProps,
        AdvanceformData,
        setAdvanceformData,
        aggregateForm,
        isVisible: isReadOnly,
        titleOverride: (isEditing ? 'Edit ' : 'Add  ') + AggregateModuleTitle,
        onCloseAction: () => {
            setIsReadOnly(false);
        },
        setAdvanceSearchVisible: setIsReadOnly,
        isEditing,
        setisEditing,
        onCloseAction: handleCanceler,
        typeData,
        itemOptions,
        setitemOptions,
        makeOptions,
        setmakeOptions,
        optionsServiceModified,
        setoptionsServiceModified,
    };

    const handleEdit = ({ record, index }) => {
        setAdvanceformData({ ...record, index: index });
        aggregateForm.resetFields();
        setOpenAccordian('Aggregates');
        setisEditing(true);
        setIsReadOnly(true);
    };

    const handleDelete = ({ record, index }) => {
        setoptionsServiceModified(optionsServiceModified.filter((element, i) => i !== index));
    };

    const handleButtonClick = ({ buttonAction, record, index }) => {
        switch (buttonAction) {
            case 'edit': {
                handleEdit({ record, index });
                break;
            }
            case 'delete': {
                handleDelete({ record, index });
                break;
            }
            default: {
                return;
            }
        }
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space direction="vertical" size="small" className={styles.accordianContainer}>
                        <Collapse onChange={() => handleCollapse('Attribute')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                            <Panel header="Product Attribute Details" key="Attribute">
                                <Divider />

                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Product Division" name="productDivision">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('product division')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Model Group" name="modelGroup">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model group')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Model Family" name="modelFamily">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model familiy')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Model Variant" name="modelVariant">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model variant')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.modelTooltip}>
                                        {addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                        <Form.Item label="Model" name="model">
                                            <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('model ')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Manufacturer Invoice Date" name="manufacturerInvoiceDate">
                                            <DatePicker format={dateFormat} style={{ display: 'auto', width: '100%' }} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label="Manufacturer Warranty Start Date" name="manufacturerWarrantyStartDate">
                                            <DatePicker format={dateFormat} style={{ display: 'auto', width: '100%' }} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                        <Form layout="vertical" autoComplete="off" form={connectedForm}>
                            <Collapse onChange={() => handleCollapse('Vehicle')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                                <Panel header="Connected Vehicle" key="Vehicle">
                                    <Divider />
                                    {formData?.connectedVehicle?.map((element, index) => {
                                        return (
                                            <Collapse onChange={() => handleInnerCollapse(index)} expandIconPosition="end" expandIcon={expandIcon} activeKey={InnerCollapse} {...collapseProps}>
                                                <Panel header={`${element?.tcuId} | ${element?.esimNo}`} key={index}>
                                                    <Divider />
                                                    <Row gutter={20}>
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item label="TCU ID" name={[index, 'tcuId']}>
                                                                <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('tcu id')} {...disabledProps} />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item label="E-Sim No" name={[index, 'esimNo']}>
                                                                <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('Sim no.')} {...disabledProps} />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item label="E-Sim Status" name={[index, 'esimStatus']}>
                                                                <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('Sim status')} {...disabledProps} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={20}>
                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item label="Preffered Mobile No 1" name={[index, 'preferredMobileNo1']}>
                                                                <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('mobile no')} {...disabledProps} />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item label="Preffered Mobile No 2" name={[index, 'preferredMobileNo2']}>
                                                                <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('mobile no')} {...disabledProps} />
                                                            </Form.Item>
                                                        </Col>

                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                            <Form.Item label="KYC Status" name={[index, 'kycStatus']}>
                                                                <Input maxLength={15} className={styles.inputBox} placeholder={preparePlaceholderText('kyc status')} {...disabledProps} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Panel>
                                            </Collapse>
                                        );
                                    })}
                                    {!formData?.connectedVehicle?.length && <NoDataFound informtion={'No connected Vehicle Data'} />}
                                </Panel>
                            </Collapse>
                        </Form>
                        <Collapse onChange={() => handleCollapse('Aggregates')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                            <Panel
                                header={
                                    <Row>
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Aggregates
                                            </Text>
                                            <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly}>
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                                key="Aggregates"
                            >
                                <DataTable tableColumn={tableColumn({ handleButtonClick, formActionType, bindCodeValue })} tableData={optionsServiceModified} pagination={false} />
                            </Panel>
                        </Collapse>
                    </Space>
                </Col>
            </Row>
            <AggregateAddEditForm {...advanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
