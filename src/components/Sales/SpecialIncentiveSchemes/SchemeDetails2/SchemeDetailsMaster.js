/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useReducer, useEffect } from 'react';
import { Form, Row, Col, Typography, Button, Card, Divider } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PlusOutlined } from '@ant-design/icons';

import { PARAM_MASTER } from 'constants/paramMaster';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewAddressList from './ViewAddressList';
import { CardSkeleton } from 'components/common/Skeleton';
import { NoDataFound } from 'utils/noDataFound';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { FormButton } from '../FormButton';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: addData = [] },
        },
    } = state;

    let returnValue = {
        userId,
    };
        
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

const SchemeDetailsBase = (props) => {
    const { form, isViewModeVisible, section, formActionType, selectedCustomer, saveData, addData, NEXT_ACTION } = props;
    const { buttonData, setButtonData, defaultBtnVisiblity, setIsFormVisible, userId, fetchList, listShowLoading, showGlobalNotification, handleButtonClick } = props;
    const { isLoading } = props;
    
    const [addressForm] = Form.useForm();
    const [addressData, setAddressData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const noDataTitle = translateContent('global.generalNotifications.noDataExist.title');
    const addDataTitle = (
        <p className={styles.textCenter}>
            Please add scheme using <br /> <strong>“Add”</strong> button at top
        </p>
    );

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomer?.customerId,
            name: 'Customer ID',
        },
    ];

    const onFinish = () => {
        let data = {
            customerId: selectedCustomer?.customerId,
            customerAddress: addressData?.map((el) => {
                const { tehsilName, cityName, districtName, stateName, ...rest } = el;
                return { ...rest };
            }),
        };

        const onSuccess = (res) => {
            addressForm.resetFields();
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams });
            if (res.data) {
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            // method: addressIndData?.customerAddress ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        setIsAdding(false);
        setShowAddEditForm(false);
        setIsEditing(false);
        setEditingData({});
        addressForm.resetFields();
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        addressForm.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const addAddressHandeler = (e) => {
        e.stopPropagation();
        addressForm.resetFields();
        setIsAdding(true);
        setShowAddEditForm(true);
    };

    const formProps = {
        ...props,
        setShowAddEditForm,
        showAddEditForm,
        formActionType,
        styles,
        addressData,
        setAddressData,
        onFinish,
        onCloseAction,
        form,
        addressForm,
        isEditing,
        setIsEditing,
        setEditingData,
        editingData,
        buttonData,
        setButtonData,
        handleButtonClick,
        forceUpdate,
        addData,
        handleFormValueChange,
        isAdding,
        setIsAdding,
        showGlobalNotification,
    };

    const myProps = {
        ...props,
    };

    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title} </h2>
                        <Card className="">
                            {isLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> { 'Company Address'}</Text>
                                        {!isViewModeVisible && !formActionType?.viewMode && (
                                            <Button onClick={addAddressHandeler} icon={<PlusOutlined />} type="primary" disabled={isAdding || isEditing}>
                                                {translateContent('global.buttons.add')}
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                    {!addressData?.length && !isAdding ? <NoDataFound information={formActionType?.viewMode ? noDataTitle : addDataTitle} /> : <ViewAddressList {...formProps} />}
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <FormButton {...props} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const SchemeDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(SchemeDetailsBase);
