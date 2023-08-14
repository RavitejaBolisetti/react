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
import styles from 'components/common/Common.module.css';

import { convertDateMonthYear } from 'utils/formatDateTime';
const ChangeHistoryMain = (props) => {
    const { ChangeHistoryTermsConditionsData, onCloseAction } = props;

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productName',
            width: '15%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentTypeCode',
            width: '15%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Language',
            dataIndex: 'languageDesc',
            width: '10%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Effective From',
            dataIndex: 'effectivefrom',
            width: '18%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Effective To',
            dataIndex: 'effectiveto',
            width: '18%',
            render: (text) => convertDateMonthYear(text),
            sorter: false,
        }),
        tblPrepareColumns({
            title: 'Version',
            dataIndex: 'version',
            width: '7%',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Description',
            dataIndex: 'termsconditiondescription',
            width: '15%',
            sorter: false,
        })

        // tblActionColumn({ handleButtonClick, styles, fixed: 'right', width: '10%' })
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
                            Close
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const ChangeHistory = withDrawer(ChangeHistoryMain, { title: 'Change History', width: '90%' });
