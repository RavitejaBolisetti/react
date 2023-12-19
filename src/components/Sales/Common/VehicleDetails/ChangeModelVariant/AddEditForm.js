/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Button } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { BASE_URL_VEHICLE_CHANGE_MODEL_VARIANT } from 'constants/routingApi';
import { translateContent } from 'utils/translateContent';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import TreeSelectField from 'components/common/TreeSelectField';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { STATUS } from 'constants/modelVariant';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { formData, formActionType: { editMode } = undefined, showGlobalNotification, userId, listShowLoading, setRefreshData, refreshData, buttonData, setButtonData, confirmRequest, setConfirmRequest, setShowChangeModel, revisedModelInformation } = props;
    const { productDetailRefresh, setProductDetailRefresh, getProductAttributeDetail, setRevisedProductAttributeData, form, modelChangeItemList, setModelChangeItemList, productHierarchyData, modelStatus, setModelStatus, selectedRecordId, filterVehicleData, saveData, handleVehicleDetailChange, handleFormValueChange } = props;
    const [selectedTreeKey, setSelectedTreeKey] = useState();
    const [modelChange, setModelChange] = useState(true);
    const formType = editMode ? 'New' : '';
    const modelChangeField = ['model' + formType, 'modelCode' + formType];

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
    }, []);

    const onError = (message) => {
        showGlobalNotification({ message });
    };

    const modelChangeService = (data) => {
        const onSuccess = (res) => {
            setModelStatus(res?.data?.status);
            setProductDetailRefresh(!productDetailRefresh);
            if (res?.data?.status === STATUS?.SUCCESS?.key) {
                setRefreshData(!refreshData);
                setButtonData({ ...buttonData, formBtnActive: true });
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
        setModelChangeItemList(modelChangeItemList?.map((i) => ({ ...i, changeAllowed: false })));
        form.setFieldsValue({ ['model' + formType]: formData?.model });
        form.setFieldsValue({ ['modelCode' + formType]: formData?.modelCode });
    };

    const onCloseAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
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

            modelChangeService(data);
        } else {
            setConfirmRequest({
                ...confirmRequest,
                isVisible: false,
            });
            setShowChangeModel(false);
        }
    };

    const handleSelectTreeClick = (value) => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: translateContent('bookingManagement.modelVariant.label.confirmation'),
            closable: true,
            icon: false,
            onCloseAction: () => {
                setConfirmRequest({
                    ...confirmRequest,
                    isVisible: false,
                });
            },
            onSubmitAction: () => {
                getProductAttributeDetail(value, setRevisedProductAttributeData);
                setModelChange(false);
                const finalData = { ...filterVehicleData, productModelCode: value };
                handleVehicleDetailChange(finalData);
                form.setFieldsValue({ ['modelCode' + formType]: finalData?.productModelCode });
                setSelectedTreeKey(finalData?.productModelCode);
                handleFormValueChange(false);
                setButtonData({ ...buttonData, formBtnActive: false });
                setConfirmRequest({
                    ...confirmRequest,
                    isVisible: false,
                });
            },
            submitText: translateContent('bookingManagement.modelVariant.button.yes'),
            text: translateContent('bookingManagement.modelVariant.heading.modelChange'),
        });
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
        treeDisabled: formData?.revisedModel && [STATUS?.PENDING?.key, STATUS?.REJECTED?.key]?.includes(modelStatus),
    };

    const isReviedModelPending = formData?.revisedModel && [STATUS?.PENDING?.key]?.includes(modelStatus);
    return (
        <div className={styles.cardInnerBox}>
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
            {!isReviedModelPending && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={`${styles.buttonsGroup} ${styles.marB20}`}>
                        {modelStatus === STATUS?.REJECTED?.key ? (
                            <Button type="primary" form="myNameForm" onClick={onHandleSave}>
                                {translateContent('global.buttons.retry')}
                            </Button>
                        ) : (
                            <Button type="primary" form="myNameForm" onClick={onHandleSave} disabled={modelChange}>
                                {translateContent('global.buttons.submit')}
                            </Button>
                        )}
                        <Button onClick={() => handleCollapse(formType)} danger>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                        <ConfirmationModal {...confirmRequest} />
                    </Col>
                </Row>
            )}
        </div>
    );
};

export const AddEditForm = AddEditFormMain;
