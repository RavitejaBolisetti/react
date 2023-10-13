/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useMemo } from 'react';
import { Row, Col } from 'antd';

import { ModalForm } from './ModalForm';
import { MODEL_TITLE } from './Constants';
import { ListDataTable } from 'utils/ListDataTable';

const AddEditFormMain = (props) => {
    const { isEditing, setIsReadOnly, isReadOnly } = props;
    const { aggregateForm, CheckListModuletitle = 'Checklist Details' } = props;
    const { tableProps } = props;
    const ChecklistFormTitle = useMemo(() => {
        switch (isEditing) {
            case true: {
                return MODEL_TITLE?.EDIT?.title;
            }
            case false: {
                return MODEL_TITLE?.ADD?.title;
            }
            default: {
                return MODEL_TITLE?.EDIT?.title;
            }
        }
    }, [isEditing]);

    const onCloseAction = () => {
        setIsReadOnly(false);
        aggregateForm.resetFields();
    };

    const ModalFormProps = {
        ...props,
        isVisible: isReadOnly,
        setAdvanceSearchVisible: setIsReadOnly,
        titleOverride: ChecklistFormTitle.concat(CheckListModuletitle),
        onCloseAction,
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <ModalForm {...ModalFormProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
