/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form } from 'antd';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetail';
import { schemeDataActions } from 'store/actions/data/otf/exchangeVehicle';
import { vehicleMakeDetailsDataActions } from 'store/actions/data/vehicle/makeDetails';
import { vehicleModelDetailsDataActions } from 'store/actions/data/vehicle/modelDetails';
import { vehicleVariantDetailsDataActions } from 'store/actions/data/vehicle/variantDetails';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import { OTFFormButton } from '../OTFFormButton';
import { OTFStatusBar } from '../utils/OTFStatusBar';

import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                ExchangeVehicle: { isLoaded: isDataLoaded = false, isLoading, data: exchangeData = [] },
                FinanceLov: { isLoaded: isFinanceLovDataLoaded = false, isloading: isFinanceLovLoading, data: financeLovData = [] },
                SchemeDetail: { isFilteredListLoaded: isSchemeLovDataLoaded = false, isloading: isSchemeLovLoading, filteredListData: schemeLovData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                MakeVehicleDetails: { isLoaded: isMakeDataLoaded = false, isMakeLoading, data: makeData = [] },
                ModelVehicleDetails: { isLoaded: isModelDataLoaded = false, isModelLoading, data: modelData = [] },
                VariantVehicleDetails: { isLoaded: isVariantDataLoaded = false, isVariantLoading, data: variantData = [] },
            },
        },
        customer: {
            customerDetail: { isLoaded: isDataCustomerLoaded = false, isLoading: isCustomerLoading = false, data: customerDetail = [] },
        },
    } = state;

    const moduleTitle = 'Exchange Vehichle';

    let returnValue = {
        userId,
        isDataLoaded,
        exchangeData,
        isLoading,
        moduleTitle,

        financeLovData,
        isFinanceLovLoading,
        isFinanceLovDataLoaded,

        schemeLovData,
        isSchemeLovLoading,
        isSchemeLovDataLoaded,

        typeData,

        isMakeDataLoaded,
        isMakeLoading,
        makeData,

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

            fetchFinanceLovList: financeLovDataActions.fetchList,
            listFinanceLovShowLoading: financeLovDataActions.listShowLoading,

            fetchSchemeLovList: otfSchemeDetailDataActions.fetchFilteredList,
            listSchemeLovShowLoading: otfSchemeDetailDataActions.listShowLoading,

            fetchMakeLovList: vehicleMakeDetailsDataActions.fetchList,
            listMakeShowLoading: vehicleMakeDetailsDataActions.listShowLoading,

            fetchModelLovList: vehicleModelDetailsDataActions.fetchList,
            listModelShowLoading: vehicleModelDetailsDataActions.listShowLoading,

            fetchVariantLovList: vehicleVariantDetailsDataActions.fetchList,
            listVariantShowLoading: vehicleVariantDetailsDataActions.listShowLoading,

            fetchList: schemeDataActions.fetchList,
            listShowLoading: schemeDataActions.listShowLoading,
            saveData: schemeDataActions.saveData,
            resetData: schemeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ExchangeVehiclesBase = (props) => {
    const { exchangeData, isLoading, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, section } = props;
    const { typeData } = props;
    const { fetchMakeLovList, listMakeShowLoading, fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading } = props;
    const { isMakeDataLoaded, isMakeLoading, makeData, isModelDataLoaded, isModelLoading, modelData, isVariantDataLoaded, isVariantLoading, variantData, saveData } = props;
    const { financeLovData, isFinanceLovLoading, isFinanceLovDataLoaded, fetchFinanceLovList, listFinanceLovShowLoading } = props;
    const { schemeLovData, isSchemeLovLoading, isSchemeLovDataLoaded, fetchSchemeLovList, listSchemeLovShowLoading } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange } = props;
    const { fetchCustomerList, listCustomerShowLoading, handleButtonClick, NEXT_ACTION } = props;

    const [formData, setFormData] = useState('');

    useEffect(() => {
        setFormData(exchangeData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exchangeData]);

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    const errorAction = (message) => {
        // showGlobalNotification(message);
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (userId) {
            if (!isSchemeLovDataLoaded) {
                fetchFinanceLovList({ setIsLoading: listSchemeLovShowLoading, userId });
            }
            if (!isFinanceLovDataLoaded) {
                fetchSchemeLovList({ setIsLoading: listFinanceLovShowLoading, userId });
            }
            if (!isMakeDataLoaded) {
                fetchMakeLovList({ setIsLoading: listMakeShowLoading, userId });
            }
            if (!isModelDataLoaded) {
                fetchModelLovList({ setIsLoading: listModelShowLoading, userId });
            }
            if (!isVariantDataLoaded) {
                fetchVariantLovList({ setIsLoading: listVariantShowLoading, userId });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isMakeDataLoaded, isModelDataLoaded, isVariantDataLoaded]);

    useEffect(() => {
        if (userId && selectedOrderId) {
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const onErrorAction = (message) => {
        // showGlobalNotification(message);
    };

    const onFinish = (values) => {
        const data = { ...values, otfNumber: selectedOrderId };
        delete data.hypothicatedTo;
        delete data.usage;
        delete data.schemeName;
        delete data.relationship;
        delete data.monthOfRegistration;
        delete data.yearOfRegistration;

        const onSuccess = (res) => {
            form.resetFields();
            // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const requestData = {
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError: onErrorAction,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (values1) => {
        form.validateFields()
            .then(() => {})
            .catch((err) => {});
    };

    const onSearch = (value) => {
        if (!value) {
            return false;
        }
        const defaultExtraParam = [
            {
                key: 'customerType',
                title: 'Customer Type',
                value: 'IND',
                canRemove: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 1000,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
                canRemove: true,
            },

            {
                key: 'searchType',
                title: 'Type',
                value: 'customerId',
                canRemove: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: value,
                canRemove: true,
            },
        ];

        fetchCustomerList({
            setIsLoading: listCustomerShowLoading,
            extraParams: defaultExtraParam,
            userId,
            onSuccessAction: (res) => {
                // setFormData(res?.data?.customerMasterDetails[0]);
            },
            onErrorAction,
        });
    };

    const formProps = {
        ...props,
        form,
        formData,
        onFinishFailed,
        onFinish,

        typeData,

        isSchemeLovLoading,
        schemeLovData,

        isFinanceLovLoading,
        financeLovData,

        isMakeLoading,
        makeData,

        isModelLoading,
        modelData,

        isVariantLoading,
        variantData,
        isLoading,
        onSearch,
    };

    const viewProps = {
        styles,
        formData,
        isLoading,
        makeData,
        modelData,
        variantData,
        typeData,
        schemeLovData,
        financeLovData,
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
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
                        </Col>
                    </Row>

                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const ExchangeVehiclesMaster = connect(mapStateToProps, mapDispatchToProps)(ExchangeVehiclesBase);
