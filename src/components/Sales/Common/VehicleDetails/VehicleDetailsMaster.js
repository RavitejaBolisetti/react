/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/VehicleDetails';
import { DisableParent } from 'components/common/ProductHierarchy/ProductHierarchyUtils';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { otfvehicleDetailsLovDataActions } from 'store/actions/data/otf/vehicleDetailsLov';
import { otfvehicleDetailsServiceLovDataActions } from 'store/actions/data/otf/serviceLov';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { showGlobalNotification } from 'store/actions/notification';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetailData = [] },
                VehicleDetailsServiceLov: { isFilteredListLoaded: isVehicleServiceLoaded = false, isLoading: isVehicleServiceLoading, filteredListData: vehicleServiceData },
            },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, productCode = undefined, isLoading: isProductHierarchyLoading, filteredListData: productAttributeData = [], isLoaded: isProductDataLoaded = false, data: productHierarchyData = [] },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
        isDataLoaded,
        vehicleDetailDataReceived: vehicleDetailData,
        isLoading,
        moduleTitle,
        productAttributeData,
        isProductHierarchyDataLoaded,
        isProductHierarchyLoading,

        isVehicleServiceLoaded,
        isVehicleServiceLoading,
        vehicleServiceData,

        isProductDataLoaded,
        isProductDataLoading: !isProductDataLoaded,
        productHierarchyDataList: productHierarchyData,
        productCode,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfvehicleDetailsDataActions.fetchList,
            saveData: otfvehicleDetailsDataActions.saveData,

            fetchProductList: productHierarchyDataActions.fetchList,
            fetchProductDetail: productHierarchyDataActions.fetchDetail,
            fetchProductLovCode: productHierarchyDataActions.fetchFilteredList,
            fetchProductLov: otfvehicleDetailsLovDataActions.fetchFilteredList,

            fetchServiceLov: otfvehicleDetailsServiceLovDataActions.fetchFilteredList,
            serviceLoading: otfvehicleDetailsServiceLovDataActions.listShowLoading,

            ProductLovCodeLoading: productHierarchyDataActions.listShowLoading,
            ProductLovLoading: otfvehicleDetailsLovDataActions.listShowLoading,
            listShowLoading: otfvehicleDetailsDataActions.listShowLoading,

            resetData: otfvehicleDetailsDataActions.reset,
            resetProductLov: otfvehicleDetailsLovDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterMain = (props) => {
    const { isProductDataLoading, vehicleDetailDataReceived, vehicleDetailDataPass, isVehicleLovDataLoading, resetProductLov, productAttributeData, fetchProductLovCode, isLoading, saveData, ProductLovLoading } = props;
    const { form, selectedOrderId, section, buttonData, setButtonData, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const { refreshData, setRefreshData, isVehicleServiceLoaded, vehicleServiceData, fetchServiceLov, serviceLoading, selectedOrder, setSelectedOrder } = props;
    const { isProductHierarchyDataLoaded, typeData, fetchList, resetData, userId, listShowLoading, showGlobalNotification } = props;
    const { formKey, onFinishCustom = undefined, FormActionButton, StatusBar, salesModuleType } = props;
    const { isProductDataLoaded, fetchProductList, productHierarchyDataList } = props;

    const [activeKey, setactiveKey] = useState([1]);
    const [formData, setFormData] = useState({});
    const [optionalServices, setOptionalServices] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');

    const [toolTipContent, setToolTipContent] = useState();
    const [isReadOnly, setIsReadOnly] = useState();
    const [productHierarchyData, setProductHierarchyData] = useState([]);
    const [filterVehicleData, setFilterVehicleData] = useState([]);

    const vehicleDetailData = vehicleDetailDataPass || vehicleDetailDataReceived;

    const onSuccessAction = (res) => {
        //showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    useEffect(() => {
        if (userId && selectedOrderId) {
            if (SALES_MODULE_TYPE.OTF.KEY === salesModuleType) {
                const extraParams = [
                    {
                        key: 'otfNumber',
                        title: 'otfNumber',
                        value: selectedOrderId,
                        name: 'Booking Number',
                    },
                ];
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            }

            if (!isVehicleServiceLoaded) {
                fetchServiceLov({ setIsLoading: serviceLoading, userId, onErrorAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId, isVehicleServiceLoaded]);

    useEffect(() => {
        setProductHierarchyData(productHierarchyDataList?.map((i) => DisableParent(i, 'subProdct')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyDataList]);

    useEffect(() => {
        if (SALES_MODULE_TYPE.OTF.KEY === salesModuleType && userId && !isProductDataLoaded && selectedOrder?.modelCode) {
            const extraParams = [
                {
                    key: 'unit',
                    value: 'Sales',
                },
                {
                    key: 'prodctCode',
                    value: selectedOrder?.modelCode,
                },
                {
                    key: 'hierarchyNode',
                    value: 'MV',
                },
            ];
            fetchProductList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        } else {
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isProductDataLoaded, selectedOrder]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);
        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    useEffect(() => {
        return () => {
            resetData();
            resetProductLov();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetData, resetProductLov]);

    useEffect(() => {
        if (userId && isProductHierarchyDataLoaded && productAttributeData?.length > 0) {
            setToolTipContent(
                <div>
                    <p>
                        Color - <span>{productAttributeData['0']['color'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Seating - <span>{productAttributeData['0']['seatingCapacity'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Fuel - <span>{productAttributeData['0']['fuel'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Variant - <span>{productAttributeData['0']['variant'] ?? 'Na'}</span>
                    </p>
                    <p>
                        Name - <span>{productAttributeData['0']['name'] ?? 'Na'}</span>
                    </p>
                </div>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productAttributeData, isProductHierarchyDataLoaded, userId]);

    useEffect(() => {
        if (vehicleDetailData) {
            setFormData(vehicleDetailData);
            setFilterVehicleData({
                selectedOrderId: selectedOrderId,
                modelCode: vehicleDetailData?.modelCode,
                discountAmount: vehicleDetailData?.discountAmount,
                saleType: vehicleDetailData?.saleType,
                priceType: vehicleDetailData?.priceType,
            });
            vehicleDetailData?.optionalServices && setOptionalServices(vehicleDetailData?.optionalServices);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData]);

    useEffect(() => {
        if (selectedOrderId && formData?.modelCode) {
            const lovExtraParams = [
                {
                    key: 'prodctCode',
                    value: vehicleDetailData?.modelCode,
                },
            ];

            const onErrorActionProduct = () => {
                resetProductLov();
            };

            fetchProductLovCode({ setIsLoading: ProductLovLoading, userId, onErrorAction: onErrorActionProduct, extraParams: lovExtraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrderId, formData]);

    const handleVehicleDetailChange = ({ selectedOrderId, modelCode, discountAmount, saleType, priceType }) => {
        const extraParams = [
            {
                key: 'otfNumber',
                value: selectedOrderId,
            },
            {
                key: 'discountAmount',
                value: discountAmount,
            },

            {
                key: 'modelCode',
                value: modelCode,
            },

            {
                key: 'saleType',
                value: saleType,
            },

            {
                key: 'priceType',
                value: priceType,
            },
        ];

        fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onErrorAction, resetOnError: false });
    };

    const onFinish = (values) => {
        const data = {
            ...values,
            id: formData?.id || '',
            otfId: formData?.otfId || '',
            printDiscount: values?.printDiscount ? 'Y' : 'N',
            otfNumber: selectedOrderId,
            taxDetails: formData?.taxDetails,
            optionalServices: optionalServices,
        };

        switch (salesModuleType) {
            case SALES_MODULE_TYPE.OTF.KEY:
                if (productAttributeData?.length === 0) {
                    showGlobalNotification({ message: 'Model selected is not valid' });
                    return;
                }

                const onSuccess = (res) => {
                    setOptionalServices([]);
                    setFormData({});
                    setOpenAccordian('1');
                    setIsReadOnly(false);
                    form.resetFields();
                    resetData();
                    setRefreshData(!refreshData);
                    handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                    setSelectedOrder({ ...selectedOrder, model: res?.data?.model });
                };

                const onError = (message) => {
                    showGlobalNotification({ message });
                };

                const requestData = {
                    data: data,
                    method: 'put',
                    setIsLoading: listShowLoading,
                    userId,
                    onError,
                    onSuccess,
                };
                saveData(requestData);
                break;
            case SALES_MODULE_TYPE.INVOICE.KEY:
            case SALES_MODULE_TYPE.DELIVERY_NOTE.KEY:
                onFinishCustom({ key: formKey, values: data });
                handleButtonClick({ buttonAction: NEXT_ACTION });
                setButtonData({ ...buttonData, formBtnActive: false });
                break;
            default:
                break;
        }
    };

    const onFinishFailed = () => {
        form.validateFields().then(() => {});
    };

    // const handlePriceTypeChange = (value, option) => {
    //     setPriceType(value);
    //     if (option?.type === 'D') {
    //         showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'This value has been deprecated. Please select another value' });
    //     }
    // };

    const formProps = {
        ...props,
        formData,
        formActionType,
        activeKey,
        setactiveKey,
        onChange,
        typeData,
        productAttributeData,
        showGlobalNotification,
        fetchList,
        userId,
        listShowLoading,
        saveData,
        onSuccessAction,
        selectedOrderId,
        onErrorAction,
        form,
        onFinish,
        onFinishFailed,
        openAccordian,
        setOpenAccordian,
        isReadOnly,
        setIsReadOnly,
        optionalServices,
        setOptionalServices,
        handleFormValueChange,
        toolTipContent,
        isVehicleLovDataLoading,
        vehicleServiceData,

        productHierarchyData,
        resetProductLov,
        isProductDataLoading,
        filterVehicleData,
        handleVehicleDetailChange,
        viewOnly: SALES_MODULE_TYPE.OTF.KEY !== salesModuleType,
    };

    const viewProps = {
        ...props,
        formActionType,
        activeKey,
        setactiveKey,
        onChange,
        styles,
        formData,
        toolTipContent,
        setToolTipContent,
        typeData,
        isLoading,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed} data-testid="logRole">
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
        </Form>
    );
};
export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterMain);
