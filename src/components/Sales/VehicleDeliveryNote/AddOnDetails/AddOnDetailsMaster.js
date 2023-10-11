/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';

import { relationshipManagerDataActions } from 'store/actions/data/vehicleDeliveryNote/relationshipManager';
import { schemeDescriptionAmcDataActions, schemeDescriptionRsaDataActions, schemeDescriptionShieldDataActions } from 'store/actions/data/vehicleDeliveryNote';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                SchemeDescriptionAmc: { isLoaded: isAmcLoaded = false, data: schemeAmcData = [] },
                SchemeDescriptionRsa: { isLoaded: isRsaLoaded = false, data: schemeRsaData = [] },
                SchemeDescriptionShield: { isLoaded: isShieldLoaded = false, data: schemeShieldData = [] },
                RelationshipManager: { isLoaded: isRelationshipManagerLoaded = false, isloading: isRelationshipManagerLoading, data: relationshipManagerData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Add on Details';

    let returnValue = {
        userId,
        moduleTitle,
        typeData,
        isAmcLoaded,
        schemeAmcData,
        isRsaLoaded,
        schemeRsaData,
        isShieldLoaded,
        schemeShieldData,

        isRelationshipManagerLoaded,
        isRelationshipManagerLoading,
        relationshipManagerData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchAmc: schemeDescriptionAmcDataActions.fetchList,
            listAmcLoading: schemeDescriptionAmcDataActions.listShowLoading,
            resetAmc: schemeDescriptionAmcDataActions.reset,

            fetchRsa: schemeDescriptionRsaDataActions.fetchList,
            listRsaLoading: schemeDescriptionRsaDataActions.listShowLoading,
            resetRsa: schemeDescriptionRsaDataActions.reset,

            fetchSheild: schemeDescriptionShieldDataActions.fetchList,
            listSheildLoaing: schemeDescriptionShieldDataActions.listShowLoading,
            resetSheild: schemeDescriptionShieldDataActions.reset,

            fetchRelationshipManger: relationshipManagerDataActions.fetchList,
            listRelationshipMangerShowLoading: relationshipManagerDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const AddOnDetailsMasterMain = (props) => {
    const { typeData, requestPayload, setRequestPayload, showGlobalNotification, AddonPartsData, AddonDetailsData, userId, onFinishFailed } = props;
    const { form, section, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick, setButtonData, buttonData, listRelationshipMangerShowLoading, fetchRelationshipManger, relationshipManagerData, deliveryNoteMasterData } = props;
    const { selectedOrder } = props;

    const { isAmcLoaded, schemeAmcData, isRsaLoaded, schemeRsaData, isShieldLoaded, schemeShieldData } = props;
    const { fetchAmc, listAmcLoading } = props;
    const { fetchRsa, listRsaLoading } = props;
    const { fetchSheild, listSheildLoaing } = props;

    const [formData, setFormData] = useState();
    const [searchData, setsearchData] = useState({});
    const [addOnItemInfo, setAddOnItemInfo] = useState([]);
    const [openAccordian, setOpenAccordian] = useState();
    const [accessoryForm] = Form.useForm();
    const [muiltipleFormData, setMultipleFormData] = useState({ ...AddonDetailsData });
    const [shieldForm] = Form.useForm();
    const [rsaForm] = Form.useForm();
    const [amcForm] = Form.useForm();
    const [schemeDescriptionDatamain, setSchemeDescriptionData] = useState({ Shield: [], RSA: [], AMC: [] });
    const [registerDisabled, setRegisterDisabled] = useState({ Shield: false, RSA: false, AMC: false });

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const handleCollapse = (values) => {
        openAccordian?.includes(values) ? setOpenAccordian('') : setOpenAccordian([values]);
    };

    useEffect(() => {
        if (selectedOrder?.invoicehdrId && userId) {
            const extraParams = [
                {
                    key: 'invoiceNumber',
                    title: 'invoiceNumber',
                    value: selectedOrder?.invoicehdrId,
                    name: 'Invoice Number',
                },
            ];
            fetchAmc({ setIsLoading: listAmcLoading, userId, extraParams, onErrorAction });
            fetchRsa({ setIsLoading: listRsaLoading, userId, extraParams, onErrorAction });
            fetchSheild({ setIsLoading: listSheildLoaing, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder?.invoicehdrId, userId]);
    useEffect(() => {
        if (isAmcLoaded && isRsaLoaded && isShieldLoaded) {
            setSchemeDescriptionData((prev) => ({ ...prev, AMC: schemeAmcData, RSA: schemeRsaData, Shield: schemeShieldData }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAmcLoaded, isRsaLoaded, isShieldLoaded, deliveryNoteMasterData]);

    useEffect(() => {
        if (AddonDetailsData) {
            form.setFieldsValue({ ...AddonDetailsData });
            setFormData({ ...AddonDetailsData });
            if (AddonDetailsData?.sheildRequest) {
                setRegisterDisabled((prev) => ({ ...prev, Shield: true }));
            }
            if (AddonDetailsData?.rsaRequest) {
                setRegisterDisabled((prev) => ({ ...prev, RSA: true }));
            }

            if (AddonDetailsData?.amcRequest) {
                setRegisterDisabled((prev) => ({ ...prev, AMC: true }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AddonDetailsData, section]);

    useEffect(() => {
        setButtonData({ ...buttonData, formBtnActive: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    const handleOnChange = (e) => {
        form.setFieldsValue({
            manager: '',
        });
    };

    const handleEmployeeSearch = () => {
        const onSuccessAction = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        };
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };

        fetchRelationshipManger({ setIsLoading: listRelationshipMangerShowLoading, userId, onSuccessAction, onErrorAction });
    };

    const onSingleFormFinish = (key, formName) => {
        formName.validateFields().then(() => {
            switch (key) {
                case 'sheildRequest':
                    setMultipleFormData({ ...muiltipleFormData, sheildRequest: shieldForm.getFieldsValue() });
                    setRegisterDisabled((prev) => ({ ...prev, Shield: true }));
                    break;
                case 'rsaRequest':
                    setMultipleFormData({ ...muiltipleFormData, rsaRequest: rsaForm.getFieldsValue() });
                    setRegisterDisabled((prev) => ({ ...prev, RSA: true }));
                    break;
                case 'amcRequest':
                    setMultipleFormData({ ...muiltipleFormData, amcRequest: amcForm.getFieldsValue() });
                    setRegisterDisabled((prev) => ({ ...prev, AMC: true }));
                    break;
                default:
                    return;
            }
            const message = !muiltipleFormData?.[key] ? 'registered' : 'saved';
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: `Scheme has been ${message} successfully` });
        });
    };

    const onFinish = () => {
        setRequestPayload({ ...requestPayload, deliveryNoteAddOnDetails: muiltipleFormData });
        handleButtonClick({ buttonAction: NEXT_ACTION });
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const viewProps = {
        formData,
        styles,
        openAccordian,
        setOpenAccordian,
        handleCollapse,
        accessoryForm,
        formActionType,
        typeData,
        relationshipManagerData,
        schemeDescriptionDatamain,
    };
    const formProps = {
        form,
        formData,
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
        handleEmployeeSearch,
        handleOnChange,
        relationshipManagerData,
        schemeDescriptionDatamain,
        setRegisterDisabled,
        registerDisabled,
        muiltipleFormData,
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
