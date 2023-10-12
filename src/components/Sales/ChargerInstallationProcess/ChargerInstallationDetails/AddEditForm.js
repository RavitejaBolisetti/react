/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Collapse, Typography, Divider, Button, Descriptions, Card, Space } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';

import { DataTable } from 'utils/dataTable';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { PlusOutlined } from '@ant-design/icons';
import { AddRequestModal } from './AddRequestModal';
import { FilterIcon } from 'Icons';
import { addRequestColumns } from './tableColumn';
import { getCodeValue } from 'utils/getCodeValue';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const { Search } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, typeData, chargerInstallationMasterData, isLoading, formActionType, setChargerDetails, chargerDetails, activeKey, setActiveKey, chargerInstallationForm, crmCustomerVehicleData, setAddRequestVisible, addRequestVisible, handleBookingNumberSearch, handleBookingChange, addRequestForm, addRequestData, setAddRequestData } = props;
    const [disabled, setDisabled] = useState(false);
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    useEffect(() => {
        chargerInstallationForm.setFieldsValue({ bookingStatus: getCodeValue(typeData?.ORDR_STATS, crmCustomerVehicleData?.otfDetails?.orderStatus) });
        if (formActionType?.editMode) {
            setActiveKey([1]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, crmCustomerVehicleData]);
    console.log(addRequestData);
    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const onAdvanceSearchCloseAction = () => {
        setAddRequestVisible(false);
        setDisabled(false);
    };

    const addRequestProps = {
        ...props,
        isVisible: addRequestVisible,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Add Request',
        onCloseAction: onAdvanceSearchCloseAction,
        onAdvanceSearchCloseAction,
        addRequestForm,
        setAddRequestData,
        setAddRequestVisible,
        typeData,
        setActiveKey,
    };

    const handleAddRequestChange = () => {
        setAddRequestVisible(true);
        setDisabled(true);
    };

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            {formActionType?.addMode && (
                                <Card style={{ backgroundColor: '#F2F2F2' }}>
                                    <Row gutter={18}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.bookingNumber || formData?.otfNumber} label="Booking Number" name="otfNumber" rules={[validateRequiredInputField('Booking Number')]}>
                                                <Search maxLength={50} placeholder={preparePlaceholderText('Booking Number')} onSearch={(value) => handleBookingNumberSearch(value)} allowClear onChange={handleBookingChange} />
                                            </Form.Item>
                                        </Col>
                                        {chargerDetails && (
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={getCodeValue(crmCustomerVehicleData?.otfDetails?.orderStatus, typeData['ORDR_STATS'])} label="Booking Status" name="bookingStatus">
                                                    <Input placeholder={preparePlaceholderText('Booking Status')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                        )}
                                    </Row>

                                    {chargerDetails && (
                                        <>
                                            <Divider />
                                            <Descriptions {...viewProps}>
                                                <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.modelGroup, isLoading)}</Descriptions.Item>
                                                <Descriptions.Item label="Model Variant">{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.modelVariant, isLoading)}</Descriptions.Item>
                                                <Descriptions.Item label="Seating Capacity">{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.seatingCapacity, isLoading)}</Descriptions.Item>
                                                <Descriptions.Item label="Color">{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.color, isLoading)}</Descriptions.Item>
                                                <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.modelCode, isLoading)}</Descriptions.Item>
                                            </Descriptions>
                                        </>
                                    )}
                                </Card>
                            )}
                            {formActionType?.editMode && (
                                <Card style={{ backgroundColor: '#F2F2F2' }}>
                                    <Descriptions {...viewProps}>
                                        <Descriptions.Item label="Request Id">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestId, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Request Date">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestDate, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Request Status">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestStatus, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelGroup, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Model Variant">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelVarient, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Seating Capacity">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.seatingCapacity, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Color">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.color, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelCode, isLoading)}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            )}

                            {chargerDetails && (
                                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                                    <Panel
                                        header={
                                            <Row type="flex" justify="space-between" align="middle" size="large">
                                                <Row type="flex" justify="space-around" align="middle">
                                                    <Typography>Add Request</Typography>

                                                    {!formActionType?.viewMode && (
                                                        <Button className={styles.marL10} type="primary" disabled={disabled} onClick={handleAddRequestChange} icon={<PlusOutlined />}>
                                                            Add
                                                        </Button>
                                                    )}
                                                </Row>
                                            </Row>
                                        }
                                        key="1"
                                    >
                                        <DataTable tableColumn={addRequestColumns(typeData)} tableData={addRequestData} pagination={false} />
                                    </Panel>
                                </Collapse>
                            )}
                        </Space>
                    </Col>
                </Row>
            </div>
            <AddRequestModal {...addRequestProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
