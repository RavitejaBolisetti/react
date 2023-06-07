import React, { useState, useEffect } from 'react';
import { Input, Form, Col, Row, Button, Select, DatePicker } from 'antd';

import { withDrawer } from 'components/withDrawer';
import { ListDataTable } from 'utils/ListDataTable';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';
import { convertDate } from 'utils/formatDateTime';
import { convertCalenderDate } from 'utils/formatDateTime';

const { Option } = Select;

const ChangeHistoryMain = (props) => {
    const { tableChangeHistoryProps } = props;
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <h3>Change History</h3>
                    <ListDataTable {...tableChangeHistoryProps} />
                </Col>
            </Row>
        </>
    );
};

export const ChangeHistory = withDrawer(ChangeHistoryMain, {});
