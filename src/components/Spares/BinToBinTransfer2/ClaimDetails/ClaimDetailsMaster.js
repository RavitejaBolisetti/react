/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewDetail from './ViewDetail';
import { AddEditForm } from './AddEditForm';
import { DealerCorporateClaimFormButton } from '../CorporateClaimFormButton';

import { MODULE_TYPE_CONSTANTS } from 'constants/modules/vehicleChecklistConstants';
import styles from 'assets/sass/app.module.scss';
import { NEXT_ACTION } from 'utils/btnVisiblity';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;
    let returnValue = {
        userId,
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators({}, dispatch),
});

const ClaimDetailsMain = (props) => {
    const { userId, handleButtonClick, selectedRecord, setButtonData, defaultBtnVisiblity } = props;
    const { isChecklistDataLoading, specialClaimType } = props;
    const { showGlobalNotification } = props;
    const { form, selectedCheckListId, section, formActionType, handleFormValueChange, uniqueMatchKey } = props;

    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };
    const [page, setPage] = useState({ ...pageIntialState });
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [aggregateForm] = Form.useForm();
    const [AdvanceformData, setAdvanceformData] = useState([]);
    const [isEditing, setisEditing] = useState();

    useEffect(() => {
        setButtonData((prev) => ({ ...prev, claimInvoice: true, creditNote: true }));
    }, []);

    const onFinish = (data) => {
        handleButtonClick({ buttonAction: NEXT_ACTION });
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
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {!specialClaimType ? <ViewDetail {...formProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DealerCorporateClaimFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const ClaimDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(ClaimDetailsMain);
