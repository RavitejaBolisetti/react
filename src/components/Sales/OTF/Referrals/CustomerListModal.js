/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Button } from 'antd';

import { withModal } from 'components/withModal';
import { DataTable } from 'utils/dataTable';

import { tableColumn } from './tableColumn';

import styles from 'components/common/Common.module.css';

export const CustomerListBase = (props) => {
    const { data, handleResetFilter, setFormData, handleFormValueChange } = props;
    const [formBtnActive, setFormBtnActive] = useState(false);

    const handleSelectedData = (e) => {
        setFormData({ ...formBtnActive });
        handleResetFilter();
        handleFormValueChange();
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setFormBtnActive(selectedRows?.[0]);
        },
    };

    const tableProps = {
        srl: false,
        rowSelection: {
            type: 'radio',
            ...rowSelection,
        },
        pagination: false,
        isLoading: false,
        tableColumn,
        tableData: data,
    };

    return (
        <div className={styles.customerChooseContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <DataTable scroll={1000} pagination={false} {...tableProps} />
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    {/* <Button onClick={handleResetFilter} danger>
                        Close
                    </Button> */}
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary" onClick={handleSelectedData} disabled={!formBtnActive}>
                        Select
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export const CustomerListModal = withModal(CustomerListBase, { width: 800 });
