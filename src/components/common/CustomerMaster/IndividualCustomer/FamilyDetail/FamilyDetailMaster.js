/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { familyDetailsDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetails';
import { familyDetailSearchDataActions } from 'store/actions/data/customerMaster/individual/familyDetails/familyDetailSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { btnVisiblity } from 'utils/btnVisiblity';
import { GetAge } from 'utils/getAge';
import { AddEditForm } from './AddEditForm';
import { CustomerFormButton } from '../../CustomerFormButton';

import styles from 'components/common/Common.module.css';

import dayjs from 'dayjs';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isRelationDataLoaded = false, isRelationLoading, paramdata: relationData = [] },
            CustomerMaster: {
                FamilyDetails: { isLoaded: isFamilyLoaded = false, isLoading: isFamilyLoading, data: familyData = [] },
                FamilyDetailSearch: { isLoading: isSearchLoading, data: familySearchData = [] },
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
        isSearchLoading,
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
    const { section, userId, isRelationDataLoaded, isRelationLoading, relationData, fetchConfigList, listConfigShowLoading, fetchFamilyDetailsList, listFamilyDetailsShowLoading, isFamilyLoaded, familyData, saveData, showGlobalNotification, fetchFamilySearchList, listFamilySearchLoading, familySearchData } = props;
    const { buttonData, setButtonData, formActionType, setFormActionType, defaultBtnVisiblity, isSearchLoading } = props;

    const [form] = Form.useForm();
    // const [formData, setFormData] = useState([]);
    const [familyDetailList, setFamilyDetailsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [customerType, setCustomerType] = useState('Yes');
    const [editedMode, setEditedMode] = useState(false);
    const [editedId, setEditedId] = useState(0);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const extraParams = [
        {
            key: 'customerId',
            title: 'Customer',
            value: 'CUS1686811036620',
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

    const onChange = (value) => {
        setCustomerType(value);
    };

    const onErrorAction = (res) => {
        showGlobalNotification({ message: 'User Not Found' });
        form.setFieldsValue({
            //relationCustomerId: familySearchData?.customerId,
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

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        // setFormData([]);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        // record && setFormData(record);
    };

    const onSave = () => {
        let values = form.getFieldsValue();
        setFamilyDetailsList((items) => [{ ...values, customerId: 'CUS1686811036620', dateOfBirth: typeof values?.dateOfBirth === 'object' ? dayjs(values?.dateOfBirth).format('YYYY-MM-DD') : values?.dateOfBirth }, ...items]);
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

        form.resetFields();

        if (values?.mnmCustomer === 'Yes') {
            setCustomerType(true);
        } else if (values?.mnmCustomer === 'No') {
            setCustomerType(false);
        }
    };

    const onFinish = () => {
        let data = [...familyDetailList];
        const onSuccess = (res) => {
            form.resetFields();
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

    useEffect(() => {
        if (familyData?.length > 0) {
            for (let i = 0; i < familyData?.length; i++) {
                setFamilyDetailsList((object) => [...object, { ...familyData[i], editedId: i ,relationCustomerId: familyData[i]?.relationCustomerId ? familyData[i]?.relationCustomerId  : ""}]);
            }
        }
        setEditedId(() => familyData?.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [familyData]);

    useEffect(() => {
        form.setFieldsValue({
            customerName: familySearchData?.firstName + ' ' + familySearchData?.middleName + ' ' + familySearchData?.lastName,
            dateOfBirth: dayjs(familySearchData?.dateOfBirth),
            relationAge: GetAge(familySearchData?.dateOfBirth),
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
        ADD_ACTION,
        EDIT_ACTION,
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
                    {/* {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />} */}
                    <AddEditForm {...formProps} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CustomerFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const FamilyDetailMaster = connect(mapStateToProps, mapDispatchToProps)(FamilyDetailMasterBase);
