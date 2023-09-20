/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { OTFFormButton } from '../OTFFormButton';

import { OTFStatusBar } from '../utils/OTFStatusBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { otfAddOnDetailsDataActions } from 'store/actions/data/otf/addOnDetails';
import { otfAddOnPartsDataActions } from 'store/actions/data/otf/addonParts';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                AddonDetails: { isLoaded: isDataLoaded = false, isLoading, data: AddonDetailsData = [] },
                AddonParts: { isLoaded: isAddonPartsDataLoaded = false, data: AddonPartsData = [] },
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
        AddonPartsData,
        isAddonPartsDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchSearchPartList: otfAddOnPartsDataActions.fetchList,
            partListLoading: otfAddOnPartsDataActions.listShowLoading,

            fetchList: otfAddOnDetailsDataActions.fetchList,
            saveData: otfAddOnDetailsDataActions.saveData,
            listShowLoading: otfAddOnDetailsDataActions.listShowLoading,
            resetData: otfAddOnDetailsDataActions.reset,
            resetPartData: otfAddOnPartsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const AddOnDetailsMasterMain = (props) => {
    const { fetchList, resetPartData, partListLoading, showGlobalNotification, AddonPartsData, isAddonPartsDataLoaded, fetchSearchPartList, resetData, AddonDetailsData, isDataLoaded, userId, listShowLoading, saveData, onFinishFailed } = props;
    const { form, section, selectedOrder, selectedOrderId, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;

    const [formData, setformData] = useState();
    const [formDataSetter, setformDataSetter] = useState({
        shield: {},
        rsa: {},
        amc: {},
        fms: {},
        partDetailsResponses: [],
    });
    const [searchData, setsearchData] = useState({});
    const [addOnItemInfo, setAddOnItemInfo] = useState([]);
    const [openAccordian, setopenAccordian] = useState();
    const [accessoryForm] = Form.useForm();
    const [partNameSearchVisible, setPartNameSearchVisible] = useState(false);
    const [shieldForm] = Form.useForm();
    const [rsaForm] = Form.useForm();
    const [amcForm] = Form.useForm();
    const [fmsForm] = Form.useForm();

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
        fnSetData(null);
    };

    const onSearchPart = (searchvalue) => {
        const partName = searchvalue?.trim();
        if (!partName) return false;

        const extraParams = [
            {
                key: 'partName',
                title: 'partName',
                value: partName,
                name: 'partName',
            },
            {
                key: 'modelCode',
                title: 'Model Code',
                value: selectedOrder?.modelCode,
                name: 'Model Code',
            },
        ];
        fetchSearchPartList({
            setIsLoading: partListLoading,
            userId,
            extraParams,
            onErrorAction,
            onSuccessAction: (res) => {
                if (res?.data?.length > 1) {
                    setPartNameSearchVisible(true);
                } else {
                    fnSetData(res?.data[0]);
                }
            },
        });
    };

    const handleCollapse = (values) => {
        openAccordian?.includes(values) ? setopenAccordian('') : setopenAccordian([values]);
    };

    const extraParams = [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: selectedOrderId,
            name: 'Booking Number',
        },
    ];

    useEffect(() => {
        if (userId && selectedOrderId) {
            accessoryForm.resetFields();
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        if (isDataLoaded && AddonDetailsData) {
            accessoryForm.resetFields();
            setformData(AddonDetailsData);
            AddonDetailsData?.partDetailsResponses?.length ? setopenAccordian(['ci']) : setopenAccordian([]);
            setformDataSetter(AddonDetailsData);
            setAddOnItemInfo(
                AddonDetailsData['partDetailsResponses']?.map((element, index) => {
                    return { ...element, isDeleting: false };
                })
            );
        } else {
            setopenAccordian([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);
    useEffect(() => {
        return () => {
            setsearchData();
            resetPartData();
            resetData();
            accessoryForm.resetFields();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (isAddonPartsDataLoaded && AddonPartsData) {
            setsearchData(AddonPartsData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddonPartsDataLoaded, AddonPartsData]);

    const fnSetData = (data) => {
        setformData(data);
        accessoryForm.setFieldsValue({
            mrp: data?.mrp,
            partNumber: data?.partNumber,
            partDescription: data?.partDescription,
            quantity: data?.quantity,
            sellingPrice: data?.sellingPrice,
            type: data?.type,
        });
        handleFormValueChange();
    };

    const onFinish = (values) => {
        let detailsRequest = [];
        formDataSetter?.partDetailsResponses?.map((element, index) => {
            const { id, otfNumber, partNumber, requiredQuantity, type, partDescription, sellingPrice, mrp } = element;
            detailsRequest.push({ id, otfNumber, partNumber, requiredQuantity, type, partDescription, sellingPrice, mrp });
            return undefined;
        });

        const data = { id: formData?.id ?? '', otfNumber: selectedOrderId, partDetailsRequests: detailsRequest, shield: formDataSetter?.shield, rsa: formDataSetter?.rsa, amc: formDataSetter?.amc, fms: formDataSetter?.fms };

        const onSuccess = (res) => {
            setformDataSetter({});
            setformData({});
            accessoryForm.resetFields();
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => {
            // showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formData?.id ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const viewProps = {
        formData,
        styles,
        openAccordian,
        setopenAccordian,
        handleCollapse,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
        accessoryForm,
        formActionType,
    };
    const formProps = {
        formData,
        formActionType,
        onSearchPart,
        AddonPartsData,
        setsearchData,
        searchData,
        showGlobalNotification,
        handleFormValueChange,
        formDataSetter,
        setformDataSetter,
        selectedOrderId,
        addOnItemInfo,
        setAddOnItemInfo,
        shieldForm,
        rsaForm,
        amcForm,
        fmsForm,
        accessoryForm,
        openAccordian,
        setopenAccordian,
        partNameSearchVisible,
        setPartNameSearchVisible,
        fnSetData,
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <OTFStatusBar status={selectedOrder?.orderStatus} />
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <OTFFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const AddOnDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(AddOnDetailsMasterMain);
