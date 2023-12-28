/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { ViewDetail } from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { VehicleReceiptFormButton } from '../VehicleReceiptFormButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translateContent } from 'utils/translateContent';
import { vehicleDetailDataActions } from 'store/actions/data/vehicleReceipt/vehicleDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { BASE_URL_INVOICE_DEFECT_LOCATION as customURL, BASE_URL_INVOICE_DEFECT_SHORTAGE as shortageCustomURL } from 'constants/routingApi';
import { invoiceDetailsDataAction } from 'store/actions/data/financialAccounting/invoiceDetails';

import styles from 'assets/sass/app.module.scss';
import { PHYSICAL_STATUS } from 'constants/PhysicalStatus';
import { YES_NO_FLAG } from 'constants/yesNoFlag';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleReceipt: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('vehicleReceipt.heading.mainTitle');

    let returnValue = {
        userId,
        isDataLoaded,
        vehicleStatusType: typeData[PARAM_MASTER?.VEHCL_STATS?.id],
        physicalStatusType: typeData[PARAM_MASTER?.PHYSICAL_STATUS?.id],
        defectStatusType: typeData[PARAM_MASTER?.DEFCT_CD?.id],
        shortageType: typeData[PARAM_MASTER?.YES_NO_FLG?.id],

        vehicleDetailData: vehicleDetailData?.vehicleDetails,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDetailDataActions.fetchList,
            saveData: vehicleDetailDataActions.saveData,
            resetData: vehicleDetailDataActions.reset,
            listShowLoading: vehicleDetailDataActions.listShowLoading,

            fetchDefectLocationList: invoiceDetailsDataAction.fetchList,
            resetDefectLocationList: invoiceDetailsDataAction.reset,
            listDefectLocationList: invoiceDetailsDataAction.listShowLoading,
            resetList: invoiceDetailsDataAction.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { typeData, selectedRecord, buttonData, setButtonData, vehicleStatusType, physicalStatusType, shortageType, vehicleDetailData } = props;
    const { userId, showGlobalNotification, section, fetchList, listShowLoading, isDataLoaded, isLoading, fetchDefectLocationList, listDefectLocationList } = props;
    const { form, selectedId, finalData, setFinalData, formActionType, onFinish, onFinishFailed, receiptType, defectStatusType, resetList } = props;

    const [vehicleDetailForm] = Form.useForm();
    const [selectedPhysicalStatusType, setSelectedPhysicalStatusType] = useState(PHYSICAL_STATUS?.NO_DAMAGE?.key);
    const [defactTypeData, setDefectTypeData] = useState([]);
    const [selectedDefactTypeData, setSelectedDefactTypeData] = useState(null);
    const [defectDesc, setDefectDesc] = useState([]);
    const [shortageSelect, setShortageSelect] = useState();
    const [shortTypeData, setShortTypeData] = useState([]);
    const [shortageSelectedData, setShortageSelectedData] = useState([]);
    const [shortageData, setShortageData] = useState(null);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId && selectedId?.id) {
            setButtonData({ ...buttonData, formBtnActive: false });
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: selectedId?.id,
                    name: 'id',
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedId?.id]);

    useEffect(() => {
        if (selectedPhysicalStatusType !== PHYSICAL_STATUS?.NO_DAMAGE?.key) {
            const onSuccessAction = (res) => {
                setDefectTypeData([...res?.data]);
            };
            fetchDefectLocationList({ setIsLoading: listDefectLocationList, onSuccessAction, userId, customURL });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPhysicalStatusType]);

    useEffect(() => {
        resetList();
        if (selectedDefactTypeData) {
            const onSuccessAction = (res) => {
                setDefectDesc([...res?.data]);
            };
            fetchDefectLocationList({
                setIsLoading: listDefectLocationList,
                onSuccessAction,
                userId,
                extraParams: [
                    {
                        key: 'defectLocationCode',
                        value: selectedDefactTypeData,
                    },
                ],
                customURL,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDefactTypeData]);

    useEffect(() => {
        if (shortageSelect === YES_NO_FLAG?.YES?.key) {
            const onSuccessAction = (res) => {
                setShortTypeData([...res?.data]);
            };

            fetchDefectLocationList({
                setIsLoading: listDefectLocationList,
                onSuccessAction,
                userId,
                customURL: shortageCustomURL,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shortageSelect]);

    useEffect(() => {
        resetList();
        if (shortageSelectedData) {
            const onSuccessAction = (res) => {
                setShortageData([...res?.data]);
            };
            fetchDefectLocationList({
                setIsLoading: listDefectLocationList,
                onSuccessAction,
                userId,
                extraParams: [
                    {
                        key: 'shortageType',
                        value: shortageSelectedData,
                    },
                ],
                customURL: shortageCustomURL,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shortageSelectedData]);

    const onStatusChange = (statusType) => {
        setSelectedPhysicalStatusType(statusType);
    };

    const onDefectLocation = (type) => {
        setSelectedDefactTypeData(type);
        if (selectedDefactTypeData) {
            form.setFieldsValue({ defectDescription: null });
        }
    };
    const handleShortageSelect = (value) => {
        resetList();
        setShortageSelect(value);
    };

    const onSelectShortageType = (value) => {
        resetList();
        setShortageSelectedData(value);
    };

    const formProps = {
        ...props,
        form,
        onFinish,
        onFinishFailed,
        typeData,
        vehicleStatusType,
        physicalStatusType,
        shortageType,
        defectStatusType,

        userId,
        isDataLoaded,
        formData: vehicleDetailData,
        isLoading,
        vehicleDetailForm,
        finalData,
        setFinalData,
        setButtonData,
        buttonData,
        receiptType,
        selectedRecord,
        selectedPhysicalStatusType,
        onStatusChange,
        defactTypeData,
        selectedDefactTypeData,
        onDefectLocation,
        defectDesc,
        handleShortageSelect,
        shortageSelect,

        onSelectShortageType,
        shortageData,
        shortTypeData,
    };

    const viewProps = {
        typeData,
        vehicleStatusType,
        physicalStatusType,
        shortageType,
        formData: vehicleDetailData,
        styles,
        isLoading,
        selectedRecord,
        defectStatusType,
        shortageSelect,
        selectedPhysicalStatusType,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    <VehicleReceiptFormButton {...props} buttonData={{ ...buttonData, nextBtn: false }} />
                </Col>
            </Row>
        </Form>
    );
};

export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterBase);
