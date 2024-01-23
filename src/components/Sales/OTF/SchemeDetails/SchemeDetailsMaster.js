/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Row, Col } from 'antd';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm, ViewDetail } from 'components/Sales/Common/SchemeDetails';

import styles from 'assets/sass/app.module.scss';

import { otfSchemeDetailDataActions } from 'store/actions/data/otf/schemeDetail';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },

            OTF: {
                SchemeDetail: { isLoaded: isDataLoaded = false, isLoading, data: schemeData = [] },
            },
        },
    } = state;

    let returnValue = {
        typeData,
        userId,
        isDataLoaded,
        schemeData,
        isLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfSchemeDetailDataActions.fetchList,
            listShowLoading: otfSchemeDetailDataActions.listShowLoading,
            resetData: otfSchemeDetailDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const SchemeDetailsMasterBase = (props) => {
    const { resetData, onCloseAction, fetchList, formActionType, userId, listShowLoading, showGlobalNotification } = props;
    const { form, selectedRecordId, section, handleFormValueChange, isLoading, NEXT_ACTION, handleButtonClick } = props;
    const { FormActionButton, StatusBar, setButtonData } = props;
    const [formData, setFormData] = useState();

    useEffect(() => {
        return () => {
            setFormData();
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    useEffect(() => {
        if (!isLoading && userId && selectedRecordId) {
            const extraParams = [
                {
                    key: 'otfId',
                    value: selectedRecordId,
                },
            ];
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecordId]);

    useEffect(() => {
        if (formActionType?.viewMode) {
            setButtonData((prev) => ({ ...prev, editBtn: false, nextBtn: true, saveBtn: false }));
        } else if (formActionType?.editMode) {
            setButtonData((prev) => ({ ...prev, editBtn: false, nextBtn: true, saveBtn: true }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    const viewProps = {
        styles,
        onCloseAction,
        formData,
        isLoading,
        ...props,
    };
    const myProps = {
        ...props,
        styles,
        formData,
    };

    const onFinish = () => {
        handleButtonClick({ buttonAction: NEXT_ACTION, onSave: true });
    };

    return (
        <Form layout="vertical" autoComplete="off" onFinish={onFinish} form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            {StatusBar && <StatusBar status={props?.selectedOrder?.orderStatus} />}
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...myProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <FormActionButton {...myProps} />
                </Col>
            </Row>
        </Form>
    );
};

export const SchemeDetailsMaster = connect(mapStateToProps, mapDispatchToProps)(SchemeDetailsMasterBase);
