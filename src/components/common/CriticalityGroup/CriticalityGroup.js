import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch, Table } from 'antd';
import { validateRequiredInputField,validateRequiredSelectField } from 'utils/validation';

import { FaSave,FaUserPlus, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, HistoryOutlined } from '@ant-design/icons';



import styles from 'pages/common/Common.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AllowTimingsForm } from './AllowTimingsForm';
import { geoDataActions } from 'store/actions/data/geo';
import { tblPrepareColumns } from 'utils/tableCloumn';


const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;

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

const initialData = [
    {
        id: '1',
        hierarchyAttribueId: '1q',
        hierarchyAttribueCode: '1234',
        hierarchyAttribueName: 'Dev attribute',
        duplicateAllowedAtAttributerLevelInd: 'N',
        duplicateAllowedAtDifferentParent: 'Y',
        isChildAllowed: 'Y',
        status: 'Y',
    },
    {
        id: '2',
        hierarchyAttribueId: '2q',
        hierarchyAttribueCode: '3445',
        hierarchyAttribueName: 'dummy attribute',
        duplicateAllowedAtAttributerLevelInd: true,
        duplicateAllowedAtDifferentParent: false,
        isChildAllowed: true,
        status: true,
    },
];

// const mapStateToProps = (state) => {
//     const {
//         auth: { userId },
//         data: {
//             Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
//             HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
//         },
//         common: {
//             LeftSideBar: { collapsed = false },
//         },
//     } = state;

//     let returnValue = {
//         collapsed,
//         userId,
//         isDataLoaded,
//         geoData,
//         isDataAttributeLoaded,
//         attributeData: attributeData?.filter((i) => i),
//     };
//     return returnValue;
// };

// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
//     ...bindActionCreators(
//         {
//             fetchList: geoDataActions.fetchList,
//             saveData: geoDataActions.saveData,
//             listShowLoading: geoDataActions.listShowLoading,

//             hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
//             hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
//             hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
//         },
//         dispatch
//     ),
// });

export const CriticalityGroupMain = ({ editing, dataIndex, title, inputType, record, index, children, form, ...restProps }) => {

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


    const [data, setRowsData] = useState(initialData);
    const [count, setCount] = useState(data.length || 0);

    const handleAdd = () => {
        const newData = {
            // id: Math.random() * 1000,
            hierarchyAttribueId: '',
            hierarchyAttribueCode: '',
            hierarchyAttribueName: '',
            duplicateAllowedAtAttributerLevelInd: 'N',
            duplicateAllowedAtDifferentParent: 'N',
            isChildAllowed: 'N',
            status: 'N',
        };
        setRowsData([...data, {...newData, id: 'td-'+count}]);
        setCount(count + 1);
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
            title: 'Srl.',
            dataIndex: 'Srl',
           
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupId',
           
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
            
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Default Group?',
            dataIndex: 'defaultGroup',
           
        })
    );

 

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            
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
      console.log('heloo')
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleReset = () => {
        console.log('reset called');
        form.resetFields();
    };
 
    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table dataSource={data} pagination={false} columns={tableColumn} bordered />
                    </Col>
                </Row>

                <Row gutter={20} style={{ marginTop: '20px' }}>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12}>
                        <Button danger onClick={handleAdd}>
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                    </Col>
                    <Col xs={24} sm={16} md={14} lg={12} xl={12} className={styles.buttonContainer}>
                        <Button htmlType="submit" danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>

                        <Button danger onClick={handleReset}>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const CriticalityGroup = connect(null, null)(CriticalityGroupMain);
