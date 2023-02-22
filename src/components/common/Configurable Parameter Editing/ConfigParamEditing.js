import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined ,ExclamationCircleFilled} from '@ant-design/icons';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch,Table ,DatePicker,InputNumber} from 'antd';
import styles from '../Common.module.css';
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
      console.log(selected)
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

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };
    const defaultColumns = [
        {
          title: 'Control ID',
          dataIndex: 'ControlID',
          key: 'ControlID',
          render: () => <Input placeholder="Enter Data" />,
          width: 200,

        },
        {
          title: 'Control Description',
          dataIndex: 'ControlDescription',
          key:'ControlDescription',
          render: () => <Input placeholder="Enter Data" />,
          width: 200,
        },
        {
          title: 'Configurable Parameter Type',
          dataIndex: 'ConfigParamType',
          key: 'ConfigParamType',
          render: () => <Select placeholder="Select Parameter Type"
          options={[
            { value: 'N', label: 'Number Range' },
            { value: 'T', label: 'Text' },
            { value: 'D', label: 'Date Range' },
            { value: 'B', label: 'Boolean' },  
        ]} onChange={changeSelectOptionHandler}/>,
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

                <DeleteOutlined onChange={showConfirm}/>
            </Space>,
        ],
        },
      ];

     const ConfigParamValue= () =>
     {
        if(selected=='T'){
         return(<Input placeholder="Enter Data" /> )
        }
        else if(selected=='D'){
        return(<RangePicker/>)
        }
        else if(selected=='B'){
           return(<Select placeholder="Select" 
           options={[
            {value:'Y', label:'Yes'},
            {value:'N', label:'No'}
           ]}/>)
        }
        else if(selected=='N'){
            
            return(
            <> <InputNumber min={1} max={100} defaultValue={1} />
            <InputNumber min={1} max={100} defaultValue={100} />
            </>)
        }
     }
     
    return (
        <>
            <Form>
                <Table
                bordered
                dataSource={data}
                columns={defaultColumns}
                pagination={false} />
            </Form>
        
            
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
            
        </>
    );
};


