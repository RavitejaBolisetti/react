import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined ,ExclamationCircleFilled} from '@ant-design/icons';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch,Table ,DatePicker,InputNumber, Drawer} from 'antd';
import styles from '../Common.module.css';
import { validateRequiredSelectField,validateRequiredInputField } from 'utils/validation';
import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';
import { withLayoutMaster } from 'components/withLayoutMaster';
const { RangePicker } = DatePicker;
let type;
export const ConfigParamEditMasterPage = () => {
    const [form] = Form.useForm();
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);
    const { confirm } = Modal;
    const [selected, setSelected] = React.useState("T");

const changeSelectOptionHandler = (event) => {
      setSelected(event);
    };
    const [count, setCount] = useState(2);
    const [data, setRowsData] = useState([
        {
            key: '0',
            name: '',
        },
    ]);
    const handleAdd = () => {
        const newData = [
            {
                key: count,
                name: '',
            },
        ];
        setRowsData([...data, newData]);
        setCount(count + 1);
    };
    const deleteTableRows = (index) => {
        const rows = [...data];
        rows.splice(index, 1);
        setRowsData(rows);
    };
    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                deleteTableRows(data.key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onFinish = (values) => {
        // saveData({ data: values, setIsLoading: listShowLoading, userId });
    };

    
    const defaultColumns = [
        {
          title: 'Control ID',
          dataIndex: 'ControlID',
          key: 'ControlID',
          render: () =>
          <Form.Item name={key}  rules={[validateRequiredInputField('ControlID')]}>
           <Input placeholder="Enter Data" />
           </Form.Item>,
          width: 200,

        },
        {
          title: 'Control Description',
          dataIndex: 'ControlDescription',
          key:'ControlDescription',
          render: () =>
          <Form.Item name={key}  rules={[validateRequiredInputField('ControlDescription')]}>
          <Input placeholder="Enter Data" />
          </Form.Item>,
          width: 200,
        },
        {
          title: 'Configurable Parameter Type',
          dataIndex: 'ConfigParamType',
          key: 'ConfigParamType',
          render: () => <>
          <Form.Item name={key}  rules={[validateRequiredSelectField('ConfigParamType')]}>
          <Select placeholder="Select Parameter Type"
          options={[
            { value: 'N', label: 'Number Range' },
            { value: 'T', label: 'Text' },
            { value: 'D', label: 'Date Range' },
            { value: 'B', label: 'Boolean' },  
        ]} onChange={changeSelectOptionHandler}/>
        </Form.Item></>,
          width: 300,
        },
        {
          title: 'Configurable Parameter Values',
          dataIndex: 'ConfigParamValues',
          key: 'ConfigParamValues',
         render:()=> ConfigParamValue(),
          width :200,
        },
        {
        title: 'Action',
        dataIndex: '',
        width: 100,
        render: () => [
            <Space wrap>
                <EditOutlined />

                <DeleteOutlined onClick={showConfirm}/>
            </Space>,
        ],
        },
      ];

     const ConfigParamValue= () =>
     {
        if(selected=='T'){
         return(
            <>  <Form.Item  name="ConfigParamValues" rules={[validateRequiredInputField('ConfigParamValues')]}>
         <Input placeholder="Enter Data" />
         </Form.Item> </>)
        }
        else if(selected=='D'){
        return(
            <>  <Form.Item  name="ConfigParamValues" rules={[validateRequiredInputField('ConfigParamValues')]}>
        <RangePicker/></Form.Item></>)
        }
        else if(selected=='B'){
           return(
            <>  <Form.Item  name="ConfigParamValues" rules={[validateRequiredSelectField('ConfigParamValues')]}>
           <Select placeholder="Select" 
           options={[
            {value:'Y', label:'Yes'},
            {value:'N', label:'No'}
           ]}/></Form.Item></>)
        }
        else if(selected=='N'){
            
            return(
            <>  <Form.Item  name="ConfigParamValues" rules={[validateRequiredInputField('ConfigParamValues')]}>
            <InputNumber min={1} max={100} defaultValue={1} />
            <InputNumber min={1} max={100} defaultValue={100} />
            </Form.Item></>)
        }
     }
     const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };
     
    return (
        <>
       
            <Form onFinishFailed={onFinishFailed}>
                <Table
                bordered
                dataSource={data}
                columns={defaultColumns}
                pagination={false} />
           
        
            
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                    <Button danger onClick={handleAdd}>
                        <FaUserPlus className={styles.buttonIcon} />
                        Add Row
                    </Button>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
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


