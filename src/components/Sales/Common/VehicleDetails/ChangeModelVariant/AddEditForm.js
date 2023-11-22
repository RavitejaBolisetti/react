/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Col, Input, Form, Row, Card, Button, Space } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { BASE_URL_VEHICLE_CHANGE_MODEL_VARIANT } from 'constants/routingApi';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import TreeSelectField from 'components/common/TreeSelectField';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { STATUS } from 'constants/modelVariant';

const AddEditFormMain = (props) => {
    const { formData, formActionType: { editMode } = undefined, showGlobalNotification, userId, listShowLoading, setRefreshData, refreshData, buttonData, setButtonData, confirmRequest, setConfirmRequest, setChangeModel, toolTipContent, onModelSubmit, setOnModelSubmit } = props;
    const { form, modelChangeItemList, setModelChangeItemList, productHierarchyData, modelStatus, setModelStatus, selectedRecordId, filterVehicleData, saveData, handleVehicleDetailChange, handleFormValueChange } = props;
    const [selectedTreeKey, setSelectedTreeKey] = useState(formData?.model);
    const [modelChange, setModelChange] = useState(true);
    const formType = editMode ? 'New' : '';
    const modelChangeField = ['model' + formType, 'modelCode' + formType];

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
                        modelCode: vehicleModelChangeRequest?.modelCode,
                        otfId: selectedRecordId,
                    };
                    const onError = (message) => {
                        showGlobalNotification({ message });
                    };
                    const onSuccess = (res) => {
                        setOnModelSubmit(true);
                        setModelStatus(STATUS?.PENDING?.key);
                        if (res?.data?.sapStatusResponseCode === STATUS?.SUCCESS?.key) {
                            setButtonData({ ...buttonData, formBtnActive: true });
                        }
                        setRefreshData(!refreshData);
                        showGlobalNotification({ notificationType: 'warning', title: 'Pending for SAP Confirmation', message: 'Change model request approval is pending from SAP' });
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
                }
            })
            .catch((err) => console.error(err));
    };

    const handleCollapse = (formType) => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: 'Cancel Request',
            text: 'Are you sure you want to Cancel change model request? ',
            submitText: 'Yes',
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
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
        setChangeModel(false);
    };

    const handleSelectTreeClick = (value) => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: 'Confirmation',
            closable: true,
            icon: false,
            onCloseAction: () => {
                setConfirmRequest({
                    ...confirmRequest,
                    isVisible: false,
                });
            },
            onSubmitAction: () => {
                setModelChange(false);
                const finalData = { ...filterVehicleData, productModelCode: value };
                handleVehicleDetailChange(finalData);
                form.setFieldsValue({ ['modelCode' + formType]: finalData?.productModelCode });
                setSelectedTreeKey(finalData?.productModelCode);
                // form.setFieldsValue({ ['model' + formType]: finalData?.productModelCode });
                handleFormValueChange(true);
                setConfirmRequest({
                    ...confirmRequest,
                    isVisible: false,
                });
            },
            submitText: 'Yes',
            text: 'If you proceed with model change, the price will be calculated as per the selected model. Do you wish to continue?',
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
        treeExpandedKeys: [formData?.model],
        placeholder: preparePlaceholderSelect('Model'),
        // loading: !viewOnly ? isProductDataLoading : false,
        treeDisabled: onModelSubmit,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.modelDescription')} initialValue={formData?.model} name={'model' + formType} rules={[validateRequiredSelectField(translateContent('bookingManagement.modelVariant.validation.model'))]}>
                        <TreeSelectField {...treeSelectFieldProps} />
                    </Form.Item>
                    {toolTipContent && <div className={styles.modelTooltip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                </Col>
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <Form.Item label={translateContent('bookingManagement.modelVariant.label.modelCode')} initialValue={formData?.modelCode} name={'modelCode' + formType} rules={[validateRequiredInputField(translateContent('bookingManagement.modelVariant.validation.modelCode'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('bookingManagement.modelVariant.placeholder.modelCode'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            {editMode && !onModelSubmit && (
                <>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={`${styles.buttonsGroup} ${styles.marB20}`}>
                            {modelStatus !== STATUS?.PENDING?.key ? (
                                <Button type="primary" form="myNameForm" onClick={onHandleSave} disabled={modelChange}>
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
                </>
            )}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
