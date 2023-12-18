/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Collapse, Divider, Button, DatePicker, Switch } from 'antd';
import { FiPlus } from 'react-icons/fi';

import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validationNumber, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DataTable } from 'utils/dataTable';
import { dateFormat, formatDateToEndOfDayDate } from 'utils/formatDateTime';
import dayjs from 'dayjs';

import styles from 'assets/sass/app.module.scss';
import TreeSelectField from 'components/common/TreeSelectField';
import { productTableColumn } from './productTableColumn';
import { ProductHierarchyModal } from './ProductHierarchyModal';
import { PARAM_MASTER } from 'constants/paramMaster';
import { ViewDetail } from './ViewDetail';
import { disablePastDate } from 'utils/disableDate';
import { DrawerFormButton } from 'components/common/Button';
import { OFFER_TYPE_CONSTANTS } from './constants/offerTypeCodeConstants';
import { SCHEME_TYPE_CONSTANTS } from './constants/schemeTypeConstants';
import { zoneAreaTableColumn } from './zoneAreaTableColumn';
import { ZoneAreaModal } from './ZoneAreaModal';
import { translateContent } from 'utils/translateContent';
import { FindProductName } from 'components/common/ProductHierarchy/ProductHierarchyUtils';
import { DELETE_ACTION } from 'utils/btnVisiblity';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, productHierarchyData, saleService, setSaleService, schemeData, handleSchemeCategory, disableAmountTaxField, resetDetailData } = props;
    const { onFinish, openAccordian, setOpenAccordian, flatternData, schemeCategorySelect, taxField, setTaxField, productAddMode, setProductAddMode } = props;
    const { buttonData, setButtonData, onCloseAction, tableDataItem, zoneTableDataItem, setZoneTableDataItem, setTableDataItem, showGlobalNotification, formActionType } = props;
    const { handleButtonClick, selectedTreeSelectKey, setSelectedTreeSelectKey, handleSelectTreeClick, productHierarchyForm, typeData, isViewDetailVisible, onCloseActionViewDetails, schemeTypeData, encashTypeData, addSchemeForm, filterString, offerTypeData, manufacturerOrgHierarchyData, setOrganizationId, organizationId, manufacturerAdminHierarchyData, selectedTreeData, isProductLoading, productHierarchyList, addZoneAreaForm, zoneMasterData, areaOfficeData, handleZoneChange, productHierarchyDataList } = props;

    const [isAddProductDetailsVisible, setIsAddProductDetailsVisible] = useState(false);
    const [addZoneArea, setAddZoneArea] = useState(false);
    const [activeKey, setactiveKey] = useState([1]);
    const [editingData, setEditingData] = useState({});

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    useEffect(() => {
        return () => {
            resetDetailData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const CheckDateEffectiveTo = (value, effectiveFrom) => {
        const bool = dayjs(value).format('YYYY-MM-DD') >= dayjs(effectiveFrom).format('YYYY-MM-DD');
        if (bool) {
            return Promise.resolve();
        }
        return Promise.reject(new Error(translateContent('vehicleSalesSchemeMaster.text.dateError')));
    };

    // useEffect(() => {
    //     if (saleService?.sales && saleService?.service) {
    //         addSchemeForm.setFieldValue({ encash: ENCASH_CONSTANTS.ALL?.key });
    //     } else if (saleService?.sales && !saleService?.service) {
    //         addSchemeForm.setFieldValue({ encash: ENCASH_CONSTANTS.SALES?.key });
    //     } else if (!saleService?.sales && saleService?.service) {
    //         addSchemeForm.setFieldValue({ encash: ENCASH_CONSTANTS.SERVICE?.key });
    //     } else if (!saleService?.sales && !saleService?.service) {
    //         addSchemeForm.setFieldValue({ encash: ENCASH_CONSTANTS.NO?.key });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [saleService]);

    const handleSales = (props) => {
        setSaleService({ sales: props, service: saleService?.service });
    };

    const handleServices = (props) => {
        setSaleService({ sales: saleService?.sales, service: props });
    };
    const handleCollapse = (key, isOpen) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleOfferType = (value) => {
        setTaxField(value);
    };

    const handleAddVehicleDetails = () => {
        setProductAddMode(true);
        setIsAddProductDetailsVisible(true);
    };

    const handleAddZoneArea = () => {
        setAddZoneArea(true);
    };

    const handleDeleteZoneArea = ({ buttonAction, record }) => {
        if (buttonAction === DELETE_ACTION) {
            let updatedvalue = [...zoneTableDataItem];
            const index = zoneTableDataItem?.findIndex((e) => e?.area === record?.area);
            if (record?.id) {
                updatedvalue.splice(index, 1, { ...record, status: false });
            } else {
                updatedvalue.splice(index, 1);
            }
            setZoneTableDataItem([...updatedvalue]);
        }
    };

    const onFinishAddProductDetails = (values) => {
        setOpenAccordian([3]);
        let data = FindProductName(productHierarchyDataList, values?.modelCode);
        const index = tableDataItem?.findIndex((e) => e?.modelCode === editingData?.modelCode);
        const updatedvalue = [...tableDataItem];
        if (index >= 0) {
            updatedvalue.splice(index, 1, { ...values, modelName: data, toggleStatus: values?.toggleStatus, status: true });
            setTableDataItem([...updatedvalue]);
        } else if (productAddMode) {
            let isPresent = tableDataItem?.find((e) => e?.modelCode === values?.modelCode);
            if (isPresent && Object?.keys(isPresent)?.length > 0) {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleSalesSchemeMaster.text.errorMessageText1') });
            } else {
                setTableDataItem((prev) => [{ ...values, modelName: data, toggleStatus: values?.toggleStatus, status: true }, ...prev]);
            }
        }
        setEditingData({});
        setIsAddProductDetailsVisible(false);
        setSelectedTreeSelectKey([]);
        productHierarchyForm.resetFields();
    };
    const handleEditProduct = ({ buttonAction, record }) => {
        setProductAddMode(false);
        if (buttonAction === DELETE_ACTION) {
            const index = tableDataItem?.findIndex((e) => e?.modelCode === record?.modelCode);
            const updatedvalue = [...tableDataItem];
            if (record?.id) {
                updatedvalue.splice(index, 1, { ...record, status: false });
            } else {
                updatedvalue.splice(index, 1);
            }
            setTableDataItem([...updatedvalue]);
        } else {
            productHierarchyForm.setFieldsValue({ modelCode: record?.modelCode });
            setEditingData(record);
            setSelectedTreeSelectKey(record?.modelCode);
            setIsAddProductDetailsVisible(true);
        }
    };

    const onchangeSchemeCategory = (value) => {
        let vehicleSchemeData = schemeData?.find((el) => el.schemeCode === value);
        addSchemeForm.setFieldsValue({ amountWithoutTax: vehicleSchemeData?.schemeAmount, amountWithTax: vehicleSchemeData?.schemeTaxAmount });
    };
    console.log(saleService);
    const onFinishAddZoneDetails = (values) => {
        setOpenAccordian([2]);

        let zoneName = zoneMasterData?.find((e) => e?.zoneCode === values?.zone)?.zoneDescription;
        let areaName = areaOfficeData?.find((e) => e?.areaCode === values?.area)?.areaDescription;

        if (zoneTableDataItem?.length > 0) {
            let isPresent = zoneTableDataItem?.find((e) => e?.area === values?.area && e?.zone === values?.zone);
            if (isPresent && Object?.keys(isPresent)?.length > 0) {
                showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('vehicleSalesSchemeMaster.text.errorMessageText2') });
            } else {
                setZoneTableDataItem([{ ...values, areaName, zoneName, id: '', status: true }, ...zoneTableDataItem]);
            }
        } else {
            setZoneTableDataItem((prev) => [{ ...values, areaName, zoneName, id: '', status: true }, ...prev]);
        }

        setAddZoneArea(false);
        addZoneAreaForm.resetFields();
    };

    const onCloseActionAddProductDetails = () => {
        setIsAddProductDetailsVisible(false);
        setSelectedTreeSelectKey();
        productHierarchyForm.resetFields();
    };
    const onCloseZoneDetails = () => {
        setAddZoneArea(false);
        addZoneAreaForm.resetFields();
        setZoneTableDataItem([]);
    };
    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const zoneAreaModalProps = {
        isVisible: addZoneArea,
        titleOverride: translateContent('vehicleSalesSchemeMaster.heading.addZoneTitle'),
        onCloseAction: onCloseZoneDetails,
        addZoneAreaForm,
        zoneMasterData,
        areaOfficeData,
        onFinishAddZoneDetails,
        handleZoneChange,
    };

    const productHierarchyModalProps = {
        isVisible: isAddProductDetailsVisible,
        titleOverride: translateContent('vehicleSalesSchemeMaster.heading.addProductDetails'),
        productHierarchyForm,
        productHierarchyDataList,
        setIsAddProductDetailsVisible,
        onCloseAction: onCloseActionAddProductDetails,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
        handleSelectTreeClick,
        onFinishAddProductDetails,
        isProductLoading,
        productHierarchyList,
        addSchemeForm,
        editingData,
        formActionType,
    };

    const organizationFieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };
    const treeOrgFieldNames = { ...organizationFieldNames, label: organizationFieldNames?.title, value: organizationFieldNames?.key };

    const treeSelectFieldProps = {
        treeFieldNames: treeOrgFieldNames,
        treeData: manufacturerOrgHierarchyData,
        treeDisabled: treeCodeReadOnly,
        selectedTreeSelectKey: organizationId,
        handleSelectTreeClick: (value) => {
            setOrganizationId(value);
        },
        HandleClear: () => {
            setOrganizationId(null);
            setSelectedTreeSelectKey(null);
        },
        defaultValue: treeCodeId,
        placeholder: preparePlaceholderSelect(translateContent('vehicleSalesSchemeMaster.placeholder.manufacturerOrganisation')),
        defaultParent: false,
    };

    const zoneAreaTableProps = {
        tableColumn: zoneAreaTableColumn({ handleButtonClick: handleDeleteZoneArea, styles, formActionType, zoneTableDataItem, areaOfficeData }),
        tableData: zoneTableDataItem?.filter((i) => i?.status),
    };

    const productTableProps = {
        tableColumn: productTableColumn({ handleButtonClick: handleEditProduct, styles, formActionType }),
        tableData: tableDataItem?.filter((i) => i?.status),
    };

    const viewProps = {
        formData,
        isVisible: isViewDetailVisible,
        titleOverride: translateContent('vehicleSalesSchemeMaster.heading.moduleTitle'),
        openAccordian,
        setOpenAccordian,
        onCloseAction: onCloseActionViewDetails,
        buttonData,
        schemeTypeData,
        offerTypeData,
        productHierarchyData,
        taxField,
        tableDataItem,
        encashTypeData,
        activeKey,
        onChange,
        selectedTreeData,
        flatternData,
        manufacturerAdminHierarchyData,
        manufacturerOrgHierarchyData,
        zoneTableDataItem,
        formActionType,
        schemeData,
    };

    const buttonProps = {
        saveButtonName: translateContent('global.buttons.submit'),
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form form={addSchemeForm} data-testid="test" onFinish={onFinish} layout="vertical" autocomplete="off" colon="false">
            {formActionType?.viewMode ? (
                <ViewDetail {...viewProps} />
            ) : (
                <>
                    <Row gutter={20} className={styles.drawerBodyRight}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                                <Panel header={translateContent('vehicleSalesSchemeMaster.label.schemeDetails')} key={1}>
                                    <Divider />
                                    <Row gutter={24}>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.manufacturerOrganisation')} initialValue={formData?.moHierarchyMstId} labelInValue={true} name="moHierarchyMstId">
                                                <TreeSelectField {...treeSelectFieldProps} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.schemeType')} name="schemeType" rules={[validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.schemeType'))]}>
                                                {customSelectBox({ data: typeData[PARAM_MASTER?.SCHEME_TYPE?.id], placeholder: preparePlaceholderSelect(''), onChange: handleSchemeCategory })}
                                            </Form.Item>
                                        </Col>
                                        {[SCHEME_TYPE_CONSTANTS?.RSA_FOC?.key, SCHEME_TYPE_CONSTANTS?.AMC_FOC?.key, SCHEME_TYPE_CONSTANTS?.SHIELD_FOC?.key]?.includes(schemeCategorySelect) && (
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.schemeCategory} label={translateContent('vehicleSalesSchemeMaster.label.schemeCategory')} name="schemeCategory" rules={[validateRequiredInputField(translateContent('vehicleSalesSchemeMaster.validation.schemeCategory'))]}>
                                                    {customSelectBox({ data: schemeData, onChange: onchangeSchemeCategory, placeholder: preparePlaceholderSelect(translateContent('vehicleSalesSchemeMaster.placeholder.schemeCategory')), fieldNames: { key: 'schemeCode', value: 'schemeDescription' } })}
                                                </Form.Item>
                                            </Col>
                                        )}

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.schemeDescription')} name="schemeDescription" rules={[validateRequiredInputField(translateContent('vehicleSalesSchemeMaster.validation.schemeDescription'))]}>
                                                <Input placeholder={preparePlaceholderText(translateContent('vehicleSalesSchemeMaster.placeholder.schemeDescription'))} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('vehicleSalesSchemeMaster.label.offerType')} name="offerType" rules={[validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.offerType'))]}>
                                                {customSelectBox({ data: typeData[PARAM_MASTER?.OFFER_TYPE?.id], placeholder: preparePlaceholderSelect(translateContent('vehicleSalesSchemeMaster.placeholder.offerType')), onChange: handleOfferType })}
                                            </Form.Item>
                                        </Col>
                                        {taxField === OFFER_TYPE_CONSTANTS?.DISCOUNT?.key && (
                                            <>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Form.Item initialValue={formData?.amountWithoutTax} rules={[validationNumber(translateContent('vehicleSalesSchemeMaster.label.amountWithoutTax'))]} label={translateContent('vehicleSalesSchemeMaster.label.amountWithoutTax')} name="amountWithoutTax">
                                                        <Input placeholder={preparePlaceholderText(translateContent('vehicleSalesSchemeMaster.placeholder.amountWithoutTax'))} disabled={disableAmountTaxField} />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                    <Form.Item initialValue={formData?.amountWithTax} rules={[validationNumber(translateContent('vehicleSalesSchemeMaster.label.amountWithTax'))]} label={translateContent('vehicleSalesSchemeMaster.label.amountWithTax')} name="amountWithTax">
                                                        <Input placeholder={preparePlaceholderText(translateContent('vehicleSalesSchemeMaster.placeholder.amountWithTax'))} disabled={disableAmountTaxField} />
                                                    </Form.Item>
                                                </Col>
                                            </>
                                        )}
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formatDateToEndOfDayDate(filterString?.validityFromDate)} label={translateContent('vehicleSalesSchemeMaster.label.validityFromDate')} name="validityFromDate" rules={[validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.validityFromDate'))]} className={styles?.datePicker}>
                                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item
                                                initialValue={formatDateToEndOfDayDate(filterString?.validityToDate)}
                                                label={translateContent('vehicleSalesSchemeMaster.label.validityToDate')}
                                                name="validityToDate"
                                                rules={[
                                                    validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.validityToDate')),
                                                    {
                                                        validator: (_, value) => {
                                                            return addSchemeForm.getFieldValue('validityFromDate') ? CheckDateEffectiveTo(value, addSchemeForm?.getFieldValue('validityFromDate')) : null;
                                                        },
                                                    },
                                                ]}
                                                className={styles?.datePicker}
                                            >
                                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formatDateToEndOfDayDate(formData?.vehicleInvoiceFromDate)} label={translateContent('vehicleSalesSchemeMaster.label.vehicleInvoiceFromDate')} name="vehicleInvoiceFromDate" rules={[validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.vehicleInvoiceFromDate'))]} className={styles?.datePicker}>
                                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth}  onChange={() => addSchemeForm.setFieldsValue({ toDate: undefined })} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item
                                                initialValue={formatDateToEndOfDayDate(formData?.vehicleInvoiceToDate)}
                                                label={translateContent('vehicleSalesSchemeMaster.label.vehicleInvoiceToDate')}
                                                name="vehicleInvoiceToDate"
                                                rules={[
                                                    validateRequiredSelectField(translateContent('vehicleSalesSchemeMaster.validation.vehicleInvoiceToDate')),
                                                    {
                                                        validator: (_, value) => {
                                                            return addSchemeForm.getFieldValue('vehicleInvoiceFromDate') ? CheckDateEffectiveTo(value, addSchemeForm?.getFieldValue('vehicleInvoiceFromDate')) : null;
                                                        },
                                                    },
                                                ]}
                                                className={styles?.datePicker}
                                            >
                                                <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                                            <Form.Item initialValue={formData?.encash} name="encash" label={translateContent('vehicleSalesSchemeMaster.label.encash')} />
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item name="sales" initialValue={formActionType?.editMode ? saleService?.sales === true : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" label={translateContent('vehicleSalesSchemeMaster.label.encashOnSales')}>
                                                <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} onChange={handleSales} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                            <Form.Item name="service" initialValue={formActionType?.editMode ? saleService?.service === true : false} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" label={translateContent('vehicleSalesSchemeMaster.label.encashOnService')}>
                                                <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} onChange={handleServices} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                            <Form.Item hidden name="id">
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                            <Collapse onChange={() => handleCollapse(2)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                                <Panel
                                    key={2}
                                    header={
                                        <Row gutter={20} className={styles.verticallyCentered}>
                                            {translateContent('vehicleSalesSchemeMaster.label.zoneDetails')}
                                            <Col xs={14} sm={14} md={6} lg={6} xl={6}>
                                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                    <Button type="primary" icon={<FiPlus />} onClick={handleAddZoneArea}>
                                                        {translateContent('global.buttons.add')}
                                                    </Button>
                                                </Col>
                                            </Col>
                                        </Row>
                                    }
                                >
                                    <Divider />
                                    <DataTable {...zoneAreaTableProps} />
                                </Panel>
                            </Collapse>
                            <Collapse onChange={() => handleCollapse(3)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                                <Panel
                                    key={3}
                                    header={
                                        <Row gutter={20} className={styles.verticallyCentered}>
                                            {translateContent('vehicleSalesSchemeMaster.label.productDetails')}
                                            <Col xs={14} sm={14} md={6} lg={6} xl={6}>
                                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                    <Button type="primary" icon={<FiPlus />} onClick={handleAddVehicleDetails}>
                                                        {translateContent('global.buttons.add')}
                                                    </Button>
                                                </Col>
                                            </Col>
                                        </Row>
                                    }
                                >
                                    <Divider />
                                    <DataTable {...productTableProps} />
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                </>
            )}
            <ProductHierarchyModal {...productHierarchyModalProps} />
            <ZoneAreaModal {...zoneAreaModalProps} />
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
