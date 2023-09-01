/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';

import { Button, Collapse, Form, Typography, Row, Col, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { DataTable } from 'utils/dataTable';
import { expandIcon } from 'utils/accordianExpandIcon';
import { ApportionAddEditForm } from './ApportionAddEditForm';
import { tableColumn } from './tableColumn';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { isReadOnly, setIsReadOnly } = props;
    const { itemOptions, setitemOptions } = props;
    const { formData, formActionType, handleCollapse, showGlobalNotification, selectedRecordId, openAccordian, setOpenAccordian, handleFormValueChange } = props;
    const { collapseProps, fetchInvoiceList, listInvoiceShowLoading, apportionTableData, setApportionTableData, documentTypeData, isDocumentTypeLoading, typeData, documentTypeOptions, setDocumentTypeOptions } = props;

    const [apportionForm] = Form.useForm();

    const [isEditing, setisEditing] = useState(false);
    const [apportionTableFormData, setApportionTableFormData] = useState();

    const voucherModuleTitle = `Apportion`;

    const addContactHandeler = (e) => {
        apportionForm.resetFields();
        setOpenAccordian('apportion');
        setIsReadOnly(true);
    };

    const handleCanceler = () => {
        setIsReadOnly(false);
        setisEditing(false);
        apportionForm.resetFields();
    };

    const apportionFormProps = {
        handleCancel: handleCanceler,
        apportionForm,
        showGlobalNotification,
        selectedRecordId,
        formData,
        setOpenAccordian,
        addContactHandeler,
        handleFormValueChange,
    };
    const advanceFilterProps = {
        ...apportionFormProps,
        fetchInvoiceList,
        listInvoiceShowLoading,
        apportionTableFormData,
        setApportionTableFormData,
        apportionForm,
        isVisible: isReadOnly,
        titleOverride: (isEditing ? 'Edit ' : 'Add ') + voucherModuleTitle,
        setAdvanceSearchVisible: setIsReadOnly,
        isEditing,
        setisEditing,
        onCloseAction: handleCanceler,
        itemOptions,
        setitemOptions,
        apportionTableData,
        setApportionTableData,
        documentTypeData,
        isDocumentTypeLoading,
        typeData,
        documentTypeOptions,
        setDocumentTypeOptions,
    };

    const handleEdit = ({ record, index }) => {
        setApportionTableFormData({ ...record, index: index });
        setOpenAccordian('apportion');
        apportionForm.resetFields();
        setisEditing(true);
        setIsReadOnly(true);
    };

    const handleDelete = ({ record, index }) => {
        setApportionTableData(apportionTableData.filter((element, i) => i !== index));
    };

    const handleButtonClick = ({ buttonAction, record, index }) => {
        switch (buttonAction) {
            case 'edit': {
                handleEdit({ record, index });
                break;
            }
            case 'delete': {
                handleDelete({ record, index });
                break;
            }
            default: {
                return;
            }
        }
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" onChange={() => handleCollapse('apportion')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Apportion Details</Text>
                                        <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                            }
                            key="apportion"
                        >
                            <Divider />
                            <DataTable tableColumn={tableColumn({ handleButtonClick, formActionType })} scroll={{ x: 1000 }} tableData={apportionTableData} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <ApportionAddEditForm {...advanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
