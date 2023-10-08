/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Typography, Button, Empty, Card, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';

import { MacIdDataActions } from 'store/actions/data/userManagement/macid';
import { CardSkeleton } from 'components/common/Skeleton';
import { LANGUAGE_EN } from 'language/en';

import AddEditForm from './AddEditForm';
import ViewMacIdList from './ViewMacIdList';
import styles from 'assets/sass/app.module.scss';

import { UserManagementFormButton } from 'components/common/UserManagement/UserManagementFormButton/UserManagementFormButton';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            UserManagement: {
                MacId: { isLoaded: isMacIdLoaded = false, isLoading: isMacIdLoading, data: macIdDataList = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        typeData: typeData,
        isMacIdLoaded,
        isMacIdLoading,
        macIdDataList,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchMacIdList: MacIdDataActions.fetchList,
            listMacIdShowLoading: MacIdDataActions.listShowLoading,
            saveData: MacIdDataActions.saveData,
            resetData: MacIdDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

const MacIdMasterMain = (props) => {
    const { form, section, userId, searchType, fetchMacIdList, listMacIdShowLoading, showGlobalNotification, typeData, macIdDataList, isMacIdLoaded } = props;
    const { saveData, formData, isMacIdLoading } = props;
    const { buttonData, setButtonData, formActionType, setIsFormVisible } = props;

    const [macIdform] = Form.useForm();
    const [macIdData, setMacIdData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [isAdding, setIsAdding] = useState(false);

    const extraParams = [
        {
            key: 'userId',
            title: 'userId',
            value: formData?.employeeCode,
            name: 'userId',
        },
    ];

    useEffect(() => {
        if (isMacIdLoaded) {
            setMacIdData(macIdDataList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [macIdDataList, isMacIdLoaded]);

    useEffect(() => {
        if (userId) {
            // setButtonData((prev) => ({ ...prev, nextBtn: false, nextBtnWthPopMag: false, saveBtn: true, editBtn: formActionType?.viewMode }));
            fetchMacIdList({ setIsLoading: listMacIdShowLoading, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onSaveFormData = () => {
        macIdform
            .validateFields()
            .then((value) => {
                if (isEditing) {
                    setMacIdData((prev) => {
                        let updatedformData = prev?.length ? [...prev] : [];
                        const index = updatedformData?.findIndex((el) => el?.macId === editingData?.macId);
                        updatedformData.splice(index, 1, { ...value, userId: formData?.userName });
                        return [...updatedformData];
                    });
                } else {
                    setMacIdData((prev) => {
                        const updVal = prev?.length ? [{ ...value, userId: formData?.userName }, ...prev] : [{ ...value, userId: formData?.userName }];
                        return updVal;
                    });
                }
                setShowAddEditForm(false);
                setIsEditing(false);
                setEditingData({});
                setIsAdding(false);
                macIdform.resetFields();
            })
            .catch((err) => console.error(err));
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const addBtnMacIdHandler = (e) => {
        e.stopPropagation();
        setIsAdding(true);
        macIdform.resetFields();
        setShowAddEditForm(true);
    };

    const formProps = {
        setShowAddEditForm,
        showAddEditForm,
        setMacIdData,
        macIdData,
        onSaveFormData,
        styles,
        form,
        macIdform,
        isEditing,
        setIsEditing,
        formActionType,
        setEditingData,
        typeData,
        setButtonData,
        handleFormValueChange,
        searchType,
        isAdding,
        setIsAdding,
        buttonData,
    };

    const onFinish = () => {
        const onSuccess = (res) => {
            macIdform.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setIsFormVisible(false);
            setButtonData({ ...buttonData, formBtnActive: false });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: macIdData,
            // method: formActionType?.editMode ? 'put' : 'post',
            method: 'post',
            isLoading: listMacIdShowLoading,
            setIsLoading: listMacIdShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);

        setShowAddEditForm(false);
        setIsEditing(false);
        setIsAdding(false);
        setEditingData({});
        macIdform.resetFields();
    };

    const onFinishFailed = (err) => {
        console.error(err);
    };
    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    const buttonProps = {
        ...props,
        saveButtonName: 'Save & Close',
        buttonData,
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title} </h2>
                        <Card className="">
                            {isMacIdLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> Device ID</Text>
                                        {!formActionType?.viewMode && (
                                            <Button onClick={addBtnMacIdHandler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                Add
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    <div className={styles.headerBox}>
                                        {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                        {!macIdData?.length && !isAdding ? (
                                            <>
                                                <Empty
                                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                    imageStyle={{
                                                        height: 60,
                                                    }}
                                                    description={
                                                        <span>
                                                            {noDataTitle} <br />
                                                        </span>
                                                    }
                                                ></Empty>
                                            </>
                                        ) : (
                                            <ViewMacIdList {...formProps} />
                                        )}
                                    </div>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <UserManagementFormButton {...buttonProps} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const MacIdMaster = connect(mapStateToProps, mapDispatchToProps)(MacIdMasterMain);
