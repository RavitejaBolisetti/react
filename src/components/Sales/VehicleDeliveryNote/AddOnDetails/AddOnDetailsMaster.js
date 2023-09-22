/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { vehicleAddOnDetailDataActions } from 'store/actions/data/vehicleDeliveryNote/addOnDetails';
import { schemeDescriptionDataActions } from 'store/actions/data/vehicleDeliveryNote/schemeDescription';
import { showGlobalNotification } from 'store/actions/notification';
import { BASE_URL_VEHICLE_ADD_ON_SCHEME_RSA_DESCRIPTION as customRsaURL, BASE_URL_VEHICLE_ADD_ON_SCHEME_AMC_DESCRIPTION as customAmcURL } from 'constants/routingApi';

import styles from 'assets/sass/app.module.scss';
import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                AddOnDetails: { isLoaded: isDataLoaded = false, isLoading, data: AddonDetailsData = [] },
                SchemeDescription: { isLoaded: isSchemeDataLoaded = false, isSchemeLoading, data: schemeDescriptionData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Add on Details';

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        moduleTitle,
        AddonDetailsData,
        typeData,
        isSchemeDataLoaded,
        isSchemeLoading,
        schemeDescriptionData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchScheme: schemeDescriptionDataActions.fetchList,
            listSchemeShowLoading: schemeDescriptionDataActions.listShowLoading,

            fetchList: vehicleAddOnDetailDataActions.fetchList,
            saveData: vehicleAddOnDetailDataActions.saveData,
            listShowLoading: vehicleAddOnDetailDataActions.listShowLoading,
            resetData: vehicleAddOnDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const AddOnDetailsMasterMain = (props) => {
    const { fetchList, fetchScheme, schemeDescriptionData, listSchemeShowLoading, selectedInvoiceId, typeData, requestPayload, setRequestPayload, showGlobalNotification, AddonPartsData, isAddonPartsDataLoaded, fetchSearchPartList, resetData, AddonDetailsData, isDataLoaded, userId, listShowLoading, saveData, onFinishFailed } = props;
    const { form, section, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick, setButtonData, buttonData } = props;

    const [formData, setFormData] = useState();
    const [searchData, setsearchData] = useState({});
    const [addOnItemInfo, setAddOnItemInfo] = useState([]);
    const [openAccordian, setOpenAccordian] = useState();
    const [accessoryForm] = Form.useForm();
    const [muiltipleFormData, setMultipleFormData] = useState({});
    const [shieldForm] = Form.useForm();
    const [rsaForm] = Form.useForm();
    const [amcForm] = Form.useForm();

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };

    const handleCollapse = (values) => {
        openAccordian?.includes(values) ? setOpenAccordian('') : setOpenAccordian([values]);
    };

    const extraParams = [
        {
            key: 'invoiceNumber',
            title: 'invoiceNumber',
            value: selectedInvoiceId,
            name: 'Invoice Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedInvoiceId && formActionType?.viewMode) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedInvoiceId, formActionType?.viewMode]);

    useEffect(() => {
        if (userId && openAccordian) {
            const extraParams = [
                {
                    key: 'invoiceNumber',
                    title: 'invoiceNumber',
                    value: selectedInvoiceId,
                    name: 'Invoice Number',
                },
            ];
            if (openAccordian === 'Shield') {
                fetchScheme({ setIsLoading: listSchemeShowLoading, userId, extraParams });
            } else if (openAccordian === 'RSA') {
                fetchScheme({ setIsLoading: listSchemeShowLoading, userId, extraParams, customURL: customRsaURL });
            } else if (openAccordian === 'AMC') {
                fetchScheme({ setIsLoading: listSchemeShowLoading, userId, extraParams, customURL: customAmcURL });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, openAccordian]);

    useEffect(() => {
        if (AddonDetailsData) {
            form.setFieldsValue({ ...AddonDetailsData });
            setFormData({ ...AddonDetailsData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AddonDetailsData]);

    const onSingleFormFinish = (key, formName) => {
        switch (key) {
            case 'sheildRequest':
                setMultipleFormData({ ...muiltipleFormData, sheildRequest: shieldForm.getFieldsValue() });
                break;
            case 'rsaRequest':
                setMultipleFormData({ ...muiltipleFormData, rsaRequest: rsaForm.getFieldsValue() });
                break;
            case 'amcRequest':
                setMultipleFormData({ ...muiltipleFormData, amcRequest: amcForm.getFieldsValue() });
                break;

            default:
                return;
                break;
        }
        formName.resetFields();
    };

    const onFinish = () => {
        setRequestPayload({ ...requestPayload, deliveryNoteAddOnDetails: muiltipleFormData });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const viewProps = {
        formData: AddonDetailsData,
        styles,
        openAccordian,
        setOpenAccordian,
        handleCollapse,
        accessoryForm,
        formActionType,
        typeData,
        schemeDescriptionData,
    };
    const formProps = {
        form,
        formData: AddonDetailsData,
        formActionType,
        AddonPartsData,
        setsearchData,
        searchData,
        showGlobalNotification,
        handleFormValueChange,
        addOnItemInfo,
        setAddOnItemInfo,
        accessoryForm,
        setOpenAccordian,
        typeData,
        onSingleFormFinish,
        openAccordian,
        shieldForm,
        rsaForm,
        amcForm,
        schemeDescriptionData,
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
                    <VehicleDeliveryNoteFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const AddOnDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(AddOnDetailsMasterMain);
