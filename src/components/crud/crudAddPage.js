/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Form, Modal, message as antMessage } from 'antd';
import { connect } from 'react-redux';
import { withDrawer } from '../withDrawer';
import { DrawerFormButton } from 'components/common/Button';

// import styles from './addEdit.module.css';
// import buttonStyles from 'components/Common/Button/button.module.css';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

const confirm = Modal.confirm;

export const crudAddPage = ({ dataActions, addActions, showGlobalNotification, mapStateToProps, AddEditForm, title, name, customDataTransformer = (x) => x, drawer = withDrawer, customSuccessAction = undefined, additionalMapDispatchToProps = undefined }) => {
    const mapDispatchToProps = {
        doAddAction: dataActions.saveData,
        addActionSuccess: addActions.success,
        addActionError: addActions.error,
        addActionShowLoading: addActions.showLoading,
        closeActionSuccess: addActions.successClose,
        closeActionError: addActions.errorClose,
        showGlobalNotification,
        ...additionalMapDispatchToProps,
    };

    const AddPage = (props) => {
        const { showGlobalNotification } = props;
        const [shouldReset, setShouldReset] = useState(false);
        const [form] = Form.useForm();
        const { resetFields } = form;
        // validateFields
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

        // const onSaveNew = (isFieldReset) => (e) => {
        //     const { doAddAction, addActionShowLoading, addActionError, userId, filterString = undefined, filterParams = undefined, additionalFilter = {} } = props;
        //     e.preventDefault();

        //     // addActionSuccess

        //     // const doReset = () => {
        //     //     setShouldReset(true);
        //     //     resetFields();
        //     // };

        //     validateFields((err, values) => {
        //         if (!err) {
        //             const finalValues = customDataTransformer(values);
        //             const keyword = filterString ? 'keyword=' + filterString : undefined;
        //             doAddAction({
        //                 data: finalValues,
        //                 isFormShown: isFieldReset,
        //                 setIsLoading: addActionShowLoading,
        //                 errorAction: addActionError,
        //                 onWarning: (errorMessage) => antMessage.error(errorMessage),
        //                 warningAction: (errorMessage) => antMessage.error(errorMessage),
        //                 onSuccess,
        //                 onError,
        //                 // successAction: (...rest) => {
        //                 //     addActionSuccess(...rest);
        //                 //     doReset();
        //                 //     if (isFieldReset) {
        //                 //         setShouldReset(false);
        //                 //     }
        //                 //     customSuccessAction && customSuccessAction(props);
        //                 // },
        //                 userId,
        //                 extraParams: keyword,
        //                 filterParams,
        //                 additionalFilter,
        //             });
        //         }
        //     });
        // };

        // const onSave = onSaveNew(false);
        // const onSaveAndNew = onSaveNew(true);

        const { isError, isAdded, message, onCloseAction, isVisible } = props;

        const myOncloseAction = (...rest) => {
            confirm({
                title: 'Are you sure you want to cancel?',
                onOk() {
                    setShouldReset(true);
                    resetFields();
                    onCloseAction(...rest);
                },
            });
        };

        const onFinish = (values) => {
            let finalValues = { ...values };
            const isFieldReset = buttonData?.saveAndNewBtnClicked;
            const { doAddAction, addActionShowLoading, addActionError, userId, filterString = undefined, filterParams = undefined, additionalFilter = {} } = props;
            // addActionSuccess
            // const doReset = () => {
            //     setShouldReset(true);
            //     resetFields();
            // };

            // const finalValues = customDataTransformer(values);
            const keyword = filterString ? 'keyword=' + filterString : undefined;
            doAddAction({
                data: finalValues,
                isFormShown: isFieldReset,
                setIsLoading: addActionShowLoading,
                errorAction: addActionError,
                onWarning: (errorMessage) => antMessage.error(errorMessage),
                warningAction: (errorMessage) => antMessage.error(errorMessage),
                // successAction: (...rest) => {
                //     addActionSuccess(...rest);
                //     doReset();
                //     if (isFieldReset) {
                //         setShouldReset(false);
                //     }
                //     customSuccessAction && customSuccessAction(props);
                // },
                onSuccess,
                onError,
                userId,
                extraParams: keyword,
                filterParams,
                additionalFilter,
            });
        };
        const onFinishFailed = (errorInfo) => {
            form.validateFields().then((values) => {}).catch(err => console.error(err));
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

        //
        return (
            <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={handleFormChange} onFieldsChange={handleFormChange}>
                {isVisible ? <AddEditForm {...props} isError={isError} isAdded={isAdded} message={message} form={form} onCloseAction={myOncloseAction} shouldReset={shouldReset} setShouldReset={setShouldReset} /> : null}
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

    const AddFormWithMaster = AddPage;
    const WithDrawerForm = drawer(AddFormWithMaster, { title, width: 652 });
    return connect(mapStateToProps, mapDispatchToProps)(WithDrawerForm);
};
