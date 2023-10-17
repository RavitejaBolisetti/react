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
import VehiclePriorityAllotmentAlert from './VehiclePriorityAllotmentAlert';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { financeLovDataActions } from 'store/actions/data/otf/financeLov';
import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetail';
import { schemeDataActions } from 'store/actions/data/otf/exchangeVehicle';
import { vehicleModelDetailsDataActions } from 'store/actions/data/vehicle/modelDetails';
import { vehicleVariantDetailsDataActions } from 'store/actions/data/vehicle/variantDetails';
import { exchangeVehicleAlertDataAction } from 'store/actions/data/otf/exchangeVehicleAlert';
import { showGlobalNotification } from 'store/actions/notification';

import { BASE_URL_PRODUCT_MODEL_GROUP, BASE_URL_PRODUCT_VARIENT } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                ExchangeVehicle: { isLoaded: isDataLoaded = false, isLoading, data: exchangeData = [] },
                FinanceLov: { isLoaded: isFinanceLovDataLoaded = false, isLoading: isFinanceLovLoading, data: financeLovData = [] },
                SchemeDetail: { isFilteredListLoaded: isSchemeLovDataLoaded = false, isLoading: isSchemeLovLoading, filteredListData: schemeLovData = [] },
                ExchangeVehicleAlert: { isLoaded: isExchangeVehicleAlertLoaded = false, isLoading: isExchangeVehicleAlertLoading = false, data: exchangeVehicleAlertData = false },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
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

        isModelDataLoaded,
        isModelLoading,
        modelData,

        isVariantDataLoaded,
        isVariantLoading,
        variantData,

        isDataCustomerLoaded,
        isCustomerLoading,
        customerDetail,

        isExchangeVehicleAlertLoaded,
        isExchangeVehicleAlertLoading,
        exchangeVehicleAlertData,

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

            fetchSchemeLovList: otfSchemeDetailDataActions.fetchFilteredList,
            listSchemeLovShowLoading: otfSchemeDetailDataActions.listShowLoading,

            fetchModelLovList: vehicleModelDetailsDataActions.fetchList,
            listModelShowLoading: vehicleModelDetailsDataActions.listShowLoading,
            resetModel: vehicleModelDetailsDataActions.reset,

            fetchVariantLovList: vehicleVariantDetailsDataActions.fetchList,
            listVariantShowLoading: vehicleVariantDetailsDataActions.listShowLoading,
            resetVariant: vehicleModelDetailsDataActions.reset,

            fetchList: schemeDataActions.fetchList,
            listShowLoading: schemeDataActions.listShowLoading,
            saveData: schemeDataActions.saveData,

            fetchListVehicleExchangeAlert: exchangeVehicleAlertDataAction.fetchList,
            listShowLoadingVehicleExchangeAlert: exchangeVehicleAlertDataAction.listShowLoading,
            resetVehicleExchangeAlert: exchangeVehicleAlertDataAction.reset,

            resetData: schemeDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ExchangeVehiclesBase = (props) => {
    const { exchangeData, exchangeDataPass, isLoading, fetchList, userId, listShowLoading, showGlobalNotification, section, VehicleLovCodeData } = props;
    const { typeData, selectedOrder, fetchListVehicleExchangeAlert, listShowLoadingVehicleExchangeAlert, exchangeVehicleAlertData } = props;
    const { fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading } = props;
    const { isMakeLoading, makeData, isModelDataLoaded, isModelLoading, modelData, isVariantDataLoaded, isVariantLoading, variantData, saveData } = props;
    const { financeLovData, isFinanceLovLoading, fetchFinanceLovList, listFinanceLovShowLoading } = props;
    const { schemeLovData, isSchemeLovLoading, fetchSchemeLovList, listSchemeLovShowLoading } = props;
    const { form, selectedRecordId, selectedOrderId, formActionType, handleFormValueChange, resetData } = props;
    const { handleButtonClick, NEXT_ACTION } = props;
    const { buttonData, setButtonData, formKey, onFinishCustom = undefined, FormActionButton, StatusBar, isProductHierarchyDataLoaded, salesModuleType } = props;

    const [formData, setFormData] = useState('');
    const [filteredModelData, setfilteredModelData] = useState([]);
    const [filteredVariantData, setfilteredVariantData] = useState([]);
    const [editableOnSearch, setEditableOnSearch] = useState(false);
    const [customerList, setCustomerList] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [modelGroup, setModelGroup] = useState(null);

    const isOTFModule = salesModuleType === SALES_MODULE_TYPE.OTF.KEY;

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
        if (isOTFModule && exchangeData) {
            setFormData(exchangeData);
            exchangeData?.make && handleFilterChange('make', exchangeData?.make ?? '');
            exchangeData?.modelGroup && handleFilterChange('modelGroup', exchangeData?.modelGroup ?? '');
            setButtonData({ ...buttonData, formBtnActive: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOTFModule, exchangeData]);

    useEffect(() => {
        if (exchangeDataPass?.exchange && Object?.keys(exchangeDataPass)?.length && !isModelLoading && !isVariantLoading) {
            setFormData(exchangeDataPass);
            exchangeDataPass?.make && handleFilterChange('make', exchangeDataPass?.make ?? '');
            exchangeDataPass?.modelGroup && handleFilterChange('modelGroup', exchangeDataPass?.modelGroup ?? '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exchangeDataPass?.exchange]);

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

    const extraParams = [
        {
            key: 'otfId',
            value: selectedRecordId,
        },
    ];

    const onErrorAction = (message) => {
        // showGlobalNotification({ message });
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
        if (userId && selectedRecordId) {
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
                    value: 'EX',
                    name: 'Module',
                },
            ];
            isOTFModule && fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, userId });
            fetchFinanceLovList({ setIsLoading: listFinanceLovShowLoading, userId, onErrorAction });
            fetchSchemeLovList({ setIsLoading: listSchemeLovShowLoading, extraParams: schemeExtraParams, onErrorAction, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const MAHINDRA_MAKE = 'Mahindra';
    const isMahindraMake = form.getFieldValue('make') === MAHINDRA_MAKE;
    const handleFilterChange = (name, value1, selectobj) => {
        const value = selectobj?.key || value1;
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

            if (form?.getFieldValue('make') === MAHINDRA_MAKE) {
                fetchModelLovList({ customURL: BASE_URL_PRODUCT_MODEL_GROUP.concat('/lov'), setIsLoading: listModelShowLoading, userId, extraParams: makeExtraParams('modelGroupCode', 'modelGroupCode', 'ECOM', 'modelGroupCode') });
            } else {
                fetchModelLovList({ setIsLoading: listModelShowLoading, userId, extraParams: makeExtraParams('make', 'make', value, 'make') });
            }
        } else if (name === 'modelGroup') {
            form.setFieldsValue({
                variant: undefined,
            });

            setfilteredVariantData();
            if (form.getFieldValue('make') === MAHINDRA_MAKE) {
                fetchVariantLovList({ customURL: BASE_URL_PRODUCT_VARIENT.concat('/lov'), setIsLoading: listVariantShowLoading, userId, extraParams: makeExtraParams('modelGroupCode', 'modelGroupCode', 'ECOM', 'modelGroupCode') });
            } else {
                fetchVariantLovList({ setIsLoading: listVariantShowLoading, userId, extraParams: makeExtraParams('model', 'model', value, 'model') });
            }
        }
    };

    const showAlert = (val) => {
        setModelGroup((prev) => ({ ...prev, oldModelGroup: val }));
    };

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

    useEffect(() => {
        if (exchangeVehicleAlertData === true && modelGroup?.oldModelGroup && modelGroup?.newModelGroup) {
            setModalOpen(true);
        } else {
            setModalOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exchangeVehicleAlertData]);

    const handleSchemeChange = (__, value) => {
        form.setFieldsValue({
            schemeAmount: value?.amount,
        });
    };

    const onFinish = (values) => {
        const { customerName } = values;
        if (values?.exchange && !customerName) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Verify Customer id to continue' });
            return;
        }
        const data = { ...values, exchange: values?.exchange ? 1 : 0, id: exchangeData?.id || '', otfId: selectedRecordId, otfNumber: selectedOrderId };

        if (onFinishCustom) {
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
        } else {
            const onSuccess = (res) => {
                form.resetFields();
                fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, onErrorAction, userId });
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
            };

            const requestData = {
                data: data,
                method: exchangeData?.id ? 'put' : 'post',
                setIsLoading: listShowLoading,
                userId,
                onError: onErrorAction,
                onSuccess,
            };

            saveData(requestData);
        }
    };

    const onFinishFailed = (values1) => {
        form.validateFields()
            .then(() => {})
            .catch((err) => {});
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
        handleFilterChange,
        filteredModelData,
        filteredVariantData,
        editableOnSearch,
        setEditableOnSearch,
        fnSetData,
        customerList,
        showAlert,
        handleSchemeChange,
        isMahindraMake,
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

    const VehiclePriorityAlertProp = {
        modalOpen,
        setModalOpen,
    };

    return (
        <Form data-testid="exchangeVID" layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    <FormActionButton {...props} />
                </Col>
            </Row>
            <VehiclePriorityAllotmentAlert {...VehiclePriorityAlertProp} />
        </Form>
    );
};

export const ExchangeVehiclesMaster = connect(mapStateToProps, mapDispatchToProps)(ExchangeVehiclesBase);
