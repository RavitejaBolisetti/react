/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { AddEditForm } from './AddEditForm';
import { PARAM_MASTER } from 'constants/paramMaster';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { familyDetailsDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetails';
import { familyDetailSearchDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetailSearch';
import { showGlobalNotification } from 'store/actions/notification';
import dayjs from 'dayjs';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isRelationDataLoaded = false, isRelationLoading, paramdata: relationData = [] },
            CustomerMaster: {
                FamilyDetails: { isLoaded: isFamilyLoaded = false, isLoading: isFamilyLoading, data: familyData = [] },
                FamilyDetailSearch: { data: familySearchData = [] },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isRelationDataLoaded,
        isRelationLoading,
        isFamilyLoaded,
        isFamilyLoading,
        relationData: relationData && relationData[PARAM_MASTER.FAMLY_RELTN.id],
        familyData,
        familySearchData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

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
    const { userId, isRelationDataLoaded, isRelationLoading, relationData, fetchConfigList, listConfigShowLoading, fetchFamilyDetailsList, listFamilyDetailsShowLoading, isFamilyLoaded, familyData, saveData, showGlobalNotification, fetchFamilySearchList, listFamilySearchLoading, familySearchData } = props;
    const [familyForm] = Form.useForm();
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [editedId, setEditedId] = useState(0);
    const [searchValue, setSearchValue] = useState('CUS1686811036620');

    const extraParams = [
        {
            key: 'customerId',
            title: 'Customer',
            value: 'CUS1686811036620',
            name: 'customerId',
        },
    ];

    const searchParams = [
        {
            key: 'customerId',
            title: 'Customer',
            value: searchValue,
            name: 'customerId',
        },
    ];

    useEffect(() => {
        if (userId && !isRelationDataLoaded && !isRelationLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.FAMLY_RELTN.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isRelationDataLoaded]);

    useEffect(() => {
        if (userId && !isFamilyLoaded) {
            fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFamilyLoaded]);

    useEffect(() => {
        fetchFamilySearchList({ setIsLoading: listFamilySearchLoading, userId, extraParams: searchParams });
        familyForm.setFieldsValue({
            relationCustomerId: familySearchData?.customerId,
            customerName: familySearchData?.firstName + ' ' + familySearchData?.middleName + ' ' + familySearchData?.lastName,
            dateOfBirth: dayjs(familySearchData?.dateOfBirth),
            relationAge: familySearchData?.relationAge,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onSearch = (value) => {
        console.log(value, 'OnSearchValue');
        setSearchValue(value);
    };

    const onSave = () => {
        let values = familyForm.getFieldsValue();
        setFamilyDetailsList((items) => [{ ...values, dateOfBirth: typeof values?.dateOfBirth === 'object' ? dayjs(values?.dateOfBirth).format('YYYY-MM-DD') : values?.dateOfBirth }, ...items]);

        if (editedMode) {
            const upd_obj = familyDetailList?.map((obj) => {
                if (obj?.editedId === values?.editedId) {
                    obj.customerName = values?.customerName;
                    obj.relationAge = values?.relationAge;
                    obj.relationship = values?.relationship;
                    obj.relationCode = values?.relationCode;
                    obj.dateOfBirth = typeof values?.dateOfBirth === 'object' ? dayjs(values?.dateOfBirth).format('YYYY-MM-DD') : values?.dateOfBirth;
                    obj.remarks = values?.remarks;
                }
                return obj;
            });

            setFamilyDetailsList([...upd_obj]);
        }

        setShowForm(false);
        setEditedMode(false);

        familyForm.resetFields();

        if (values?.mnmCustomer === 'Yes') {
            setCustomerType(true);
        } else if (values?.mnmCustomer === 'No') {
            setCustomerType(false);
        }
    };

    const onFamilyFinish = () => {
        let data = [...familyDetailList];
        const onSuccess = (res) => {
            familyForm.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchFamilyDetailsList({ setIsLoading: listFamilyDetailsShowLoading, userId });
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

    useEffect(() => {
        if (familyData?.length > 0) {
            for (let i = 0; i < familyData?.length; i++) {
                setFamilyDetailsList((object) => [...object, { ...familyData[i], editedId: i }]);
            }
        }
        setEditedId(() => familyData?.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [familyData]);

    const formProps = {
        familyForm,
        onChange,
        onFamilyFinish,
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
    };

    return <AddEditForm {...formProps} />;
};

export const FamilyDetailMaster = connect(mapStateToProps, mapDispatchToProps)(FamilyDetailMasterBase);
