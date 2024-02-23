/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Input, Upload, Typography, Descriptions, Collapse, Divider } from 'antd';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';

import styles from 'assets/sass/app.module.scss';

// import DealerDemandForecastingMaster from './DealerDemandForecasting';
import { DataTable } from 'utils/dataTable';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';
import { tableColumnModelDetails } from './tableColumnModelDetails';

const { Dragger } = Upload;
//const { Text } = Typography;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { addressForm, handleMNMApproval, setAddressData, activeKey, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, uploadProps, userId, formData } = props;
    const { handleFormValueChange, setIsAdding, showGlobalNotification, resetPincodeData } = props;
    const { pincodeData, onHandleSelect } = props;
    const disabledProps = { disabled: true };
    const [dlrName, setDlrName] = useState(false);
    const [options, setOptions] = useState(false);
    const [pinSearchData, setPinSearchData] = useState({});
    const [isDataFetch, setIsDataFetch] = useState(false);

    const dealerCode = [
        { key: 'Nbs International Ltd.', value: 'SMO11151' },
        { key: 'Bhavna Automobiles Pvt. Ltd.', value: 'SMO11152' },
        { key: 'Prime Automobiles Pvt Ltd', value: 'SMO11153' },
        { key: 'Koncept Automobiles Pvt. Ltd.', value: 'SMO11154' },
    ];
    const finYear = [
        { key: '1', value: '2023-2024' },
        { key: '2', value: '2024-2025' },
        { key: '3', value: '2025-2026' },
        { key: '4', value: '2026-2027' },
        { key: '5', value: '2027-2028' },
    ];

    const month = [
        { key: '1', value: 'March' },
        { key: '2', value: 'April' },
        { key: '3', value: 'May' },
        { key: '4', value: 'June' },
        { key: '5', value: 'July' },
        { key: '6', value: 'August' },
        { key: '7', value: 'September' },
    ];
    const handleDlrChange = (value) => {
        const name = dealerCode.find((el) => el.key === value).key;
        setDlrName(name);
    };
    const handleSave = () => {
        addressForm
            .validateFields()
            .then((value) => {
                const defaultAdddress = addressData.find((i) => i?.deafultAddressIndicator && i?.addressType !== editingData?.addressType) && value?.deafultAddressIndicator;
                if (defaultAdddress) {
                    return showGlobalNotification({ message: translateContent('global.validation.onlyOneAddressCanbeDefault') });
                }

                if (editingData?.addressType) {
                    setAddressData((prev) => {
                        let formData = [...prev];
                        const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType);
                        formData.splice(index, 1, { ...value, ...pinSearchData });

                        return [...formData];
                    });
                } else {
                    setAddressData((prev) => {
                        let formData = prev?.length ? [...prev] : [];
                        if (value?.defaultaddress && formData?.length >= 1) {
                            return [...formData, { ...value, ...pinSearchData }];
                        } else {
                            return prev?.length ? [...prev, { ...value, ...pinSearchData }] : [{ ...value, ...pinSearchData }];
                        }
                    });
                }
                setPinSearchData({});
                setShowAddEditForm(false);
                setIsEditing(false);
                setIsAdding(false);
                setEditingData({});
                addressForm.setFieldsValue();
                resetPincodeData();
            })
            .catch((err) => {
                console.error('err', err);
            });
    };
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 5, lg: 5, xl: 5, xxl: 5 },
    };

    const [openAccordian, setOpenAccordian] = useState('');
    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };
    const handleButtonClickVehicleDetails = ({ record = null, buttonAction, openDefaultSection = true, index }) => {
        // switch (buttonAction) {
        //     case VIEW_ACTION:
        //         setCancellationData({ ...record, indentDetailId: record?.id, ...formData, modelCode: record?.modelCode });
        //         setCancellationIssueVisible(true);
        //         break;
        //     default:
        //         break;
        // }
    };
    const tableProps = {
        srl: true,
        pagination: false,
        //isLoading: isLoading,
        tableColumn: tableColumnModelDetails({ handleButtonClick: handleButtonClickVehicleDetails, canView: true }),
        tableData:
            [
                { modelVariant: 'EX NON AC ABS NVH', currentMonth: '2', currentMonth1: '1', currentMonth2: '2', currentMonth3: '4' },
                { modelVariant: 'EX NON AC ABS NVH', currentMonth: '1', currentMonth1: '2', currentMonth2: '2', currentMonth3: '3' },
                { modelVariant: 'EX NON AC ABS NVH', currentMonth: '3', currentMonth1: '1', currentMonth2: '1', currentMonth3: '2' },
            ] || formData?.vehicleDetails,
    };

    return (
        <>
            <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
                {/* //    <Row gutter={20}> */}
            {/* <Card> */}
                    {/* <Row align="middle">
                        <Text strong> {'Change Request'}</Text>
                    </Row> */}
                    {/* <Divider className={styles.marT20} /> */}

                    <Row gutter={24} className={styles.marginall}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.dealerCode')} name="dealerCode" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.dealerCode'))]}>
                                {customSelectBox({ onChange: handleDlrChange, data: dealerCode, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.dealerCode')) })}
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.dealerName')}>
                                <Input value={dlrName} placeholder={preparePlaceholderText(translateContent('demandForecasting.placeholder.dealerName'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={6} md={6} lg={6} xl={64}>
                            <Form.Item label={translateContent('demandForecasting.label.finYear')} name="finYear" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.finYear'))]}>
                                {customSelectBox({ data: finYear, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.finYear')) })}
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.month')} name="month" rules={[validateRequiredSelectField(translateContent('demandForecasting.validation.month'))]}>
                                {customSelectBox({ data: month, placeholder: preparePlaceholderSelect(translateContent('demandForecasting.label.month')) })}
                            </Form.Item>
                        </Col>
                        </Row>
                        <Row gutter={24} className={styles.marginall}>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.currentMonth')}>
                            <Input value={"March"} placeholder={preparePlaceholderText(translateContent('demandForecasting.validation.currentMonth'))} maxLength={50} {...disabledProps} />                         
                             </Form.Item>
                        </Col>

                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                         <Form.Item label={translateContent('demandForecasting.label.currentMonth1')}>  <Input value={"May"} placeholder={preparePlaceholderText(translateContent('demandForecasting.label.currentMonth1'))} maxLength={50} {...disabledProps} />  
                    
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                            <Form.Item label={translateContent('demandForecasting.label.currentMonth2')}> <Input value={"June"} placeholder={preparePlaceholderText(translateContent('demandForecasting.label.currentMonth2'))} maxLength={50} {...disabledProps} />  
                            
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                       
                            <Form.Item label={translateContent('demandForecasting.label.currentMonth2')}> <Input value={"July"} placeholder={preparePlaceholderText(translateContent('demandForecasting.label.currentMonth3'))} maxLength={50} {...disabledProps} />  
                            </Form.Item>
                        </Col>

                        {/* <Col xs={24} sm={8} md={8} lg={8} xl={8} className={`${styles.leftPannelButton} ${styles.marT20}`}>
                            <Button type="primary" onClick={() => setIsDataFetch((prev) => !prev)}>
                                View Model Forecasting Details
                            </Button>
                        </Col> */}
                    </Row>
                {/* </Card> */}
                {/* Drawer data  */}

             
                    <Card>
                        <Row gutter={24}>
                            <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                <h3> Forecasting Target Details</h3>
                            </Col>
                            <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                                <h4 className={styles.textRight}>Grand Total : 24</h4>
                            </Col>
                        </Row>

                        <div className={styles.viewDrawerContainer}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => handleCollapse(1)} expandIconPosition="end" className={styles.collapseContainer}>
                                        <Panel
                                            header={
                                                <>
                                                    <Row gutter={16}>
                                                        {/* <Col sm={4} md={4} lg={4} xl={4}> */}
                                                        <Col sm={10} md={10} lg={10} xl={10}>
                                                            Modal Group : Mahindra Verito Vibe
                                                            {/* <p> Modal Group</p>
                                               <p>  ALTURAS G4</p> */}
                                                        </Col>
                                                        {/* <Col sm={4} md={4} lg={4} xl={4}>
                                                <p>Current Month</p>
                                                <p>March</p>
                                            </Col>
                                            <Col sm={4} md={4} lg={4} xl={4}>
                                                <p>Current Month+1</p>
                                                <p>April</p>
                                            </Col>
                                            <Col sm={4} md={4} lg={4} xl={4}>
                                                <p>Current Month+2</p>
                                                <p>May</p>
                                            </Col>
                                            <Col sm={4} md={4} lg={4} xl={4}>
                                                <p>Current Month+3</p>
                                                <p>June</p>
                                            </Col> */}
                                                    </Row>
                                                    <></>

                                                    <Row gutter={24} className={styles.normalfont}>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>April</p>
                                                            <p>2</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>May</p>
                                                            <p>2</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>June</p>
                                                            <p>3</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>July</p>
                                                            <p>1</p>
                                                        </Col>
                                                    </Row>
                                                </>
                                            }
                                            key="1"
                                        >
                                            {/* // <Divider /> */}
                                            {/* <div>
                                        <Descriptions {...viewProps}> */}
                                            {/* <Descriptions.Item label={translateContent('demandForecasting.label.modelVariant')}>{'EX NON AC ABS NVH'}</Descriptions.Item> */}

                                            {/* <Descriptions.Item label={translateContent('demandForecasting.label.currentMonth')}>
                                                {'March'}
                                            </Descriptions.Item>

                                            <Descriptions.Item label={translateContent('demandForecasting.label.currentMonth1')}>{'April'}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('demandForecasting.label.currentMonth2')}>{'May'}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('demandForecasting.label.currentMonth3')}>{'June'}</Descriptions.Item>
                                        </Descriptions> */}
                                            {/* </div> */}

                                            <Row gutter={24}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <DataTable {...tableProps} />
                                                </Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </div>

                        <div className={styles.viewDrawerContainer}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => handleCollapse(1)} expandIconPosition="end" className={styles.collapseContainer}>
                                        <Panel
                                            header={
                                                <>
                                                    <Row gutter={16}>
                                                        {/* <Col sm={4} md={4} lg={4} xl={4}> */}
                                                        <Col sm={20} md={20} lg={20} xl={20}>
                                                            Modal Group : Mahindra Scorpio Getaway
                                                        </Col>
                                                    </Row>
                                                    <></>

                                                    <Row gutter={24} className={styles.normalfont}>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>April</p>
                                                            <p>2</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>May</p>
                                                            <p>2</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>June</p>
                                                            <p>3</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>July</p>
                                                            <p>1</p>
                                                        </Col>
                                                    </Row>
                                                </>
                                            }
                                            key="2"
                                        >
                                            {/* <Divider /> */}
                                            {/* <div>
                                        <Descriptions {...viewProps}> */}
                                            {/* <Descriptions.Item label={translateContent('demandForecasting.label.modelVariant')}>{'EX NON AC ABS NVH'}</Descriptions.Item> */}

                                            {/* <Descriptions.Item label={translateContent('demandForecasting.label.currentMonth')}>
                                                {'March'}
                                            </Descriptions.Item>

                                            <Descriptions.Item label={translateContent('deandForecasting.label.currentMonth1')}>{'April'}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('demandForecasting.label.currentMonth2')}>{'May'}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('demandForecasting.label.currentMonth3')}>{'June'}</Descriptions.Item>
                                        </Descriptions>
                                    </div> */}

                                            <Row gutter={24}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <DataTable {...tableProps} />
                                                </Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </div>

                        <div className={styles.viewDrawerContainer}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => handleCollapse(1)} expandIconPosition="end" className={styles.collapseContainer}>
                                        <Panel
                                            header={
                                                <>
                                                    <Row gutter={16}>
                                                        {/* <Col sm={4} md={4} lg={4} xl={4}> */}
                                                        <Col sm={20} md={20} lg={20} xl={20}>
                                                            Modal Group : Mahindra Thar
                                                        </Col>
                                                    </Row>
                                                    <></>

                                                    <Row gutter={24} className={styles.normalfont}>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>April</p>
                                                            <p>2</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>May</p>
                                                            <p>2</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>June</p>
                                                            <p>3</p>
                                                        </Col>
                                                        <Col sm={4} md={4} lg={4} xl={6}>
                                                            <p>July</p>
                                                            <p>1</p>
                                                        </Col>
                                                    </Row>
                                                </>
                                            }
                                            key="3"
                                        >
                                            <Row gutter={24}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <DataTable {...tableProps} />
                                                </Col>
                                            </Row>
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </div>
                    </Card>
             

                <Form.Item hidden name="id" initialValue="" />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%' });
