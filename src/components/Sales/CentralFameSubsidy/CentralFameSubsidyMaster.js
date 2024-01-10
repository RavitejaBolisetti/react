/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';

import { CentralFameSubsidyHeader } from './CentralFameSubsidyHeader';
import { CentralFameSubsidySearchDataActions } from 'store/actions/data/CentralFameSubsidy';
import { translateContent } from 'utils/translateContent';
import { AddEditForm } from './AddEditForm';
import { vehicleModelDetailsDataActions } from 'store/actions/data/vehicle/modelDetails';
import { vehicleVariantDetailsDataActions } from 'store/actions/data/vehicle/variantDetails';
import { BASE_URL_OTF_FAME_DETAILS_SAVE, BASE_URL_PRODUCT_MODEL_GROUP, BASE_URL_PRODUCT_VARIENT } from 'constants/routingApi';
import { TAXI_NO_TAXI } from './fameSubsidryConstants';
import { drawerTitle } from 'utils/drawerTitle';

import styles from 'assets/sass/app.module.scss';
import { defaultPageProps } from 'utils/defaultPageProps';

const defaultBtnVisiblity = {
    editBtn: false,
    saveBtn: false,
    saveAndNewBtn: false,
    saveAndNewBtnClicked: false,
    closeBtn: false,
    cancelBtn: false,
    formBtnActive: false,
};

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CentralFameSubsidy: {
                CentralFameSubsidySearch: { data, filter: filterString, isLoading: isSearchLoading },
            },
            Vehicle: {
                ModelVehicleDetails: { isLoading: isModelLoading, data: modelData = [] },
                VariantVehicleDetails: { isLoading: isVariantLoading, data: variantData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('centralFameSubsidy.heading.title');
    const batteryCapcityKey = 'batteryCapacity',
        demanIncentiveKey = 'demandIncentive';

    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData || [],
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        isModelLoading,
        modelData,
        isVariantLoading,
        variantData,
        filterString,
        batteryCapcityKey,
        demanIncentiveKey,
        isSearchLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchModelLovList: vehicleModelDetailsDataActions.fetchList,
            listModelShowLoading: vehicleModelDetailsDataActions.listShowLoading,
            resetModel: vehicleModelDetailsDataActions.reset,

            fetchVariantLovList: vehicleVariantDetailsDataActions.fetchList,
            listVariantShowLoading: vehicleVariantDetailsDataActions.listShowLoading,
            resetVariant: vehicleVariantDetailsDataActions.reset,

            fetchSubsidery: CentralFameSubsidySearchDataActions.fetchList,
            showSubsideryloading: CentralFameSubsidySearchDataActions.listShowLoading,
            resetSubsidery: CentralFameSubsidySearchDataActions.reset,
            setFilterString: CentralFameSubsidySearchDataActions.setFilter,
            saveData: CentralFameSubsidySearchDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});
export const CentralFameSubsidyMain = ({ filterString, isSearchLoading, setFilterString, totalRecords, data, vehicleModelData, userId, modelData, variantData, isModelLoading, isVariantLoading, moduleTitle, showGlobalNotification, ...rest }) => {
    const { fetchModelLovList, listModelShowLoading, saveData, fetchVariantLovList, listVariantShowLoading, fetchSubsidery, showSubsideryloading, resetVariant, batteryCapcityKey, demanIncentiveKey, typeData } = rest;

    const [form] = Form.useForm();
    const [modelVariantForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showdataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [showFields, setShowFields] = useState(true);
    const [formData, setFormData] = useState({});
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const onSuccessAction = () => {
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'modelGroupCode',
                value: filterString?.modelGroupCode,
                canRemove: false,
                filter: false,
            },
            {
                key: 'variantCode',
                value: filterString?.variantCode,
                canRemove: false,
                filter: false,
            },
            ...defaultPageProps(filterString),
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId) {
            fetchModelLovList({ customURL: BASE_URL_PRODUCT_MODEL_GROUP.concat('/lov'), setIsLoading: listModelShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (formActionType?.addMode && isFormVisible) {
            form.setFieldsValue({ ...filterString });
        }
        if (formActionType?.editMode && isFormVisible && userId) {
            fetchVariantLovList({ customURL: BASE_URL_PRODUCT_VARIENT.concat('/lov'), setIsLoading: listVariantShowLoading, userId, extraParams: [{ key: 'modelGroupCode', value: formData?.modelGroupCode }] });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, isFormVisible, userId]);

    useEffect(() => {
        if (extraParams && userId) {
            setShowDataLoading(true);
            fetchSubsidery({ setIsLoading: showSubsideryloading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extraParams, userId]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        setFormActionType({ addMode: buttonAction === ADD_ACTION, viewMode: buttonAction === VIEW_ACTION, editMode: buttonAction === EDIT_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        resetVariant();
        if (record) {
            if (buttonAction === VIEW_ACTION) {
                setFormData({ ...record });
            } else {
                setFormData({ ...record, taxiIndicator: record?.taxiIndicator === TAXI_NO_TAXI?.TAXI?.key ? true : false });
                form.setFieldsValue({ ...record, taxiIndicator: record?.taxiIndicator === TAXI_NO_TAXI?.TAXI?.key ? true : false });
            }
            if (Number(record?.subsidyAmount) > 0) {
                setShowFields(false);
            } else {
                setShowFields(true);
            }
        }
        setIsFormVisible(true);
    };

    const onCloseAction = () => {
        setIsFormVisible(false);
        form.resetFields();
        setShowFields(true);
        resetVariant();
        userId && modelVariantForm.getFieldValue('modelGroupCode') && fetchVariantLovList({ customURL: BASE_URL_PRODUCT_VARIENT.concat('/lov'), setIsLoading: listVariantShowLoading, userId, extraParams: [{ key: 'modelGroupCode', value: modelVariantForm.getFieldValue('modelGroupCode') }] });
    };

    const tableProps = {
        dynamicPagination: true,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumn({ handleButtonClick, typeData }),
        tableData: data,
        handleButtonClick,
        isLoading: showdataLoading,
        showAddButton: false,
        filterString,
    };

    const handleFormValueChange = (values) => {
        const isBatteryOrIncentivePresent = Object?.keys(values)?.find((item) => item === batteryCapcityKey || item === demanIncentiveKey);
        isBatteryOrIncentivePresent && form.setFieldValue('totalAmount', (form.getFieldValue(batteryCapcityKey) || 0) * (form.getFieldValue(demanIncentiveKey) || 0));
        setButtonData((prev) => ({ ...prev, formBtnActive: true }));
    };

    const onFinish = (values) => {
        const finalPayload = { ...values, id: formData?.id || '', taxiIndicator: values?.taxiIndicator ? TAXI_NO_TAXI?.TAXI?.key : TAXI_NO_TAXI?.NON_TAXI?.key };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const onSuccess = (res) => {
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            }
            setShowFields(true);
            setFilterString({ pageSize: 10, current: 1 });
            form.resetFields();
            modelVariantForm.resetFields();
            resetVariant();
        };

        const requestData = {
            data: finalPayload,
            method: formData?.id ? 'put' : 'post',
            setIsLoading: showSubsideryloading,
            userId,
            onError,
            onSuccess,
            customURL: BASE_URL_OTF_FAME_DETAILS_SAVE,
        };
        saveData(requestData);
    };

    const CentralFameSubsidyHeaderProps = {
        filterString,
        setFilterString,
        onFinish,
        advanceFilterForm,
        data,
        modelData,
        variantData,
        handleButtonClick,
        isVariantLoading,
        modelVariantForm,
        isModelLoading,
        BASE_URL_PRODUCT_VARIENT,

        fetchVariantLovList,
        resetVariant,
        listVariantShowLoading,
        userId,
        formName: modelVariantForm,
    };
    const formProps = {
        form,
        isVisible: isFormVisible,
        showGlobalNotification,
        onFinish,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        formData,
        setIsFormVisible,
        formActionType,
        setFormData,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        handleButtonClick,
        setButtonData,
        defaultBtnVisiblity,

        handleFormValueChange,
        modelData,
        variantData,
        isVariantLoading,
        isModelLoading,
        showFields,
        setShowFields,
        styles,

        formName: form,
        fetchVariantLovList,
        setFilterString,
        filterString,
        BASE_URL_PRODUCT_VARIENT,
        resetVariant,
        modelVariantForm,
        listVariantShowLoading,
        userId,
        setFilter: false,
        isSearchLoading,
    };
    return (
        <>
            <CentralFameSubsidyHeader {...CentralFameSubsidyHeaderProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const CentralFameSubsidyMaster = connect(mapStateToProps, mapDispatchToProps)(CentralFameSubsidyMain);
