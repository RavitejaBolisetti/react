import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';

import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch, InputNumber, Typography, Popconfirm } from 'antd';
import { Table } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from '../Common.module.css';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { geoDataActions } from 'store/actions/data/geo';
import { tblPrepareColumns } from 'utils/tableCloumn';

const { Option } = Select;
const { confirm } = Modal;
const { success: successModel, error: errorModel } = Modal;

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


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {

    const inputNodeOnEditing = ["hierarchyAttribueCode", "hierarchyAttribueName"].includes(dataIndex) ? <Input /> : !dataIndex ? children :  <Switch defaultChecked={record[dataIndex]} checkedChildren="Yes" unCheckedChildren="No"  />;
    const inputNode = ["hierarchyAttribueCode", "hierarchyAttribueName"].includes(dataIndex) ? <Input value={record[dataIndex]}  />  : !dataIndex ? children :  <Switch defaultChecked={record[dataIndex]}  checkedChildren="Yes" unCheckedChildren="No"  />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNodeOnEditing}
            {/* {dataIndex === "action" || !dataIndex  ? children :  inputNode} */}
          </Form.Item>
        ) : (
        //   children
        inputNode
        //   dataIndex === "action" || !dataIndex ? children :  inputNodedisabled
        )}
      </td>
    );
  };

  const initialData = [
    {
        key: "0",
        hierarchyAttribueId: '1q',
        hierarchyAttribueCode: '1234',
        hierarchyAttribueName: 'Dev attribute',
        duplicateAllowedAtAttributerLevelInd: false,
        duplicateAllowedAtDifferentParent: true,
        isChildAllowed: false,
        status: true,
    },
    {
        key: "1",
        hierarchyAttribueId: '2q',
        hierarchyAttribueCode: '3445',
        hierarchyAttribueName: 'dummy attribute',
        duplicateAllowedAtAttributerLevelInd: true,
        duplicateAllowedAtDifferentParent: false,
        isChildAllowed: true,
        status: true,
    },
];


export const HierarchyAttributeBase = ({ userId, isDataLoaded, geoData, fetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeFetchList, hierarchyAttributeListShowLoading, hierarchyAttributeSaveData }) => {
    console.log('🚀 ~ file: HierarchyAttribute.js:46 ~ HierarchyAttributeBase ~ saveData', hierarchyAttributeSaveData);

    useEffect(() => {
        if (!isDataLoaded) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: '' });
            // fetchList({ setIsLoading: listShowLoading, userId, type: 'Geographicals'})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

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
            content: 'Some descriptions',
            onOk() {
                deleteTableRows(key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // set count of rows
   
    const [editingKey, setEditingKey] = useState('');
    const [data, setRowsData] = useState(initialData);
    const [count, setCount] = useState(data.length || 0);

    console.log("count", count, "data",data)

    const handleAdd = () => {
        const newData = {
                key: String(count),
                hierarchyAttribueId: '',
                hierarchyAttribueCode: '',
                hierarchyAttribueName: '',
                duplicateAllowedAtAttributerLevelInd: false,
                duplicateAllowedAtDifferentParent: false,
                isChildAllowed: false,
                status: false,
            };
        setRowsData([...data, newData]);
        setCount(count + 1);
    };

    const deleteTableRows = (index) => {
        const rows = [...data];
        rows.splice(Number(index), 1);
        setRowsData(rows);
    };

// table columns
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Code',
            dataIndex: 'hierarchyAttribueCode',
            editable: true,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Name',
            dataIndex: 'hierarchyAttribueName',
            editable: true,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed?',
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            editable: true,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Duplicate Allowed under different Parent?',
            dataIndex: 'duplicateAllowedAtDifferentParent',
            editable: true,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Child Allowed?',
            dataIndex: 'isChildAllowed',
             editable: true,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            editable: true,
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            editable:false,
            render:(_, record) => {
                return <Space wrap>
                    { <EditOutlined disabled={editingKey !== ''} onClick={() => edit(record)}/>}
                    {!record?.hierarchyAttribueId &&<DeleteOutlined onClick={()=> showConfirm(record.key)} />}
                </Space>
            },
        })
    );


    const isEditing = (record) => record.key === editingKey ;

    const edit = (record) => {
      form.setFieldsValue({
        hierarchyAttribueId: "",
        hierarchyAttribueCode: "",
        hierarchyAttribueName: "",
        duplicateAllowedAtAttributerLevelInd: "",
        duplicateAllowedAtDifferentParent: "",
        isChildAllowed: "",
        status: "",
        ...record,
      });
      setEditingKey(record.key);
    };
    
    const save = async (key) => {

      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setRowsData(newData);
          setEditingKey('');
        } 
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };  


    const mergedColumns = tableColumn.map((col) => {

        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
    });



    const [form] = Form.useForm();


    // on Save table data
    const onFinish = (values) => {


        const onSuccess = (res) => {
            form.resetFields();
            showSuccessModel({ title: 'SUCCESS', message: res?.responseMessage });
        };

        // console.log("DATA ON SAVE", data,"form.getFieldValue('hierarchyAttribueType')", form.getFieldValue('hierarchyAttribueType') )

        const reqData = {
            data: {
            hierarchyAttributeId: (form.getFieldValue('hierarchyAttribueType')),
            hierarchyAttribute: [...data],
            setIsLoading: listShowLoading,
            userId:userId, 
            onError:onError,
            onSuccess:onSuccess,
        }}

        console.log("DATA ON SAVE",reqData)

        
        return
        
        // saveData({ data: [values ], setIsLoading: listShowLoading, userId, onError, onSuccess });

        saveData(reqData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="hierarchyAttribueType" label="Hierarchy Attribute Type" rules={[validateRequiredSelectField('Hierarchy Attribute')]}>
                            <Select loading={!isDataAttributeLoaded} placeholder="Select" allowClear>
                                {attributeData?.map((item) => (
                                    <Option value={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table
                            // columns={tableColumn} 
                            onRow={(record, rowIndex) => {
                                return {
                                    // onClick: (e) => {
                                    //     if(String(rowIndex) !== editingKey){
                                    //         edit(record)
                                    //     }},
                                        onMouseOver: (e) => {
                                            if(String(rowIndex) !== editingKey){
                                                edit(record)
                                            }
                                        },
                                    // save(editingKey);
                                    // },
                                    // onBlur: (e) => {
                                    //     save(editingKey);
                                    // }
                                    onMouseLeave: (e) => {
                                        // if(String(rowIndex) !== editingKey){
                                            save(editingKey);

                                        // }
                                    },
                                }
                            }}
                            dataSource={data} 
                            pagination={false} 
                            components={{
                            body: {
                                cell: EditableCell,
                            },
                            }}
                            columns={mergedColumns}
                            bordered
                        />
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

                        <Button danger>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const HierarchyAttribute = connect(mapStateToProps, mapDispatchToProps)(HierarchyAttributeBase);
