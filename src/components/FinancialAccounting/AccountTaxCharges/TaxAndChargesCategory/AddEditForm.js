/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, createContext } from 'react';
import { Col, Input, Form, Row, Collapse, Switch, Divider } from 'antd';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { TaxAndChargesCalculationMaster } from './TaxAndChargesCalculation';
import { taxChargeCategoryDataActions } from 'store/actions/data/financialAccounting/taxChargesCategory';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                TaxChargesCategory: { detailData },
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
            fetchTaxChargeCategoryDetail: taxChargeCategoryDataActions.fetchData,
            listShowLoadingTaxChargeCategory: taxChargeCategoryDataActions.listShowLoading,
        },
        dispatch
    ),
});

export const ViewEditContext = createContext(null);

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType, formActionType: { editMode, viewMode } = undefined, isVisible, fetchTaxChargeCategoryDetail, userId, handleCodeFunction, taxChargeCategoryCodeData, onFinish, stateData, saleData, taxChargeCategoryTypeData, editForm, taxChargeCalForm, dropdownItems, setDropdownItems } = props;
    const { buttonData, setButtonData, handleButtonClick, formEdit, setFormEdit, taxChargeCalList, setTaxChargeCalList, isTaxCategoryCodeLoading, isConfigurableLoading, showGlobalNotification } = props;

    const [openAccordian, setOpenAccordian] = useState(1);
    const [taxCategory, setTaxCategory] = useState();

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
        if (formData?.id) {
            fetchTaxChargeCategoryDetail({
                setIsLoading: () => {},
                userId,
                extraParams: [
                    {
                        key: 'id',
                        value: formData?.id,
                    },
                ],
                onSuccessAction: (res) => {
                    setTaxCategory(res?.data);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        if (!viewMode) {
            form.setFieldsValue({
                taxCategoryCode: taxCategory?.taxCategoryCode,
                taxCategoryDescription: taxCategory?.taxCategoryDescription,
                gstStateCode: taxCategory?.gstStateCode,
                saleType: taxCategory?.saleType,
                status: taxCategory?.status,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taxCategory]);

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
        taxCategory,
        taxCharges: taxChargeCategoryTypeData,
        stateData,
        saleData,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const masterTaxChargeCalProp = {
        taxChargeCategoryTypeData,
        taxChargeCategoryCodeData,
        handleCodeFunction,
        form,
        editForm,
        isVisible,
        taxChargeCalForm,
        formEdit,
        setFormEdit,
        taxCategory,
        taxChargeCalList,
        setTaxChargeCalList,
        buttonData,
        setButtonData,
        viewMode,
        formActionType,
        dropdownItems,
        setDropdownItems,
        stateData,
        saleData,
        isTaxCategoryCodeLoading,
        isConfigurableLoading,
        showGlobalNotification,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label={translateContent('taxChargeCatagory.label.code')} initialValue={formData?.taxCategoryCode} name="taxCategoryCode" rules={[validateRequiredInputField(translateContent('taxChargeCatagory.label.code'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('taxChargeCatagory.label.code'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label={translateContent('taxChargeCatagory.label.description')} initialValue={formData?.taxCategoryDescription} rules={[validateRequiredInputField(translateContent('taxChargeCatagory.label.description'))]} name="taxCategoryDescription">
                                        <Input placeholder={preparePlaceholderText(translateContent('taxChargeCatagory.label.description'))} maxLength={50} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={editMode ? taxCategory?.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('taxChargeCatagory.label.status')}>
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} collapsible="icon" data-testId="collapse_icon">
                                <Panel header={translateContent('taxChargeCatagory.heading.panelHeader')} key="1">
                                    <Divider />
                                    <ViewEditContext.Provider value={viewMode}>
                                        <TaxAndChargesCalculationMaster {...masterTaxChargeCalProp} />
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
