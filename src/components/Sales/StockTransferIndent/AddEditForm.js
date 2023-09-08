/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Card, Collapse, Divider, Button, Typography } from 'antd';
import { FiPlus } from 'react-icons/fi';

import { withDrawer } from 'components/withDrawer';
import { VehicleDetailFormButton } from 'components/Sales/VehicleDetail/VehicleDetailFormButton';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon, accordianExpandIcon } from 'utils/accordianExpandIcon';
import { tableColumnVehicleDetails } from './tableColumnVehicleDetails';
import { DataTable } from 'utils/dataTable';

import styles from 'assets/sass/app.module.scss';


const { TextArea } = Input;
const { Panel } = Collapse;
const { Text } = Typography;

const AddEditFormMain = (props) => {

    const { formData } = props;
    const { otfTransferForm, onFinishOTFTansfer, otfStatusList, openAccordian, setOpenAccordian } = props;
    const { handleButtonClick, buttonData, setButtonData, onCloseAction } = props;
    const { activeKey, setActiveKey } = props;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };

    const handleCollapse = (key) => {
        // if (key !== 3 && isReadOnly) {
        //     setIsReadOnly(false);
        // }
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleAddVehicleDetails = () => {

    }

    const tableDataItem = [{
        "modelDescription" : "XUV003",
        "modelCode":"5765",
        "requestedQuantity":3,
        "cancelledQuantity" :0,
        "issuedNNotReceivedQuantity" : 0,
        "receivededQuantity":3,
        "balanceQuantity":3,
    }];

    const tableProps = {
        tableColumn: tableColumnVehicleDetails(false),
        tableData: tableDataItem,
        pagination: false,
    };

    return (
        <>
            <Form form={otfTransferForm} data-testid="test" onFinish={onFinishOTFTansfer} layout="vertical" autocomplete="off" colon="false">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card>
                            <Row gutter={24}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label="Indent To Parent" name="indentToParent">
                                        {customSelectBox({ data: otfStatusList, fieldNames: { key: 'key', value: 'desc' }, placeholder: preparePlaceholderSelect('') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label="Indent To Location" name="indentToLocation">
                                        {customSelectBox({ data: otfStatusList, fieldNames: { key: 'key', value: 'desc' }, placeholder: preparePlaceholderSelect('') })}
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Form.Item label="Requested by" name="requestedBY">
                                        {customSelectBox({ data: otfStatusList, fieldNames: { key: 'key', value: 'desc' }, placeholder: preparePlaceholderSelect('') })}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.textareaError}>
                                    <Form.Item name="remark" label="Remarks" >
                                        <TextArea maxLength={300} placeholder={preparePlaceholderText('Remarks')} showCount />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Row gutter={24}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}> 
                                <Collapse onChange={() => handleCollapse(1)} expandIconPosition="end" expandIcon={expandIcon} activeKey={openAccordian} collapsible="icon">
                                    <Panel key="1" header={
                                            <Row>
                                                Vehicle Details 
                                                <Col xs={14} sm={14} md={6} lg={6} xl={6}>
                                                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                            <Button type="primary" icon={<FiPlus/>} onClick={handleAddVehicleDetails}> Add </Button>
                                                        </Col>
                                                </Col>
                                            </Row>
                                        }
                                    >
                                        <Divider />
                                        <DataTable {...tableProps} />
                                        {/* <DataTable tableColumn={taxDetailsColumn()} tableData={formData['taxDetails']} pagination={false} /> */}
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                <VehicleDetailFormButton {...buttonProps} />
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '90%', footer: null });
