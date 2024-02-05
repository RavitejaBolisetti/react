/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Card } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ViewDetail from './ViewDetail';
import styles from 'assets/sass/app.module.scss';
import { DealerCorporateClaimFormButton } from '../CorporateClaimFormButton';
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

const CreditNoteDetailMasterMain = (props) => {
    const { isChecklistDataLoading, setButtonData, defaultBtnVisiblity } = props;
    const { showGlobalNotification } = props;
    const { form, selectedCheckListId, section, formActionType, handleFormValueChange, uniqueMatchKey, handleButtonClick } = props;

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
        setButtonData((prev) => ({ ...defaultBtnVisiblity, attachDigitalSignature: true, generateIRN: true }));
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
                    <ViewDetail {...formProps} />
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
export const CreditNoteDetailMaster = connect(mapStateToProps, mapDispatchToProps)(CreditNoteDetailMasterMain);
