/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Row, Col } from 'antd';

import { DataTable } from 'utils/dataTable';
import { AggregateAddEditForm } from './AggregateAddEditForm';

const AddEditFormMain = (props) => {
    const { isEditing, setIsReadOnly, isReadOnly } = props;
    const { aggregateForm, CheckListModuletitle = 'Checklist Details' } = props;
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
