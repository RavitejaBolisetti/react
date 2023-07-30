/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { Button, Collapse, Form, Typography, Row, Col, Space, Input, Divider, DatePicker } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { DataTable } from 'utils/dataTable';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { expandIcon } from 'utils/accordianExpandIcon';
import { AggregateAddEditForm } from './AggregateAddEditForm';

import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { NoDataFound } from 'utils/noDataFound';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { setisEditing, isEditing, setIsReadOnly, isReadOnly } = props;
    const { AdvanceformData, setAdvanceformData, aggregateForm, checkListDataModified, setcheckListDataModified, handleButtonClick, CheckListModuletitle = 'CheckList Details' } = props;
    const { tableProps } = props;

    const AdvanceFilterProps = {
        ...props,
        isVisible: isReadOnly,
        setAdvanceSearchVisible: setIsReadOnly,
        titleOverride: (isEditing ? 'Edit ' : 'Add  ') + CheckListModuletitle,
        onCloseAction: () => {
            setIsReadOnly(false);
            aggregateForm.resetFields();
        },
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <DataTable {...tableProps} />
                </Col>
            </Row>
            <AggregateAddEditForm {...AdvanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
