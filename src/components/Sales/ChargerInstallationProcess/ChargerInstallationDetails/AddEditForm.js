/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Collapse, Typography, Divider, Button, Descriptions, Card } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';
import { PARAM_MASTER } from 'constants/paramMaster';

import { DataTable } from 'utils/dataTable';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { PlusOutlined } from '@ant-design/icons';
import { AddRequestModal } from './AddRequestModal';
import { addRequestColumns } from './tableColumn';
import { getCodeValue } from 'utils/getCodeValue';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { isChargerSearchLoading, formData, typeData, disabled, setDisabled, chargerInstallationMasterData, isLoading, formActionType, chargerDetails, activeKey, setActiveKey, chargerInstallationForm, crmCustomerVehicleData, setAddRequestVisible, addRequestVisible, handleBookingNumberSearch, handleBookingChange, addRequestForm, addRequestData, setAddRequestData } = props;

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
        addRequestForm.resetFields();
    };

    const addRequestProps = {
        ...props,
        isVisible: addRequestVisible,
        titleOverride: translateContent('chargerInstallationDetails.label.addRequest'),
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
                        {formActionType?.addMode && (
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={18}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.bookingNumber || formData?.otfNumber} label={translateContent('chargerInstallationDetails.label.bookingNumber')} name="otfNumber" rules={[validateRequiredInputField(translateContent('chargerInstallationDetails.validation.bookingNumber'))]}>
                                            <Search maxLength={50} placeholder={preparePlaceholderText(translateContent('chargerInstallationDetails.placeholder.bookingNumber'))} onSearch={(value) => handleBookingNumberSearch(value)} allowClear onChange={handleBookingChange} loading={isChargerSearchLoading} />
                                        </Form.Item>
                                    </Col>
                                    {chargerDetails && (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={getCodeValue(typeData?.[PARAM_MASTER?.ORDR_STATS?.id], crmCustomerVehicleData?.otfDetails?.orderStatus)} label={translateContent('chargerInstallationDetails.label.bookingStatus')} name="bookingStatus">
                                                <Input placeholder={preparePlaceholderText(translateContent('chargerInstallationDetails.placeholder.bookingStatus'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    )}
                                </Row>

                                {chargerDetails && (
                                    <>
                                        <Divider />
                                        <Descriptions {...viewProps}>
                                            <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelGroup')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.modelGroup, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelVariant')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.modelVariant, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('chargerInstallationDetails.label.seatingCapacity')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.seatingCapacity, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('chargerInstallationDetails.label.color')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.color, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelCode')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.modelCode, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelDescription')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.model, isLoading)}</Descriptions.Item>
                                        </Descriptions>
                                    </>
                                )}
                            </Card>
                        )}
                        {formActionType?.editMode && (
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.requestId')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestId, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.requestDate')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.requestDate, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.requestStatus')}>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.CHRGR_INST_HDR_STAT.id], chargerInstallationMasterData?.chargerInstDetails?.requestStatus), isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelGroup')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelGroup, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelVariant')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelVarient, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.seatingCapacity')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.seatingCapacity, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.color')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.color, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelCode')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstDetails?.modelCode, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('chargerInstallationDetails.label.modelDescription')}>{checkAndSetDefaultValue(crmCustomerVehicleData?.vehicleDetails?.model, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                        )}

                        {chargerDetails && (
                            <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                                <Panel
                                    header={
                                        <Row type="flex" justify="space-between" align="middle" size="large">
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Typography>{translateContent('chargerInstallationDetails.label.addRequest')}</Typography>
                                                {!formActionType?.viewMode && (
                                                    <Button className={styles.marL10} type="primary" disabled={disabled} onClick={handleAddRequestChange} icon={<PlusOutlined />}>
                                                        {translateContent('global.buttons.add')}
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
                    </Col>
                </Row>
            </div>
            <AddRequestModal {...addRequestProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
