/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, createContext } from 'react';
import { Col, Input, Form, Row, Collapse, Switch } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { AccountAndDocumentMappingMaster } from './AccountAndDocumentMapping';
import { accountCategoryDataActions } from 'store/actions/data/financialAccounting/accountCategory/accountCategory';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                AccountCategory: { detailData },
            },
        },
    } = state;

    let returnValue = {
        userId,
        detailData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchAccountCategoryDetail: accountCategoryDataActions.fetchDetail,
            listShowLoadingAccountCategory: accountCategoryDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ViewEditContext = createContext(null);

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType, formActionType: { editMode, viewMode } = undefined, isVisible, fetchAccountCategoryDetail, userId, handleCodeFunction, taxChargeCategoryCodeData, onFinish, onFinishFailed, editForm, accDocMapForm, dropdownItems, setDropdownItems } = props;
    const { buttonData, setButtonData, handleButtonClick, formEdit, setFormEdit, accountDocumentMaps, setAccountDocumentMaps, accountCategoryData, applicationMenuData, financialAccountData, documentDescriptionData, setUserApplicationId, accountCategory, setAccountCategory, selectedTreeSelectKey, setSelectedTreeSelectKey } = props;
    const [openAccordian, setOpenAccordian] = useState(1);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    useEffect(() => {
        if (formData?.accountCategoryCode) {
            fetchAccountCategoryDetail({
                setIsLoading: () => {},
                userId,
                extraParams: [
                    {
                        key: 'accountCategoryCode',
                        value: formData?.accountCategoryCode,
                    },
                ],
                onSuccessAction: (res) => {
                    let data = res?.data;
                    setAccountCategory(data);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (formActionType?.editMode) {
            form.setFieldsValue({
                accountCategoryCode: accountCategory?.[0]?.accountCategoryCode,
                accountCategoryDescription: accountCategory?.[0]?.accountCategoryDescription,
                status: accountCategory?.[0]?.status,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountCategory]);

    useEffect(() => {
        if (formActionType?.editMode) {
            form.setFieldsValue({
                accountCategoryCode: accountCategory?.[0]?.accountCategoryCode,
                accountCategoryDescription: accountCategory?.[0]?.accountCategoryDescription,
                status: accountCategory?.[0]?.status,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
        accountCategory,
        financialAccountData,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const accountDocumentMapsProp = {
        taxChargeCategoryCodeData,
        handleCodeFunction,
        form,
        editForm,
        isVisible,
        accDocMapForm,
        formEdit,
        setFormEdit,
        accountCategory,
        accountDocumentMaps,
        setAccountDocumentMaps,
        buttonData,
        setButtonData,
        viewMode,
        formActionType,
        dropdownItems,
        setDropdownItems,
        accountCategoryData,
        applicationMenuData,
        financialAccountData,
        documentDescriptionData,
        setUserApplicationId,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label="Account Category Code" name="accountCategoryCode" rules={[validateRequiredInputField('Code')]}>
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('Account Category Code')} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label="Description" rules={[validateRequiredInputField('Description')]} name="accountCategoryDescription">
                                        <Input className={styles.inputBox} placeholder={preparePlaceholderText('Description')} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={editMode ? accountCategory?.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon}>
                                <Panel header="Account and Document Mapping" key="1">
                                    <ViewEditContext.Provider value={viewMode}>
                                        <AccountAndDocumentMappingMaster {...accountDocumentMapsProp} />
                                    </ViewEditContext.Provider>
                                </Panel>
                            </Collapse>
                        </>
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};
export const AddEditForm = withDrawer(connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain), {});
