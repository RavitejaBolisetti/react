/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Collapse, Divider, Form, Space, Row, Col, Typography, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';

import { expandIcon } from 'utils/accordianExpandIcon';
import { filterFunction } from 'utils/filterFunction';

import { geoPincodeDataActions } from 'store/actions/data/geo/pincode';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { addressIndividualDataActions } from 'store/actions/data/customerMaster/individual/address/individualAddress';

import { ViewIndividualAddressDetails } from './ViewIndividualAddressDetails';
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
            ConfigurableParameterEditing: { isLoaded: isAddDataLoaded = false, isAddLoading, paramdata: addData = [] },
            CustomerMaster: {
                AddressIndividual: { isLoaded: isAddressLoaded = false, isLoading: isAddressLoading, data: addressIndData = [] },
            },
            Geo: {
                Pincode: { isLoaded: isPinCodeDataLoaded = false, isLoading: isPinCodeLoading, data: pincodeData },
            },
        },
    } = state;

    let returnValue = {
        userId,
        addressIndData,
        isAddDataLoaded,
        isAddLoading,
        isAddressLoaded,
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
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchList: addressIndividualDataActions.fetchList,
            saveData: addressIndividualDataActions.saveData,
            resetData: addressIndividualDataActions.reset,
            listShowLoading: addressIndividualDataActions.listShowLoading,

            listPinCodeShowLoading: geoPincodeDataActions.listShowLoading,
            fetchPincodeDetail: geoPincodeDataActions.fetchList,

            showGlobalNotification,
        },
        dispatch
    ),
});

const AddressMasterBase = (props) => {
    const { selectedRowData, isViewModeVisible, section, isAddDataLoaded, addressIndData, setFormActionType, formActionType, isAddressLoaded, selectedCustomer, isAddLoading, saveData, listConfigShowLoading, fetchConfigList, addData } = props;
<<<<<<< HEAD
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, isAddressLoading, formData, setFormData, buttonData, setButtonData, btnVisiblity, defaultBtnVisiblity, setIsFormVisible, resetData, pincodeData, userId, fetchList, isDataLoaded, listShowLoading, showGlobalNotification } = props;
=======
    const { isPinCodeLoading, listPinCodeShowLoading, fetchPincodeDetail, handleFormValueChange, isAddressLoading, formData, setFormData, buttonData, setButtonData, btnVisiblity, defaultBtnVisiblity, setIsFormVisible, resetData, pincodeData, userId, fetchList, isDataLoaded, listShowLoading, showGlobalNotification } = props;
>>>>>>> acc8ed74866ccd402d213dd773523142987b4685
    const [form] = Form.useForm();
    const [addressData, setAddressData] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [refershData, setRefershData] = useState(false);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filterString, setFilterString] = useState();
    // const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    // const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

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
        if (userId && !isAddDataLoaded && !isAddLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.ADD_TYPE.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isAddDataLoaded]);

    console.log('addressIndData', addressIndData?.customerAddress);

    useEffect(() => {
        if (userId && addressIndData?.customerAddress?.length) {
            setAddressData(addressIndData?.customerAddress);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressIndData]);

    useEffect(() => {
        if (userId && !isAddressLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
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
    console.log('selectedRowData', selectedRowData);

    const onSubmit = () => {
        let data = { customerId: selectedCustomer?.customerId, customerAddress: addressData };

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

        saveData(requestData);

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
    };

    const formProps = {
        setShowAddEditForm,
        showAddEditForm,
        formActionType,
        styles,
        addressData,
        setAddressData,
        onSubmit,
        onFinishFailed,
        onCloseAction,
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

    const viewProps = {
        formData,
        styles,
    };

    const myProps = {
        ...props,
        saveButtonName: formActionType?.addMode ? 'Create Customer ID' : 'Save & Next',
    };

    const formContainer = formActionType?.viewMode ? <ViewIndividualAddressDetails {...viewProps} /> : <AddEditForm {...formProps} />;
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
                                            <Text strong> Individual Address</Text>
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
<<<<<<< HEAD
                                {/* {isAddressLoading ? formSkeleton : formContainer} */}
                                {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                {/* {(showAddEditForm || !addressData?.length > 0) && <AddEditForm {...formProps} />} */}
=======
                                {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
>>>>>>> acc8ed74866ccd402d213dd773523142987b4685
                                {isAddressLoading ? formSkeleton : <ViewAddressList {...formProps} />}
                            </Panel>
                        </Collapse>
                        {/* <Button onClick={() => onSubmit()} type="primary">
                            Submit
                        </Button> */}
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
