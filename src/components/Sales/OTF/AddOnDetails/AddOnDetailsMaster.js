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

import styles from 'components/common/Common.module.css';
const mapStateToProps = (state) => {
    console.log(state);
    const {
        auth: { userId },
        data: {
            OTF: {
                AddonDetails: { isLoaded: isDataLoaded = false, isLoading, data: AddonDetailsData = [] },
                AddonParts: { isLoaded: isAddonPartsDataLoaded = false, isAddonPartsLoading, data: AddonPartsData = [] },
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
            showGlobalNotification,
        },
        dispatch
    ),
});

export const AddOnDetailsMasterMain = (props) => {
    const { fetchList, partListLoading, showGlobalNotification, AddonPartsData, isAddonPartsDataLoaded, fetchSearchPartList, resetData, AddonDetailsData, isDataLoaded, userId, listShowLoading, saveData, onFinishFailed } = props;
    const { form, section, selectedOrderId, formActionType, handleFormValueChange, NEXT_ACTION, handleButtonClick } = props;

    const [formData, setformData] = useState();
    const [formDataSetter, setformDataSetter] = useState({
        shield: {},
        rsa: {},
        amc: {},
        fms: {},
        partDetailsResponses: [],
    });
    const [searchData, setsearchData] = useState();
    const [addOnItemInfo, setAddOnItemInfo] = useState([]);
    const [openAccordian, setopenAccordian] = useState(['ci']);
    const [accessoryForm] = Form.useForm();
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
    };
    const onFinish = (values) => {
        let detailsRequest = [];
        formDataSetter?.partDetailsResponses?.map((element, index) => {
            const { id, otfNumber, partNumber, requiredQuantity } = element;
            detailsRequest.push({ id, otfNumber, partNumber, requiredQuantity });
        });
        const data = { id: formData?.id ?? '', otfNumber: selectedOrderId, partDetailsRequests: detailsRequest, shield: formDataSetter?.shield, rsa: formDataSetter?.rsa, amc: formDataSetter?.amc, fms: formDataSetter?.fms };

        const onSuccess = (res) => {
            setformDataSetter({});
            setformData({});
            form.resetFields();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onErrorAction, onSuccessAction });
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
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
    };
    const onSearchPart = (searchvalue) => {
        const extraParams = [
            {
                key: 'partNumber',
                title: 'partNumber',
                value: searchvalue,
                name: 'partNumber',
            },
        ];
        fetchSearchPartList({ setIsLoading: partListLoading, userId, extraParams, onSuccessAction, onErrorAction });
    };
    const handleCollapse = (values) => {
        console.log('values', values);
        openAccordian?.includes(values) ? setopenAccordian('') : setopenAccordian([values]);
    };
    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOrderId,
                    name: 'OTF Number',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);
    useEffect(() => {
        if (isDataLoaded && AddonDetailsData) {
            setformData(AddonDetailsData);
            setformDataSetter(AddonDetailsData);
            setAddOnItemInfo(
                AddonDetailsData['partDetailsResponses']?.map((element, index) => {
                    return { ...element, isDeleting: false };
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, AddonDetailsData]);
    useEffect(() => {
        if (isAddonPartsDataLoaded && AddonPartsData) {
            setsearchData(AddonPartsData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddonPartsDataLoaded, AddonPartsData]);

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
                            <OTFStatusBar status={props?.selectedOrder?.orderStatus} />
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
