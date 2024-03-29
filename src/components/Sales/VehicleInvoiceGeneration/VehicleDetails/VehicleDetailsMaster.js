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
import dayjs from 'dayjs';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const NOT_AVAILABLE = 'NA';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                VehicleDetailsServiceLov: { isFilteredListLoaded: isVehicleServiceLoaded = false, isLoading: isVehicleServiceLoading, filteredListData: vehicleServiceData },
            },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, productCode = undefined, isLoading: isProductHierarchyLoading, filteredListData: productAttributeData = [], isLoaded: isProductDataLoaded = false, data: productHierarchyData = [] },
        },
        common: {
            Header: { dealerLocationId },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';

    let returnValue = {
        userId,
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
        dealerLocationId,
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
    const { formData: vehicleDetailData, isVehicleLovDataLoading, resetProductLov, productAttributeData, fetchProductLovCode, isLoading, saveData, ProductLovLoading } = props;
    const { isProductHierarchyDataLoaded, typeData, fetchList, resetData, userId, listShowLoading, showGlobalNotification } = props;
    const { form, selectedOrderId, section, buttonData, setButtonData, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const { refreshData, setRefreshData, vehicleServiceData, fetchServiceLov, serviceLoading, selectedOrder, setSelectedOrder } = props;
    const { formKey, onFinishCustom = undefined, FormActionButton } = props;
    const { dealerLocationId, isProductDataLoaded, fetchProductList, productCode, productHierarchyDataList } = props;
    const [productModelCode, setProductModelCode] = useState();

    const [activeKey, setactiveKey] = useState([1]);
    const [formData, setFormData] = useState({});
    const [optionalServices, setOptionalServices] = useState([]);
    const [optionsServicesMapping, setoptionsServicesMapping] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');

    const [toolTipContent, setToolTipContent] = useState();
    const [isReadOnly, setIsReadOnly] = useState();
    const [productHierarchyData, setProductHierarchyData] = useState([]);

    const onSuccessAction = () => {
        return;
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message: message });
    };

    const loadDependependentData = () => {
        fetchServiceLov({ setIsLoading: serviceLoading, userId, onErrorAction });
    };

    useEffect(() => {
        setProductHierarchyData(productHierarchyDataList?.map((i) => DisableParent(i, 'subProdct')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyDataList]);

    useEffect(() => {
        if (userId && (!isProductDataLoaded || productCode !== selectedOrder?.modelCode) && selectedOrder?.modelCode) {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isProductDataLoaded, selectedOrder, dealerLocationId]);

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
        if (userId && selectedOrderId) {
            loadDependependentData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

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
                        {translateContent('global.toolTip.color')} <span>{productAttributeData?.['0']?.['color'] ?? NOT_AVAILABLE}</span>
                    </p>
                    <p>
                        {translateContent('global.toolTip.seating')}
                        <span>{productAttributeData?.['0']?.['seatingCapacity'] ?? NOT_AVAILABLE}</span>
                    </p>
                    <p>
                        {translateContent('global.toolTip.fuel')}
                        <span>{productAttributeData?.['0']?.['fuel'] ?? NOT_AVAILABLE}</span>
                    </p>
                    <p>
                        {translateContent('global.toolTip.variant')}
                        <span>{productAttributeData?.['0']?.['variant'] ?? NOT_AVAILABLE}</span>
                    </p>
                    <p>
                        {translateContent('global.toolTip.modelName')}
                        <span>{productAttributeData?.['0']?.['name'] ?? NOT_AVAILABLE}</span>
                    </p>
                </div>
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productAttributeData, isProductHierarchyDataLoaded, userId]);

    useEffect(() => {
        if (vehicleDetailData) {
            vehicleDetailData?.optionalServices && setOptionalServices(vehicleDetailData?.optionalServices);
            setFormData(vehicleDetailData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData]);

    useEffect(() => {
        if (vehicleDetailData?.modelCode) {
            const extraParams = [
                {
                    key: 'prodctCode',
                    title: 'prodctCode',
                    value: vehicleDetailData?.modelCode,
                    name: 'Product Code',
                },
            ];

            setProductModelCode(vehicleDetailData?.model);
            fetchProductLovCode({ setIsLoading: ProductLovLoading, userId, onErrorAction, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData?.modelCode]);

    const onFinish = (values) => {
        let data;
        if (onFinishCustom) {
            data = { ...values, taxDetails: formData?.taxDetails, otfNumber: selectedOrderId, otfId: formData?.otfId || '', id: formData?.id || '', optionalServices: optionsServicesMapping, model: productAttributeData['0']['prodctShrtName'] };
            onFinishCustom({ key: formKey, values: data });
            handleButtonClick({ buttonAction: NEXT_ACTION });
            setButtonData({ ...buttonData, formBtnActive: false });
        } else {
            if (!values.hasOwnProperty('vehicleUsageType')) {
                data = {
                    ...values,
                    otfNumber: selectedOrderId || '',
                    OtfId: formData?.id || '',
                    id: formData?.id || '',
                    poDate: dayjs(formData?.poDate?.substr(0, 10)).format('DD/MM/YYYY'),
                    vehicleUsageType: vehicleDetailData?.vehicleUsageType,
                    model: vehicleDetailData?.model,
                    modelCode: vehicleDetailData?.modelCode,
                    discountAmount: vehicleDetailData?.discountAmount,
                    optionalServices: optionalServices,
                };
            } else {
                data = { ...values, otfNumber: selectedOrderId, OtfId: formData?.id || '', id: formData?.id || '', optionalServices: optionsServicesMapping, model: productAttributeData['0']['prodctShrtName'] };
            }

            const onSuccess = (res) => {
                setoptionsServicesMapping([]);
                setOptionalServices([]);
                setFormData({});
                setOpenAccordian('1');
                setIsReadOnly(false);
                form.resetFields();
                resetData();
                handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
                setRefreshData(!refreshData);
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
        }
    };
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
        openAccordian,
        setOpenAccordian,
        isReadOnly,
        setIsReadOnly,
        optionalServices,
        setOptionalServices,
        optionsServicesMapping,
        setoptionsServicesMapping,
        handleFormValueChange,
        toolTipContent,
        isVehicleLovDataLoading,
        vehicleServiceData,
        productModelCode,
        setProductModelCode,
        productHierarchyData,
        showPrintDiscount: true,
        ShowPOandSOdetails: false,
        showAvailaibleStock: false,
    };

    const viewProps = {
        activeKey,
        setactiveKey,
        onChange,
        styles,
        formData,
        modelData: productModelCode,
        toolTipContent,
        setToolTipContent,
        typeData,
        isLoading,
        showPrintDiscount: true,
        ShowPOandSOdetails: false,
        showAvailaibleStock: false,
    };
    const buttonProps = {
        ...props,
        buttonData: { ...buttonData, formBtnActive: true },
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} data-testid="logRole">
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{translateContent(`vehicleInvoiceGeneration.heading.section.` + section?.id)}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} formData={{ ...formData, printDiscount: formData?.printDiscount ? true : false }} viewOnly={true} />}
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
export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterMain);
