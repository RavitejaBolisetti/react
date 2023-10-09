/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, Card, Collapse, Divider, Button } from 'antd';
import { FiPlus } from 'react-icons/fi';

import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { tableColumnVehicleDetails } from './tableColumnVehicleDetails';
import { DataTable } from 'utils/dataTable';
import { AddVehicleDetailsModal } from './AddVehicleDetailsModal';
import { VIEW_ACTION, EDIT_ACTION, DELETE_ACTION } from 'utils/btnVisiblity';

import styles from 'assets/sass/app.module.scss';
import { STOCK_TRANSFER } from 'constants/StockTransfer';

const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, toggleButton, productHierarchyData } = props;
    const { addIndentDetailsForm, onFinish, indentLocationList, isLoadingDealerLoc, requestedByDealerList, openAccordian, setOpenAccordian } = props;
    const { buttonData, setButtonData, onCloseAction, tableDataItem, setTableDataItem, defaultDealerLocationCode } = props;
    const { handleButtonClick, handleChangeLocation } = props;

    const [addVehicleDetailsForm] = Form.useForm();
    const [isAddVehicleDetailsVisible, setIsAddVehicleDetailsVisible] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState();
    const [addVehicleTitle, setToaddVehicleTitle] = useState('Add Vehicle Details');

    const handleButtonClickVehicleDetails = ({ record = null, buttonAction, openDefaultSection = true, index }) => {
        switch (buttonAction) {
            case VIEW_ACTION:
                addVehicleDetailsForm?.setFieldsValue({ ...record, index: index });
                setIsAddVehicleDetailsVisible(true);
                break;
            case EDIT_ACTION:
                addVehicleDetailsForm?.setFieldsValue({ ...record, index: index });
                setToaddVehicleTitle('Edit Vehicle Details');
                setIsAddVehicleDetailsVisible(true);
                break;
            case DELETE_ACTION:
                let arrayOfNumbers = [...tableDataItem];
                arrayOfNumbers.splice(index, 1);
                setTableDataItem([...arrayOfNumbers]);
                break;

            default:
                break;
        }
    };

    const buttonProps = {
        saveButtonName: 'Submit',
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const handleCollapse = (key, isOpen) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleAddVehicleDetails = () => {
        setIsAddVehicleDetailsVisible(true);
    };

    const initialTableDataItem = {
        modelDescription: '',
        modelCode: '',
        requestedQuantity: 0,
        cancelledQuantity: 0,
        issuedAndNotReceivedQuantity: 0,
        receivedQuantity: 0,
        balancedQuantity: 0,
    };

    const tableProps = {
        tableColumn: tableColumnVehicleDetails({ handleButtonClick: handleButtonClickVehicleDetails, canEdit: toggleButton === STOCK_TRANSFER?.RAISED.key, canDelete: toggleButton === STOCK_TRANSFER?.RAISED.key, canView: false }),
        tableData: tableDataItem,
        pagination: false,
    };

    const onCloseActionAddVehicleDetails = () => {
        setIsAddVehicleDetailsVisible(false);
        setSelectedVehicle();
        addVehicleDetailsForm.resetFields();
    };

    const onFinishAddVehicleDetails = (values) => {
        setOpenAccordian(1);
        if (values?.index !== undefined) {
            let arrayOfNumbers = [...tableDataItem];
            arrayOfNumbers[values?.index] = { ...initialTableDataItem, ...values, modelDescription: values?.modelDescriptionName };
            setTableDataItem([...arrayOfNumbers]);
        } else {
            setTableDataItem([...tableDataItem, { ...initialTableDataItem, ...values, modelDescription: values?.modelDescriptionName }]);
        }
        setIsAddVehicleDetailsVisible(false);
        addVehicleDetailsForm.resetFields();
    };

    const addVehicleDetailsProps = {
        isVisible: isAddVehicleDetailsVisible,
        titleOverride: addVehicleTitle,
        addVehicleDetailsForm,
        setIsAddVehicleDetailsVisible,
        onCloseAction: onCloseActionAddVehicleDetails,
        onFinishAddVehicleDetails,
        productHierarchyData,
        formData: selectedVehicle,
        tableDataItem,
    };

    return (
        <>
            <Form form={addIndentDetailsForm} data-testid="test" onFinish={onFinish} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card>
                            <Row gutter={24}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Indent To Location" name="indentToLocation" rules={[validateRequiredSelectField('Indent To Location')]}>
                                        {customSelectBox({
                                            data: indentLocationList?.filter((i) => {
                                                return i?.locationCode !== defaultDealerLocationCode;
                                            }),
                                            loading: isLoadingDealerLoc,
                                            fieldNames: { key: 'locationCode', value: 'dealerLocationName' },
                                            placeholder: preparePlaceholderSelect(''),
                                            onChange: handleChangeLocation,
                                        })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Requested by" name="requestedBy" rules={[validateRequiredSelectField('Requested by')]}>
                                        {customSelectBox({ data: requestedByDealerList, fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect(''), disabled: true })}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                    <Form.Item name="remarks" label="Remarks">
                                        <TextArea maxLength={90} placeholder={preparePlaceholderText('Remarks')} showCount />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Row gutter={24}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                                    <Panel
                                        key="1"
                                        header={
                                            <Row gutter={20} className={styles.verticallyCentered}>
                                                Vehicle Details
                                                <Col xs={14} sm={14} md={6} lg={6} xl={6}>
                                                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                        <Button type="primary" icon={<FiPlus />} className={styles.verticallyCentered} onClick={handleAddVehicleDetails}>
                                                            Add
                                                        </Button>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        }
                                    >
                                        <Divider />
                                        <DataTable {...tableProps} />
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <VehicleDetailFormButton {...buttonProps} />
            </Form>
            <AddVehicleDetailsModal {...addVehicleDetailsProps} />
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
