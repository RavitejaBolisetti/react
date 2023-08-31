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
import { VoucherAddEditForm } from './VoucherAddEditForm';
import { tableColumn } from './tableColumn';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { isReadOnly, setIsReadOnly, typeData } = props;
    const { itemOptions, setitemOptions } = props;
    const { formData, formActionType, handleCollapse, showGlobalNotification, selectedRecordId, openAccordian, setOpenAccordian, handleFormValueChange } = props;
    const { MakefieldNames, ItemFieldNames, bindCodeValue } = props;
    const { collapseProps, fetchFinancialAccountList, listFinanceShowLoading, voucherTableData, setVoucherTableData } = props;

    const [voucherForm] = Form.useForm();

    const [isEditing, setisEditing] = useState(false);
    const [voucherTableFormData, setVoucherTableFormData] = useState();
    const [isAccountHeadValidated, setIsAccountHeadValidated] = useState(true);

    const voucherModuleTitle = `Voucher`;

    const addContactHandeler = (e) => {
        voucherForm.resetFields();
        setOpenAccordian('voucher');
        setIsReadOnly(true);
        setIsAccountHeadValidated(true);
    };

    const handleCanceler = () => {
        setIsReadOnly(false);
        setisEditing(false);
        voucherForm.resetFields();
        setIsAccountHeadValidated(true);
    };

    const voucherFormProps = {
        handleCancel: handleCanceler,
        voucherForm,
        showGlobalNotification,
        selectedRecordId,
        formData,
        setOpenAccordian,
        addContactHandeler,
        handleFormValueChange,
        MakefieldNames,
        ItemFieldNames,
    };

    const advanceFilterProps = {
        ...voucherFormProps,
        voucherTableFormData,
        setVoucherTableFormData,
        voucherForm,
        isVisible: isReadOnly,
        titleOverride: (isEditing ? 'Edit ' : 'Add  ') + voucherModuleTitle,

        setAdvanceSearchVisible: setIsReadOnly,
        isEditing,
        setisEditing,
        onCloseAction: handleCanceler,
        typeData,
        itemOptions,
        setitemOptions,

        fetchFinancialAccountList,
        listFinanceShowLoading,
        voucherTableData,
        setVoucherTableData,
        isAccountHeadValidated,
        setIsAccountHeadValidated,
    };

    const handleEdit = ({ record, index }) => {
        setVoucherTableFormData({ ...record, index: index });
        voucherForm.resetFields();
        setOpenAccordian('voucher');
        setisEditing(true);
        setIsReadOnly(true);
    };

    const handleDelete = ({ index }) => {
        setVoucherTableData(voucherTableData.filter((element, i) => i !== index));
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
                    <Collapse collapsible="icon" onChange={() => handleCollapse('voucher')} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} {...collapseProps}>
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>Voucher Details</Text>
                                        <Button onClick={addContactHandeler} icon={<PlusOutlined />} type="primary">
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                            }
                            key="voucher"
                        >
                            <Divider />
                            <DataTable tableColumn={tableColumn({ handleButtonClick, formActionType, bindCodeValue })} tableData={voucherTableData} pagination={false} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <VoucherAddEditForm {...advanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
