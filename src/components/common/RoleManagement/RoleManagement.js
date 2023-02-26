import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Space, Table, Drawer, Switch, Collapse, Checkbox, Card, Tree, Divider } from 'antd';

import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import Trees from './Tree';

import styles from 'pages/common/Common.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import './RoleManagement.module.css';
import Treedata, { checkvals } from './Tree';
import { validateEmailField } from 'utils/validation';

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
const Roledataset = ['Designation Sales', 'UI/UX', 'Product Manager'];
export const RoleManagementMain = ({ userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const [Checkboxdata, setCheckBoxData] = useState({
        All: 'unchecked',
        Add: 'unchecked',
        View: 'unchecked',
        Delete: 'unchecked',
        Edit: 'unchecked',
        Upload: 'unchecked',
        Download: 'unchecked',
    });

    const Actions = () => {
        return (
            <>
                <Row>
                    <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22} offset={2}>
                        <Form.Item name="All" valuePropName="checked">
                            <Checkbox>Select All</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} offset={2}>
                        <Form.Item name="Add" valuePropName="checked">
                            <Checkbox>Add</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="View" valuePropName="checked">
                            <Checkbox>View</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="Delete" valuePropName="checked">
                            <Checkbox>Delete</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} offset={2}>
                        <Form.Item name="Edit" valuePropName="checked">
                            <Checkbox>Edit</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="Upload" valuePropName="checked">
                            <Checkbox>Upload</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="Download" valuePropName="checked">
                            <Checkbox>Download</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            </>
        );
    };
    const [addchilds, setAddchild] = useState(true);
    const handleChilds = () => {
        setAddchild(!addchilds);
    };
    const handleSave = () => {
        form.validateFields();
    };

    const CardTree = () => {
        return (
            <Row gutter={20}>
                <Col span={12}>
                    <Card title="Access Applications" bordered={true}>
                        <Trees />
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
                    <Form.Item initialValue={'Y'} label="Status" name="active">
                        <Switch defaultChecked={true} checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                </Col>
            </Row>
        );
    };
    const onFinisher = (values) => {
        console.log(values);
        {
            let end = checkvals.length;
            Object.keys(values).map((keyName, i) => {
                if (keyName === 'Treedata') {
                    values[keyName] = checkvals[end - 1];
                }
            });
        }
        console.log(checkvals);
        setAddchild(!addchilds);
        form.resetFields();
    };
    const Handlebuttons = () => {
        return (
            <Row gutter={20}>
                <Col>
                    <Button htmlType="submit" onClick={handleSave} danger>
                        <FaSave className={styles.buttonIcon} />
                        Save
                    </Button>
                </Col>
                <Col>
                    <Button danger>
                        <FaEdit className={styles.buttonIcon} />
                        Edit
                    </Button>
                </Col>
                <Col>
                    <Button danger>
                        <FaUndo className={styles.buttonIcon} />
                        Reset
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
                                <Row gutter={20}>
                                    {Roledataset.map((e, i) => (
                                        <Col span={24}>{e}</Col>
                                    ))}
                                </Row>
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
                                    Add Child
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
