/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { Form, Row, Col } from 'antd';
import { showGlobalNotification } from 'store/actions/notification';
import { otfLoyaltySchemeDataActions } from 'store/actions/data/otf/loyaltyAndScheme';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetail';
import { schemeDataActions } from 'store/actions/data/otf/exchangeVehicle';
import { vehicleMakeDetailsDataActions } from 'store/actions/data/vehicle/makeDetails';
import { vehicleModelDetailsDataActions } from 'store/actions/data/vehicle/modelDetails';
import { vehicleVariantDetailsDataActions } from 'store/actions/data/vehicle/variantDetails';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OTFStatusBar } from '../utils/OTFStatusBar';
import { OTFFormButton } from '../OTFFormButton';
import { ViewDetail } from './ViewDetail';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                LoyaltyScheme: { isLoaded: isLoyaltySchemeDataLoaded = false, isLoading, data: LoyaltySchemeData = [] },
                SchemeDetail: { isFilteredListLoaded: isSchemeLovDataLoaded = false, isLoading: isSchemeLovLoading, filteredListData: schemeLovData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                MakeVehicleDetails: { isLoaded: isMakeDataLoaded = false, isLoading: isMakeLoading, data: makeData = [] },
                ModelVehicleDetails: { isLoaded: isModelDataLoaded = false, isLoading: isModelLoading, data: modelData = [] },
                VariantVehicleDetails: { isLoaded: isVariantDataLoaded = false, isLoading: isVariantLoading, data: variantData = [] },
            },
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

            fetchSchemeLovList: otfSchemeDetailDataActions.fetchFilteredList,
            listSchemeLovShowLoading: otfSchemeDetailDataActions.listShowLoading,

            fetchMakeLovList: vehicleMakeDetailsDataActions.fetchList,
            listMakeShowLoading: vehicleMakeDetailsDataActions.listShowLoading,

            fetchModelLovList: vehicleModelDetailsDataActions.fetchList,
            listModelShowLoading: vehicleModelDetailsDataActions.listShowLoading,
            resetModel: vehicleModelDetailsDataActions.reset,

            fetchVariantLovList: vehicleVariantDetailsDataActions.fetchList,
            listVariantShowLoading: vehicleVariantDetailsDataActions.listShowLoading,
            resetVariant: vehicleModelDetailsDataActions.reset,

            fetchList: otfLoyaltySchemeDataActions.fetchList,
            resetData: otfLoyaltySchemeDataActions.reset,
            listShowLoading: otfLoyaltySchemeDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const LoyaltySchemeMasterMain = (props) => {
    const { isLoyaltySchemeDataLoaded, isLoading, section, listShowLoading, fetchList, LoyaltySchemeData, userId, showGlobalNotification } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange, onFinishFailed, handleButtonClick, NEXT_ACTION } = props;
    const { typeData } = props;
    const { fetchMakeLovList, listMakeShowLoading, fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading } = props;
    const { isMakeLoading, makeData, isModelDataLoaded, isModelLoading, modelData, isVariantDataLoaded, isVariantLoading, variantData, saveData } = props;
    const { schemeLovData, isSchemeLovLoading, fetchSchemeLovList, listSchemeLovShowLoading } = props;
    const { fetchCustomerList, listCustomerShowLoading } = props;

    const [filteredModelData, setfilteredModelData] = useState([]);
    const [filteredVariantData, setfilteredVariantData] = useState([]);
    const [formdata, setformdata] = useState();

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const onSuccessAction = (res) => {};

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'OTF Number',
        },
    ];

    const onFinish = (values) => {
        const { customerName } = values;
        if (!customerName) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Customer id to continue' });
            return;
        }
        const data = { ...values, id: LoyaltySchemeData?.id || '', otfNumber: selectedOrderId };

        const onSuccess = (res) => {
            form.resetFields();
            fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const requestData = {
            data: data,
            method: formdata?.id ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError: onErrorAction,
            onSuccess,
        };

        saveData(requestData);
    };

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'OTF Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            fetchSchemeLovList({ setIsLoading: listSchemeLovShowLoading, userId });
            fetchMakeLovList({ setIsLoading: listMakeShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        if (LoyaltySchemeData) {
            setformdata(LoyaltySchemeData);
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
                res?.data && res?.data?.customerMasterDetails && res?.data?.customerMasterDetails[0] && setformdata({ ...res?.data?.customerMasterDetails[0], id: formdata?.id ?? '' } ?? []);
                !res?.data?.customerMasterDetails && showGlobalNotification({ message: res?.responseMessage });
            },
            onErrorAction,
        });
    };

    const formProps = {
        ...props,
        form,
        onFinishFailed,
        onFinish,
        LoyaltySchemeData,
        formdata,
        setformdata,
        isLoyaltySchemeDataLoaded,

        typeData,

        isSchemeLovLoading,
        schemeLovData,

        isMakeLoading,
        makeData,

        isModelLoading,
        modelData,

        isVariantLoading,
        variantData,
        isLoading,
        onSearch,
        filteredModelData,
        filteredVariantData,
    };

    const myProps = {
        ...props,
    };

    const viewProps = {
        styles,
        customerForm: formdata,
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
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};
export const LoyaltySchemeMaster = connect(mapStateToProps, mapDispatchToProps)(LoyaltySchemeMasterMain);
