/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo, useState } from 'react';
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
import { BASE_URL_PRODUCT_MODEL_GROUP, BASE_URL_PRODUCT_VARIENT } from 'constants/routingApi';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                LoyaltyScheme: { isLoaded: isLoyaltySchemeDataLoaded = false, isLoading, data: loyaltySchemeData = [] },
                SchemeDetail: { isFilteredListLoaded: isSchemeLovDataLoaded = false, isLoading: isSchemeLovLoading, filteredListData: schemeLovData = [] },
                LoyaltyModelGroup: { isFilteredListLoaded: isModelDataLoaded = false, isLoading: isModelLoading, filteredListData: modelData = [] },
                LoyaltyVarient: { isFilteredListLoaded: isVariantDataLoaded = false, isLoading: isVariantLoading, filteredListData: variantData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
        customer: {
            customerDetail: { isLoaded: isDataCustomerLoaded = false, isLoading: isCustomerLoading = false, data: customerDetail = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isLoyaltySchemeDataLoaded,
        isLoading,
        loyaltySchemeData,

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

            fetchSchemeLovList: otfSchemeDetailDataActions.fetchFilteredList,
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
    const { isLoyaltySchemeDataLoaded, isLoading, section, listShowLoading, fetchList, loyaltySchemeData, loyaltySchemeDataPass, userId, showGlobalNotification } = props;
    const { form, selectedOrder, selectedRecordId, formActionType, handleFormValueChange, handleButtonClick, NEXT_ACTION } = props;
    const { typeData } = props;
    const { fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading } = props;
    const { isModelDataLoaded, isModelLoading, modelData, isVariantDataLoaded, isVariantLoading, variantData, saveData } = props;
    const { schemeLovData, isSchemeLovLoading, fetchSchemeLovList, listSchemeLovShowLoading } = props;
    const { modelCode, formKey, onFinishCustom = undefined, FormActionButton, StatusBar, salesModuleType } = props;

    const [filteredModelData, setfilteredModelData] = useState([]);
    const [filteredVariantData, setfilteredVariantData] = useState([]);
    const [formData, setformData] = useState([]);
    const disabledProps = { disabled: true };
    const [exhangeDataParams, setExchangeDataParams] = useState();

    const fnSetData = (data) => {
        if (data && Object?.keys(data)?.length > 0) {
            form.setFieldsValue({ ...data, customerCode: data?.customerId, oldChassisNumber: data?.chassisNumber, variantCode: data?.variant, vehicleModelGroup: data?.modelGroup, make: VEHICLE_COMPANY_MAKE });
            handleFilterChange('make', VEHICLE_COMPANY_MAKE);
            handleFilterChange('modelGroupCode', data?.modelGroup ?? '');
        } else if (data === null) {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('global.generalMessage.noDataFound') });
            form.resetFields(['customerCode', 'customerName', 'make', 'vehicleModelGroup', 'variantCode', 'registrationNumber', 'oldChassisNumber', 'customerDOB']);
        }
    };

    const exhangeDataParamList = useMemo(() => {
        return exhangeDataParams;
    }, [exhangeDataParams]);

    useEffect(() => {
        if (exhangeDataParamList?.make || exhangeDataParamList?.modelGroup) {
            fetchModelLovList({ customURL: BASE_URL_PRODUCT_MODEL_GROUP.concat('/lov'), setIsLoading: listModelShowLoading, userId });
            fetchVariantLovList({ customURL: BASE_URL_PRODUCT_VARIENT.concat('/lov'), setIsLoading: listVariantShowLoading, userId, extraParams: makeExtraParams('modelGroupCode', 'modelGroupCode', exhangeDataParamList?.modelGroup, 'modelGroupCode') });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exhangeDataParamList]);

    const onErrorAction = () => {};
    const onSuccessAction = () => {};

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
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationSuccess.error'), message: translateContent('bookingManagement.validation.verifyCustomerID') });
            return;
        }
        const data = { ...values, id: loyaltySchemeData?.id || '', otfId: selectedRecordId };

        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
        } else {
            const onSuccess = (res) => {
                form.resetFields();
                fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION , onSave: true });
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
    const isOTFModule = salesModuleType === SALES_MODULE_TYPE.OTF.KEY;

    useEffect(() => {
        if (isOTFModule && userId && selectedRecordId) {
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
                    value: selectedOrder?.modelCode || modelCode,
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
        if (loyaltySchemeData) {
            setformData(loyaltySchemeData);
            setExchangeDataParams({ make: loyaltySchemeData?.make, modelGroup: loyaltySchemeData?.vehicleModelGroup });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loyaltySchemeData]);

    useEffect(() => {
        if (loyaltySchemeDataPass) {
            setformData(loyaltySchemeDataPass);
            setExchangeDataParams({ make: loyaltySchemeDataPass?.make, modelGroup: loyaltySchemeDataPass?.vehicleModelGroup });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loyaltySchemeDataPass]);

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
            setExchangeDataParams({ ...exhangeDataParams, make: value });
        } else if (name === 'modelGroupCode') {
            form.setFieldsValue({
                variant: undefined,
            });
            setfilteredVariantData();
            setExchangeDataParams({ ...exhangeDataParams, modelGroup: value });
        }
    };

    const handleSchemeChange = (__, { option: { amount } = 0 }) => {
        form.setFieldsValue({
            schemeAmount: amount,
        });
    };

    const formProps = {
        ...props,
        form,
        onFinish,
        loyaltySchemeData,
        formData,
        setformData,
        isLoyaltySchemeDataLoaded,

        typeData,

        isSchemeLovLoading,
        schemeLovData,

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
        modelData,
        variantData,
        customerForm: formData,
        isLoyaltySchemeDataLoaded,
        isLoading,
        typeData,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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
