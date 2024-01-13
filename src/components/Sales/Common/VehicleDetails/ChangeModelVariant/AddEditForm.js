/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Col, Input, Form, Row, Button, Card, Divider, Typography, Tag } from 'antd';
import { bindActionCreators } from 'redux';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import { showGlobalNotification } from 'store/actions/notification';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { TbRefresh } from 'react-icons/tb';
import { BASE_URL_VEHICLE_CHANGE_MODEL_VARIANT } from 'constants/routingApi';
import { translateContent } from 'utils/translateContent';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import TreeSelectField from 'components/common/TreeSelectField';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { tableColumn } from './tableColumn';
import { STATUS } from 'constants/modelVariant';
import { BASE_URL_VEHICLE_MODEL_SO_MAPPING_SEARCH as customURL } from 'constants/routingApi';

import { ListDataTable } from 'utils/ListDataTable';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { connect } from 'react-redux';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { refactorProductAttributeData } from '../refactorProductAttributeData';
import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            OTF: {
                VehicleDetails: { isLoaded: isDataLoaded = false, isLoading, data: vehicleDetailData = [] },
                VehicleDetailsServiceLov: { isFilteredListLoaded: isVehicleServiceLoaded = false, isLoading: isVehicleServiceLoading, filteredListData: vehicleServiceData },
            },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, productCode = undefined, isLoading: isProductHierarchyLoading, isLoaded: isProductDataLoaded = false, data: productHierarchyData = [] },
        },
        common: {
            Header: { dealerLocationId },
        },
    } = state;

    return {
        userId,
        dealerLocationId,

        isProductHierarchyDataLoaded,
        productCode,
        isProductHierarchyLoading,
        isProductDataLoaded,
        productHierarchyData,

        isVehicleServiceLoaded,
        isVehicleServiceLoading,
        vehicleServiceData,

        isDataLoaded,
        isLoading,
        vehicleDetailData,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
            fetchSoData: otfvehicleDetailsDataActions.fetchData,
            fetchProductAttribiteDetail: productHierarchyDataActions.fetchProductAttribiteDetail,
        },
        dispatch
    ),
});

const AddEditFormMain = (props) => {
    const { formActionType: { editMode } = undefined, showGlobalNotification, userId, listShowLoading, setRefreshData, refreshData, setShowChangeModel } = props;
    const { fetchSoData, selectedOrder, vehicleDetailData, soDataList, setDataList, productDetailRefresh, setProductDetailRefresh, form, productHierarchyData, selectedRecordId, filterVehicleData, saveData, fetchProductAttribiteDetail } = props;
    const [selectedVINDetails, setSelectedOrderVINDetails] = useState();
    const [selectedTreeKey, setSelectedTreeKey] = useState();
    const [modelChange, setModelChange] = useState(true);
    const [buttonData, setButtonData] = useState({ cancelBtn: true });

    const [filterString, setFilterString] = useState({ pageSize: 10, current: 1 });
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [confirmRequest, setConfirmRequest] = useState(true);
    const [revisedProductAttributeData, setRevisedProductAttributeData] = useState();
    const [revisedModelInformation, setRevisedModelInformation] = useState();
    const [revisedModelCode, setRevisedModelCode] = useState();
    const [formData, setFormData] = useState();
    const [modelStatus, setModelStatus] = useState();
    useEffect(() => {
        if (vehicleDetailData) {
            setFormData(vehicleDetailData);
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'PD', revisedModel: 'X700MM89615721911' });
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'CR', revisedModel: 'X700MM89615721911' });
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'RJ', revisedModel: 'X700MM89615721911' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData]);

    useEffect(() => {
        if (revisedProductAttributeData) {
            setRevisedModelInformation(refactorProductAttributeData(revisedProductAttributeData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revisedProductAttributeData]);

    const formType = editMode ? 'New' : '';
    const modelChangeField = ['model' + formType, 'modelCode' + formType];

    useEffect(() => {
        formData?.sapStatusResponseCode && setModelStatus(formData?.sapStatusResponseCode);
        if (formData?.revisedModel) {
            setRevisedModelCode(formData?.revisedModel);
            getProductAttributeDetail(formData?.revisedModel, setRevisedProductAttributeData);
        } else {
            setRevisedModelCode(formData?.modelCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchParam ? 'soNumber' : undefined,
                name: 'So Number',
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'modelCode',
                title: 'Model',
                value: revisedModelCode,
                canRemove: true,
                filter: true,
            },

            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, revisedModelCode]);

    //apidev.mahindradealerrise.com/otf/vehicle/salesorder/search?searchType=soNumber&searchParam=S0123&pageSize=10&pageNumber=1&modelCode=X700MM96316118175

    const getProductAttributeDetail = (value, fnSetData) => {
        const extraParams = [
            {
                key: 'prodctCode',
                value,
            },
        ];

        const onSuccessAction = (res) => {
            fnSetData(res?.[0]);
        };

        fetchProductAttribiteDetail({ setIsLoading: () => {}, userId, onErrorAction, onSuccessAction, extraParams });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && extraParams?.find((i) => i.key === 'pageNumber')?.value > 0) {
            fetchSoData({
                customURL: customURL,
                setIsLoading: listShowLoading,
                userId,
                extraParams,
                onSuccessAction: (res) => {
                    setShowDataLoading(false);
                    setDataList(res);
                },
                onErrorAction,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, extraParams]);

    useEffect(() => {
        if (formData?.revisedModel) {
            form.setFieldsValue({ ['model' + formType]: formData?.revisedModel });
            form.setFieldsValue({ ['modelCode' + formType]: formData?.revisedModel });
            setSelectedTreeKey(formData?.revisedModel);
        } else {
            form.setFieldsValue({ ['model' + formType]: undefined, ['modelCode' + formType]: undefined });
            form.setFieldsValue({ ['model' + formType]: formData?.model });
            form.setFieldsValue({ ['modelCode' + formType]: formData?.modelCode });
            setSelectedTreeKey(formData?.model);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revisedModelCode]);

    const onError = (message) => {
        showGlobalNotification({ message });
    };

    const modelChangeService = (data, onSuccessAction) => {
        const onSuccess = (res) => {
            setModelStatus(res?.data?.status);
            setProductDetailRefresh(!productDetailRefresh);
            onSuccessAction && onSuccessAction();
            if (res?.data?.status === STATUS?.SUCCESS?.key) {
                setShowChangeModel(false);
                setRefreshData(!refreshData);
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res.responseMessage });
            } else {
                setButtonData({ ...buttonData, formBtnActive: false });
                showGlobalNotification({ notificationType: res?.data?.status ? (res?.data?.status === STATUS?.PENDING?.key ? 'warning' : 'error') : 'success', title: res?.data?.status ? STATUS?.[res?.data?.status]?.title : 'SUCCESS', message: res.responseMessage });
            }
        };

        const requestData = {
            data: data,
            customURL: BASE_URL_VEHICLE_CHANGE_MODEL_VARIANT,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const onHandleSave = () => {
        form?.validateFields(modelChangeField)
            .then(() => {
                setModelChange(false);
                const vehicleNewModel = form.getFieldsValue(modelChangeField);
                const vehicleModelChangeRequest = { model: vehicleNewModel?.['model' + formType], modelCode: vehicleNewModel?.['modelCode' + formType] };
                const vehicleCurrentModel = { model: formData?.model, modelCode: formData?.modelCode };

                if (JSON.stringify(vehicleModelChangeRequest) === JSON.stringify(vehicleCurrentModel)) {
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: 'Current and previous model are same' });
                } else {
                    const data = {
                        otfId: selectedRecordId,
                        modelCode: vehicleModelChangeRequest?.modelCode,
                    };
                    modelChangeService(data);
                }
            })
            .catch((err) => console.error(err));
    };

    const handleCollapse = (formType) => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: translateContent('bookingManagement.modelVariant.label.cancelRequest'),
            text: translateContent('bookingManagement.modelVariant.heading.cancelChangeRequest'),
            submitText: translateContent('bookingManagement.modelVariant.button.yes'),
            onCloseAction: onCloseAction,
            onSubmitAction: onSubmitAction,
        });
    };

    const onCloseAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };

    const onSuccessAction = () => {
        setShowChangeModel(false);
        form.setFieldsValue({ ['model' + formType]: formData?.model });
        form.setFieldsValue({ ['modelCode' + formType]: formData?.modelCode });
    };

    const onSubmitAction = () => {
        if (formData?.revisedModel) {
            setConfirmRequest({
                ...confirmRequest,
                isVisible: false,
            });

            const data = {
                status: 'CNCL',
                otfId: selectedRecordId,
            };
            modelChangeService(data, onSuccessAction);
        } else {
            setConfirmRequest({
                ...confirmRequest,
                isVisible: false,
            });
            setShowChangeModel(false);
            onSuccessAction();
        }
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleSelectTreeClick = (value) => {
        getProductAttributeDetail(value, setRevisedProductAttributeData);
        const finalData = { ...filterVehicleData, productModelCode: value };
        form.setFieldsValue({ ['modelCode' + formType]: finalData?.productModelCode });
        setSelectedTreeKey(finalData?.productModelCode);
        handleFormValueChange(false);
        setButtonData({ ...buttonData, formBtnActive: false });

        // setConfirmRequest({
        //     isVisible: true,
        //     titleOverride: translateContent('bookingManagement.modelVariant.label.confirmation'),
        //     closable: true,
        //     icon: false,
        //     onCloseAction: () => {
        //         setConfirmRequest({
        //             ...confirmRequest,
        //             isVisible: false,
        //         });
        //     },
        //     onSubmitAction: () => {
        //         getProductAttributeDetail(value, setRevisedProductAttributeData);
        //         setModelChange(false);
        //         const finalData = { ...filterVehicleData, productModelCode: value };
        //         handleVehicleDetailChange(finalData);
        //         form.setFieldsValue({ ['modelCode' + formType]: finalData?.productModelCode });
        //         setSelectedTreeKey(finalData?.productModelCode);
        //         handleFormValueChange(false);
        //         setButtonData({ ...buttonData, formBtnActive: false });
        //         setConfirmRequest({
        //             ...confirmRequest,
        //             isVisible: false,
        //         });
        //     },
        //     submitText: translateContent('bookingManagement.modelVariant.button.yes'),
        //     text: translateContent('bookingManagement.modelVariant.heading.modelChange'),
        // });
    };

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        defaultParent: false,
        selectedTreeSelectKey: selectedTreeKey,
        handleSelectTreeClick,
        treeExpandedKeys: [selectedTreeKey],
        placeholder: preparePlaceholderSelect(translateContent('bookingManagement.modelVariant.placeholder.model')),
        treeDisabled: formData?.revisedModel && [STATUS?.PENDING?.key, STATUS?.REJECTED?.key]?.includes(formData?.sapStatusResponseCode),
    };

    const onFinish = (values) => {};

    // useEffect(() => {
    //     if (soDataList?.paginationData?.length > 0) {
    //         setButtonData({ ...buttonData, formBtnActive: true });
    //     } else {
    //         setButtonData({ ...buttonData, formBtnActive: false });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [soDataList]);

    const SO_MAPPING = 'SO_MAPPING';
    const VEHICLE_TYPE = {
        ALLOTED: {
            key: 'allot',
        },
        UNALLOTED: {
            key: 'allot',
        },
    };
    const handleButtonClick = ({ record = null, buttonAction }) => {
        switch (buttonAction) {
            case SO_MAPPING:
                handleVehicleAllotment(record, buttonAction);
                break;

            default:
                break;
        }
    };

    const handleVehicleAllotment = (req, buttonAction) => {
        if (!selectedVINDetails) {
            showGlobalNotification({ message: translateContent('bookingManagement.validation.mandatoryVINSelect') });
            return false;
        }

        let updatedStatus = '';
        if (buttonAction === FROM_ACTION_TYPE?.ALLOT) {
            updatedStatus = VEHICLE_TYPE?.ALLOTED.key;
        } else {
            updatedStatus = VEHICLE_TYPE?.UNALLOTED.key;
        }

        const { otfId, otfNumber, bookingNumber = undefined } = selectedOrder;
        const { vehicleIdentificationNumber } = selectedVINDetails;

        let data = { otfId, otfNumber, bookingNumber, allotmentStatus: updatedStatus, vehicleIdentificationNumber };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            setRefreshData(!refreshData);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: buttonAction === FROM_ACTION_TYPE?.ALLOT ? 'post' : 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const rowSelection = {
        selectedRowKeys: [selectedVINDetails?.vehicleIdentificationNumber],
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedOrderVINDetails(selectedRows?.[0]);
        },
    };

    const dynamicPagination = true;
    const tableProps = {
        srl: false,
        dynamicPagination,
        totalRecords: soDataList?.totalRecords,
        filterString,
        setPage: setFilterString,
        isLoading: showDataLoading,
        tableColumn: tableColumn(),
        tableData: soDataList?.paginationData,
        showAddButton: false,
        rowKey: 'vehicleIdentificationNumber',
        rowSelection: {
            ...rowSelection,
        },
    };

    const handleRefresh = () => {
        setProductDetailRefresh(!productDetailRefresh);
    };

    const isReviedModelPending = formData?.revisedModel && [STATUS?.PENDING?.key]?.includes(formData?.sapStatusResponseCode);
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} data-testid="modelChange">
            <div className={`${styles.drawerBody} ${styles.height180}`}>
                <Row justify="space-between" className={styles.fullWidth}>
                    <div className={styles.marB10}>
                        <Text strong>Change Model</Text>
                    </div>
                    {isReviedModelPending && (
                        <div className={styles.verticallyCentered}>
                            {modelStatus === STATUS?.PENDING?.key ? <Tag color="warning">{STATUS?.PENDING?.title}</Tag> : modelStatus === STATUS?.SUCCESS?.key ? <Tag color="success">{STATUS?.SUCCESS?.title}</Tag> : <Tag color="error">{STATUS?.REJECTED?.title}</Tag>}
                            {modelStatus && (
                                <Button
                                    onClick={handleRefresh}
                                    type="link"
                                    icon={
                                        <div className={`${styles.marL10} ${styles.verticallyCentered}`}>
                                            <TbRefresh size={18} />
                                        </div>
                                    }
                                ></Button>
                            )}
                        </div>
                    )}
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.model')} name={'model' + formType} rules={[validateRequiredSelectField(translateContent('bookingManagement.modelVariant.validation.model'))]}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Form.Item>
                                    {revisedModelInformation && <div className={styles.modelTooltip}>{addToolTip(revisedModelInformation, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                                </Col>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.modelCode')} name={'modelCode' + formType} rules={[validateRequiredInputField(translateContent('bookingManagement.modelVariant.validation.modelCode'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('bookingManagement.modelVariant.placeholder.modelCode'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                        <Divider className={styles.marT20} />
                        <h4>{translateContent('bookingManagement.label.vehicleSOMapping')}</h4>
                        <ListDataTable handleAdd={handleButtonClick} {...tableProps} showAddButton={false} />
                    </Col>
                </Row>
            </div>
            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                        {buttonData?.closeBtn && (
                            <Button danger onClick={onCloseAction} data-testid="close">
                                {translateContent('global.buttons.close')}
                            </Button>
                        )}

                        {buttonData?.cancelBtn && (
                            <Button loading={false} disabled={!buttonData?.formBtnActive} onClick={() => handleCollapse(formType)} danger>
                                {translateContent('global.buttons.cancel')}
                            </Button>
                        )}
                    </Col>

                    {!isReviedModelPending && (
                        <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                            {modelStatus === STATUS?.REJECTED?.key ? (
                                <Button loading={false} disabled={!buttonData?.formBtnActive} type="primary" form="myNameForm" onClick={onHandleSave}>
                                    {translateContent('global.buttons.retry')}
                                </Button>
                            ) : (
                                <Button loading={false} disabled={!buttonData?.formBtnActive} type="primary" form="myNameForm" onClick={onHandleSave}>
                                    {translateContent('global.buttons.submit')}
                                </Button>
                            )}
                            <ConfirmationModal {...confirmRequest} />
                        </Col>
                    )}
                </Row>
            </div>
        </Form>
    );
};

export const AddEditForm = connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain);
