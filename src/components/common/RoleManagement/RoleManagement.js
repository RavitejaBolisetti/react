import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Space, Table, List, Drawer, Switch, Collapse, Checkbox, Card, Tree, Divider } from 'antd';

import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import styles from 'pages/common/Common.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import './RoleManagement.module.css';
import { validateEmailField } from 'utils/validation';
import treeData from './Treedata.json';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        geoData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});
const Roledataset = ['Shakambhar'];
export const RoleManagementMain = ({ userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [validatetrees, setValidatetrees] = useState(false);

    const [formData, setFormData] = useState([]);
    const [Mycheckvals, setMycheckvals] = useState([]);

    const [Readonly, setReadOnly] = useState(true);

    const [AddEditCancel, setAddEditCancel] = useState(true);
    const [forceFormReset, setForceFormReset] = useState(false);


    const [InitialData, setInitialData] = useState({});
    const [addchilds, setAddchild] = useState(true);
    const [Switcher, setSwitcher] = useState(true);
    const [Checkboxdata, setCheckBoxData] = useState({
        All: false,
        Add: false,
        View: false,
        Delete: false,
        Edit: false,
        Upload: false,
        Download: false,
    });

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    //Tree

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setMycheckvals(checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);

        setSelectedKeys(selectedKeysValue);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const Onindivisualselect = (e) => {
        console.log('Indivisual Val', e.target.checked, e.target.name);
        setCheckBoxData({ ...Checkboxdata, [e.target.name]: e.target.checked });
    };
    const Onselectall = (e) => {
        if (e.target.checked == true) {
            setCheckBoxData({ ...Checkboxdata, All: true, Add: true, View: true, Delete: true, Edit: true, Upload: true, Download: true });
        } else {
            setCheckBoxData({ ...Checkboxdata, All: false, Add: false, View: false, Delete: false, Edit: false, Upload: false, Download: false });
        }
    };

    const Actions = () => {
        return (
            <>
                <Row>
                    <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22} offset={2}>
                        <Form.Item name="All" initialValue={InitialData?.All}>
                            <Checkbox name="All" checked={AddEditCancel ? Checkboxdata.All : InitialData?.All} onChange={Onselectall}>
                                Select All
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} offset={2}>
                        <Form.Item name="Add" initialValue={InitialData?.Add}>
                            <Checkbox name="Add" checked={AddEditCancel ? Checkboxdata.Add : InitialData?.Add} onChange={Onindivisualselect}>
                                Add
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="View" initialValue={InitialData?.View}>
                            <Checkbox name="View" checked={AddEditCancel ? Checkboxdata.View : InitialData?.View} onChange={Onindivisualselect}>
                                View
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="Delete" initialValue={InitialData?.Delete}>
                            <Checkbox name="Delete" checked={AddEditCancel ? Checkboxdata.Delete : InitialData?.Delete} onChange={Onindivisualselect}>
                                Delete
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} offset={2}>
                        <Form.Item name="Edit" initialValue={InitialData?.Edit}>
                            <Checkbox name="Edit" checked={AddEditCancel ? Checkboxdata.Edit : InitialData?.Edit} onChange={Onindivisualselect}>
                                Edit
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="Upload" initialValue={InitialData?.Upload}>
                            <Checkbox name="Upload" checked={AddEditCancel ? Checkboxdata.Upload : InitialData?.Upload} onChange={Onindivisualselect}>
                                Upload
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="Download" initialValue={InitialData?.Download}>
                            <Checkbox name="Download" checked={AddEditCancel ? Checkboxdata.Download : InitialData?.Download} onChange={Onindivisualselect}>
                                Download
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </>
        );
    };

    const handleChilds = () => {
        setAddchild(!addchilds);
    };
    const handleSave = () => {
        form.validateFields();
    };
    const Handleswitch = (e) => {
        setSwitcher(!Switcher);
    };

    const CardTree = () => {
        return (
            <Row gutter={20}>
                <Col span={12}>
                    <Card title="Access Applications" bordered={true}>
                        {/* <Trees /> */}
                        <Form.Item initialValue={undefined} name="Treedata">
                            <Tree defaultExpandAll={true} showLine={true} checkable onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} onCheck={onCheck} checkedKeys={AddEditCancel ? checkedKeys : InitialData?.Treedata} onSelect={onSelect} selectedKeys={selectedKeys} treeData={treeData} />
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Access Actions" bordered={true}>
                        <Actions />
                    </Card>
                </Col>
            </Row>
        );
    };

    const FormComponent = () => {
        return (
            <Row gutter={20}>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item
                        name="roleid"
                        label="Role Id"
                        initialValue={InitialData?.roleid}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item
                        name="rolename"
                        label="Role Name"
                        initialValue={InitialData?.rolename}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item
                        name="roledesc"
                        label="Role Description"
                        initialValue={InitialData?.roledesc}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label="Status" name="active" initialValue={InitialData?.active}>
                        <Switch checked={Switcher} onChange={Handleswitch} checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                </Col>
            </Row>
        );
    };
    const onReset = () => {
        form.resetFields();
        setMycheckvals([]);
        setSwitcher(true);
        setCheckedKeys([]);
        setInitialData({});
        setCheckBoxData({ All: false, Add: false, View: false, Delete: false, Edit: false, Upload: false, Download: false });
    };
    const onFinisher = (values) => {
        if (Mycheckvals.length === 0) {
        } else {
            Object.keys(values).map((keyName, i) => {
                if (keyName === 'Treedata') {
                    values[keyName] = checkedKeys;
                }

                if (keyName === 'rolename') {
                    Roledataset.push(values[keyName]);
                }
                if (keyName === 'active') {
                    if (values[keyName] === false) {
                        values[keyName] = 'N';
                    } else {
                        values[keyName] = 'Y';
                    }
                }
            });
            Object.keys(Checkboxdata).map((keyName, i) => {
                values[keyName] = Checkboxdata[keyName];
            });

            setAddchild(!addchilds);
            form.resetFields();
            setMycheckvals([]);
            setCheckedKeys([]);
            setCheckBoxData({ All: false, Add: false, View: false, Delete: false, Edit: false, Upload: false, Download: false });
        }
        console.log('I am the final form data', values);
        setFormData([...formData, values]);
    };

    const handleForms = (e) => {
        setForceFormReset(Math.random() * 10000);

        console.log(e.target.outerText);
        setAddchild(false);
        setAddEditCancel(false);
        Object.keys(formData).map((keyName, i) => {
            console.log(formData[keyName]);
            Object.keys(formData[keyName]).map((keyName2, i) => {
                console.log(keyName2);
                if (keyName2 === 'rolename') {
                    if (formData[keyName][keyName2] === e.target.outerText) {
                        setInitialData(formData[keyName]);
                    }
                }
            });
        });
        console.log('No need to open', formData);
        console.log('This is the intialData', InitialData);
        form.resetFields();
    };
    const oncancel = () => {
        setAddchild(!addchilds);
        setInitialData({});
        form.resetFields();
        setMycheckvals([]);
        setAddEditCancel(!AddEditCancel);
        setCheckedKeys([]);
        setCheckBoxData({ All: false, Add: false, View: false, Delete: false, Edit: false, Upload: false, Download: false });
    };
    const OnEdit = () => {};
    const Handlebuttons = () => {
        return AddEditCancel ? (
            <Row justify="end" gutter={20}>
                <Col>
                    <Button danger onClick={oncancel}>
                        <FaEdit className={styles.buttonIcon} />
                        cancel
                    </Button>
                </Col>
                <Col>
                    <Button danger onClick={onReset}>
                        <FaUndo className={styles.buttonIcon} />
                        Reset
                    </Button>
                </Col>
                <Col>
                    <Button htmlType="submit" onClick={handleSave} danger>
                        <FaSave className={styles.buttonIcon} />
                        Save
                    </Button>
                </Col>
            </Row>
        ) : (
            <Row justify="end" gutter={20}>
                <Col>
                    <Button danger onClick={oncancel}>
                        <FaEdit className={styles.buttonIcon} />
                        cancel
                    </Button>
                </Col>
                <Col>
                    <Button danger onClick={OnEdit}>
                        <FaUndo className={styles.buttonIcon} />
                        Edit
                    </Button>
                </Col>
                <Col>
                    <Button htmlType="submit" onClick={onReset} danger>
                        <FaSave className={styles.buttonIcon} />
                        Add Role
                    </Button>
                </Col>
            </Row>
        );
    };
    return (
        <>
            <Row gutter={20}>
                <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisiblity}>
                    {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                </div>
            </Row>
            <Row gutter={20}>
                {isTreeViewVisible ? (
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 6} xxl={!isTreeViewVisible ? 1 : 8}>
                        <div className={styles.leftpanel}>
                            <Row justify="left">
                                <p style={{ paddingLeft: 10, paddingTop: 10, fontWeight: 500 }}>Role List</p>
                                <Divider style={{ marginTop: 6 }} plain></Divider>
                            </Row>
                            <Row gutter={20}>
                                <Col span={24}>
                                    <List size="large" bordered={true} dataSource={Roledataset} renderItem={(item) => <List.Item onClick={handleForms}>{item}</List.Item>} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ) : undefined}
                <Col xs={24} sm={24} md={12} lg={16} xl={!isTreeViewVisible ? 24 : 18} xxl={16}>
                    <Row>
                        {addchilds ? (
                            <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} offset={21}>
                                <Button onClick={handleChilds} danger>
                                    <FaUserPlus className={styles.buttonIcon} />
                                    Add Role
                                </Button>
                            </Col>
                        ) : (
                            <Col xs={4} sm={4} md={4} lg={4} xl={24} xxl={4}>
                                <Form name="customized_form_controls" form={form} layout="vertical" onFinish={onFinisher}>
                                    <Space
                                        direction="vertical"
                                        size="middle"
                                        style={{
                                            display: 'flex',
                                        }}
                                    >
                                        <FormComponent />
                                        <CardTree />
                                        <Handlebuttons />
                                    </Space>
                                </Form>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const RoleManagement = connect(null, null)(RoleManagementMain);
