/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/LoyaltyScheme';

import { showGlobalNotification } from 'store/actions/notification';
import { otfLoyaltySchemeDataActions } from 'store/actions/data/otf/loyaltyAndScheme';
import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetail';
import { otfLoyaltyModelGroupDataActions } from 'store/actions/data/otf/loyaltyModelGroup';
import { otfLoyaltyVarientDetailDataActions } from 'store/actions/data/otf/loyaltyVarient';

import { VEHICLE_COMPANY_MAKE } from 'constants/OTFStatus';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                LoyaltyScheme: { isLoaded: isLoyaltySchemeDataLoaded = false, isLoading, data: LoyaltySchemeData = [] },
                SchemeDetail: { isLoaded: isSchemeLovDataLoaded = false, isLoading: isSchemeLovLoading, data: schemeLovData = [] },
                LoyaltyModelGroup: { isFilteredListLoaded: isModelDataLoaded = false, isLoading: isModelLoading, filteredListData: modelData = [] },
                LoyaltyVarient: { isFilteredListLoaded: isVariantDataLoaded = false, isLoading: isVariantLoading, filteredListData: variantData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
        customer: {
            customerDetail: { isLoaded: isDataCustomerLoaded = false, isLoading: isCustomerLoading = false, data: customerDetail = [] },
        },
    } = state;

    const moduleTitle = 'Loyalty And Scheme';

    let returnValue = {
        userId,
        isLoyaltySchemeDataLoaded,
        moduleTitle,
        isLoading,
        LoyaltySchemeData,

        schemeLovData,
        isSchemeLovLoading,
        isSchemeLovDataLoaded,

        typeData,

        isModelDataLoaded,
        isModelLoading,
        modelData,

        isVariantDataLoaded,
        isVariantLoading,
        variantData,

        isDataCustomerLoaded,
        isCustomerLoading,
        customerDetail,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCustomerList: customerDetailDataActions.fetchList,
            listCustomerShowLoading: customerDetailDataActions.listShowLoading,

            fetchSchemeLovList: otfSchemeDetailDataActions.fetchList,
            listSchemeLovShowLoading: otfSchemeDetailDataActions.listShowLoading,

            fetchModelLovList: otfLoyaltyModelGroupDataActions.fetchFilteredList,
            listModelShowLoading: otfLoyaltyModelGroupDataActions.listShowLoading,
            resetModel: otfLoyaltyModelGroupDataActions.reset,

            fetchVariantLovList: otfLoyaltyVarientDetailDataActions.fetchFilteredList,
            listVariantShowLoading: otfLoyaltyVarientDetailDataActions.listShowLoading,
            resetVariant: otfLoyaltyVarientDetailDataActions.reset,

            fetchList: otfLoyaltySchemeDataActions.fetchList,
            resetData: otfLoyaltySchemeDataActions.reset,
            listShowLoading: otfLoyaltySchemeDataActions.listShowLoading,
            saveData: otfLoyaltySchemeDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

const LoyaltySchemeMasterMain = (props) => {
    const { isLoyaltySchemeDataLoaded, isLoading, section, listShowLoading, fetchList, LoyaltySchemeData, userId, showGlobalNotification } = props;
    const { form, selectedOrder, selectedRecordId, formActionType, handleFormValueChange, onFinishFailed, handleButtonClick, NEXT_ACTION } = props;
    const { typeData } = props;
    const { fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading } = props;
    const { isModelDataLoaded, isModelLoading, modelData, isVariantDataLoaded, isVariantLoading, variantData, saveData } = props;
    const { schemeLovData, isSchemeLovLoading, fetchSchemeLovList, listSchemeLovShowLoading } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, StatusBar } = props;

    const [filteredModelData, setfilteredModelData] = useState([]);
    const [filteredVariantData, setfilteredVariantData] = useState([]);
    const [formData, setformData] = useState([]);
    const [editable, setEditable] = useState();
    const disabledProps = { disabled: true };

    const fnSetData = (data) => {
        if (data && Object?.keys(data)?.length > 0) {
            if (data?.customerId) setEditable(true);
            else setEditable(false);
            form.setFieldsValue({ ...data, customerCode: data?.customerId, oldChassisNumber: data?.chassisNumber, variantCode: data?.variant, vehicleModelGroup: data?.modelGroup, make: data?.make || VEHICLE_COMPANY_MAKE });
        } else if (data === null) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'No data found' });
            form.resetFields(['customerCode', 'customerName', 'make', 'vehicleModelGroup', 'variantCode', 'registrationNumber', 'oldChassisNumber', 'customerDOB']);
        }
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const onSuccessAction = (res) => {};

    const extraParams = [
        {
            key: 'otfId',
            value: selectedRecordId,
        },
    ];
    const makeExtraParams = (key, title, value, name) => {
        const extraParams = [
            {
                key: key,
                title: title,
                value: value,
                name: name,
            },
        ];
        return extraParams;
    };

    const onFinish = (values) => {
        const { customerName } = values;
        if (!customerName) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Customer id to continue' });
            return;
        }
        const data = { ...values, id: LoyaltySchemeData?.id || '', otfId: selectedRecordId };

        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        } else {
            const onSuccess = (res) => {
                form.resetFields();
                fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            };

            const requestData = {
                data: data,
                method: formData?.id ? 'put' : 'post',
                setIsLoading: listShowLoading,
                userId,
                onError: onErrorAction,
                onSuccess,
            };

            saveData(requestData);
        }
    };

    useEffect(() => {
        if (userId && selectedRecordId) {
            const extraParams = [
                {
                    key: 'otfId',
                    title: 'otfId',
                    value: selectedRecordId,
                    name: 'Booking Number',
                },
            ];
            const schemeExtraParams = [
                {
                    key: 'modelCode',
                    title: 'modelCode',
                    value: selectedOrder?.modelCode,
                    name: 'Booking Number',
                },
                {
                    key: 'module',
                    title: 'module',
                    value: 'LO',
                    name: 'Module',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            fetchSchemeLovList({ setIsLoading: listSchemeLovShowLoading, extraParams: schemeExtraParams, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (LoyaltySchemeData) {
            if (LoyaltySchemeData?.customerCode) setEditable(true);
            else setEditable(false);
            setformData(LoyaltySchemeData);
            LoyaltySchemeData?.make && handleFilterChange('make', LoyaltySchemeData?.make ?? '');
            LoyaltySchemeData?.vehicleModelGroup && handleFilterChange('modelGroup', LoyaltySchemeData?.vehicleModelGroup ?? '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LoyaltySchemeData]);

    useEffect(() => {
        if (isModelDataLoaded && modelData) {
            setfilteredModelData(modelData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelData]);

    useEffect(() => {
        if (isVariantDataLoaded && variantData) {
            setfilteredVariantData(variantData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variantData]);

    const handleFilterChange = (name, value, selectobj) => {
        if (!value) {
            switch (name) {
                case 'make': {
                    setfilteredModelData();
                    setfilteredVariantData();
                    form.setFieldsValue({
                        modelGroup: undefined,
                        variant: undefined,
                    });
                    break;
                }
                case 'modelGroupCode': {
                    setfilteredVariantData();
                    form.setFieldsValue({
                        variant: undefined,
                    });
                    break;
                }
                default: {
                    setfilteredModelData();
                    setfilteredVariantData();
                    form.setFieldsValue({
                        modelGroup: undefined,
                        variant: undefined,
                    });
                    break;
                }
            }
            return;
        } else if (name === 'make') {
            setfilteredModelData();
            setfilteredVariantData();
            form.setFieldsValue({
                modelGroup: undefined,
                variant: undefined,
            });
            fetchModelLovList({ setIsLoading: listModelShowLoading, userId, extraParams: makeExtraParams('make', 'make', value, 'make') });
        } else if (name === 'modelGroupCode') {
            form.setFieldsValue({
                variant: undefined,
            });
            setfilteredVariantData();
            fetchVariantLovList({ setIsLoading: listVariantShowLoading, userId, extraParams: makeExtraParams('modelGroupCode', 'modelGroupCode', value, 'modelGroupCode') });
        }
    };

    const handleSchemeChange = (__, value) => {
        form.setFieldsValue({
            schemeAmount: value?.amount,
        });
    };

    const formProps = {
        ...props,
        form,
        onFinishFailed,
        onFinish,
        LoyaltySchemeData,
        formData,
        setformData,
        isLoyaltySchemeDataLoaded,

        typeData,

        isSchemeLovLoading,
        schemeLovData,

        // isMakeLoading,
        // makeData,

        isModelLoading,
        modelData,

        isVariantLoading,
        variantData,
        isLoading,
        filteredModelData,
        filteredVariantData,
        fnSetData,
        disabledProps,
        handleFilterChange,
        handleSchemeChange,
    };

    const myProps = {
        ...props,
    };

    const viewProps = {
        styles,
        customerForm: formData,
        isLoyaltySchemeDataLoaded,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {StatusBar && <StatusBar status={props?.selectedOrder?.orderStatus} />}
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};
export const LoyaltySchemeMaster = connect(mapStateToProps, mapDispatchToProps)(LoyaltySchemeMasterMain);
