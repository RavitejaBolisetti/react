/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Input, Form, Row } from 'antd';

import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { BindFormAndResult, FORM_KEYS } from './CheckListUtils';
import { convertDateTimedayjs, formatDateToCalenderDate } from 'utils/formatDateTime';
import { MODULE_TYPE_CONSTANTS } from 'constants/modules/vehicleChecklistConstants';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
const { TextArea } = Input;

export const ChecklistModalForms = (props) => {
    const { AdvanceformData, setAdvanceformData } = props;
    const { handleFormValueChange, checkListDataModified, setcheckListDataModified, aggregateForm } = props;
    const { setAdvanceSearchVisible } = props;
    const { isVisible, setisEditing } = props;
    const { setPage, pageIntialState } = props;
    const { checklistType, setRequestPayload = () => {}, checklistDescriptionLabel = translateContent('commonModules.checklistMaster.label.remarks'), matchKey = 'id' } = props;
    const [saveDisabled, setsaveDisabled] = useState(true);
    const handleResetChecklist = () => {
        if (AdvanceformData?.checkResult) {
            aggregateForm.resetFields();
            const newArr = checkListDataModified?.map((element) => {
                if (element?.[matchKey] === AdvanceformData?.[matchKey]) {
                    const removeCheckListDescription = checklistType === MODULE_TYPE_CONSTANTS?.DELIVERY_NOTE?.key ? element?.checklistDescription : undefined;
                    return { ...element, checklistDescription: removeCheckListDescription, checkResult: undefined, ...FORM_KEYS, ismodified: false };
                }
                return element;
            });
            aggregateForm.setFieldsValue({ answerBoolean: false });
            setRequestPayload((prev) => ({ ...prev, vehicleDeliveryCheckList: { vin: prev?.vehicleDetails?.vinNumber, deliveryChecklistDtos: newArr?.filter((i) => i?.ismodified) } }));
            setcheckListDataModified(newArr);
        } else {
            aggregateForm.resetFields();
            return false;
        }
    };

    useEffect(() => {
        if (AdvanceformData && isVisible) {
            aggregateForm.setFieldsValue({ ...AdvanceformData, answerFromDate: formatDateToCalenderDate(AdvanceformData?.answerFromDate), answerToDate: formatDateToCalenderDate(AdvanceformData?.answerToDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AdvanceformData, isVisible]);

    const BindResultForm = useMemo(() => {
        if (typeof AdvanceformData === 'object' && Object?.keys(AdvanceformData) && Object?.values(AdvanceformData) && isVisible) {
            const CancelBtnName = translateContent('global.buttons.reset');
            return { formItem: BindFormAndResult({ data: AdvanceformData, aggregateForm, checklistType })?.formItem, CancelBtnName, resetAction: handleResetChecklist, saveBtnName: translateContent('global.buttons.save') };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, AdvanceformData]);

    const onFinish = () => {
        aggregateForm
            .validateFields()
            .then((values) => {
                const data = { ...AdvanceformData, ...values, ismodified: true, checkResult: BindFormAndResult({ data: { ...values, answerType: AdvanceformData?.answerType, checklistAnswerResponses: AdvanceformData?.checklistAnswerResponses, answerToDate: convertDateTimedayjs(values?.answerToDate), answerFromDate: convertDateTimedayjs(values?.answerFromDate) }, checklistType, aggregateForm })?.checkResult };
                const newArr = [...checkListDataModified]?.map((element) => {
                    if (element?.[matchKey] === AdvanceformData?.[matchKey]) {
                        return data;
                    }
                    return element;
                });
                setcheckListDataModified(newArr);
                setRequestPayload((prev) => ({ ...prev, vehicleDeliveryCheckList: { vin: prev?.vehicleDetails?.vinNumber, deliveryChecklistDtos: newArr?.filter((i) => i?.ismodified) } }));
                setAdvanceSearchVisible(false);
                handleFormValueChange();
                setisEditing(false);
                setAdvanceformData();
                setPage((prev) => ({ pageIntialState, current: prev?.current }));
            })
            .catch((err) => console.error(err));
    };
    const handleValuesChange = () => {
        setsaveDisabled(false);
    };
    const modalProps = {
        reset: true,
        submit: true,
        resetName: BindResultForm?.CancelBtnName,
        submitName: BindResultForm?.saveBtnName,
        handleResetFilter: BindResultForm?.resetAction,
        htmltype: false,
        onClickAction: onFinish,
        saveDisabled: saveDisabled,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={aggregateForm} onValuesChange={handleValuesChange}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {BindResultForm?.formItem}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                    {checklistType === MODULE_TYPE_CONSTANTS?.RECEIPT_CHECKLIST?.key && (
                        <Form.Item label={checklistDescriptionLabel} name="checklistDescription" rules={[validateRequiredInputField(checklistDescriptionLabel)]}>
                            <TextArea placeholder={preparePlaceholderText(checklistDescriptionLabel)} autoSize={{ minRows: 3, maxRows: 5 }} maxLength={300} showCount />
                        </Form.Item>
                    )}
                    <Form.Item name="id" hidden></Form.Item>

                    {checklistType === MODULE_TYPE_CONSTANTS?.DELIVERY_NOTE?.key && <Form.Item initialValue={true} name="status" hidden />}
                </Col>
            </Row>
            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const ModalForm = withModal(ChecklistModalForms, {});
