/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Form, Row, Col, Card } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';

import { MODULE_TYPE_CONSTANTS } from 'constants/modules/vehicleChecklistConstants';
import styles from 'assets/sass/app.module.scss';
import ViewDetail from './ViewDetail';
import { MitraBrokerRegistrationMasterFormButton } from '../MitraBrokerRegistrationMasterFormButton';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Dealer Corporate Claims';

    let returnValue = {
        userId,
        typeData,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators({}, dispatch),
});

const ClaimApprovalRequestMain = (props) => {
    const { userId, handleButtonClick, selectedRecord } = props;
    const { isChecklistDataLoading, ChecklistData } = props;
    const { showGlobalNotification } = props;
    const { form, selectedCheckListId, section, formActionType, handleFormValueChange, NEXT_ACTION, paginationDataKey, uniqueMatchKey } = props;

    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };
    const [page, setPage] = useState({ ...pageIntialState });
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [aggregateForm] = Form.useForm();
    const [AdvanceformData, setAdvanceformData] = useState([]);
    const [isEditing, setisEditing] = useState();

    const onFinish = (data) => {
        console.log('🚀 ~ file: CorporateClaim.js:83 ~ onFinish ~ data:', data);
    };

    const formProps = {
        formActionType,
        showGlobalNotification,
        selectedCheckListId,
        form,
        handleFormValueChange,
        isReadOnly,
        setIsReadOnly,
        aggregateForm,
        AdvanceformData,
        setAdvanceformData,
        isEditing,
        setisEditing,
        page,
        setPage,
        pageIntialState,
        matchKey: uniqueMatchKey,
        isChecklistDataLoading,
        styles,
        checklistType: MODULE_TYPE_CONSTANTS?.RECEIPT_CHECKLIST?.key,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {/* <h2>{translateContent('vehicleReceiptChecklist.heading.section' + section?.id)}</h2> */}
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <ViewDetail {...formProps} />
                    {/* <AddEditForm {...formProps} /> */}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <MitraBrokerRegistrationMasterFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const ClaimApprovalRequestMaster = connect(mapStateToProps, mapDispatchToProps)(ClaimApprovalRequestMain);
