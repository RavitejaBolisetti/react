import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Space, Table, Drawer, Switch, Collapse, Checkbox } from 'antd';

import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { tblPrepareColumns } from 'utils/tableCloumn';
// import { AddEditForm } from './AddEditForm';
import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import './RoleManagement.module.css';
const { Panel } = Collapse;

const { Search } = Input;

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

const tableColumn = [];

tableColumn.push(
    tblPrepareColumns({
        title: 'Srl ',
        dataIndex: 'srl',
    })
);

tableColumn.push(
    tblPrepareColumns({
        title: 'Role Id',
        dataIndex: 'roleid',
    })
);

tableColumn.push(
    tblPrepareColumns({
        title: 'Role Name',
        dataIndex: 'rolename',
    })
);
tableColumn.push(
    tblPrepareColumns({
        title: 'Role Description',
        dataIndex: 'roledesc',
    })
);

tableColumn.push(
    tblPrepareColumns({
        title: 'Status',
        dataIndex: 'status',
        filters: [
            {
                text: 'Active',
                value: 'Active',
            },
            {
                text: 'Inactive',
                value: 'Inactive',
            },
        ],
    })
);

export const RoleManagementMain = ({ userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [data, setData] = useState([
        {
            srl: 'asdasd',
            roleid: 'asdasd',
            rolename: 'asdasd',
            roledesc: 'asdsad',
            status: 'ads',
        },
    ]);

    const CheckboxData = [
        {
            add: true,
            view: true,
            delete: true,
            edit: true,
            upload: true,
            download: true,
        },
    ];
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!isDataLoaded) {
            // fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        // hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Geographical' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

    const finalGeoData = geoData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    });

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { id: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node.subGeo) {
                generateList(node.subGeo);
            }
        }
        return dataList;
    };

    const flatternData = generateList(finalGeoData);

    const handleTreeViewClick = (keys) => {
        setForceFormReset(Math.random() * 10000);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false });
        form.resetFields();
        setFormVisible(false);
        setFormData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            const formData = flatternData.find((i) => keys[0] === i.key);
            formData && setFormData(formData?.data);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            forceUpdate();
            setReadOnly(true);
        } else {
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
            setReadOnly(false);
        }
        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = Array.isArray(values?.geoParentCode) ? values?.geoParentCode[0] : values?.geoParentCode || '';
        const data = { ...values, id: recordId, isActive: values?.isActive ? 'Y' : 'N', geoParentCode: codeToBeSaved };
        const onSuccess = (res) => {
            form.resetFields();
            setForceFormReset(Math.random() * 10000);

            setReadOnly(true);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            formData && setFormData(data);

            if (selectedTreeKey && selectedTreeKey.length > 0) {
                !recordId && setSelectedTreeKey(codeToBeSaved);
                setFormActionType('view');
            }
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            // fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: [data],
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleEditBtn = () => {
        setForceFormReset(Math.random() * 10000);

        const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        formData && setFormData(formData?.data);
        setFormActionType('edit');

        setReadOnly(false);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleRootChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleSiblingBtn = () => {
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleResetBtn = () => {
        setForceFormReset(Math.random() * 10000);
        form.resetFields();
    };

    const handleBack = () => {
        setReadOnly(true);
        setForceFormReset(Math.random() * 10000);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
            setFormActionType('view');
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
        } else {
            setFormActionType('');
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        }
    };
    const fieldNames = { title: 'geoName', key: 'id', children: 'subGeo' };
    const Treemenu = () => {
        return (
            <>
                {' '}
                <Row gutter={20}>
                    {isTreeViewVisible ? (
                        <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                            <div className={styles.leftpanel}>
                                <div className={styles.treeViewContainer}>
                                    <div className={styles.treemenu}>
                                        <TreeView selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} fieldNames={fieldNames} handleTreeViewClick={handleTreeViewClick} dataList={geoData} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ) : undefined}

                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.padRight0}>
                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            {/* {isFormVisible && <AddEditForm setSelectedTreeKey={setSelectedTreeKey} isChecked={isChecked} setIsChecked={setIsChecked} flatternData={flatternData} formActionType={formActionType} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} isReadOnly={isReadOnly} formData={formData} geoData={geoData} handleSelectTreeClick={handleSelectTreeClick} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen} />} */}
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                    {buttonData?.editBtn && (
                                        <Button danger onClick={() => handleEditBtn()}>
                                            <FaEdit className={styles.buttonIcon} />
                                            Edit
                                        </Button>
                                    )}

                                    {buttonData?.rootChildBtn && (
                                        <Button danger onClick={() => handleRootChildBtn()}>
                                            <FaUserPlus className={styles.buttonIcon} />
                                            Add Child
                                        </Button>
                                    )}

                                    {buttonData?.childBtn && (
                                        <Button danger onClick={() => handleChildBtn()}>
                                            <FaUserPlus className={styles.buttonIcon} />
                                            Add Child
                                        </Button>
                                    )}

                                    {buttonData?.siblingBtn && (
                                        <Button danger onClick={() => handleSiblingBtn()}>
                                            <FaUserFriends className={styles.buttonIcon} />
                                            Add Sibling
                                        </Button>
                                    )}

                                    {isFormVisible && (
                                        <>
                                            {buttonData?.saveBtn && (
                                                <Button htmlType="submit" danger>
                                                    <FaSave className={styles.buttonIcon} />
                                                    Save
                                                </Button>
                                            )}

                                            {buttonData?.resetBtn && (
                                                <Button danger onClick={handleResetBtn}>
                                                    <FaUndo className={styles.buttonIcon} />
                                                    Reset
                                                </Button>
                                            )}

                                            {buttonData?.cancelBtn && (
                                                <Button danger onClick={() => handleBack()}>
                                                    <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                                    Cancel
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </>
        );
    };
    const RoleSearch = () => {
        return (
            <>
                <Search
                    placeholder="search"
                    style={{
                        width: 300,
                    }}
                />
            </>
        );
    };
    const Actions = () => {
        return (
            <>
                <Row>
                    <Col xs={22} sm={22} md={22} lg={22} xl={22} xxl={22} offset={2}>
                        <Checkbox>Check All Actions</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} offset={2}>
                        <Checkbox>Add</Checkbox>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Checkbox>View</Checkbox>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Checkbox>delete</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} offset={2}>
                        <Checkbox>Edit</Checkbox>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Checkbox>Upload</Checkbox>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <Checkbox>Download</Checkbox>
                    </Col>
                </Row>
            </>
        );
    };
    const [Checkboxcheck, setCheckboxCheck] = useState(true);
    const FormitemsRoleDrawer = () => {
    
        return (
            <>
                <Space
                    direction="vertical"
                    size="small"
                    style={{
                        display: 'flex',
                    }}
                >
                    <div>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
                        </Row>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={'Y'} label="Status" name="active">
                                    <Switch defaultChecked={true} checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    {/*Below The Fomrs*/}
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <h4 className="myh4">Application Mapping</h4>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Search
                                placeholder="Search Application"
                                style={{
                                    width: 230,
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                    </Row>
                    <h4>Applications</h4>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Collapse defaultActiveKey={['1']}>
                                <Panel header="Common" key="1">
                                    <Form.Item label="" name="applicationmaster" valuePropName="">
                                        <Checkbox>Application Master</Checkbox>
                                    </Form.Item>
                                    <Form.Item label="" name="applicationcriticalitygroup" valuePropName="asdasdasdasd">
                                        <Checkbox checked={Checkboxcheck} onChange={(e) => setCheckboxCheck(e.target.checked)}>
                                            Application Criticality group
                                        </Checkbox>
                                        {Checkboxcheck ? <Actions /> : ''}
                                    </Form.Item>
                                    <Form.Item label="" name="producthierarchy" valuePropName="">
                                        <Checkbox>Product Hierarchy</Checkbox>
                                    </Form.Item>
                                    <Form.Item label="" name="geographical" valuePropName="">
                                        <Checkbox>Geographical Hierarchy</Checkbox>
                                    </Form.Item>
                                </Panel>
                                <Panel header="DBP" key="2"></Panel>
                                <Panel header="Financial Accounting" key="3"></Panel>
                            </Collapse>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}></Col>
                    </Row>
                </Space>
            </>
        );
    };
    const OpenRoleDrawer = () => {
        return (
            <>
                <Drawer
                    title="Add Role Details"
                    width={600}
                    onClose={onClose}
                    open={open}
                    closable={false}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" onClick={onClose}>
                                OK
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" form={form} name="control-role">
                        <FormitemsRoleDrawer />
                    </Form>
                </Drawer>
            </>
        );
    };
    const RoleDrawer = () => {
        return (
            <>
                <Button danger onClick={showDrawer}>
                    + Add Role
                </Button>
            </>
        );
    };

    const TableRender = () => {
        return (
            <>
                <Table pagination={false} dataSource={data} columns={tableColumn} />
            </>
        );
    };
    return (
        <>
            <div>
                {/* <Row gutter={20}>
                    <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisiblity}>
                        {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                    </div>
                </Row> */}
                {/* <Treemenu/> */}
                {/* <ParentHierarchy title={'Parent Hierarchy'} dataList={geoData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} /> */}
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row gutter={20} justify="space-between">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <RoleSearch />
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                            <RoleDrawer />
                            <OpenRoleDrawer />
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={23} md={24} lg={24} xl={24} xxl={24}>
                            <TableRender />
                        </Col>
                    </Row>
                </Space>
            </div>
        </>
    );
};

export const RoleManagement = connect(null, null)(RoleManagementMain);
