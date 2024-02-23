/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Form, Input, Upload, Typography, Descriptions, Collapse, Divider } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { UploadUtil } from 'utils/Upload';
import { DataTable } from 'utils/dataTable';
import styles from 'assets/sass/app.module.scss';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';
import { tableColumnModelDetails } from './tableColumnModelDetails';

//import { SearchBox } from 'components/utils/SearchBox';

const { Dragger } = Upload;
const { Text } = Typography;
const AddEditForm = (props) => {
    const { addressForm, handleButtonClick, setAddressData, activeKey, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, uploadProps, userId, formData } = props;
    const { handleFormValueChange, setIsAdding, showGlobalNotification, resetPincodeData, handleOpenModal } = props;
    const { pincodeData, onHandleSelect } = props;
    const disabledProps = { disabled: true };
    const [dlrName, setDlrName] = useState(false);
    const [options, setOptions] = useState(false);
    const [pinSearchData, setPinSearchData] = useState({});
    //const [isDataFetch, setIsDataFetch] = useState(false);

    useEffect(() => {
        const pinOption = pincodeData?.map((item) => ({
            label: item?.pinCode + ' - ' + (item?.localityName ? item?.localityName + '-' : '') + item?.cityName + ' -' + item?.districtName + ' -' + item?.stateName,
            value: item?.id,
            key: item?.id,
        }));
        setOptions(pinOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pincodeData]);

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

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 5, lg: 5, xl: 5, xxl: 5 },
    };

    const { Panel } = Collapse;
    const [openAccordian, setOpenAccordian] = useState('');
    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };
    const customOpenModal = ({ buttonAction }) => {
        handleOpenModal({ buttonAction, groupAdd: false, varinatAdd: true });
    };
    const tableProps = {
        srl: false,
        pagination: false,
        //isLoading: isLoading,
        tableColumn: tableColumnModelDetails({ handleButtonClick: customOpenModal, canView: false }),
        bordered: true,
        //scroll: { x: '100%', y: 'calc(100vh - 220px)' },

        tableData: [
              {
    key: 1,
    modelVariant:'Product Group',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
        modelVariant:'121',
        currentMonth:'March',
      },
      {
        key: 12,
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        modelVariant:'121',
        currentMonth:'March',
      },
      {
        key: 13,
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        modelVariant:'121',
        currentMonth:'March',
      }, {
        key: 14,
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        modelVariant:'121',
        currentMonth:'March',
      },
    ],
  },
        ],
    };

    return (
        <>
            <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical" className={styles.marT0}>
                {/* //    <Row gutter={20}> */}
                {/* <Card>
                    <Row gutter={20}>
                        
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
                    </Row>
                </Card> */}

                {/* <Card> */}
                    <Row gutter={24}>
                        <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Button className={styles.marB5} icon={<PlusOutlined />} type="primary" onClick={() => handleOpenModal({ buttonAction: FROM_ACTION_TYPE?.ADD, groupAdd: true, varinatAdd: false })}>
                                {translateContent('global.buttons.add')}
                            </Button>
                        </Col>
                    </Row>

                    <div className={styles.viewDrawerContainer}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => handleCollapse(1)} expandIconPosition="end" className={styles.collapseContainer}>
                                    <Panel
                                        header={
                                            <>
                                                <Row gutter={24} className={styles.normalfont}>
                                                    <Col sm={8} md={8} lg={8} xl={8}>
                                                        <p> Modal Group</p>
                                                        <p> Mahindra Verito Vibe</p>
                                                    </Col>
                                                    <Col sm={2} md={2} lg={2} xl={2}>
                                                        <p>April</p>
                                                        <p>12</p>
                                                    </Col>
                                                    <Col sm={2} md={2} lg={2} xl={2}>
                                                        <p>May</p>
                                                        <p>4</p>
                                                    </Col>
                                                    <Col sm={2} md={2} lg={2} xl={2}>
                                                        <p>June</p>
                                                        <p>4</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>July</p>
                                                        <p>8</p>
                                                    </Col>
                                                    <Col sm={2} md={2} lg={2} xl={2}>
                                                        <p>Total</p>
                                                        <p>28</p>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                        key="1"
                                    >
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <p className={`${styles.marB5} ${styles.floatRight}`}>
                                                    <Button size="small" icon={<PlusOutlined />} type="primary" onClick={() => handleOpenModal({ buttonAction: FROM_ACTION_TYPE?.ADD, varinatAdd: true, groupAdd: false })}>
                                                        {translateContent('global.buttons.add')}
                                                    </Button>
                                                </p>
                                                {/* <p className={`${styles.marB5} ${styles.floatLeft}`}>
                                                    Total Variant : 14
                                                </p> */}
                                                <DataTable {...tableProps} scroll={{ y: 180 }} />
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
                                                <Row gutter={24} className={styles.normalfont}>
                                                    {/* <Col sm={4} md={4} lg={4} xl={4}> */}
                                                    <Col sm={8} md={8} lg={8} xl={8}>
                                                        {/* Modal Group : Mahindra Verito Vibe */}
                                                        <p> Modal Group</p>
                                                        <p> Mahindra Verito Vibe</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>April</p>
                                                        <p>2</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>May</p>
                                                        <p>2</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>June</p>
                                                        <p>2</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>July</p>
                                                        <p>1</p>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                        key="2"
                                    >
                                      

                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <p className={`${styles.marB5} ${styles.floatRight}`}>
                                                    <Button size="small" icon={<PlusOutlined />} type="primary" onClick={() => handleOpenModal({ buttonAction: FROM_ACTION_TYPE?.ADD, varinatAdd: true, groupAdd: false })}>
                                                        {translateContent('global.buttons.add')}
                                                    </Button>
                                                </p>
                                                <DataTable {...tableProps} scroll={{ y: 180 }} />
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
                                                <Row gutter={24} className={styles.normalfont}>
                                                    {/* <Col sm={4} md={4} lg={4} xl={4}> */}
                                                    <Col sm={8} md={8} lg={8} xl={8}>
                                                        {/* Modal Group : Mahindra Verito Vibe */}
                                                        <p> Modal Group</p>
                                                        <p> Mahindra Verito Vibe</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>April</p>
                                                        <p>2</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>May</p>
                                                        <p>2</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>June</p>
                                                        <p>2</p>
                                                    </Col>
                                                    <Col sm={4} md={4} lg={4} xl={4}>
                                                        <p>July</p>
                                                        <p>1</p>
                                                    </Col>
                                                </Row>
                                            </>
                                        }
                                        key="2"
                                    >
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <p className={`${styles.marB5} ${styles.floatRight}`}>
                                                    <Button size="small" icon={<PlusOutlined />} type="primary" onClick={() => handleOpenModal({ buttonAction: FROM_ACTION_TYPE?.ADD, varinatAdd: true, groupAdd: false })}>
                                                        {translateContent('global.buttons.add')}
                                                    </Button>
                                                </p>
                                                <DataTable {...tableProps} scroll={{ y: 180 }} />
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </div>
                {/* </Card> */}

                <Form.Item hidden name="id" initialValue="" />
            </Form>
        </>
    );
};

export default AddEditForm;
