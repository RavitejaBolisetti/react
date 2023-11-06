/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Button } from 'antd';

import { tblPrepareColumns } from 'utils/tableColumn';
import { withDrawer } from 'components/withDrawer';
import { ListDataTable } from 'utils/ListDataTable';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const ChangeHistoryMain = (props) => {
    const { ChangeHistoryTermsConditionsData, onCloseAction } = props;

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('termConditionDealer.changeHistory.productName'),
            dataIndex: 'productName',
            width: '15%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: translateContent('termConditionDealer.changeHistory.documentTypeCode'),
            dataIndex: 'documentTypeCode',
            width: '15%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: translateContent('termConditionDealer.changeHistory.languageDesc'),
            dataIndex: 'languageDesc',
            width: '15%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: translateContent('termConditionDealer.changeHistory.effectivefrom'),
            dataIndex: 'effectivefrom',
            width: '15%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),
        tblPrepareColumns({
            title: translateContent('termConditionDealer.changeHistory.effectiveto'),
            dataIndex: 'effectiveto',
            width: '15%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),
        tblPrepareColumns({
            title: translateContent('termConditionDealer.changeHistory.version'),
            dataIndex: 'version',
            width: '15%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: translateContent('termConditionDealer.changeHistory.termsconditiondescription'),
            dataIndex: 'termsconditiondescription',
            width: '15%',
            sorter: false,
        })
    );

    const tableProps = {
        tableColumn,
        tableData: ChangeHistoryTermsConditionsData,
        scroll: { x: '100%', y: 'calc(100vh - 320px)' },
    };
    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <div className={styles.formFooter}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.close')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const ChangeHistory = withDrawer(ChangeHistoryMain, { title: translateContent('global.changeHistory.title'), width: '90%' });
