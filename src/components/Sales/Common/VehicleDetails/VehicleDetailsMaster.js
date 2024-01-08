/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useMemo, useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AddEditForm, ViewDetail } from 'components/Sales/Common/VehicleDetails';
import { DisableParent } from 'components/common/ProductHierarchy/ProductHierarchyUtils';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { otfvehicleDetailsServiceLovDataActions } from 'store/actions/data/otf/serviceLov';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { showGlobalNotification } from 'store/actions/notification';
import { SALES_MODULE_TYPE } from 'constants/salesModuleType';

import styles from 'assets/sass/app.module.scss';
import { withSpinner } from 'components/withSpinner';
import { translateContent } from 'utils/translateContent';
import { OTF_STATUS } from 'constants/OTFStatus';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetailData = [] },
                VehicleDetailsServiceLov: { isFilteredListLoaded: isVehicleServiceLoaded = false, isLoading: isVehicleServiceLoading, filteredListData: vehicleServiceData },
            },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, productCode = undefined, isLoading: isProductHierarchyLoading, isLoaded: isProductDataLoaded = false, data: productHierarchyData = [] },
        },
        common: {
            Header: { dealerLocationId },
        },
    } = state;

    const moduleTitle = translateContent('commonModules.label.vehicleDetails.vehicleDetails');

    let returnValue = {
        userId,
        isDataLoaded,
        otfVehicleDetailData: vehicleDetailData,
        isLoading,
        moduleTitle,
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
            listShowLoading: otfvehicleDetailsDataActions.listShowLoading,
            fetchData: otfvehicleDetailsDataActions.fetchData,
            saveData: otfvehicleDetailsDataActions.saveData,
            resetData: otfvehicleDetailsDataActions.reset,

            fetchProductList: productHierarchyDataActions.fetchList,
            ProductLovCodeLoading: productHierarchyDataActions.listShowLoading,
            fetchProductDetail: productHierarchyDataActions.fetchDetail,
            fetchProductAttribiteDetail: productHierarchyDataActions.fetchProductAttribiteDetail,

            fetchServiceLov: otfvehicleDetailsServiceLovDataActions.fetchFilteredList,
            serviceLoading: otfvehicleDetailsServiceLovDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterMain = (props) => {
    const { isProductDataLoading, otfVehicleDetailData, vehicleDetailDataPass, isVehicleLovDataLoading, fetchProductAttribiteDetail, isLoading, saveData } = props;
    const { form, selectedOrderId, selectedRecordId, section, buttonData, setButtonData, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;
    const { refreshData, setRefreshData, isVehicleServiceLoaded, vehicleServiceData, fetchServiceLov, serviceLoading, selectedOrder, setSelectedOrder } = props;
    const { isProductHierarchyDataLoaded, typeData, fetchList, fetchData, resetData, userId, listShowLoading, showGlobalNotification } = props;
    const { formKey, onFinishCustom = undefined, FormActionButton, StatusBar, salesModuleType } = props;
    const { dealerLocationId, fetchProductList, productHierarchyDataList, showOptionalService = true, requestPayload } = props;

    const [activeKey, setactiveKey] = useState([1]);
    const [formData, setFormData] = useState({});
    const [optionalServices, setOptionalServices] = useState([]);
    const [openAccordian, setOpenAccordian] = useState('1');

    const [toolTipContent, setToolTipContent] = useState();
    const [revisedModelInformation, setRevisedModelInformation] = useState();
    const [isReadOnly, setIsReadOnly] = useState();
    const [productHierarchyData, setProductHierarchyData] = useState([]);
    const [vehicleDetailData, setVehicleDetailData] = useState();
    const [filterVehicleData, setFilterVehicleData] = useState([]);
    const [customerNameList, setCustomerNameList] = useState({});
    const [nameChangeRequested, setNameChangeRequested] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState();
    const [showChangeModel, setShowChangeModel] = useState(false);
    const [onModelSubmit, setOnModelSubmit] = useState(false);
    const [productAttributeData, setProductAttributeData] = useState(false);
    const [revisedProductAttributeData, setRevisedProductAttributeData] = useState(false);
    const [productDetailRefresh, setProductDetailRefresh] = useState(false);

    const onSuccessAction = () => {
        return false;
        //showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const isOTFModule = salesModuleType === SALES_MODULE_TYPE.OTF.KEY;

    const vehicleDetailFinalData = useMemo(() => {
        if (isOTFModule && otfVehicleDetailData) {
            return otfVehicleDetailData;
        } else if (vehicleDetailDataPass) {
            return vehicleDetailDataPass;
        }
    }, [isOTFModule, otfVehicleDetailData, vehicleDetailDataPass]);

    useEffect(() => {
        if (vehicleDetailFinalData) {
            setVehicleDetailData(vehicleDetailFinalData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailFinalData]);

    useEffect(() => {
        if (vehicleDetailData) {
            setFormData(vehicleDetailData);
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'PD', revisedModel: 'X700MM89615721911' });
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'CR', revisedModel: 'X700MM89615721911' });
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'RJ', revisedModel: 'X700MM89615721911' });
            vehicleDetailData?.optionalServices && setOptionalServices(vehicleDetailData?.optionalServices?.map((el) => ({ ...el, status: true })) || []);
            vehicleDetailData?.revisedModel && setShowChangeModel(vehicleDetailData?.otfStatus === OTF_STATUS?.BOOKED.key);
            // vehicleDetailData?.sapStatusResponseCode && setSapStatusResponseCode(vehicleDetailData?.sapStatusResponseCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData]);

    useEffect(() => {
        if (userId && selectedRecordId) {
            if (isOTFModule && !isLoading) {
                const extraParams = [
                    {
                        key: 'otfId',
                        value: selectedRecordId,
                    },
                ];
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            }

            if (!isVehicleServiceLoaded) {
                fetchServiceLov({ setIsLoading: serviceLoading, userId, onErrorAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId, isVehicleServiceLoaded, productDetailRefresh]);

    useEffect(() => {
        setProductHierarchyData(productHierarchyDataList?.map((i) => DisableParent(i, 'subProdct')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyDataList]);

    useEffect(() => {
        if (isOTFModule && userId && selectedOrder?.modelCode && dealerLocationId) {
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
            setButtonData({ ...buttonData, formBtnActive: !formActionType.viewMode });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrder, dealerLocationId]);

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
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetData]);

    const getProductAttributeDetail = (value, fnSetData) => {
        const extraParams = [
            {
                key: 'prodctCode',
                value,
            },
        ];

        const onSuccessAction = (res) => {
            fnSetData(res?.[0]);
        };

        fetchProductAttribiteDetail({ setIsLoading: () => {}, userId, onErrorAction, onSuccessAction, extraParams });
    };

    const refactorProductAttributeData = (productData) => {
        return (
            <div>
                <p>
                    {translateContent('commonModules.toolTip.color')} - <span>{productData['color'] ?? 'NA'}</span>
                </p>
                <p>
                    {translateContent('commonModules.toolTip.seating')} - <span>{productData['seatingCapacity'] ?? 'NA'}</span>
                </p>
                <p>
                    {translateContent('commonModules.toolTip.fuel')} - <span>{productData['fuel'] ?? 'NA'}</span>
                </p>
                <p>
                    {translateContent('commonModules.toolTip.variant')} - <span>{productData['variant'] ?? 'NA'}</span>
                </p>
                <p>
                    {translateContent('commonModules.toolTip.name')} - <span>{productData['name'] ?? 'NA'}</span>
                </p>
            </div>
        );
    };

    useEffect(() => {
        if (productAttributeData) {
            setToolTipContent(refactorProductAttributeData(productAttributeData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productAttributeData]);

    useEffect(() => {
        if (revisedProductAttributeData) {
            setRevisedModelInformation(refactorProductAttributeData(revisedProductAttributeData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revisedProductAttributeData]);

    useEffect(() => {
        if (vehicleDetailData?.modelCode && !isProductHierarchyDataLoaded) {
            getProductAttributeDetail(vehicleDetailData?.modelCode, setProductAttributeData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData]);

    const handleVehicleDetailChange = (vehicleData) => {
        setFilterVehicleData({ ...vehicleData });
        const { productModelCode, discountAmount, saleType, priceType, vehicleUsageType } = vehicleData;
        const extraParams = [
            {
                key: 'otfId',
                value: selectedRecordId,
            },
            {
                key: 'modelCode',
                value: productModelCode,
            },
            {
                key: 'discountAmount',
                value: discountAmount,
            },

            {
                key: 'saleType',
                value: saleType,
            },

            {
                key: 'priceType',
                value: priceType,
            },

            {
                key: 'vehicleUsageType',
                value: vehicleUsageType,
            },
        ];

        const onSuccessAction = (res) => {
            setVehicleDetailData(res?.data);
            productModelCode && form.setFieldValue('modalCode', productModelCode);
        };

        const onErrorAction = (message) => {
            showGlobalNotification({ message });

            const { productModelCode, discountAmount, saleType, priceType, vehicleUsageType } = vehicleDetailData;
            setFilterVehicleData({ ...vehicleData, productModelCode, discountAmount, saleType, priceType, vehicleUsageType });

            setVehicleDetailData(otfVehicleDetailData);
            setFormData({ ...vehicleDetailData });
        };

        fetchData({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onSuccessAction, onErrorAction, resetOnError: false });
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
                    showGlobalNotification({ message: translateContent('commonModules.validation.modelValidation') });
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
                    handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION, onSave: true });
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
        handleFormValueChange,
        toolTipContent,
        isVehicleLovDataLoading,
        vehicleServiceData,

        productHierarchyData,
        // resetProductLov,
        isProductDataLoading,
        filterVehicleData,
        setFilterVehicleData,
        handleVehicleDetailChange,
        viewOnly: !isOTFModule,
        isOTFModule,
        orderStatus: selectedOrder?.orderStatus,
        showOptionalService,
        customerNameList,
        setCustomerNameList,
        nameChangeRequested,
        setNameChangeRequested,
        confirmRequest,
        setConfirmRequest,
        showChangeModel,
        setShowChangeModel,
        isVehicleServiceLoaded,
        fetchServiceLov,
        serviceLoading,
        onModelSubmit,
        setOnModelSubmit,
        setRefreshData,
        refreshData,
        setFormData,
        revisedModelInformation,
        setRevisedModelInformation,
        getProductAttributeDetail,
        setRevisedProductAttributeData,
        productDetailRefresh,
        setProductDetailRefresh,
    };

    const viewProps = {
        ...props,
        formActionType,
        activeKey,
        setactiveKey,
        onChange,
        styles,
        formData,
        typeData,
        isLoading,
        isOTFModule,
        showOptionalService,
        toolTipContent,
        setToolTipContent,
        revisedModelInformation,
        getProductAttributeDetail,
        revisedProductAttributeData,
        setRevisedProductAttributeData,
        showChangeModel,
        productDetailRefresh,
        setProductDetailRefresh,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} data-testid="logRole">
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {StatusBar && <StatusBar status={selectedOrder?.orderStatus} />}
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
export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(withSpinner(VehicleDetailsMasterMain));
