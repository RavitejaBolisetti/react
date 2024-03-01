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
import { translateContent } from 'utils/translateContent';
import { CalculateSum } from 'utils/calculateSum';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { isReadOnly, setIsReadOnly, record } = props;
    const { itemOptions, setitemOptions, styles } = props;
    const { formData, formActionType, handleCollapse, showGlobalNotification, selectedRecordId, openAccordian, setOpenAccordian, handleFormValueChange } = props;
    const { collapseProps, fetchInvoiceList, listInvoiceShowLoading, apportionTableData, setApportionTableData, documentTypeData, isDocumentTypeLoading, typeData, documentTypeOptions, setDocumentTypeOptions, isApportionDetailsLoading, voucherTableData } = props;

    const [apportionForm] = Form.useForm();

    const [isEditing, setisEditing] = useState(false);
    const [apportionTableFormData, setApportionTableFormData] = useState();

    const voucherModuleTitle = translateContent('creditDebitNote.ApportionDetails.heading.voucherModuleTitle');

    const addContactHandeler = () => {
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
        record,
        isApportionDetailsLoading,
        voucherTableData,
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
        record,
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
    const ApportionGreater = CalculateSum(apportionTableData, 'apportionAmount') >= CalculateSum(voucherTableData, 'amount');
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" onChange={() => handleCollapse('apportion')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong> {translateContent('creditDebitNote.ApportionDetails.heading.title')}</Text>
                                        <Button disabled={ApportionGreater} className={styles.marL5} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                            {translateContent('global.buttons.add')}
                                        </Button>
                                    </Col>
                                </Row>
                            }
                            key="apportion"
                        >
                            <Divider />
                            <DataTable tableColumn={tableColumn({ handleButtonClick, formActionType, documentTypeOptions })} scroll={{ x: 1000 }} tableData={apportionTableData} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <ApportionAddEditForm {...advanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
