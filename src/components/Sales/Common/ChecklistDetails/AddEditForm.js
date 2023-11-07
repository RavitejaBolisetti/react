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
    const { aggregateForm } = props;
    const { tableProps } = props;
    const CHECKLIST_MODEL_TITLE = useMemo(() => {
        let title = '';
        switch (isEditing) {
            case true: {
                title = MODEL_TITLE?.EDIT?.title;
                break;
            }
            case false: {
                title = MODEL_TITLE?.ADD?.title;
                break;
            }
            default: {
                title = MODEL_TITLE?.EDIT?.title;
                break;
            }
        }
        return title + ` ${MODEL_TITLE?.CHECKLIST_FORM?.title}`;
    }, [isEditing]);

    const onCloseAction = () => {
        setIsReadOnly(false);
        aggregateForm.resetFields();
    };

    const ModalFormProps = {
        ...props,
        isVisible: isReadOnly,
        setAdvanceSearchVisible: setIsReadOnly,
        titleOverride: CHECKLIST_MODEL_TITLE,
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
