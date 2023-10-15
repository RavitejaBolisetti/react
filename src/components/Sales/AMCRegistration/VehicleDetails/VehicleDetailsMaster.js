/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Typography, Button, Card, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { vehicleDetailDataActions } from 'store/actions/data/vehicle/vehicleDetail';

import { showGlobalNotification } from 'store/actions/notification';

import AddEditForm from './AddEditForm';
import ViewVehicleList from './ViewVehicleList';

import { CardSkeleton } from 'components/common/Skeleton';
import { LANGUAGE_EN } from 'language/en';
import { NoDataFound } from 'utils/noDataFound';

import { AMC_CONSTANTS } from '../utils/AMCConstants';
import styles from 'assets/sass/app.module.scss';
import { formattedCalendarDate } from 'utils/formatDateTime';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },

        data: {
            Vehicle: {
                VehicleDetail: { isLoaded = false, isLoading, vehicleData },
            },
        },
    } = state;

    let returnValue = {
        userId,
        isLoading,
        vehicleData,
        isLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchVehicleData: vehicleDetailDataActions.fetchList,
            listVehicleShowLoading: vehicleDetailDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleDetailsMasterBase = (props) => {
    const { form, section, userId, showGlobalNotification, typeData } = props;
    const { isLoaded, isLoading, setLastSection, AMConFinish, setRequestPayload, fetchVehicleData, listVehicleShowLoading, requestPayload, buttonData, setButtonData, formActionType, FormActionButton } = props;
    const [contactform] = Form.useForm();
    const [contactData, setContactData] = useState([]);
    const [showAddEditForm, setShowAddEditForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingData, setEditingData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(false);

    const disabledProps = { disabled: isReadOnly };

    useEffect(() => {
        if (formActionType?.viewMode) {
            setContactData(requestPayload?.amcVehicleDetails);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload]);

    useEffect(() => {
        if (formActionType?.addMode && requestPayload?.amcRegistration?.saleType === AMC_CONSTANTS?.MNM_FOC?.key && !isLoaded) {
            handleVinSearch();
            setIsReadOnly(true);
            setShowAddEditForm(true);
            setButtonData({ ...buttonData, formBtnActive: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestPayload]);

    useEffect(() => {
        if (formActionType?.addMode) {
            setLastSection(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section, formActionType]);

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const addDataTitle = (
        <p className={styles.textCenter}>
            Please add new vehicle using <br /> <strong>“Add”</strong> button at top
        </p>
    );

    useEffect(() => {
        if (!formActionType?.viewMode) {
            setRequestPayload({ ...requestPayload, amcVehicleDetails: contactData || { vin: requestPayload?.amcRegistration?.vin } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactData]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    const onSaveFormData = () => {
        contactform
            .validateFields()
            .then((value) => {
                setContactData((prev) => {
                    if (prev) {
                        return [...prev, value];
                    } else {
                        return [{ value }];
                    }
                });

                setShowAddEditForm(false);
                setIsEditing(false);
                setEditingData({});
                setIsAdding(false);
                contactform.resetFields();
            })
            .catch((err) => console.error(err));
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const addBtnContactHandeler = (e) => {
        e.stopPropagation();
        setIsAdding(true);
        contactform.resetFields();
        setShowAddEditForm(true);
    };

    const handleVinSearch = (value) => {
        const onVehicleSearchSuccessAction = (data) => {
            contactform.setFieldsValue({ ...data?.data?.vehicleSearch[0], modelDescription: data?.data?.vehicleSearch[0].chassisNumber, vehicleRegistrationNumber: data?.data?.vehicleSearch[0].registrationNumber, orignallyWarrantyStartDate: formattedCalendarDate(data?.data?.vehicleSearch[0].orignallyWarrantyStartDate) });
            if (formActionType?.addMode) {
                setRequestPayload({ ...requestPayload, amcVehicleDetails: [{ vin: requestPayload?.amcRegistration?.vin }] });
            }
        };
        const vehicleExtraParams = [
            {
                key: 'searchType',
                value: 'vehicleIdentificationNumber',
            },
            {
                key: 'searchParam',
                value: value || requestPayload?.amcRegistration?.vin,
            },
            {
                key: 'pageSize',
                value: '10',
            },
            {
                key: 'pageNumber',
                value: '1',
            },
            {
                key: 'status',
                value: 'D',
            },
        ];

        fetchVehicleData({ setIsLoading: listVehicleShowLoading, userId, extraParams: vehicleExtraParams, onSuccessAction: onVehicleSearchSuccessAction, onErrorAction });
    };

    const formProps = {
        requestPayload,
        setShowAddEditForm,
        showAddEditForm,
        setContactData,
        contactData,
        onSaveFormData,
        styles,
        form,
        contactform,
        editingData,
        isEditing,
        setIsEditing,
        formActionType,
        setEditingData,
        typeData,
        setButtonData,
        handleFormValueChange,

        isAdding,
        setIsAdding,
        buttonData,
        handleVinSearch,
        disabledProps,
    };

    const onFinish = () => {
        AMConFinish(requestPayload);
    };

    const onFinishFailed = (err) => {
        console.error(err);
    };
    const formSkeleton = (
        <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <CardSkeleton height={'100vh'} />
            </Col>
        </Row>
    );

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20} className={styles.drawerBodyRight}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2>{section?.title} </h2>
                        <Card>
                            {isLoading ? (
                                formSkeleton
                            ) : (
                                <>
                                    <Row type="flex" align="middle">
                                        <Text strong> {'Vehicle Details'}</Text>
                                        {!formActionType?.viewMode && !(formActionType?.addMode && requestPayload?.amcRegistration?.saleType === AMC_CONSTANTS?.MNM_FOC?.key) && (
                                            <Button onClick={addBtnContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isEditing || isAdding}>
                                                Add
                                            </Button>
                                        )}
                                    </Row>
                                    <Divider className={styles.marT20} />
                                    {!formActionType?.viewMode && showAddEditForm && <AddEditForm {...formProps} />}
                                    {!contactData?.length && !isAdding && !(formActionType?.addMode && requestPayload?.amcRegistration?.saleType === AMC_CONSTANTS?.MNM_FOC?.key) ? <NoDataFound informtion={formActionType?.viewMode ? noDataTitle : addDataTitle} /> : <ViewVehicleList {...formProps} />}
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <FormActionButton {...props} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const VehicleDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsMasterBase);
export default VehicleDetailsMaster;
