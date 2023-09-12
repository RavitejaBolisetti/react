/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Col, Form, Row, DatePicker } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { NotificationDetailMaster } from './NotificationDetails';

import { prepareDatePickerText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { documentTypeLedgerDataActions } from 'store/actions/data/financialAccounting/documentTypeLedger';
import { showGlobalNotification } from 'store/actions/notification';

import { validateRequiredInputField } from 'utils/validation';
import { dateFormat, formatDateToCalenderDate } from 'utils/formatDateTime';
import { customSelectBox } from 'utils/customSelectBox';

import styles from 'assets/sass/app.module.scss';

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
    const { form, formData, onCloseAction, formActionType, formActionType: { viewMode } = undefined, onFinish, onFinishFailed, typeData, editForm } = props;
    const { buttonData, setButtonData, handleButtonClick, formEdit, setFormEdit } = props;
    const { data, productHierarchyList, viewVehicleAllotData, roleData } = props;
    // const { filterDesignationList, setFilterDesignationList, } = props;
    // const [openAccordian, setOpenAccordian] = useState(1);

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
                                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, placeholder: preparePlaceholderSelect('old model') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="New Model(Booking)" initialValue={formData?.newModelGroup} name="newModelGroup" rules={[validateRequiredInputField('New Model')]}>
                                        {customSelectBox({ data: productHierarchyList, fieldNames: { key: 'prodctCode', value: 'prodctShrtName' }, placeholder: preparePlaceholderSelect('new model') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Effective From Date" initialValue={formatDateToCalenderDate(formData?.effectiveFromDate)} name="effectiveFromDate">
                                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label="Effective To Date" initialValue={formatDateToCalenderDate(formData?.effectiveToDate)} name="effectiveToDate">
                                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            {/* <Collapse className={openAccordian === 1 ? styles.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon}>
                                <Panel header="Notification Details" key="1">
                                    <Divider />
                                    <NotificationDetailMaster {...props} />
                                </Panel>
                            </Collapse> */}

                            <Card style={{ backgroundColor: '#BEBEBE1A' }}>
                                <Row align="middle" justify="space-between" className={styles.marB20}>
                                    <NotificationDetailMaster {...props} />
                                </Row>
                            </Card>
                        </>
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};
export const AddEditForm = withDrawer(connect(mapStateToProps, mapDispatchToProps)(AddEditFormMain), {});
