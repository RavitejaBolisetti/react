/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, createContext } from 'react';
import { Col, Input, Form, Row, Collapse, Switch, Divider } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { TaxAndChargesCalculationMaster } from './TaxAndChargesCalculation';
import { taxChargeCategoryDataActions } from 'store/actions/data/financialAccounting/taxChargesCategory';
import { customSelectBox } from 'utils/customSelectBox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

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
            fetchTaxChargeCategoryDetail: taxChargeCategoryDataActions.fetchDetail,
            listShowLoadingTaxChargeCategory: taxChargeCategoryDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ViewEditContext = createContext(null);

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType, formActionType: { editMode, viewMode } = undefined, isVisible, fetchTaxChargeCategoryDetail, userId, handleCodeFunction, taxChargeCategoryCodeData, onFinish, onFinishFailed, stateData, saleData, taxChargeCategoryTypeData, editForm, taxChargeCalForm, dropdownItems, setDropdownItems } = props;
    const { buttonData, setButtonData, handleButtonClick, formEdit, setFormEdit, taxChargeCalList, setTaxChargeCalList } = props;

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
                stateCode: taxCategory?.stateCode,
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
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label="Code" initialValue={formData?.taxCategoryCode} name="taxCategoryCode" rules={[validateRequiredInputField('Code')]}>
                                        <Input placeholder={preparePlaceholderText('Code')} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item label="Description" initialValue={formData?.taxCategoryDescription} rules={[validateRequiredInputField('Description')]} name="taxCategoryDescription">
                                        <Input placeholder={preparePlaceholderText('Description')} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item label="State" initialValue={taxCategory?.stateCode} name="stateCode" rules={[validateRequiredSelectField('State')]}>
                                        {customSelectBox({ data: stateData, fieldNames: { key: 'code', value: 'name' }, placeholder: preparePlaceholderSelect('State') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item label="Sale Type" initialValue={taxCategory?.saleType} name="saleType" rules={[validateRequiredSelectField('Sale Type')]}>
                                        {customSelectBox({ data: saleData, placeholder: preparePlaceholderSelect('Sale Type') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <Form.Item initialValue={editMode ? taxCategory?.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label="Status">
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} collapsible="icon">
                                <Panel header="Tax & Charges Calculation" key="1">
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
