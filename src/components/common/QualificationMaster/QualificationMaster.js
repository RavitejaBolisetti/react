import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Modal, Empty, Form, Select, Switch, Space, Table } from 'antd';
import { ExclamationCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit2} from "react-icons/fi";


import { menuDataActions } from 'store/actions/data/menu';
import { tblPrepareColumns } from 'utils/tableCloumn';
import styles from '../QualificationMaster/QualificationMaster.module.css';
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
            setFilter: menuDataActions.setFilter,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,
            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const QualificationMasterMain = (setFilter, filter) => {
    const [form] = Form.useForm();
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);
    const [Data, setRowsData] = useState();
    const [drawer, setDrawer] = useState(false);
    const [searchInput, setSearchInput] = useState('');


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
    const handleResetBtn = () => {
        form.resetFields();
    };
    const edit = (record) => {
        const updatedDataItem = arrData && arrData.map((item) => (+item?.id === +record?.id || +item?.hierarchyAttribueId === +record?.hierarchyAttribueId ? { ...item, readOnly: true } : item));
        setArrData(updatedDataItem);
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualificattion Code',
            dataIndex: 'code',
            sortFn: (a, b) => a.code.localeCompare(b.code),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualification Name',
            dataIndex: 'name',
            sortFn: (a, b) => a.name.localeCompare(b.name),
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
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        <FiEdit2 style={{ color: "ff3e5b", cursor: "pointer"}}  onClick={() => edit(record)} />
                        <FaTrashAlt style={{ color: 'ff3e5b', cursor: "pointer"}} onClick={() => showConfirm(record?.id)} />
                    </Space>
                );
            },
        })
    );

    const data = [
        {
            key: '1',
            name: 'Mechanical',
            code: 'JB0001'

        },
        {
            key: '3',
            name: 'Btech CSE',
            code: 'AB0003'
        },
        {
            key: '4',
            name: 'PhD',
            code: 'NW0008'
        },
    ]

    const [arrData, setArrData] = useState(data);

    // on Save table data  
    const onFinish = (values) => {
        console.log(values);
    };
    const onSearch = (value) => {
        console.log(value);
    };
    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };
    const onChange = (sorter, filters) => {
        console.log('sort', sorter, filters);
        form.resetFields();
    };
    const deleteTableRows = (id) => {
        const updatedData = [...arrData];
        const index = updatedData.findIndex((el) => el.id === id);
        updatedData.splice(Number(index), 1);
        setArrData([...updatedData]);
    };
    const onChangeHandle = (e) => {
        const getSearch = e.target.value;
        // console.log("value:", e.target.value);
        if (e.target.value == '') {
            window.location.reload(true)
            const tempArr = arrData;
            setArrData(tempArr)
            return
        }
        if (getSearch.length > -1) {
            const searchResult = arrData.filter((record) => record.name.toLowerCase().startsWith(e.target.value.toLowerCase()) || record.code.toLowerCase().startsWith(e.target.value.toLowerCase()))
            setArrData(searchResult);
        }
    };

    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Search
                            placeholder="Search"
                            allowClear
                            style={{
                                width: 200,
                            }}
                            onSearch={onSearch}
                            onChange={onChangeHandle}
                        />
                    </Col>
                    <Col offset={12} xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Button danger onClick={handleAdd}>
                            <AiOutlinePlus className={styles.buttonIcon} />
                            Add Qualifiaction
                        </Button>
                    </Col>
                </Row>
                <DrawerUtil  drawer={drawer} setDrawer={setDrawer} arrData={arrData} setArrData={setArrData} />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table locale={{
                            emptyText: <Empty description="No Role Added" />
                        }}
                            dataSource={arrData} pagination={false} columns={tableColumn} bordered onChange={onChange} />
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const QualificationMaster = connect(mapStateToProps, mapDispatchToProps)(QualificationMasterMain);


