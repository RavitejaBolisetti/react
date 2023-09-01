/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useReducer } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { familyDetailsDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetails';
import { familyDetailSearchDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetailSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { GetAge } from 'utils/getAge';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import { formatDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

import dayjs from 'dayjs';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: relationData = [] },
            CustomerMaster: {
                FamilyDetails: { isLoaded: isFamilyLoaded = false, isLoading: isFamilyLoading, data: familyData = [] },
                FamilyDetailSearch: { isLoading: isSearchLoading, data: familySearchData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,

        isFamilyLoaded,
        isFamilyLoading,
        relationData: relationData && relationData[PARAM_MASTER.FAMLY_RELTN.id],
        familyData,
        familySearchData,
        isSearchLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchFamilyDetailsList: familyDetailsDataActions.fetchList,
            listFamilyDetailsShowLoading: familyDetailsDataActions.listShowLoading,
            saveData: familyDetailsDataActions.saveData,

            fetchFamilySearchList: familyDetailSearchDataActions.fetchList,
            listFamilySearchLoading: familyDetailSearchDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const FamilyDetailMasterBase = (props) => {
    const { section, userId, relationData, fetchFamilyDetailsList, listFamilyDetailsShowLoading, familyData, saveData, showGlobalNotification, fetchFamilySearchList, listFamilySearchLoading, familySearchData } = props;
    const { buttonData, setButtonData, formActionType, isSearchLoading, selectedCustomerId, handleButtonClick, NEXT_ACTION } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [form] = Form.useForm();
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [editedId, setEditedId] = useState(0);

    const VIEW_ACTION = formActionType?.viewMode;

    const extraParams = [
        {
            key: 'customerId',
            title: 'customerId',
            value: selectedCustomerId,
            name: 'Customer ID',
        },
    ];

    useEffect(() => {
        if (!formActionType?.addMode && userId && selectedCustomerId) {
            let onErrorAction = (res) => {
                showGlobalNotification({ message: 'Family Data Not Exists' });
                setFamilyDetailsList(() => []);
            };
            fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId, onErrorAction, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCustomerId]);

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onErrorAction = (res) => {
        showGlobalNotification({ message: 'User Not Found' });
        form.setFieldsValue({
            customerName: null,
            dateOfBirth: null,
            relationAge: null,
        });
    };

    const onSearch = (value) => {
        if (value) {
            if (value === selectedCustomerId) {
                showGlobalNotification({ message: 'Can not Add Same User as family member' });
                return;
            } else if (value !== '') {
                let found = null;
                found = familyDetailList?.find((e) => e?.relationCustomerId === value);
                if (found) {
                    showGlobalNotification({ message: 'Entered Customer Id is already added to this customer' });
                    return;
                }
            }
            let searchParams = [
                {
                    key: 'customerId',
                    title: 'Customer',
                    value: value,
                    name: 'customerId',
                },
            ];

            fetchFamilySearchList({ setIsLoading: listFamilySearchLoading, userId, extraParams: searchParams, onErrorAction });
        }
    };

    const onSave = () => {
        form.validateFields()
            .then(() => {
                let values = form.getFieldsValue();
                setFamilyDetailsList((items) => [{ ...values, customerId: selectedCustomerId, dateOfBirth: typeof values?.dateOfBirth === 'object' ? formatDate(values?.dateOfBirth) : values?.dateOfBirth.split('-').reverse().join('-'), editedId: values?.editedId === '' ? Math.floor(Math.random() * 100000000 + 1) : values?.editedId }, ...items]);

                if (editedMode) {
                    const upd_obj = familyDetailList?.map((obj) => {
                        if (obj?.editedId === values?.editedId) {
                            obj.id = values?.id;
                            obj.mnmCustomer = values?.mnmCustomer;
                            obj.customerName = values?.customerName;
                            obj.relationAge = values?.relationAge;
                            obj.relationship = values?.relationship;
                            obj.relationCode = values?.relationCode;
                            obj.relationCustomerId = values?.relationCustomerId;
                            obj.dateOfBirth = typeof values?.dateOfBirth === 'object' ? formatDate(values?.dateOfBirth) : values?.dateOfBirth;
                            obj.remarks = values?.remarks;
                        }
                        return obj;
                    });

                    setFamilyDetailsList([...upd_obj]);
                }

                setShowForm(false);
                setEditedMode(false);

                form.resetFields();

                if (values?.mnmCustomer === 'Yes') {
                    setCustomerType('Yes');
                } else if (values?.mnmCustomer === 'No') {
                    setCustomerType('No');
                }
            })
            .catch((err) => console.error(err));
    };

    const onFinish = () => {
        if (!familyDetailList || familyDetailList.length <= 0) {
            showGlobalNotification({ message: 'Please add family detail before submit' });
            return false;
        }

        let data = [...familyDetailList];
        const onSuccess = (res) => {
            form.resetFields();
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId, extraParams });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listFamilyDetailsShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const myProps = {
        ...props,
    };

    useEffect(() => {
        if (familyData?.length > 0) {
            setFamilyDetailsList(() => []);
            for (let i = 0; i < familyData?.length; i++) {
                let id = Math.floor(Math.random() * 100000000 + 1);
                setFamilyDetailsList((object) => [...object, { ...familyData[i], editedId: id, relationCustomerId: familyData[i]?.relationCustomerId === null ? '' : familyData[i]?.relationCustomerId }]);
            }
        }
        forceUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [familyData]);

    useEffect(() => {
        form.setFieldsValue({
            customerName: (familySearchData?.firstName ? familySearchData?.firstName : '') + ' ' + (familySearchData?.middleName ? familySearchData?.middleName : '') + ' ' + (familySearchData?.lastName ? familySearchData?.lastName : ''),
            dateOfBirth: familySearchData?.dateOfBirth === null ? null : dayjs(familySearchData?.dateOfBirth),
            relationAge: familySearchData?.dateOfBirth === null ? 'NA' : GetAge(familySearchData?.dateOfBirth),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [familySearchData]);

    const formProps = {
        form,
        onChange,
        onFinish,
        onFinishFailed,
        familyDetailList,
        showForm,
        setShowForm,
        customerType,
        onSave,
        editedMode,
        setEditedMode,
        setCustomerType,
        relationData,
        editedId,
        setEditedId,
        onSearch,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
        isSearchLoading,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h2>{section?.title} </h2>
                    <AddEditForm {...formProps} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const FamilyDetailMaster = connect(mapStateToProps, mapDispatchToProps)(FamilyDetailMasterBase);
