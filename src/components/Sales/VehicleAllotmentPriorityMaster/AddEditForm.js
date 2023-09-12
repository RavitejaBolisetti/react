/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Card, Col, Form, Row, DatePicker, Divider, Space, Typography } from 'antd';   // Collapse
import { prepareDatePickerText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
// import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { documentTypeLedgerDataActions } from 'store/actions/data/financialAccounting/documentTypeLedger';
 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DrawerFormButton } from 'components/common/Button';
import { NotificationDetailMaster } from './NotificationDetails';

import { showGlobalNotification } from 'store/actions/notification';

import { validateRequiredInputField } from 'utils/validation';
 
import { disablePastDate } from 'utils/disableDate';
import styles from 'assets/sass/app.module.scss';
 import { customSelectBox } from 'utils/customSelectBox';
//import styles from 'components/common/Common.module.css';

// const { Panel } = Collapse;
const { Text } = Typography;
 

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
        //isDataLoaded,
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
 
    const { form, formData, onCloseAction, formActionType, formActionType: { viewMode } = undefined, onFinish, onFinishFailed, typeData,  } = props;
    const { buttonData, setButtonData, handleButtonClick,  } = props;
    const { data, productHierarchyList, viewVehicleAllotData, roleData, } = props;
    // const{ formEdit, setFormEdit, editForm} = props;
    // const { filterDesignationList, setFilterDesignationList, } = props;
    // const [openAccordian, setOpenAccordian] = useState(1);
    
    const getRoleName = (value) => {         
    return roleData?.find((i) => i?.key === value)?.value;
 };
    const getDesignationName = (value) => {       
    return data?.find((i) => i?.designationCode === value)?.designationDescription;
 };
 

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    // const handleCollapse = (key) => {
    //     setOpenAccordian((prev) => (prev === key ? '' : key));
    // };

    const viewProps = {
        isVisible: viewMode,
        formData: viewVehicleAllotData,
        styles,
        // vehiclePriority,
        typeData,
        formActionType,
        roleData,
        data,
        productHierarchyList,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
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
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Old Model(Exchange)" initialValue={formData?.oldModelGroup} name="oldModelGroup" rules={[validateRequiredInputField('Old Model')]}>
                                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, disabled: formActionType?.editMode ? true : false, placeholder: preparePlaceholderSelect('old model') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="New Model(Booking)" initialValue={formData?.newModelGroup} name="newModelGroup" rules={[validateRequiredInputField('New Model')]}>
                                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, disabled: formActionType?.editMode ? true : false, placeholder: preparePlaceholderSelect('new model') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Effective From Date" initialValue={formatDateToCalenderDate(formData?.effectiveFromDate)} name="effectiveFromDate">
                                        <DatePicker disabled={formActionType?.editMode ? true : false} disabledDate={disablePastDate} format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Effective To Date" initialValue={formatDateToCalenderDate(formData?.effectiveToDate)} name="effectiveToDate">
                                        <DatePicker disabled={formActionType?.editMode ? true : false} disabledDate={disablePastDate} format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/* <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon}>
                                <Panel header="Notification Details" key="1">
                                    <Divider />
                                    <NotificationDetailMaster {...props} />
                                </Panel>
                            </Collapse> */}
 
                            {formActionType.editMode === true && (
                                <>
                                {viewVehicleAllotData?.roleData?.map((item, index) => (
                                     <Card style={{ backgroundColor: '#BEBEBE1A' }}>
                                        <Row align="middle" justify="space-between" className={styles.marB20}>
                                            <Space>
                                            <Text> {getRoleName(item?.roleCode) }</Text>
                                                <Divider type="vertical" />
                                                <Text> {getDesignationName(item?.designationCode) }</Text>
                                            </Space> 
                                        </Row>
                                    </Card>
                                ))}
                                </>
                            )}
                            {formActionType.addMode === true && (
                                <Card style={{ backgroundColor: '#BEBEBE1A' }}>
                                    <Row align="middle" justify="space-between" className={styles.marB20}>
                                        <NotificationDetailMaster {...props} />
                                    </Row>
                                </Card>
                            )}
 
                        </>
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};
export const AddEditForm = withDrawer(connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain), {});
