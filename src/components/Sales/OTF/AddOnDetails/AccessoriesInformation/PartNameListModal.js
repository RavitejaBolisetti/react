/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Button } from 'antd';

import { withModal } from 'components/withModal';
import { DataTable } from 'utils/dataTable';

import { addOnTable } from './tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const PartNameListBase = (props) => {
    const { data, handleSelectedData, setSelectedRowData } = props;
    const [formBtnActive, setFormBtnActive] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const handleViewDetail = (e) => {
        handleSelectedData();
        setSelectedRows([]);
        setFormBtnActive(true);
    };
    const rowSelection = {
        selectedRowKeys: selectedRows.map((row) => row?.['partNumber']),
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
            setFormBtnActive(true);
            setSelectedRowData(selectedRows?.[0]);
        },
    };

    const tableProps = {
        srl: false,
        rowKey: 'partNumber',
        rowSelection: {
            type: 'radio',
            ...rowSelection,
        },
        pagination: false,
        isLoading: false,
        tableColumn: addOnTable(),
        tableData: data,
        scroll: { x: 1000, y: 'calc(100vh - 324px)' },
    };

    return (
        <div className={styles.customerChooseContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DataTable pagination={false} {...tableProps} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonsGroupRight}>
                    <Button data-testid="counter-text" htmlType="submit" type="primary" onClick={handleViewDetail} disabled={!formBtnActive}>
                        {translateContent('bookingManagement.button.selectPart')}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export const PartNameListModal = withModal(PartNameListBase, { width: 800 });
