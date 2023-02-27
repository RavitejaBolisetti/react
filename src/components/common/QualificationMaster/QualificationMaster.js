import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Modal,Empty, Form, Select, Switch, Space, Table } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from 'pages/common/Common.module.css';
import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { DrawerUtil } from './DrawerUtil';


const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;
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

export const QualificationMasterMain = () => {
    const [form] = Form.useForm();
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);
    const [data, setRowsData] = useState();
    const [drawer, setDrawer] = useState(false);

    const showSuccessModel = ({ title, message }) => {
        successModel({
            title: title,
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };
    const onError = (message) => {
        errorModel({
            title: 'ERROR',
            icon: <ExclamationCircleFilled />,
            content: message,
        });
    };
    const showConfirm = (key) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to delete?',
            onOk() {
                deleteTableRows(key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    
    const handleAdd = () => {
        setDrawer(true);
    };
    const edit = (record) => {
        const updatedDataItem = data && data.map((item) => (+item?.id === +record?.id || +item?.hierarchyAttribueId === +record?.hierarchyAttribueId ? { ...item, readOnly: true } : item));
        setRowsData(updatedDataItem);
    };

    const deleteTableRows = (id) => {
        const updatedData = [...data];
        const index = updatedData.findIndex((el) => el.id === id);
        updatedData.splice(Number(index), 1);
        setRowsData([...updatedData]);
    };
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualificattion Code',
            dataIndex: 'Qualificattion Code',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualificattion Name',
            dataIndex: 'Qualificattion Name',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />,
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: '',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {record?.hierarchyAttribueId && <FaEdit onClick={() => edit(record)} />}
                        {!record?.hierarchyAttribueId && <FaTrashAlt onClick={() => showConfirm(record?.id)} />}
                    </Space>
                );
            },
        })
    );

    // on Save table data  
    const onFinish = (values) => {
        console.log(values);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };
    const handleReset = () => {
        console.log('reset');
        form.resetFields();
    };




    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Search
                            placeholder="Search"
                            style={{
                                width: 200,
                            }}
                        />
                    </Col>

                    <Col offset={12} xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Button danger onClick={handleAdd}>
                            <AiOutlinePlus className={styles.buttonIcon} />
                            Add Qualifiaction
                        </Button>
                    </Col>
                </Row>
               <DrawerUtil drawer={drawer} setDrawer={setDrawer}/>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table locale={{
                            emptyText: <Empty description="No Role Added" />
                        }}
                            dataSource={data} pagination={true} columns={tableColumn} bordered />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const QualificationMaster = connect(mapStateToProps, mapDispatchToProps)(QualificationMasterMain);


