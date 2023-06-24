/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { Collapse, Divider, Form, Space, Row, Col, Typography, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { expandIcon } from 'utils/accordianExpandIcon';

import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import styles from 'components/common/Common.module.css';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { addressIndividualDataActions } from 'store/actions/data/customerMaster/individual/address/individualAddress';
import { addressCorporateDataActions } from 'store/actions/data/customerMaster/corporate/address/individualAddress';

import AddEditForm from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';
import { InputSkeleton } from 'components/common/Skeleton';
import ViewAddressList from './ViewAddressList';

const { Panel } = Collapse;
const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: addData = [] },
            CustomerMaster: {
                AddressIndividual: { isLoaded: isAddressLoaded = false, isLoading: isAddressLoading, data: addressIndData = [] },
                CorporateAddress:  { isLoaded: isCompanyAddressLoaded = false, isLoading: isCompanyAddressLoading, data: addressCompanyData = [] }
            },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
        },
    } = state;

    let returnValue = {
        userId,
        addressIndData,
        addressCompanyData,
        isAddressLoaded,
        isCompanyAddressLoaded,
        isAddressLoading,
        addData: addData && addData[PARAM_MASTER.ADD_TYPE.id],
        isPinCodeDataLoaded,
        isPinCodeLoading,
        pincodeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: addressIndividualDataActions.fetchList,
            saveData: addressIndividualDataActions.saveData,
            resetData: addressIndividualDataActions.reset,
            listShowLoading: addressIndividualDataActions.listShowLoading,

            fetchListCorporate: addressCorporateDataActions.fetchList,
            saveDataCorporate: addressCorporateDataActions.saveData,
            resetDataCorporate: addressCorporateDataActions.reset,
            listShowLoadingCorporate: addressCorporateDataActions.listShowLoading,

            listPinCodeShowLoading: geoPincodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPincodeDataActions.fetchList,

            showGlobalNotification,
        },
        dispatch
    ),
});

const AddressMasterBase = (props) => {
    const { isViewModeVisible, section, addressIndData, setFormActionType, isCompanyAddressLoaded, formActionType, isAddressLoaded, addressCompanyData, selectedCustomer, saveData, addData } = props;
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, isAddressLoading, setFormData, buttonData, setButtonData, btnVisiblity, defaultBtnVisiblity, setIsFormVisible, pincodeData, userId, fetchList, listShowLoading, showGlobalNotification } = props;
    const { fetchListCorporate, saveDataCorporate, customerType } = props;

    const [form] = Form.useForm();
    const [addressData, setAddressData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomer?.customerId,
            name: 'Customer ID',
        },
    ];

    useEffect(() => {
        if (userId && addressIndData?.customerAddress?.length) {
            setAddressData(addressIndData?.customerAddress);
        }
        if (userId && !isAddressLoaded) {
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                setAddressData(addressIndData?.customerAddress);
            } else {
                setAddressData(addressCompanyData?.customerAddress);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressIndData, addressCompanyData]);

    useEffect(() => {
        if (userId && !isAddressLoaded ) {
            if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
                fetchList({ setIsLoading: listShowLoading, userId, extraParams });
            } else {
                fetchListCorporate({ setIsLoading: listShowLoading, userId, extraParams });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isAddressLoaded]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        forceUpdate();

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onCheckdefaultAddClick = (e, value) => {
        e.stopPropagation();
        setAddressData((prev) => {
            let formData = [...prev];
            formData?.forEach((address) => {
                if (address?.defaultaddress === true) {
                    address.defaultaddress = false;
                };
            });
            const index = formData?.findIndex((el) =>  el?.addressType === editingData?.addressType && el?.addressLine1 === editingData?.addressLine1 && el?.pinCode === editingData?.pinCode);
            formData.splice(index, 1, { ...value, deafultAddressIndicator: e.target.checked });
            return [...formData];
        })
    };

    const onSubmit = () => {
        let data = { customerId: selectedCustomer?.customerId, customerAddress: addressData?.map(el => {
            const {tehsilName, cityName, districtName, stateName, ...rest } = el;
            return {...rest}
        }) };

        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        if (customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id) {
            saveData(requestData);
        } else {
            saveDataCorporate(requestData);
        }

        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        form.resetFields();
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const addAddressHandeler = (e) => {
        e.stopPropagation();
        form.resetFields();
        setShowAddEditForm(true);
        setOpenAccordian('1');
        setIsEditing(true);
    };

    const formProps = {
        ...props,
        setShowAddEditForm,
        showAddEditForm,
        formActionType,
        styles,
        addressData,
        setAddressData,
        onSubmit,
        onFinishFailed,
        onCloseAction,
        onCheckdefaultAddClick,
        form,
        isEditing,
        setIsEditing,
        setEditingData,
        editingData,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
        forceUpdate,
        listPinCodeShowLoading,
        fetchPincodeDetail,
        isPinCodeLoading,
        pincodeData,
        addData,
        handleFormValueChange,
    };

    const myProps = {
        ...props,
    };

    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <InputSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onSubmit} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title} </h2>

                        <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                            <Panel
                                header={
                                    <>
                                        <Space>
                                        <Text strong> {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? 'Individual Address' : 'Company Address'}</Text>
                                            {/* <Text strong> Individual Address</Text> */}
                                            {!isViewModeVisible && formActionType?.editMode && (
                                                <Button onClick={addAddressHandeler} icon={<PlusOutlined />} type="primary">
                                                    Add
                                                </Button>
                                            )}
                                        </Space>
                                        <Divider type="vertical" />
                                    </>
                                }
                                key="1"
                            >
                                {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                {isAddressLoading ? formSkeleton : <ViewAddressList {...formProps} />}
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <CustomerFormButton {...myProps} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const AddressMaster = connect(mapStateToProps, mapDispatchToProps)(AddressMasterBase);
