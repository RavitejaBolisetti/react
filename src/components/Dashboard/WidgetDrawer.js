/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { withDrawer } from 'components/withDrawer';
import { Row, Col, Input, Collapse, Space, Typography, Button, Form } from 'antd';
import LeftPanel from 'components/common/LeftPanel';
import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DrawerFormButton } from 'components/common/Button';

const { Text } = Typography;
const { Panel } = Collapse;
const { Search } = Input;
const fieldNames = { title: 'label', key: 'key' };

let data = [
    { key: 1, label: 'sales' },
    { key: 2, label: 'Service' },
    { key: 3, label: 'others' },
];
const defaultBtnVisiblity = { editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: true, cancelBtn: false, formBtnActive: false };

const WidgetDrawerMain = (props) => {
    const { onCloseAction } = props;
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState('');
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const onFinish = () => {};
    const onCheck = (keys) => {
        setCheckedKeys(keys);
        setButtonData({ ...defaultBtnVisiblity, formBtnActive: true });
    };
    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const myProps = {
        fieldNames,
        treeData: data,
        searchValue,
        setSearchValue,
        checkable: true,
        selectable: false,
        checkedKeys,
        isTreeViewVisible: true,
        onCheck: onCheck,
        showLine: false,
    };
    const buttonProps = {
        onCloseAction,
        buttonData,
        setButtonData,
        // handleButtonClick,
    };
    const handleCollapse = () => {};
    const handleFormFieldChange = () => {};
    const onFinishFailed = (error) => {};

    return (
        <>
            <Form form={form} autoComplete="off" onValuesChange={handleFormFieldChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Collapse
                            bordered={false}
                            collapsible="icon"
                            expandIcon={expandIcon}
                            expandIconPosition={'end'}
                            // activeKey={activeKey}
                            onChange={handleCollapse}
                        >
                            <Panel
                                header={
                                    <Space direction="vertical">
                                        <Text>Sales</Text>
                                        {<Text type="secondary">A min of 4 option should be selected.</Text>}
                                    </Space>
                                }
                                key="1"
                            >
                                <div
                                // className={styles.prodMapTree}
                                >
                                    {/* <Search placeholder="Search" initialValue={searchValue} onChange={handleSearchValue} allowClear /> */}
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={`${styles.marB20}`}>
                                            <div className={styles.prodMapTree}>
                                                <LeftPanel {...myProps} />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Panel>
                        </Collapse>
                        <Collapse
                            bordered={false}
                            collapsible="icon"
                            expandIcon={expandIcon}
                            expandIconPosition={'end'}
                            // activeKey={activeKey}
                            onChange={handleCollapse}
                        >
                            <Panel
                                header={
                                    <>
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Text>Sales</Text>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                                <Text type="secondary">A min of 4 option should be selected.</Text>
                                            </Col>
                                        </Row>
                                    </>
                                }
                                key="1"
                            >
                                <div
                                // className={styles.prodMapTree}
                                >
                                    <LeftPanel {...myProps} />
                                </div>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </Form>
            <DrawerFormButton {...buttonProps} />
        </>
    );
};
const WidgetDrawer = withDrawer(WidgetDrawerMain, {});
export default WidgetDrawer;
