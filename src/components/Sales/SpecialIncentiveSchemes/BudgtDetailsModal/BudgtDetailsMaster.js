/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Button, Form } from 'antd';

import { withModal } from 'components/withModal';
import { DataTable } from 'utils/dataTable';

import { tableColumn } from './tableColumn';

import styles from 'assets/sass/app.module.scss';
import { SearchBox } from 'components/utils/SearchBox';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

export const BudgtDetailsBase = (props) => {
    const { data, handleSelectedData, setSelectedRowData, setButtonData, buttonData } = props;
    const [formBtnActive, setFormBtnActive] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchForm] = Form.useForm();

    const handleViewDetail = (e) => {
        // handleSelectedData();
        // setSelectedRows([]);
        setFormBtnActive(true);
        buttonData && setButtonData({ ...buttonData, formBtnActive: true });
    };
    const handleFormValueChange = () => {};

    const tableProps = {
        // srl: false,
        // rowKey: 'registrationNumber',
        // rowSelection: {
        //     type: 'radio',
        //     ...rowSelection,
        // },
        pagination: false,
        isLoading: false,
        tableColumn,
        tableData: data,
        scroll: { x: 1000, y: 'calc(100vh - 324px)' },
    };

    return (
        <>
            <Form layout="vertical" autoComplete="off" form={searchForm} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Budget Year'} name="budgetYear">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Budget Year' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Budget Month'} name="budgetMonth">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Budget Month' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={'Area'} name="area">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Area' || translateContent('customerMaster.placeholder.corporateName')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                        <Button data-testid="counter-text" type="primary" onClick={handleViewDetail} className={styles.marT30}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div className={styles.customerChooseContainer}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <DataTable pagination={false} {...tableProps} className={styles.dataTableScroll} />
                    </Col>
                </Row>
                {/* <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonsGroupRight}>
                    <Button data-testid="counter-text" htmlType="submit" type="primary" onClick={handleViewDetail} disabled={!formBtnActive}>
                        Select Customer
                    </Button>
                </Col>
            </Row> */}
            </div>
        </>
    );
};

export const BudgtDetailsMasterModal = withModal(BudgtDetailsBase, { width: 800 });
