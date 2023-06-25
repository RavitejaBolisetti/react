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

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';
import { GetAge } from 'utils/getAge';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

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
    const { section, userId, relationData, fetchFamilyDetailsList, listFamilyDetailsShowLoading, isFamilyLoaded, familyData, saveData, showGlobalNotification, fetchFamilySearchList, listFamilySearchLoading, familySearchData } = props;
    const { buttonData, setButtonData, formActionType, isSearchLoading, selectedCustomerId, handleButtonClick } = props;
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [form] = Form.useForm();
    // const [formData, setFormData] = useState([]);
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [editedId, setEditedId] = useState(0);

    const NEXT_EDIT_ACTION = FROM_ACTION_TYPE?.NEXT_EDIT;
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
        let onErrorAction = (res) => {
            showGlobalNotification({ message: 'Family Data Not Exists' });
            setFamilyDetailsList(() => []);
        };
        fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId, onErrorAction, extraParams });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCustomerId]);

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
        let searchParams = [
            {
                key: 'customerId',
                title: 'Customer',
                value: value,
                name: 'customerId',
            },
        ];

        fetchFamilySearchList({ setIsLoading: listFamilySearchLoading, userId, extraParams: searchParams, onErrorAction });
    };

    const onSave = () => {
        let values = form.getFieldsValue();
        console.log(values, 'ValueMDikkat');
        setFamilyDetailsList((items) => [{ ...values, customerId: selectedCustomerId, dateOfBirth: typeof values?.dateOfBirth === 'object' ? dayjs(values?.dateOfBirth).format('YYYY-MM-DD') : values?.dateOfBirth }, ...items]);
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
                    obj.dateOfBirth = typeof values?.dateOfBirth === 'object' ? dayjs(values?.dateOfBirth).format('YYYY-MM-DD') : values?.dateOfBirth;
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
    };

    const onFinish = () => {
        if (!familyDetailList || familyDetailList.length <= 0) {
            showGlobalNotification({ message: 'Please add family detail before submit' });
            return false;
        }

        let data = [...familyDetailList];
        const onSuccess = (res) => {
            form.resetFields();
            handleButtonClick({ record: res?.data, buttonAction: NEXT_EDIT_ACTION });
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
                setFamilyDetailsList((object) => [...object, { ...familyData[i], editedId: i }]);
            }
        }
        forceUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [familyData]);

    useEffect(() => {
        form.setFieldsValue({
            customerName: familySearchData?.firstName + ' ' + familySearchData?.middleName + ' ' + familySearchData?.lastName,
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
