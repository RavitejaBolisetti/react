/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { GstAuthFormButton } from '../GSTAuthenticationFormButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tableColumn } from './tableColumn';
import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { dealerBranchAccessAction } from 'store/actions/data/financialAccounting/dealerBranchAccessAction';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            FinancialAccounting: {
                DealerBranchDetails: { data: dealerBranchData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('gstIRNAuthentication.gstBranchAccessibleMaster.heading.moduleTitle');

    let returnValue = {
        userId,
        moduleTitle,
        dealerBranchData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: dealerBranchAccessAction.fetchList,
            listShowLoading: dealerBranchAccessAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

const GstBranchAccessibleMasterBase = (props) => {
    const { userId, showGlobalNotification, section, fetchList, listShowLoading } = props;
    const { form, handleFormValueChange, dealerBranchData } = props;
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    const dealerBranchArray = [];
    dealerBranchData.forEach((item) => {
        if (item) {
            item.mapUnmap = translateContent('global.yesNo.yes');
            dealerBranchArray.push(item);
        }
    });

    const tableProps = {
        tableColumn: tableColumn(),
        tableData: dealerBranchArray, // dealerBranchData,
        showAddButton: false,
    };
    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    <ListDataTable {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <GstAuthFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};

export const GstBranchAccessibleMaster = connect(mapStateToProps, mapDispatchToProps)(GstBranchAccessibleMasterBase);
