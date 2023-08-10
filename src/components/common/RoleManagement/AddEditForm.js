/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { Input, Form, Col, Row, Switch, Button, Space, Collapse, Tabs } from 'antd';
import { FaSquare } from 'react-icons/fa';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineCheck } from 'react-icons/ai';

import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

import { withDrawer } from 'components/withDrawer';
import { ViewRoleManagement } from './ViewRoleManagement';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Search } = Input;

const mocktreeData = [
    {
        title: 'Common',
        key: 'common',

        children: [
            {
                title: 'Application Master',
                key: 'ApplicationMaster1',
                children: [
                    {
                        title: 'Sub Application Master',
                        key: 'subApplicationMaster1',
                    },
                ],
            },
            {
                title: 'Application Criticality Group',
                key: 'applicationCriticalityGroup1',
                children: [
                    {
                        title: 'Application Master',
                        key: 'ApplicationMaster2',
                        children: [
                            {
                                title: 'Sub Application Master',
                                key: 'subApplicationMaster2',
                            },
                        ],
                    },
                    {
                        title: 'Application Criticality Group',
                        key: 'applicationCriticalityGroup2',
                        children: [
                            {
                                title: 'dummy1',
                                key: 'dummy-1',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Geographical Hierarchy',
                key: 'geographicalHierarchy',
                children: [
                    {
                        title: 'dummy2',
                        key: 'dummy990',
                    },
                ],
            },
            {
                title: 'Product Hierarchy',
                key: 'commonProductHierarchy',
                children: [
                    {
                        title: 'dummy3',
                        key: 'dummy3',
                    },
                ],
            },
        ],
    },
];

const FinalTreedata = [
    {
        value: 'Common',
        label: 'Common',
        children: [
            {
                label: 'Application Master',
                value: 'ApplicationMaster1',
                children: [
                    {
                        label: 'Sub Application Master',
                        value: 'subApplicationMaster1',
                        children: [
                            { value: 'Upload', label: 'Upload' },
                            { value: 'Delete', label: 'Delete' },
                            { value: 'Read', label: 'Read' },
                            { value: 'Create', label: 'Create' },
                            { value: 'Update', label: 'Update' },
                            { value: 'View', label: 'View' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        value: 'Common1',
        label: 'Financial Accounting',
        children: [
            {
                label: 'Application Master-1',
                value: 'ApplicationMaster1-1',
                children: [
                    {
                        label: 'Sub Application Master-1',
                        value: 'subApplicationMaster1-1',
                        children: [
                            { value: 'Upload-1', label: 'Upload' },
                            { value: 'Delete-1', label: 'Delete' },
                            { value: 'Read-1', label: 'Read' },
                            { value: 'Create-1', label: 'Create' },
                            { value: 'Update-1', label: 'Update' },
                            { value: 'View-1', label: 'View' },
                        ],
                    },
                ],
            },
        ],
    },
];
const AddEditFormMain = (props) => {
    const { setClosePanels, showSaveBtn, formData, isFormBtnActive, onCloseAction, setFormBtnActive, handleEditData, MenuAlteredData, form, isReadOnly, onFinish, footerEdit, setSaveAndAddNewBtnClicked, isViewModeVisible } = props;

    const StateMangement = {
        Common: [],
        Common1: [],
    };

    const [treeData, settreeData] = useState([]);
    const [CheckedKeys, setCheckedKeys] = useState();
    const [ExpandedKeys, setExpandedKeys] = useState({});

    useEffect(() => {
        if (!treeData.length) {
            Subpanel(mocktreeData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const withCheck = {};
        const withExpanded = {};
        MenuAlteredData?.forEach((el) => {
            withCheck[el?.value] = [];
            withExpanded[el?.value] = [];
        });
        setCheckedKeys(withCheck);
        setExpandedKeys(withExpanded);
    }, [MenuAlteredData]);

    function Subpanel(arr) {
        const result = arr.map((row) => {
            if (row.children && row.children.length) {
                const children = Subpanel(row.children);
                return { ...row, children };
            } else {
                return {
                    ...row,
                    checkable: true,
                    children: [
                        {
                            isLeaf: true,
                            checkable: false,
                            dataIndex: row.key,
                        },
                    ],
                };
            }
        });
        settreeData(result);
        return result;
    }

    const handleFormValueChange = () => {
        setFormBtnActive(true);
    };

    const handleFormFieldChange = () => {
        setFormBtnActive(true);
    };

    const onFinishFailed = () => {};

    const onTreeCheck = (checked, targetNode, value) => {
        setCheckedKeys({ ...CheckedKeys, [value]: checked });
    };

    const OnExpanded = (expanded, targetNode, value) => {
        let ExpandVals = [];
        for (const [key, value] of Object.entries(expanded)) {
            if (key === '0') {
                ExpandVals.push(value);
            }
        }
        StateMangement[expanded[0]] = expanded;
        setExpandedKeys({ ...ExpandedKeys, [value]: expanded });
    };

    const AccordianTreeUtils = (data) => {
        return (
            <>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {MenuAlteredData?.map((el) => (
                        <Collapse expandIcon={() => <AiOutlinePlusSquare style={{ width: '16px', height: '16px' }} />}>
                            <Panel header={el?.menuTitle}>
                                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                            <Search
                                                placeholder="Search"
                                                style={{
                                                    width: '100%',
                                                }}
                                                allowClear
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                            <CheckboxTree
                                                nodes={[el]}
                                                expanded={ExpandedKeys[el?.value]}
                                                checked={!!CheckedKeys[el?.value]}
                                                onCheck={(checked, targetNode) => onTreeCheck(checked, targetNode, el?.value)}
                                                onExpand={(expanded, targetNode) => OnExpanded(expanded, targetNode, el?.value)}
                                                // onMoveNode={OnChanges}
                                                title={{
                                                    label: 'name',
                                                    value: 'code',
                                                    children: 'items',
                                                }}
                                                icons={{
                                                    check: <AiOutlineCheck style={{ width: '8px', height: '8px', color: '#EA3A51', border: ' 1px solid #B5B5B6', padding: '3px', borderRadius: '5px' }} />,
                                                    uncheck: <div style={{ width: '14px', height: '14px', color: '#EA3A51', border: ' 1px solid #B5B5B6', borderRadius: '4px' }} />,
                                                    halfCheck: <FaSquare style={{ width: '10px', height: '10px', color: '#FF3E5B', border: ' 1px solid #B5B5B6', borderRadius: '5px', padding: '2px' }} />,
                                                    expandClose: <AiOutlinePlusSquare style={{ width: '18px', height: '18px', color: '#EA3A51' }} />,
                                                    expandOpen: <AiOutlineMinusSquare style={{ width: '18px', height: '18px', color: '#EA3A51' }} />,
                                                    expandAll: <span className="rct-icon rct-icon-expand-all" />,
                                                    collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                                                    parentClose: '',
                                                    parentOpen: '',
                                                    leaf: '',
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Space>
                            </Panel>
                        </Collapse>
                    ))}
                </Space>
            </>
        );
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        setClosePanels,
        formData,
        viewStyle: styles,
    };

    return (
        <>
            <Form form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                <Row gutter={20} className={styles.drawerBody}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {!isViewModeVisible ? (
                            <>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={formData?.roleId} name="roleId" label="Role Id" rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]}>
                                            <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={formData?.roleName} name="roleName" label="Role Name" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpaceHyphenPeriod('name')]}>
                                            <Input maxLength={50} placeholder={preparePlaceholderText('name')} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item initialValue={formData?.roleDesceription} label="Role Description" name="roleDesceription" rules={[validateRequiredInputField('description')]}>
                                            <TextArea
                                                placeholder={preparePlaceholderText('description')}
                                                autoSize={{
                                                    minRows: 2,
                                                    maxRows: 5,
                                                }}
                                                maxLength={300}
                                                disabled={isReadOnly}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={formData?.activeIndicator} labelAlign="left" wrapperCol={{ span: 24 }} name="activeIndicator" label="Status">
                                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" value={formData?.activeIndicator} disabled={isReadOnly} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <hr />
                                <Tabs
                                    defaultActiveKey="1"
                                    items={[
                                        {
                                            label: 'Web',
                                            key: '1',
                                            children: AccordianTreeUtils(FinalTreedata),
                                        },

                                        {
                                            label: 'Mobile',
                                            key: '2',
                                            children: '',
                                        },
                                    ]}
                                />
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        {AccordianTreeUtils(FinalTreedata)}
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <ViewRoleManagement {...viewProps} />
                        )}
                    </Col>
                </Row>
                <div className={styles.formFooter}>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                            <Button danger onClick={onCloseAction}>
                                {footerEdit ? 'Close' : 'Cancel'}
                            </Button>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            {!footerEdit && showSaveBtn && (
                                <Button disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(false)} htmlType="submit" type="primary">
                                    Save
                                </Button>
                            )}

                            {!formData?.id && (
                                <Button htmlType="submit" disabled={!isFormBtnActive} onClick={() => setSaveAndAddNewBtnClicked(true)} type="primary">
                                    Save & Add New
                                </Button>
                            )}

                            {footerEdit && (
                                <Button onClick={handleEditData} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                    Edit
                                </Button>
                            )}
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
