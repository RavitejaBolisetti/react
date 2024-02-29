/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Form, Input, Upload, Typography, Descriptions, Collapse, Divider, Table } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { UploadUtil } from 'utils/Upload';
import { DataTable } from 'utils/dataTable';
import styles from 'assets/sass/app.module.scss';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';
import { tableColumnModelDetails } from './tableColumnModelDetails';

//import { SearchBox } from 'components/utils/SearchBox';

const AddEditForm = (props) => {
    const { addressForm, handleButtonClick, setAddressData, activeKey, addressData, editingData, setEditingData, setShowAddEditForm, setIsEditing, uploadProps, userId, formData } = props;
    const { handleFormValueChange, setIsAdding, showGlobalNotification, resetPincodeData, handleOpenModal } = props;
    const { pincodeData, onHandleSelect } = props;
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
                // if (defaultAdddress) {
                //     return showGlobalNotification({ message: translateContent('global.validation.onlyOneAddressCanbeDefault') });
                // }

                // if (editingData?.addressType) {
                //     setAddressData((prev) => {
                //         let formData = [...prev];
                //         const index = formData?.findIndex((el) => el?.addressType === editingData?.addressType);
                //         formData.splice(index, 1, { ...value, ...pinSearchData });

                //         return [...formData];
                //     });
                // } else {
                //     setAddressData((prev) => {
                //         let formData = prev?.length ? [...prev] : [];
                //         if (value?.defaultaddress && formData?.length >= 1) {
                //             return [...formData, { ...value, ...pinSearchData }];
                //         } else {
                //             return prev?.length ? [...prev, { ...value, ...pinSearchData }] : [{ ...value, ...pinSearchData }];
                //         }
                //     });
                // }
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

    const customOpenModal = ({ buttonAction }) => {
        handleOpenModal({ buttonAction, groupAdd: false, varinatAdd: true });
    };

    const tableProps = {
        srl: false,
        pagination: false,
        //isLoading: isLoading,
        tableColumn: tableColumnModelDetails({ handleButtonClick: customOpenModal, canView: false }),
        bordered: true,
        rowKey: 'key',
        //scroll: { x: '100%', y: 'calc(100vh - 220px)' },
        tableData: [
            {
                key: 1,
                product: 'Mahindra Xylo',
                currentMonth: '4',
                currentMonth1: '8',
                currentMonth2: '12',
                currentMonth3: '20',
                children: [
                    {
                        key: 11,
                        productGroup: 'MG',
                        product: 'Mahindra Xylo H8 ABS BS IV',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '5',
                    },
                    {
                        key: 12,
                        productGroup: 'MG',
                        product: 'Mahindra Xylo D2 BS-III',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '5',
                    },
                    {
                        key: 13,
                        productGroup: 'MG',
                        product: 'Mahindra Xylo D2 BS-IV',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '5',
                    },
                    {
                        key: 14,
                        productGroup: 'MG',
                        product: 'Mahindra Xylo H4 ABS Airbag BS IV',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '5',
                    },
                ],
            },
            {
                key: 2,
                product: 'Mahindra Enforcer',
                currentMonth: '6',
                currentMonth1: '6',
                currentMonth2: '14',
                currentMonth3: '20',
                children: [
                    {
                        key: 21,
                        productGroup: 'MG',
                        product: 'Mahindra Enforcer Single Cab 4×2 Standard',
                        currentMonth: '2',
                        currentMonth1: '1',
                        currentMonth2: '4',
                        currentMonth3: '5',
                    },
                    {
                        key: 22,
                        productGroup: 'MG',
                        product: 'Mahindra Enforcer Single Cab 4×2 Floodbuster',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '5',
                    },
                    {
                        key: 23,
                        productGroup: 'MG',
                        product: 'Mahindra Enforcer Single Cab 4×2 Elite',
                        currentMonth: '2',
                        currentMonth1: '1',
                        currentMonth2: '4',
                        currentMonth3: '5',
                    },
                    {
                        key: 24,
                        productGroup: 'MG',
                        product: 'Mahindra Enforcer Double Cab 4×4 Floodbuster',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '5',
                    },
                ],
            },
            {
                key: 3,
                product: 'Mahindra Scorpio',
                currentMonth: '6',
                currentMonth1: '6',
                currentMonth2: '14',
                currentMonth3: '8',
                children: [
                    {
                        key: 31,
                        productGroup: 'MG',
                        product: 'Mahindra Scorpio GLX',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '1',
                    },
                    {
                        key: 32,
                        productGroup: 'MG',
                        product: 'Mahindra Scorpio Floodbuster',
                        currentMonth: '2',
                        currentMonth1: '1',
                        currentMonth2: '4',
                        currentMonth3: '1',
                    },
                    {
                        key: 33,
                        productGroup: 'MG',
                        product: 'Scorpio N Z2 Diesel',
                        currentMonth: '1',
                        currentMonth1: '2',
                        currentMonth2: '3',
                        currentMonth3: '5',
                    },
                    {
                        key: 14,
                        productGroup: 'MG',
                        product: 'Scorpio N Z4',
                        currentMonth: '2',
                        currentMonth1: '1',
                        currentMonth2: '4',
                        currentMonth3: '1',
                    },
                ],
            },
        ],
    };

    const summary = (
        <Table.Summary fixed >
            
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>16</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>20</Table.Summary.Cell>
                <Table.Summary.Cell index={3}>40</Table.Summary.Cell>
                <Table.Summary.Cell index={4}>48</Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
            </Table.Summary.Row>
        </Table.Summary>
    );
    return (
        <Form form={addressForm} id="myAdd" onFinish={handleSave} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical" className={styles.marT0}>
            {/* <Card> */}
            <Row gutter={24}>
                <Col className={styles.buttonsGroupRight} xs={18} sm={18} md={18} lg={18} xl={18}>
                    <Button type="Secodary">Download Template</Button>
                </Col>
                <Col className={styles.buttonsGroupRight} xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Button type="Secodary">Upload Forecasting Data</Button>
                </Col>

                <Col className={styles.buttonsGroupRight} xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Button className={styles.marB5} icon={<PlusOutlined />} type="primary" onClick={() => handleOpenModal({ buttonAction: FROM_ACTION_TYPE?.ADD, groupAdd: true, varinatAdd: false })}>
                        {translateContent('global.buttons.add')}
                    </Button>
                </Col>
            </Row>

            <div>
                {/* viewDrawerContainer */}
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <DataTable {...tableProps} summary={() => summary} />
                    </Col>
                </Row>
            </div>
            {/* </Card> */}

            <Form.Item hidden name="id" initialValue="" />
        </Form>
    );
};

export default AddEditForm;
