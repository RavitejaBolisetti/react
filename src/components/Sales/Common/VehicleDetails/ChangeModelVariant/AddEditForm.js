/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Col, Input, Form, Row, Button, Card, Divider, Typography, Tag, Checkbox } from 'antd';
import { connect } from 'react-redux';
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
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { refactorProductAttributeData } from '../refactorProductAttributeData';

import styles from 'assets/sass/app.module.scss';
import { vehicleDetailDataActions } from 'store/actions/data/vehicle/vehicleDetail';

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
            fetchList: vehicleDetailDataActions.fetchList,
            fetchProductAttribiteDetail: productHierarchyDataActions.fetchProductAttribiteDetail,
        },
        dispatch
    ),
});

const AddEditFormMain = (props) => {
    const { onCloseAction: onCancelCloseAction, showGlobalNotification, userId, listShowLoading, setRefreshData, refreshData } = props;
    const { isOTFModule, fetchList, fetchSoData, vehicleDetailData, form, productHierarchyData, selectedRecordId, saveData, fetchProductAttribiteDetail } = props;

    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedTreeKey, setSelectedTreeKey] = useState();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [confirmRequest, setConfirmRequest] = useState(true);
    const [revisedProductAttributeData, setRevisedProductAttributeData] = useState();
    const [showCreatePurchaseOrder, setShowCreatePurchaseOrder] = useState(false);
    const [revisedModelInformation, setRevisedModelInformation] = useState();
    const [revisedModelCode, setRevisedModelCode] = useState();
    const [soDataList, setSoDataList] = useState([]);

    const [buttonData, setButtonData] = useState({ cancelBtn: true, closeBtn: true });
    const [filterString, setFilterString] = useState({ pageSize: 10, current: 1 });

    const [formData, setFormData] = useState();
    const [modelStatus, setModelStatus] = useState();
    console.log('🚀 ~ AddEditFormMain ~ modelStatus:', modelStatus);
    const [productDetailRefresh, setProductDetailRefresh] = useState();

    useEffect(() => {
        if (userId && selectedRecordId) {
            if (isOTFModule) {
                const extraParams = [
                    {
                        key: 'otfId',
                        value: selectedRecordId,
                    },
                ];
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            }

            // if (!isVehicleServiceLoaded) {
            //     fetchServiceLov({ setIsLoading: serviceLoading, userId, onErrorAction });
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId, productDetailRefresh]);

    useEffect(() => {
        if (vehicleDetailData) {
            setFormData(vehicleDetailData);
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: null, revisedModel: null });
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'PD', revisedModel: 'X700MM89615721911' });
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'CR', revisedModel: 'X700MM89615721911' });
            // setFormData({ ...vehicleDetailData, sapStatusResponseCode: 'RJ', revisedModel: 'X700MM89615721911' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleDetailData]);

    useEffect(() => {
        if (formData?.revisedModel) {
            form.setFieldsValue({ model: formData?.revisedModel });
            form.setFieldsValue({ modelCode: formData?.revisedModel });
            setSelectedTreeKey(formData?.revisedModel);
        } else {
            form.setFieldsValue({ model: undefined, modelCode: undefined });
            form.setFieldsValue({ model: formData?.model });
            form.setFieldsValue({ modelCode: formData?.modelCode });
            setSelectedTreeKey(formData?.model);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (revisedProductAttributeData) {
            setRevisedModelInformation(refactorProductAttributeData(revisedProductAttributeData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [revisedProductAttributeData]);

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
        return (
            revisedModelCode && [
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
            ]
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, revisedModelCode]);

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
        setSelectedRecord();
    };

    useEffect(() => {
        if (userId && extraParams?.find((i) => i.key === 'pageNumber')?.value > 0) {
            setShowDataLoading(true);
            fetchSoData({
                customURL: customURL,
                setIsLoading: listShowLoading,
                userId,
                extraParams,
                onSuccessAction: (res) => {
                    setShowCreatePurchaseOrder(res?.data?.paginationData.length <= 0);
                    setShowDataLoading(false);
                    setSoDataList(res?.data);
                    setSelectedRecord();
                },
                onErrorAction,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, extraParams]);

    const onError = (message) => {
        showGlobalNotification({ message });
    };

    const modelChangeService = (data, onSuccessAction) => {
        const onSuccess = (res) => {
            setModelStatus(res?.data?.status);
            setProductDetailRefresh(!productDetailRefresh);
            onSuccessAction && onSuccessAction();
            if (res?.data?.status === STATUS?.SUCCESS?.key) {
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
        form?.validateFields()
            .then(() => {
                const vehicleNewModel = form.getFieldsValue();
                const vehicleModelChangeRequest = { model: vehicleNewModel?.model, modelCode: vehicleNewModel?.modelCode };
                const vehicleCurrentModel = { model: formData?.model, modelCode: formData?.modelCode };
                if (JSON.stringify(vehicleModelChangeRequest) === JSON.stringify(vehicleCurrentModel)) {
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: 'Current and previous model are same' });
                } else if (!vehicleNewModel?.createPurchaseOrder && !selectedRecord?.soNumber) {
                    showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: 'Please select one option either to map so number or create purchase order' });
                } else {
                    const data = {
                        otfId: selectedRecordId,
                        modelCode: vehicleModelChangeRequest?.modelCode,
                        status: null,
                        revisedSoNumber: selectedRecord?.soNumber || null,
                        createPurchaseOrder: vehicleNewModel?.createPurchaseOrder,
                    };
                    modelChangeService(data);
                }
            })
            .catch((err) => console.error(err));
    };

    const handleCollapse = () => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: translateContent('bookingManagement.modelVariant.label.cancelRequest'),
            text: translateContent('bookingManagement.modelVariant.heading.cancelChangeRequest'),
            submitText: translateContent('bookingManagement.modelVariant.button.yes'),
            onSubmitAction,
            onCloseAction,
        });
    };

    const onCloseAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };

    const onSuccessAction = () => {
        form.setFieldsValue({ model: formData?.model });
        form.setFieldsValue({ modelCode: formData?.modelCode });
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
            onCancelCloseAction();
            onSuccessAction();
        }
    };

    const handleFormValueChange = (value) => {
        setButtonData({ ...buttonData, formBtnActive: value });
    };

    const handleSelectTreeClick = (value) => {
        getProductAttributeDetail(value, setRevisedProductAttributeData);
        setButtonData({ ...buttonData, formBtnActive: false });
        form.setFieldsValue({ modelCode: value });
        setRevisedModelCode(value);
        setSelectedTreeKey(value);
        handleFormValueChange(false);
        setShowCreatePurchaseOrder(false);
    };

    useEffect(() => {
        if (soDataList?.paginationData?.length > 0) {
            setButtonData({ ...buttonData, formBtnActive: true });
        } else {
            setButtonData({ ...buttonData, formBtnActive: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soDataList]);

    const rowSelection = {
        selectedRowKeys: [selectedRecord?.soNumber],
        type: 'radio',
        onChange: (_, selectedRows) => {
            setSelectedRecord(selectedRows?.[0]);
        },
        onClick: () => setShowCreatePurchaseOrder(true),
    };

    const onChange = (e) => {
        handleFormValueChange(e.target.checked);
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
        rowKey: 'soNumber',
        noDataMessage: (
            <>
                SO is not available,
                <br />
                Please create new purchase order
            </>
        ),
        rowSelection: {
            ...rowSelection,
        },
    };

    const handleRefresh = () => {
        setProductDetailRefresh(!productDetailRefresh);
    };

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    const isReviedModelPending = modelStatus && [STATUS?.PENDING?.key]?.includes(modelStatus);

    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        defaultParent: false,
        selectedTreeSelectKey: selectedTreeKey,
        handleSelectTreeClick,
        treeExpandedKeys: [selectedTreeKey],
        placeholder: preparePlaceholderSelect(translateContent('bookingManagement.modelVariant.placeholder.model')),
        treeDisabled: isReviedModelPending,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} data-testid="modelChange">
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
                                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.model')} name={'model'} rules={[validateRequiredSelectField(translateContent('bookingManagement.modelVariant.validation.model'))]}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Form.Item>
                                    {revisedModelInformation && <div className={styles.modelTooltip}>{addToolTip(revisedModelInformation, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                                </Col>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.modelCode')} name={'modelCode'} rules={[validateRequiredInputField(translateContent('bookingManagement.modelVariant.validation.modelCode'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('bookingManagement.modelVariant.placeholder.modelCode'))} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                        <Divider className={styles.marT20} />
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                <h4>{translateContent('bookingManagement.label.vehicleSOMapping')}</h4>
                            </Col>
                            {showCreatePurchaseOrder && (
                                <Col xs={24} sm={24} md={4} lg={4} xl={4} className={`${styles.verticallyCentered} ${styles.alignRight}`}>
                                    <Form.Item initialValue={formData?.createPurchaseOrder} onChange={onChange} valuePropName="checked" name="createPurchaseOrder">
                                        <Checkbox disabled={isReviedModelPending}>{translateContent('bookingManagement.modelVariant.label.createPurchaseOrder')}</Checkbox>
                                    </Form.Item>
                                </Col>
                            )}
                        </Row>
                        <ListDataTable {...tableProps} showAddButton={false} />
                    </Col>
                </Row>
            </div>
            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                        {isReviedModelPending
                            ? buttonData?.closeBtn && (
                                  <Button danger onClick={onCancelCloseAction} data-testid="close">
                                      {translateContent('global.buttons.close')}
                                  </Button>
                              )
                            : buttonData?.cancelBtn && (
                                  <Button loading={false} disabled={!buttonData?.formBtnActive} onClick={() => handleCollapse()} danger>
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
