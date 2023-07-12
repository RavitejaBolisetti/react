/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col } from 'antd';

import { tblPrepareColumns } from 'utils/tableCloumn';

import { withDrawer } from 'components/withDrawer';
import { ListDataTable } from 'utils/ListDataTable';
import { convertDate } from 'utils/formatDateTime';
import styles from '../../ChangeHistory/ChangeHistory.module.css';
const ChangeHistoryMain = (props) => {
    const { ChangeHistoryTermsConditionsData } = props;

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentTypeCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'languageDesc',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectiveFrom',
            width: '15%',
            render: (text) => convertDate(text),
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveTo',
            width: '15%',
            render: (text) => convertDate(text),
        }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'termsconditiondescription',
            width: '15%',
        })
    );

    const tableProps = {
        tableColumn,
        tableData: ChangeHistoryTermsConditionsData,
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div className={styles.changeHistoryContainer}>
                    <ListDataTable {...tableProps} />
                </div>
                </Col>
            </Row>
        </>
    );
};

export const ChangeHistory = withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' });
