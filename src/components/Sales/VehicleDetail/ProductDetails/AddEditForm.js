/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { Button, Collapse, Form, Typography, Row, Col, Input, Divider } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { DataTable } from 'utils/dataTable';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AggregateAddEditForm } from './AggregateAddEditForm';
import { tableColumn } from './tableCoulmn';

import { formattedCalendarDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { ListDataTable } from 'utils/ListDataTable';
import { LANGUAGE_EN } from 'language/en';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { isReadOnly, setIsReadOnly, typeData } = props;
    const { itemOptions, setitemOptions, makeOptions, setmakeOptions } = props;
    const { formData, formActionType, handleCollapse, showGlobalNotification, selectedRecordId, form, openAccordian, setOpenAccordian, optionalServices, setOptionalServices, handleFormValueChange, tooltTipText, isVariantLoading, isModelFamilyLoading, isModelLoading } = props;
    const { MakefieldNames, ItemFieldNames, bindCodeValue, ITEM_TYPE } = props;
    const { collapseProps, disabledProps, bindStatus } = props;
    const { page, setPage } = props;

    const [aggregateForm] = Form.useForm();
    const [connectedForm] = Form.useForm();

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
                return undefined;
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
        optionalServices,
        setOptionalServices,
        page,
        setPage,
    };

    const handleEdit = ({ record }) => {
        setAdvanceformData({ ...record, index: record?.uniqueId });
        aggregateForm.resetFields();
        setOpenAccordian('Aggregates');
        setisEditing(true);
        setIsReadOnly(true);
    };

    const handleDelete = ({ index }) => {
        setOptionalServices(optionalServices.filter((i) => i?.uniqueId !== index)?.map((item, index) => ({ ...item, uniqueId: index })));
    };

    const handleButtonClick = ({ buttonAction, record }) => {
        switch (buttonAction) {
            case 'edit': {
                handleEdit({ record, index: record?.uniqueId });
                break;
            }
            case 'delete': {
                handleDelete({ record, index: record?.uniqueId });
                break;
            }
            default: {
                return false;
            }
        }
    };

    const ListDatatableProps = {
        dynamicPagination: true,
        totalRecords: optionalServices?.length,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, formActionType, bindCodeValue, ITEM_TYPE }),
        tableData: optionalServices,
        showAddButton: false,
        handleAdd: () => {},
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        filterString: page,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse onChange={() => handleCollapse('Attribute')} expandIconPosition="end" collapsible="icon" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel header="Product Attribute Details" key="Attribute">
                            <Divider />
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Product Division" name="productDivision" initialValue={formData?.productAttributeDetail?.productDivision}>
                                        <Input maxLength={15} placeholder={preparePlaceholderText('product division')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Model Family" name="modelFamily" initialValue={formData?.productAttributeDetail?.modelFamily}>
                                        <Input loading={isModelFamilyLoading} maxLength={15} placeholder={preparePlaceholderText('model familiy')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Model Group" name="modelGroup" initialValue={formData?.productAttributeDetail?.modelGroup}>
                                        <Input loading={isModelLoading} maxLength={15} placeholder={preparePlaceholderText('model group')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Model Variant" name="modelVariant" initialValue={formData?.productAttributeDetail?.modelVariant}>
                                        <Input loading={isVariantLoading} maxLength={15} placeholder={preparePlaceholderText('model variant')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.modelTooltipView}>
                                    {addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={15} />)}
                                    <Form.Item label="Model Description" name="model">
                                        <Input title={formData?.productAttributeDetail?.model} maxLength={15} placeholder={preparePlaceholderText('model ')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Manufacturer Invoice Date" name="manufacturerInvoiceDate">
                                        <DatePicker format={dateFormat} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label="Manufacturer Warranty Start Date" name="manufacturerWarrantyStartDate">
                                        <DatePicker format={dateFormat} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            </Row> */}
                        </Panel>
                    </Collapse>
                    {/* <Collapse onChange={() => handleCollapse('Vehicle')} expandIconPosition="end" collapsible="icon" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel header="Connected Vehicle" key="Vehicle">
                            <Form layout="vertical" autoComplete="off" form={connectedForm}>
                                <Divider />
                                {formData?.connectedVehicle?.map((element, index) => {
                                    return (
                                        <Collapse onChange={() => handleInnerCollapse(index)} expandIconPosition="end" collapsible="icon" expandIcon={expandIcon} activeKey={InnerCollapse} {...collapseProps}>
                                            <Panel header={`${element?.tcuId} | ${element?.esimNo}`} key={index}>
                                                <Divider />
                                                <Row gutter={20}>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="TCU ID" name={[index, 'tcuId']}>
                                                            <Input maxLength={15} placeholder={preparePlaceholderText('tcu id')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="E-Sim No" name={[index, 'esimNo']}>
                                                            <Input maxLength={15} placeholder={preparePlaceholderText('Sim no.')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="E-Sim Status" name={[index, 'esimStatus']}>
                                                            <Input maxLength={15} placeholder={preparePlaceholderText('Sim status')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="Preffered Mobile No 1" name={[index, 'preferredMobileNo1']}>
                                                            <Input maxLength={15} placeholder={preparePlaceholderText('mobile no')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="Preffered Mobile No 2" name={[index, 'preferredMobileNo2']}>
                                                            <Input maxLength={15} placeholder={preparePlaceholderText('mobile no')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                        <Form.Item label="KYC Status" name={[index, 'kycStatus']}>
                                                            <Input maxLength={15} placeholder={preparePlaceholderText('kyc status')} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Panel>
                                        </Collapse>
                                    );
                                })}
                                {!formData?.connectedVehicle?.length && <NoDataFound informtion={noDataTitle} />}
                            </Form>
                        </Panel>
                    </Collapse> */}
                    <Collapse onChange={() => handleCollapse('Aggregates')} expandIconPosition="end" collapsible="icon" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Aggregates</Text>
                                        {!formData?.productAttributeDetail &&
                                            addToolTip(
                                                'No product Attribute Details Present',
                                                'bottom'
                                            )(
                                                <Button className={styles.marL10} data-testid="addBtn" onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly || !formData?.productAttributeDetail}>
                                                    Add
                                                </Button>
                                            )}
                                        {formData?.productAttributeDetail && (
                                            <Button className={styles.marL10} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly || !formData?.productAttributeDetail}>
                                                Add
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            }
                            key="Aggregates"
                        >
                            <Divider />
                            <ListDataTable {...ListDatatableProps} />
                            {/* <DataTable tableColumn={tableColumn({ handleButtonClick, formActionType, bindCodeValue, ITEM_TYPE })} tableData={optionalServices} pagination={false} /> */}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <AggregateAddEditForm {...advanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
