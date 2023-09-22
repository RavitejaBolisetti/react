/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/ExchangeVehicles';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetail';
import { schemeDataActions } from 'store/actions/data/otf/exchangeVehicle';
import { vehicleMakeDetailsDataActions } from 'store/actions/data/vehicle/makeDetails';
import { vehicleModelDetailsDataActions } from 'store/actions/data/vehicle/modelDetails';
import { vehicleVariantDetailsDataActions } from 'store/actions/data/vehicle/variantDetails';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_CUSTOMER_MASTER_VEHICLE_LIST as customURL } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                FinanceLov: { isLoaded: isFinanceLovDataLoaded = false, isLoading: isFinanceLovLoading, data: financeLovData = [] },
                SchemeDetail: { isLoaded: isSchemeLovDataLoaded = false, isLoading: isSchemeLovLoading, data: schemeLovData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                MakeVehicleDetails: { isLoaded: isMakeDataLoaded = false, isLoading: isMakeLoading, data: makeData = [] },
                ModelVehicleDetails: { isLoaded: isModelDataLoaded = false, isLoading: isModelLoading, data: modelData = [] },
                VariantVehicleDetails: { isLoaded: isVariantDataLoaded = false, isLoading: isVariantLoading, data: variantData = [] },
            },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: VehicleLovCodeData = [] },
        },
        customer: {
            customerDetail: { isLoaded: isDataCustomerLoaded = false, isLoading: isCustomerLoading = false, data: customerDetail = [] },
        },
    } = state;

    const moduleTitle = 'Exchange Vehichle';

    let returnValue = {
        userId,
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

        isProductHierarchyDataLoaded,
        isProductHierarchyLoading,
        VehicleLovCodeData,
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

            fetchSchemeLovList: otfSchemeDetailDataActions.fetchList,
            listSchemeLovShowLoading: otfSchemeDetailDataActions.listShowLoading,

            fetchMakeLovList: vehicleMakeDetailsDataActions.fetchList,
            listMakeShowLoading: vehicleMakeDetailsDataActions.listShowLoading,

            fetchModelLovList: vehicleModelDetailsDataActions.fetchList,
            listModelShowLoading: vehicleModelDetailsDataActions.listShowLoading,
            resetModel: vehicleModelDetailsDataActions.reset,

            fetchVariantLovList: vehicleVariantDetailsDataActions.fetchList,
            listVariantShowLoading: vehicleVariantDetailsDataActions.listShowLoading,
            resetVariant: vehicleModelDetailsDataActions.reset,

            fetchList: schemeDataActions.fetchList,
            listShowLoading: schemeDataActions.listShowLoading,
            saveData: schemeDataActions.saveData,

            fetchProductLovCode: productHierarchyDataActions.fetchFilteredList,
            ProductLovCodeLoading: productHierarchyDataActions.listShowLoading,

            resetData: schemeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ExchangeVehiclesBase = (props) => {
    const { formData: exchangeData, isLoading, userId, showGlobalNotification, section, fetchProductLovCode, ProductLovCodeLoading, VehicleLovCodeData } = props;
    const { typeData, selectedOrder, fetchListVehicleExchangeAlert, listShowLoadingVehicleExchangeAlert } = props;
    const { fetchMakeLovList, listMakeShowLoading, fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading } = props;
    const { isMakeLoading, makeData, isModelDataLoaded, isModelLoading, modelData, isVariantDataLoaded, isVariantLoading, variantData } = props;
    const { financeLovData, isFinanceLovLoading, fetchFinanceLovList, listFinanceLovShowLoading } = props;
    const { schemeLovData, isSchemeLovLoading, fetchSchemeLovList, listSchemeLovShowLoading } = props;
    const { form, selectedOrderId, formActionType, handleFormValueChange } = props;
    const { fetchCustomerList, listCustomerShowLoading, handleButtonClick, NEXT_ACTION } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, isProductHierarchyDataLoaded } = props;

    const [formData, setFormData] = useState();
    const [filteredModelData, setfilteredModelData] = useState([]);
    const [filteredVariantData, setfilteredVariantData] = useState([]);
    const [editableOnSearch, setEditableOnSearch] = useState(false);
    const [customerList, setCustomerList] = useState();
    const [modelGroup, setModelGroup] = useState(null);

    const fnSetData = (data) => {
        if (data?.make) {
            setFormData({ ...data, oldRegistrationNumber: data?.registrationNumber, oldChessisNumber: data?.chassisNumber });
            handleFormValueChange();
            setEditableOnSearch(true);
        } else if (data && !data?.make) {
            setFormData({ ...data, modelGroup: null, variant: null, oldRegistrationNumber: data?.registrationNumber, oldChessisNumber: data?.chassisNumber });
            handleFormValueChange();
            setEditableOnSearch(true);
        } else if (!data) {
            setEditableOnSearch(false);
            form.resetFields(['customerId', 'customerName', 'make', 'modelGroup', 'variant', 'oldRegistrationNumber', 'oldChessisNumber']);
        }
    };

    useEffect(() => {
        if (exchangeData) {
            setFormData(exchangeData);
            formData?.make && handleFilterChange('make', exchangeData?.make ?? '');
            formData?.modelGroup && handleFilterChange('modelGroup', exchangeData?.modelGroup ?? '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exchangeData]);

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

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setEditableOnSearch(false);
    };
    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

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

    useEffect(() => {
        if (userId && selectedOrderId) {
            const schemeExtraParams = [
                {
                    key: 'modelCode',
                    title: 'modelCode',
                    value: selectedOrder?.modelCode,
                    name: 'Booking Number',
                },
            ];
            fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId });
            fetchSchemeLovList({ setIsLoading: listSchemeLovShowLoading, extraParams: schemeExtraParams, userId });
            fetchMakeLovList({ setIsLoading: listMakeShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

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
                case 'modelGroup': {
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
        } else if (name === 'modelGroup') {
            form.setFieldsValue({
                variant: undefined,
            });
            setfilteredVariantData();
            fetchVariantLovList({ setIsLoading: listVariantShowLoading, userId, extraParams: makeExtraParams('model', 'model', value, 'model') });
        }
    };

    const showAlert = (val) => {
        setModelGroup((prev) => ({ ...prev, oldModelGroup: val }));
    };

    useEffect(() => {
        const LovParams = [
            {
                key: 'prodctCode',
                value: selectedOrder?.modelCode,
            },
        ];
        fetchProductLovCode({ setIsLoading: ProductLovCodeLoading, userId, onErrorAction, extraparams: LovParams });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder?.modelCode]);

    useEffect(() => {
        if (VehicleLovCodeData && isProductHierarchyDataLoaded) {
            setModelGroup((prev) => ({ ...prev, newModelGroup: VehicleLovCodeData?.[0]?.modelGroupCode }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VehicleLovCodeData]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'oldModelGroup',
                value: modelGroup?.oldModelGroup,
            },
            {
                key: 'newModelGroup',
                value: modelGroup?.newModelGroup,
            },
        ];

        if (modelGroup?.oldModelGroup) {
            fetchListVehicleExchangeAlert({ setIsLoading: listShowLoadingVehicleExchangeAlert, extraParams, onSuccessAction, onErrorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelGroup?.oldModelGroup]);

    const handleSchemeChange = (__, value) => {
        form.setFieldsValue({
            schemeAmount: value?.amount,
        });
    };

    const onFinish = (values) => {
        // const { customerName } = values;
        // if (values?.exchange && !customerName) {
        //     showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Customer id to continue' });
        //     return;
        // }
        // const data = { ...values, exchange: values?.exchange ? 1 : 0, id: formData?.id || '', otfNumber: selectedOrderId };
        // onFinishCustom({ key: formKey, values: data });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
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
                value: 'registrationNumber',
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
            customURL,
            onSuccessAction: (res) => {
                if (res?.data?.customerMasterDetails?.length > 0) {
                    setCustomerList(res?.data?.customerMasterDetails);
                } else {
                    res?.data?.customerMasterDetails && setFormData(res?.data?.customerMasterDetails?.[0]);
                    handleFormValueChange();
                }
            },
            onErrorAction,
        });
    };

    const formProps = {
        ...props,
        form,
        formData: formData,
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
        handleFilterChange,
        filteredModelData,
        filteredVariantData,
        editableOnSearch,
        setEditableOnSearch,
        fnSetData,
        customerList,
        showAlert,
        handleSchemeChange,
        viewOnly: true,
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

    const buttonProps = {
        ...props,
        buttonData: { ...buttonData, formBtnActive: true },
    };
    return (
        <Form data-testid="exchangeVID" layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...buttonProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const ExchangeVehiclesMaster = connect(mapStateToProps, mapDispatchToProps)(ExchangeVehiclesBase);
