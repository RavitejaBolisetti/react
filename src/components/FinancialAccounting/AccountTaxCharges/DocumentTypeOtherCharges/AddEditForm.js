/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Collapse, Divider } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { DocTypeAcMappingMaster } from './DocTypeAcHeadMapping';
import { documentTypeLedgerDataActions } from 'store/actions/data/financialAccounting/documentTypeLedger';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                DocumentTypeLedger: { detailData },
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
            fetchDocTypeLedgerDetail: documentTypeLedgerDataActions.fetchDetail,
            listShowLoadingDocTypeLedgerMapping: documentTypeLedgerDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType, formActionType: { viewMode } = undefined, isVisible, fetchDocTypeLedgerDetail, userId, handleCodeFunction, onFinish, typeData, editForm, docTypeHeadMappingForm, dropdownItems, setDropdownItems } = props;
    const { buttonData, setButtonData, handleButtonClick, formEdit, setFormEdit, docTypeHeadMappingList, setDocTypeHeadMappingList, financialAccount, financialAccHeadData, userApplicationId, setUserApplicationId, selectedTreeSelectKey, setSelectedTreeSelectKey } = props;

    const [openAccordian, setOpenAccordian] = useState(1);
    const [docTypeLedger, setDocTypeLedger] = useState();

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
        if (formData?.documentTypeId) {
            fetchDocTypeLedgerDetail({
                setIsLoading: () => {},
                userId,
                extraParams: [
                    {
                        key: 'documentTypeId',
                        value: formData?.documentTypeId,
                    },
                ],
                onSuccessAction: (res) => {
                    setDocTypeLedger(res?.data);
                },
                onErrorAction: (err) => {
                    console.error(err);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (!viewMode) {
            form.setFieldsValue({
                applicationName: docTypeLedger?.applicationName,
                documentTypeName: docTypeLedger?.documentTypeName,
                documentTypeCode: docTypeLedger?.documentTypeCode,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docTypeLedger]);

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
        docTypeLedger,
        typeData,
    };

    const masterTaxChargeCalProp = {
        typeData,
        handleCodeFunction,
        form,
        editForm,
        isVisible,
        docTypeHeadMappingForm,
        formEdit,
        setFormEdit,
        docTypeLedger,
        docTypeHeadMappingList,
        setDocTypeHeadMappingList,
        buttonData,
        setButtonData,
        viewMode,
        formActionType,
        dropdownItems,
        setDropdownItems,
        financialAccount,
        financialAccHeadData,
        userApplicationId,
        setUserApplicationId,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Application Menu" initialValue={formData?.applicationName} name="applicationName">
                                        <Input placeholder={preparePlaceholderText('application menu')} maxLength={6} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Document Name" initialValue={docTypeLedger?.documentTypeName} name="documentTypeName">
                                        <Input placeholder={preparePlaceholderText('document name')} maxLength={50} disabled={true} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Document Type" initialValue={formData?.documentTypeCode} name="documentTypeCode">
                                        <Input placeholder={preparePlaceholderText('document type')} maxLength={50} disabled={true} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} collapsible="icon">
                                <Panel header=" Doc Type and A/C head Mapping" key="1">
                                    <Divider />
                                    <DocTypeAcMappingMaster {...masterTaxChargeCalProp} />
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
