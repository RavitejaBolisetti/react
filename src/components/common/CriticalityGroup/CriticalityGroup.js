import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch, Table } from 'antd';
import { validateRequiredInputField } from 'utils/validation';

import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, HistoryOutlined } from '@ant-design/icons';



import styles from 'pages/common/Common.module.css';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AllowTimingsForm } from './AllowTimingsForm';

const { Option } = Select;
const { confirm } = Modal;

const showConfirm = () => {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() {
            // console.log('OK');
        },
        onCancel() {
            // console.log('Cancel');
        },
    });
};




const data = [
    {
        key: '1',
        name: '',
    },
    {
        key: '2',
        name: '',
    },
];


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

export const CriticalityGroupMain = () => {
    const [form] = Form.useForm();
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);
    const [isVisible, setVisible] = useState(false);


    const columnsGroup = [
        {
            title: 'Crtiality Group Id',
            dataIndex: 'crtiality Group Id',
            key: 'crtiality group Id',
            render: () => <Form.Item name="Crtiality Group Id" rules={[validateRequiredInputField('Group Id')]}>
                <Input placeholder="Enter Data" />
            </Form.Item>
            ,
            width: 150,
        },
        {
            title: 'Criticality Group Name',
            dataIndex: 'criticality Group Name',
            key: 'criticality group Name',
            render: (text) => <Form.Item name="Criticality Group Name" rules={[validateRequiredInputField('Group Name')]}>
                <Input placeholder="Enter Data" />
            </Form.Item >
            ,
            width: 150,
        },
        {
            title: 'Default Group?',
            dataIndex: 'Default Group?',
            width: 100,
            key: 'address 1',
            render: () => <Form.Item>
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
            </Form.Item>
            ,
        },
        {
            title: 'Active?',
            dataIndex: 'Status',
            key: 'address 4',
            width: 100,
            render: () => <Form.Item>
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
            </Form.Item>
            ,
        },
        {
            title: 'Action',
            dataIndex: '',
            width: 100,
            render: () => [
                <Form.Item>
                    <Space wrap>

                        <EditOutlined />
                        <DeleteOutlined onClick={showConfirm} />
                        <HistoryOutlined onClick={toggle} />

                    </Space>
                </Form.Item>,
            ],
        },
    ];


    const pageTitle = 'Crtiticality Group';
    const pageHeaderData = {
        pageTitle,
        showChangeHisoty: true,
        isFavourite,
        setFavourite,
        handleFavouriteClick,
        visibleChangeHistory: false,
    };

    const onFinish = (values) => {
        // saveData({ data: values, setIsLoading: listShowLoading, userId });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const toggle = () => {
        setVisible(prev => !prev)
    }

    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table columns={columnsGroup} dataSource={data} pagination={false} />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={2} lg={24} xl={24} className={styles.buttonContainer}>
                        <Button danger>
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                        <Button htmlType="submit" danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>
                        <Button danger>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>

            {
                isVisible &&
                <>
                <AllowTimingsForm/>
                    
                </>
            }
        </>
    );
};

export const CriticalityGroup = connect(mapStateToProps, mapDispatchToProps)(CriticalityGroupMain);
