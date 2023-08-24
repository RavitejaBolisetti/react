/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { Button, Collapse, Form, Typography, Row, Col, Input, Divider, DatePicker, Switch } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { OptionalServiceAddEditForm } from './OptionalServiceAddEditForm';
import { tableColumn } from './tableColumn';
import { OptionalServicetableColumn } from './OptionalServicetableColumn';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';
import { ListDataTable } from 'utils/ListDataTable';
import { customSelectBox } from 'utils/customSelectBox';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { isReadOnly, setIsReadOnly, typeData } = props;
    const { itemOptions, setitemOptions, makeOptions, setmakeOptions } = props;
    const { formData, handleCollapse, showGlobalNotification, selectedRecordId, form, openAccordian, setOpenAccordian, optionsServiceModified, setoptionsServiceModified, handleFormValueChange } = props;
    const { MakefieldNames, ItemFieldNames } = props;
    const { collapseProps, disabledProps, bindStatus } = props;

    const [connectedForm] = Form.useForm();
    const [aggregateForm] = Form.useForm();
    const [InnerCollapse, setInnerCollapse] = useState();

    const [isEditing, setisEditing] = useState(false);
    const [AdvanceformData, setAdvanceformData] = useState();
    const AggregateModuleTitle = `Services`;

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
                return undefined;
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const addContactHandeler = (e) => {
        aggregateForm.resetFields();
        setOpenAccordian('Services');
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
        setOpenAccordian('Services');
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

    const taxdetaildata = [
        {
            description: 'description',
            rate: '10',
            amount: '500',
        },
    ];

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse onChange={() => handleCollapse('VehicleInfo')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel header="Vehicle Information" key="VehicleInfo">
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Vehicle Usage Type" name="usageType">
                                        {customSelectBox({ placeholder: preparePlaceholderSelect('Vehicle Usage Type') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Model " name="model">
                                        <Input maxLength={15} placeholder={preparePlaceholderText('model ')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Model Code" name="modelCode">
                                        <Input maxLength={15} placeholder={preparePlaceholderText('model code')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="VIN Number" name="vin">
                                        <Input maxLength={15} placeholder={preparePlaceholderText('VIN Number')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.modelTooltip}>
                                    <Form.Item label="Vehicle Sellin Price" name="sellingPrice">
                                        <Input maxLength={15} placeholder={preparePlaceholderText('Vehicle Sellin Price')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.modelTooltip}>
                                    <Form.Item label="Discount Amount" name="discountAmount">
                                        <Input maxLength={15} placeholder={preparePlaceholderText('Discount Amount')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Total Tax Amount" name="totalTaxAmount">
                                        <DatePicker format={dateFormat} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Vehicle Amount" name="vehicleAmount">
                                        <DatePicker format={dateFormat} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Total Booking Amount" name="totalBookingAmount">
                                        <DatePicker format={dateFormat} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Status" name="active">
                                        <Switch checkedChildren="Yes" unCheckedChildren="No" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                    <Form layout="vertical" autoComplete="off" form={connectedForm}>
                        <Collapse onChange={() => handleCollapse('TaxDetails')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                            <Panel header="Tax Details" key="TaxDetails">
                                <Divider />
                                <ListDataTable tableColumn={tableColumn({ handleButtonClick })} tableData={taxdetaildata} pagination={false} />
                                {/* {!formData?.connectedVehicle?.length && <NoDataFound informtion={'No connected Vehicle Data'} />} */}
                            </Panel>
                        </Collapse>
                    </Form>
                    <Collapse onChange={() => handleCollapse('Services')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Optional Services</Text>
                                        {/* {!formData?.productAttributeDetail &&
                                            addToolTip(
                                                'No product Attribute Details Present',
                                                'bottom'
                                            )(
                                                <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly || !formData?.productAttributeDetail}>
                                                    Add
                                                </Button>
                                            )} */}
                                        {/* {formData?.productAttributeDetail && ( */}
                                        <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                            Add
                                        </Button>
                                        {/* )} */}
                                    </Col>
                                </Row>
                            }
                            key="Services"
                        >
                            <ListDataTable tableColumn={OptionalServicetableColumn({ handleButtonClick })} tableData={optionsServiceModified} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <OptionalServiceAddEditForm {...advanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
