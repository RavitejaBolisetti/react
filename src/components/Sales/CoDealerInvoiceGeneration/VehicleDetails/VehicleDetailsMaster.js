/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useDeferredValue, useMemo } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';

import { CoDealerFormButton } from '../CoDealerFormButton';
import { BASE_URL_TAX_CALCULATION } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { translateContent } from 'utils/translateContent';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: productAttributeData = [] },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                VehicleDetails: { isLoading: VehicleDetailsTaxLoading = false },
            },
        },
    } = state;
    const NO_DATA = '-';
    let returnValue = {
        userId,
        typeData,

        isProductHierarchyDataLoaded,
        isProductHierarchyLoading,
        productAttributeData,
        NO_DATA,
        VehicleDetailsTaxLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchData: otfvehicleDetailsDataActions.fetchData,
            listShowLoading: otfvehicleDetailsDataActions.listShowLoading,
            resetData: otfvehicleDetailsDataActions.reset,

            fetchProductLovCode: productHierarchyDataActions.fetchFilteredList,
            listProductShowLoading: productHierarchyDataActions.listShowLoading,
            resetProductData: productHierarchyDataActions.resetData,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMain = (props) => {
    const { CoDealerInvoiceStateMaster, form, NO_DATA, section, formActionType, resetProductData } = props;
    const { fetchData, listShowLoading, userId, coDealerOnFinish, listProductShowLoading, fetchProductLovCode, isProductHierarchyDataLoaded, productAttributeData, showGlobalNotification, VehicleDetailsTaxLoading } = props;
    const [formData, setFormData] = useState();
    const [collapseActiveKey, setcollapseActiveKey] = useState([1]);
    const [dealerDiscount, setDealerDicountValue] = useState();
    const [changeStatus, setchangeStatus] = useState();
    const trueDealerDiscount = useDeferredValue(dealerDiscount);
    const [toolTipContent, setToolTipContent] = useState();
    const [previousFormFields, setpreviousFormFields] = useState({});

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const modelCodeParams = useMemo(() => {
        return [
            {
                key: 'prodctCode',
                value: CoDealerInvoiceStateMaster?.vehicleDetailRequest?.modelCode,
            },
        ];
    }, [CoDealerInvoiceStateMaster?.vehicleDetailRequest?.modelCode]);

    const handleVehicleDetailChange = ({ modelCode, discountAmount, saleType, priceType }) => {
        if (modelCode && saleType && priceType) {
            const extraParams = [
                {
                    key: 'modelCode',
                    value: modelCode,
                },
                {
                    key: 'discountAmount',
                    value: discountAmount ?? '0',
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

            const onSuccessAction = (res) => {
                setFormData({ ...res?.data });
                setpreviousFormFields({ ...res?.data });
                form.setFieldsValue({ ...res?.data });
            };

            const onErrorAction = (message) => {
                if (previousFormFields instanceof Object && Object?.keys(previousFormFields)?.length > 0) {
                    form.setFieldsValue(previousFormFields);
                } else {
                    form.resetFields();
                }
                showGlobalNotification({ message });
            };

            fetchData({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction, customURL: BASE_URL_TAX_CALCULATION });
        }
    };

    useEffect(() => {
        if (CoDealerInvoiceStateMaster?.vehicleDetailRequest) {
            setFormData({ ...CoDealerInvoiceStateMaster?.vehicleDetailRequest });
            fetchProductLovCode({ setIsLoading: listProductShowLoading, userId, extraParams: modelCodeParams, onErrorAction });
        }
        return () => {
            setFormData();
            resetProductData();
            setpreviousFormFields();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CoDealerInvoiceStateMaster?.vehicleDetailRequest, section?.id]);

    useEffect(() => {
        if (trueDealerDiscount || changeStatus) {
            handleVehicleDetailChange({ modelCode: form.getFieldValue('modelCode'), discountAmount: form.getFieldValue('discountAmount'), saleType: form.getFieldValue('saleType'), priceType: form.getFieldValue('priceType') });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trueDealerDiscount, form, changeStatus]);
    useEffect(() => {
        if (userId && isProductHierarchyDataLoaded && productAttributeData?.length > 0) {
            setToolTipContent(
                <div>
                    <p>
                        {translateContent('commonModules.toolTip.color')} - <span>{productAttributeData['0']?.['color'] ?? NO_DATA}</span>
                    </p>
                    <p>
                        {translateContent('commonModules.toolTip.seating')} - <span>{productAttributeData['0']?.['seatingCapacity'] ?? NO_DATA}</span>
                    </p>
                    <p>
                        {translateContent('commonModules.toolTip.fuel')} - <span>{productAttributeData['0']?.['fuel'] ?? NO_DATA}</span>
                    </p>
                    <p>
                        {translateContent('commonModules.toolTip.variant')} - <span>{productAttributeData['0']?.['variant'] ?? NO_DATA}</span>
                    </p>
                    <p>
                        {translateContent('commonModules.toolTip.name')} - <span>{productAttributeData['0']?.['name'] ?? NO_DATA}</span>
                    </p>
                </div>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productAttributeData, isProductHierarchyDataLoaded, userId]);

    const onFinish = (values) => {
        if (values) {
            coDealerOnFinish({ ...CoDealerInvoiceStateMaster, vehicleDetailRequest: { ...values, discountAmount: values?.discountAmount || 0, taxDetails: formData?.taxDetails } });
        }
    };

    const formProps = {
        ...props,
        formData,
        collapseActiveKey,
        setcollapseActiveKey,
        setDealerDicountValue,
        changeStatus,
        setchangeStatus,
        toolTipContent,
        setToolTipContent,
        isLoading: VehicleDetailsTaxLoading,
        previousFormFields,
        setpreviousFormFields,
    };
    const viewProps = {
        ...formProps,
        formData,
        isLoading: !formData,
        styles,
        toolTipContent,
        setToolTipContent,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <CoDealerFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMain);
