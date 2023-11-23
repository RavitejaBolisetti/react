/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productDetailsDataActions } from 'store/actions/data/vehicle/productDetails';

import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetails';
import { VehicleDetailFormButton } from '../VehicleDetailFormButton';
import { PARAM_MASTER } from 'constants/paramMaster';
import { otfLoyaltyModelGroupDataActions } from 'store/actions/data/otf/loyaltyModelGroup';
import { otfLoyaltyVarientDetailDataActions } from 'store/actions/data/otf/loyaltyVarient';
import { otfModelFamilyDetailDataActions } from 'store/actions/data/otf/modelFamily';

import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Vehicle: {
                ProductDetails: { isLoaded: isDataLoaded = false, isLoading, data: ProductDetailsData = [] },
            },
            OTF: {
                LoyaltyModelGroup: { isFilteredListLoaded: isModelDataLoaded = false, isLoading: isModelLoading, filteredListData: modelData = [] },
                LoyaltyVarient: { isFilteredListLoaded: isVariantDataLoaded = false, isLoading: isVariantLoading, filteredListData: variantData = [] },
                ModelFamily: { isLoaded: isModelFamilyDataLoaded = false, isLoading: isModelFamilyLoading, data: modelFamilyData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = translateContent('vehicleDetail.productDetails.heading.moduleTitle');
    const ITEM_TYPE = { ITEM: 'item', MAKE: 'make' };

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        ProductDetailsData,
        isLoading,
        moduleTitle,

        isModelDataLoaded,
        isModelLoading,
        modelData,

        isVariantDataLoaded,
        isVariantLoading,
        variantData,

        isModelFamilyDataLoaded,
        isModelFamilyLoading,
        modelFamilyData,
        ITEM_TYPE,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: productDetailsDataActions.fetchList,
            saveData: productDetailsDataActions.saveData,
            listShowLoading: productDetailsDataActions.listShowLoading,
            resetData: productDetailsDataActions.reset,

            fetchModelLovList: otfLoyaltyModelGroupDataActions.fetchFilteredList,
            listModelShowLoading: otfLoyaltyModelGroupDataActions.listShowLoading,
            resetModel: otfLoyaltyModelGroupDataActions.reset,

            fetchVariantLovList: otfLoyaltyVarientDetailDataActions.fetchFilteredList,
            listVariantShowLoading: otfLoyaltyVarientDetailDataActions.listShowLoading,
            resetVariant: otfLoyaltyVarientDetailDataActions.reset,

            fetchModelFamilyLovList: otfModelFamilyDetailDataActions.fetchList,
            listFamilyShowLoading: otfModelFamilyDetailDataActions.listShowLoading,
            resetFamily: otfModelFamilyDetailDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const ProductDetailMasterMain = (props) => {
    const { userId, isDataLoaded, ProductDetailsData, isLoading, handleButtonClick } = props;
    const { fetchList, resetData, saveData, listShowLoading, showGlobalNotification, typeData } = props;
    const { form, selectedRecordId, section, formActionType, handleFormValueChange, NEXT_ACTION } = props;
    const { fetchModelLovList, listModelShowLoading, fetchVariantLovList, listVariantShowLoading } = props;
    const { isModelDataLoaded, isModelLoading, modelData, isVariantDataLoaded, isVariantLoading, variantData, isModelFamilyDataLoaded, isModelFamilyLoading, modelFamilyData, fetchModelFamilyLovList, listFamilyShowLoading, ITEM_TYPE } = props;

    const [formData, setformData] = useState({});
    const [optionalServices, setOptionalServices] = useState([]);
    const [openAccordian, setOpenAccordian] = useState([]);
    const [tooltTipText, settooltTipText] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [itemOptions, setitemOptions] = useState();
    const [makeOptions, setmakeOptions] = useState();
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const MakefieldNames = { label: 'value', value: 'key' };
    const ItemFieldNames = { label: 'value', value: 'key' };
    const collapseProps = { collapsible: 'icon' };
    const disabledProps = { disabled: true };

    const toolTipTextSetter = (data, key) => {
        if ((typeof data === 'object' && data?.hasOwnProperty(key)) || Array?.isArray(data)) {
            const noData = 'NA';
            return (
                <div>
                    <p>
                        Color - <span>{data?.[key]?.color ?? noData}</span>
                    </p>
                    <p>
                        Trim Level - <span>{data?.[key]?.trimLevel ?? noData}</span>
                    </p>
                    <p>
                        Engine Type - <span>{data?.[key]?.engineType ?? noData}</span>
                    </p>
                    <p>
                        Drive Train - <span>{data?.[key]?.driveTrain ?? noData}</span>
                    </p>
                    <p>
                        Transmission - <span>{data?.[key]?.transmission ?? noData}</span>
                    </p>
                    <p>
                        Wheel Size - <span>{data?.[key]?.wheelSize ?? noData}</span>
                    </p>
                    <p>
                        Interior Uphoistery - <span>{data?.[key]?.interiorUpholstery ?? noData}</span>
                    </p>
                </div>
            );
        }

        return false;
    };

    const onSuccessAction = () => {
        return false;
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };
    const makeExtraParams = ({ key, title, value, name }) => {
        const params = [
            {
                key: key,
                title: title,
                value: value,
                name: name,
            },
        ];
        return params;
    };
    const bindCodeValue = (value, item) => {
        switch (item) {
            case ITEM_TYPE?.ITEM: {
                const codeVal = itemOptions?.find((element) => {
                    if (element?.value === value || element?.key === value) {
                        return element;
                    }
                    return false;
                });
                if (codeVal) return codeVal?.value;
                return '-';
            }
            case ITEM_TYPE?.MAKE: {
                const codeVal = makeOptions?.find((element) => {
                    if (element?.value === value || element?.key === value) {
                        return element;
                    }
                    return false;
                });

                if (codeVal) return codeVal?.value;
                return '-';
            }
            default: {
                return '-';
            }
        }
    };
    const bindStatus = (element, key, statusActive) => {
        if (element && key && element[key]) {
            if (element[key]) {
                return statusActive?.active;
            } else {
                return statusActive?.inActive;
            }
        } else {
            return 'NA ';
        }
    };

    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraParams({ key: 'vin', title: 'vin', value: selectedRecordId, name: 'VIN' }), onErrorAction, onSuccessAction });
        }
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (isDataLoaded && ProductDetailsData) {
            setformData(ProductDetailsData);
            console.log('ProductDetailsData', ProductDetailsData);
            fetchModelLovList({ setIsLoading: listModelShowLoading, userId, extraParams: makeExtraParams({ key: 'modelGroupCode', title: 'modelGroupCode', value: ProductDetailsData?.productAttributeDetail?.modelGroup, name: 'modelGroupCode' }) });
            fetchVariantLovList({ setIsLoading: listVariantShowLoading, userId, extraParams: makeExtraParams({ key: 'variantCode', title: 'variantCode', value: ProductDetailsData?.productAttributeDetail?.modelVariant, name: 'variantCode' }) });
            fetchModelFamilyLovList({ setIsLoading: listFamilyShowLoading, userId, extraParams: makeExtraParams({ key: 'familyCode', title: 'familyCode', value: ProductDetailsData?.productAttributeDetail?.modelFamily, name: 'familyCode' }) });

            ProductDetailsData?.aggregates && Array?.isArray(ProductDetailsData?.aggregates) && setOptionalServices(ProductDetailsData?.aggregates?.map((item, index) => ({ ...item, uniqueId: index })));
            settooltTipText(toolTipTextSetter(ProductDetailsData, 'productAttributeDetail'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, ProductDetailsData]);

    useEffect(() => {
        if (typeData) {
            if (typeData[PARAM_MASTER?.VEH_MAKE?.id]) {
                setmakeOptions(typeData[PARAM_MASTER?.VEH_MAKE?.id]);
            }
            if (typeData[PARAM_MASTER?.VEH_ITEM?.id]) setitemOptions(typeData[PARAM_MASTER?.VEH_ITEM?.id]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData]);

    const handleCollapse = (key) => {
        if (key !== 'Aggregates' && isReadOnly) {
            setIsReadOnly(false);
        }
        if (openAccordian?.includes('Aggregates') && isReadOnly) {
            return false;
        }
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = () => {
        const data = { ...formData, vehicleIdentificationNumber: selectedRecordId, aggregates: optionalServices };
        const onSuccess = (res) => {
            setOptionalServices([]);
            setformData();
            setIsReadOnly(false);
            form.resetFields();
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
            setOptionalServices([]);
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };
    const formProps = {
        ...props,
        formData,
        formActionType,
        handleCollapse,
        showGlobalNotification,
        selectedRecordId,
        form,
        openAccordian,
        setOpenAccordian,
        optionalServices,
        setOptionalServices,
        handleFormValueChange,
        tooltTipText,
        isReadOnly,
        setIsReadOnly,
        itemOptions,
        setitemOptions,
        makeOptions,
        setmakeOptions,
        MakefieldNames,
        ItemFieldNames,
        bindCodeValue,
        collapseProps,
        disabledProps,
        bindStatus,
        isVariantLoading,
        isModelFamilyLoading,
        isModelLoading,
        ITEM_TYPE,
        page,
        setPage,
        modelData,
        modelFamilyData,
        variantData,
    };

    const viewProps = {
        openAccordian,
        setOpenAccordian,
        handleCollapse,
        styles,
        formData,
        tooltTipText,
        settooltTipText,
        isLoading,
        optionalServices,
        formActionType,
        typeData,
        bindCodeValue,
        collapseProps,
        disabledProps,
        bindStatus,
        modelData,
        variantData,
        modelFamilyData,
        ITEM_TYPE,
        page,
        setPage,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
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
                    <VehicleDetailFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const ProductDetailMaster = connect(mapStateToProps, mapDispatchToProps)(ProductDetailMasterMain);
