/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, message as antMessage } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

export const crudEditPage = ({ mapStateToProps, dataActions, showGlobalNotification, editAction, name, title, AddEditForm, studySpecific, studySiteSpecific = false, customDataTransformer = (x) => x, customId = (x) => x.id, drawer = withDrawer, customSuccessAction = undefined, additionalMapDispatchToProps = undefined }) => {
    const mapDispatchToProps = {
        update: dataActions.update,
        editSuccess: editAction.success,
        editError: editAction.error,
        editShowLoading: editAction.showLoading,
        closeActionError: editAction.errorClose,
        showGlobalNotification,
        ...additionalMapDispatchToProps,
    };
    const EditPage = (props) => {
        const { isError, isVisible, isUpdated, message, onCloseAction, showGlobalNotification } = props;

        const [form] = Form.useForm();
        const { resetFields, validateFields } = form;

        const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: true, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: true, formBtnActive: false };
        const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

        // const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
        // const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

        // const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
        const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
        const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

        // const [formData, setFormData] = useState([]);

        const onSuccess = (res) => {
            form.resetFields();
            onCloseAction();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            // fetchList({ setIsLoading: editShowLoading, userId });
            if (buttonData?.saveAndNewBtnClicked) {
                // setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const handleButtonClick = ({ record = null, buttonAction }) => {
            resetFields();
            // setFormData([]);

            // setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
            setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

            // record && setFormData(record);
            // setIsFormVisible(true);
        };

        const myOncloseAction = (...rest) => {
            resetFields();
            onCloseAction(...rest);
        };

        const onUpdate = (values) => {
            let finalValues = { ...values };
            // const finalValues = customDataTransformer(values);

            const { update, data, editError, editShowLoading, userId } = props;
            const { filterParams = undefined, additionalFilter = {} } = props;
            update({
                data: finalValues,
                setIsLoading: editShowLoading,
                errorAction: editError,
                onWarning: (errorMessage) => antMessage.error(errorMessage),
                warningAction: (errorMessage) => antMessage.error(errorMessage),
                // successAction: () => {
                //     editSuccess();
                //     resetFields();
                //     customSuccessAction && customSuccessAction(props);
                // },
                onSuccess,
                onError,
                id: customId(data),
                userId,
                filterParams,
                additionalFilter,
            });
        };

        const onFinishFailed = (errorInfo) => {
            validateFields().then((values) => {}).catch(err => console.error(err));
        };
        const buttonProps = {
            formData: [],
            onCloseAction: myOncloseAction,
            buttonData,
            setButtonData,
            handleButtonClick,
        };

        const handleFormChange = () => {
            setButtonData({ ...buttonData, formBtnActive: true });
        };

        return (
            <Form layout="vertical" form={form} onFinish={onUpdate} onFinishFailed={onFinishFailed} onValuesChange={handleFormChange} onFieldsChange={handleFormChange}>
                {isVisible ? <AddEditForm {...props} isError={isError} isUpdated={isUpdated} message={message} form={form} onCloseAction={myOncloseAction} /> : null}
                <DrawerFormButton {...buttonProps} />
                {/* <Row gutter={20} className={styles.formFooter}>
                    <Col xs={8} sm={12} md={6} lg={6} xl={6}>
                        <Button onClick={myOncloseAction}>Cancel</Button>
                    </Col>
                    <Col xs={16} sm={12} md={18} lg={18} xl={18} className={styles.textAlignRight}>
                        <Button htmlType="submit" type="primary" className={styles.saveBtn} loading={isLoading}>
                            Save
                        </Button>
                        {showAddNewButton ? (
                            <Button htmlType="submit" type="primary" className={styles.saveBtnAndNew} loading={isLoading}>
                                Save and New
                            </Button>
                        ) : null}
                    </Col>
                </Row> */}
            </Form>
        );
    };

    const EditForms = EditPage;
    const WithDrawerForm = drawer(EditForms, { title, width: 600 });
    return connect(mapStateToProps, mapDispatchToProps)(WithDrawerForm);
};
