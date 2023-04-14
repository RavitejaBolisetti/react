import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import { Drawer, Input, Form, Col, Row, Switch, Button, Space, Modal, Collapse, Tree, Checkbox, Tabs, Descriptions } from 'antd';
import { PlusOutlined, MinusOutlined, DownOutlined, SmileOutlined, MehOutlined, FrownFilled, FrownOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';
import { FaSquare } from 'react-icons/fa';
import { BiCheckboxSquare } from 'react-icons/bi';
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiOutlineCheck, AiOutlineBorder } from 'react-icons/ai';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from '../DrawerAndTable.module.css';
import style from './RoleManagement.module.css';
import { ViewRoleManagement } from './ViewRoleManagement';

// import mocktreeData from './treeData.json';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Search } = Input;

const children = [
    {
        title: 'Upload',
        key: 'Upload-1',
    },
    {
        title: 'View',
        key: 'View-1',
    },

    {
        title: 'Delete',
        key: 'Delete-1',
    },
    {
        title: 'Read',
        key: 'Read-1',
    },
    {
        title: 'Create',
        key: 'Create-1',
    },
    {
        title: 'Update',
        key: 'Update-1',
    },
];
const options = {
    subApplicationMaster1: [
        {
            label: 'Read',
            value: 'Read',
            checkable: false,
        },
        {
            label: 'View',
            value: 'View',
            checkable: true,
        },
        {
            label: 'Update',
            value: 'Update',
            checkable: true,
        },
        {
            label: 'Delete',
            value: 'Delete',
        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ],
    applicationCriticalityGroup1: [
        {
            label: 'Read',
            value: 'Read',
            Read: true,
        },
        {
            label: 'View',
            value: 'View',
            View: true,
        },
        {
            label: 'Update',
            value: 'Update',
            Update: false,
        },
        {
            label: 'Delete',
            value: 'Delete',
        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ],
    subApplicationMaster2: [
        {
            label: 'Read',
            value: 'Read',
            Read: true,
            checkable: true,
        },
        {
            label: 'View',
            value: 'View',
            View: true,
            checkable: true,
        },
        {
            label: 'Update',
            value: 'Update',
            Update: false,
            checkable: true,
        },
        {
            label: 'Delete',
            value: 'Delete',
            Delete: true,
        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ],
};
const Allselect = ['Read', 'View', 'Update', 'Delete', 'Create', 'Upload'];

const options2 = [
    {
        label: 'Delete',
        value: 'Delete',
    },
    {
        label: 'Create',
        value: 'Create',
    },
    {
        label: 'Upload',
        value: 'Upload',
    },
];
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
                        // children: [
                        //     {
                        //         isLeaf: true,
                        //         checkable: false,
                        //     },
                        // ],
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
                                // children: [
                                //     {
                                //         isLeaf: true,
                                //         checkable: false,
                                //     },
                                // ],
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

const insertionData = {
    children: [
        {
            isLeaf: true,
            checkable: false,
        },
    ],
};

const mockData = [
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
                            { value: 'Upload-1', label: 'Upload-1' },
                            { value: 'Delete-1', label: 'Delete-1' },
                            { value: 'Read-1', label: 'Read-1' },
                            { value: 'Create-1', label: 'Create-1' },
                            { value: 'Update-1', label: 'Update-1' },
                            { value: 'View-1', label: 'View-1' },
                        ],
                    },
                ],
            },
        ],
    },
];
const DrawerUtil = ({ form, viewProps,viewData, handleAdd, formBtnDisable, isLoadingOnSave, saveBtn, saveAndSaveNew, setIsReadOnly, isReadOnly, handleUpdate2, setFormBtnDisable, onFinish, formActionType, openDrawer, setOpenDrawer, setsaveclick, footerEdit }) => {
  
    const disabledProps = { disabled: isReadOnly };

    // const [selectedActions, setSelectedActions] = useState({})
    const [ParentCheck, setParentCheck] = useState();
    const Mychildren = [
        {
            label: 'Read',
            value: 'Read',
        },
        {
            label: 'View',
            value: 'View',
        },
        {
            label: 'Update',
            value: 'Update',
        },
        {
            label: 'Delete',
            value: 'Delete',
        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ];
    const StateMangement = {
        Common: [],
        Common1: [],
    };
    // const disabledProps = { disabled: false };
    const [treeData, settreeData] = useState([]);
    const [SelectedKeys, setSelectedKeys] = useState();
    const [CheckedKeys, setCheckedKeys] = useState();
    const [ExpandedKeys, setExpandedKeys] = useState();
    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add New Role';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Role Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Role Details';
    }
    useEffect(() => {
        if (!treeData.length) {
            Subpanel(mocktreeData);
        }
    }, []);

    useEffect(() => {
        function Subpanel(node) {
            if (!node?.children) {
                // setTreeData([{ ...node, children: Mychildren }]);
                console.log('node==>', node);
                return;
            }
            if (node?.children) {
                node?.children.forEach((child) => {
                    Subpanel(child);
                });
            }
        }

        console.log('treeData', treeData);
    }, []);

    function Subpanel(arr) {
        const result = arr.map((row) => {
            if (row.children && row.children.length) {
                const children = Subpanel(row.children);
                return { ...row, children };
            } else {
                console.log('key', row);
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

    console.log('mockData insertionData', mockData);

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onFinishFailed = () => {};
    const Title = (props) => {
        console.log('render');
        return <span className={style.placement}>{props.title}</span>;
    };
    const Paneldata = (data) => {
        return data?.map((subData) => {
            Subpanel(subData);

            function Subpanel(node) {
                if (!node?.children) {
                    return (
                        <Button onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                            Save
                        </Button>
                    );
                }
                node?.children.forEach((child) => {
                    Subpanel(child);
                });
                {
                    return (
                        <Collapse>
                            <Panel header={node?.title}></Panel>
                        </Collapse>
                    );
                }
            }
        });

        // return (
        //     <Collapse expandIcon={() => <PlusOutlined />}>
        //         <Panel header={node?.title}></Panel>
        //     </Collapse>
        // );
    };

    function updatedTreeData(arr, key) {
        const result = arr.map((row) => {
            if (row.children && row.children.length && row.children.key === key) {
                const children = updatedTreeData(row.children);
                return { ...row, children };
            } else {
                console.log('key', row);
                return {
                    ...row,
                    checkable: true,
                    children: [
                        {
                            isLeaf: true,
                            checkable: false,
                            key: row.key,
                        },
                    ],
                };
            }
        });
        settreeData(result);
        return result;
    }

    const onTreeCheck = (checked, targetNode) => {
        setCheckedKeys(checked);
        console.log('onTreeSelect', checked, targetNode);
    };
    const OnChanges = (value) => {
        console.log('this is the Change in the Tree =>>>>>', value);
    };
    const OnExpanded = (expanded, targetNode) => {
        //  StateMangement.expanded[0]=expanded;
        let ExpandVals = [];
        for (const [key, value] of Object.entries(expanded)) {
            if (key === 0) {
                ExpandVals.push(value);
            }
        }
        console.log('This is the data : ', typeof expanded, 'dasdasd');

        setExpandedKeys(expanded);
        console.log('This is the data : ', typeof expanded, 'dasdasd');
    };
    const CheckboxUtil = ({ upload, view, del, read, create, update, key }) => {
        return (
            <>
                {' '}
                <Form.Item
                    name="remember"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                    {console.log('Mein aagaya')}
                </Form.Item>
            </>
        );
    };
    const AccordianTreeUtils = (data) => {
        return (
            <>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    {data?.map((el) => (
                        <Collapse expandIcon={() => <PlusOutlined />}>
                            <Panel header={el?.label}>
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
                                                expanded={ExpandedKeys}
                                                checked={CheckedKeys}
                                                onCheck={onTreeCheck}
                                                onExpand={OnExpanded}
                                                onMoveNode={OnChanges}
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
    const onClose = () => {
        setOpenDrawer(false);
        setFormBtnDisable(false);
        setIsReadOnly(false);

        form.resetFields();
    };

    return (
        <>
            <Drawer
                title={drawerTitle}
                width="540"
                placement="right"
                onClose={onClose}
                open={openDrawer}
                maskClosable={false}
                className={footerEdit ? styles.viewMode : styles.drawerCriticalityGrp}
                footer={
                    <>
                        <Row gutter={20}>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                <Button danger onClick={onClose} className={styles.cancelBtn}>
                                    {formActionType === 'view' ? 'Close' : 'Cancel'}
                                </Button>
                            </Col>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={styles.saveBtn}>
                                {saveAndSaveNew ? (
                                    <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                        Save & Add New
                                    </Button>
                                ) : (
                                    ''
                                )}
                                {saveBtn ? (
                                    <Button loading={isLoadingOnSave} onClick={() => setsaveclick(true)} disabled={!formBtnDisable} form="myForm" key="submit" htmlType="submit" type="primary">
                                        Save
                                    </Button>
                                ) : (
                                    ''
                                )}
                                {footerEdit ? (
                                    <Button onClick={handleUpdate2} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                        Edit
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </Col>
                        </Row>
                    </>
                }
            >
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                    <Form id="myForm" form={form} onFieldsChange={handleForm} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="roleId" label="Role Id" rules={[{ max: 6, message: 'Code must be less than 6 characters long.' }, validateRequiredInputField('Code')]}>
                                    {!footerEdit ? <Input maxLength={6} placeholder={preparePlaceholderText('Code')} {...disabledProps} /> : <p className={styles.viewModeText}>{form.getFieldValue('roleId')}</p>}
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="roleName" label="Role Name" rules={[{ max: 50, message: 'Name must be less than 50 characters.' }, validateRequiredInputField('Name')]}>
                                    {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} /> : <p className={styles.viewModeText}>{form.getFieldValue('roleName')}</p>}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item
                                    label="Role Description"
                                    name="roleDesceription"
                                    rules={[
                                        { max: 250, message: 'Role Description cannot be more than 250 characters.' },
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    {!footerEdit ? (
                                        <TextArea
                                            placeholder={preparePlaceholderText('Name')}
                                            autoSize={{
                                                minRows: 2,
                                                maxRows: 5,
                                            }}
                                            maxLength={250}
                                            {...disabledProps}
                                        />
                                    ) : (
                                        <p className={styles.viewModeText}>{form.getFieldValue('roleDesceription')}</p>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="activeIndicator" label="Status" valuePropName="checked">
                                    {!footerEdit ? <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} /> : <>{form.getFieldValue('activeIndicator') === 1 ? <div className={style.activeText}>Active</div> : <div className={style.InactiveText}>Inactive</div>}</>}
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

                        {/* <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                {AccordianTreeUtils(FinalTreedata)}
                            </Col>
                        </Row> */}
                    </Form>
                </Space>
            </Drawer>
        </>
    );
};

export default DrawerUtil;
