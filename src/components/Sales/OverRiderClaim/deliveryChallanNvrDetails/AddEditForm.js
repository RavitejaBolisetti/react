/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Space, Collapse, Divider, Switch, Button, Typography } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { PlusOutlined } from '@ant-design/icons';
import { expandIcon } from 'utils/accordianExpandIcon';
import { addToolTip } from 'utils/customMenuLink';
import { ListDataTable } from 'utils/ListDataTable';
import { AggregateAddEditForm } from './AggregateAddEditForm';
import { LANGUAGE_EN } from 'language/en';
import { tableColumn } from './tableCoulmn';

const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {
    const { formData, formActionType, bindCodeValue } = props;

    const isReadOnly = formActionType?.viewMode;
    const [aggregateForm] = Form.useForm();
    const [openAccordian, setOpenAccordian] = useState('Aggregates');

    const [nvrDetailList, setNvrDetailList] = useState([]);
    const [isEditing, setisEditing] = useState(false);
    const [AdvanceformData, setAdvanceformData] = useState();
    const [page, setPage] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? ' ' : key));
    };

    const addContactHandeler =()=> {
        setIsVisible(true);
    }
    const handleCancel = () => {
        setIsVisible(false);

    };
    const handleButtonClick = (data) => {
        console.log("🚀 ~ file: AddEditForm.js:50 ~ handleButtonClick ~ data:", data)
        return {
    }
    };

    const ListDatatableProps = {
        dynamicPagination: true,
        totalRecords: nvrDetailList?.length,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, formActionType, bindCodeValue }),
        tableData: nvrDetailList,
        showAddButton: false,
        handleAdd: () => {},
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        filterString: page,
    };

    const advanceFilterProps = {
        aggregateForm,
        isVisible,
        setIsVisible,
        setisEditing,
        isEditing,
        handleCancel,
        onCloseAction: handleCancel,
        titleOverride: ''
    };

    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse onChange={() => handleCollapse('Aggregates')} expandIconPosition="end" collapsible="icon" expandIcon={expandIcon} activeKey={openAccordian}>
                        <Panel
                            header={
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Text strong>{translateContent('vehicleDetail.productDetails.heading.aggregateTitle')}</Text>
                                        {/* {!formData?.productAttributeDetail &&
                                            addToolTip(
                                                'No product Attribute Details Present',
                                                'bottom'
                                            )(
                                                <Button className={styles.marL10} data-testid="addBtn" onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly || !formData?.productAttributeDetail}>
                                                    Add
                                                </Button>
                                            )}
                                        {formData?.productAttributeDetail && ( */}
                                            <Button className={styles.marL10} onClick={addContactHandeler} icon={<PlusOutlined />} type="primary" disabled={isReadOnly }>
                                                Add
                                            </Button>
                                        {/* )} */}
                                    </Col>
                                </Row>
                            }
                            key="Delivery Challan/EVR"
                        >
                            <Divider />
                            <ListDataTable {...ListDatatableProps} />
                            {/* <DataTable tableColumn={tableColumn({ handleButtonClick, formActionType, bindCodeValue, ITEM_TYPE })} tableData={optionalServices} pagination={false} /> */}
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <AggregateAddEditForm {...advanceFilterProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
