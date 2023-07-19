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

import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetails';
import { VehicleDetailFormButton } from '../VehicleDetailFormButton';
import { PARAM_MASTER } from 'constants/paramMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Vehicle: {
                ProductDetails: { isLoaded: isDataLoaded = false, isLoading, data: ProductDetailsData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Product Details';

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        ProductDetailsData,
        isLoading,
        moduleTitle,
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
            showGlobalNotification,
        },
        dispatch
    ),
});

const ProductDetailMasterMain = (props) => {
    const { userId, isDataLoaded, ProductDetailsData, isLoading, moduleTitle, handleButtonClick } = props;
    const { fetchList, saveData, listShowLoading, showGlobalNotification, typeData } = props;
    const { form, selectedRecordId, section, formActionType, handleFormValueChange, NEXT_ACTION } = props;

    const [formData, setformData] = useState({});
    const [optionsServiceModified, setoptionsServiceModified] = useState([]);
    const [optionsServicesMapping, setoptionsServicesMapping] = useState([]);
    const [openAccordian, setOpenAccordian] = useState([]);

    const [tooltTipText, settooltTipText] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [itemOptions, setitemOptions] = useState();
    const [makeOptions, setmakeOptions] = useState();
    const MakefieldNames = { label: 'value', value: 'key' };
    const ItemFieldNames = { label: 'value', value: 'key' };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
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

    useEffect(() => {
        if (userId && selectedRecordId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraParams({ key: 'vin', title: 'vin', value: selectedRecordId, name: 'vin Number' }), onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (isDataLoaded && ProductDetailsData) {
            setformData(ProductDetailsData);
            setoptionsServiceModified(ProductDetailsData?.aggregates);
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
            return;
        }
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const onFinish = (values) => {
        const data = { ...formData, vehicleIdentificationNumber: selectedRecordId, aggregates: optionsServiceModified };
        console.log('data', data);
        const onSuccess = (res) => {
            setoptionsServiceModified([]);
            setformData();
            setIsReadOnly(false);
            form.resetFields();
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => {
            // showGlobalNotification({ message });
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
    };
    const onFinishFailed = () => {
        form.validateFields()
            .then(() => {})
            .catch(() => {});
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
        optionsServiceModified,
        setoptionsServiceModified,
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
        openAccordian,
        setOpenAccordian,
        optionsServiceModified,
        formActionType,
        typeData,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
