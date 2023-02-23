import React , {useState} from 'react';
import { Button, Col, Input, Modal, Form, Row, Space, Table } from 'antd';
import { validateRequiredInputField } from 'utils/validation';

import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

import styles from 'pages/common/Common.module.css';


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

const AllowTimingsFormMain = () => {
    const [form] = Form.useForm();
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const columnsAllowTimings = [
        {
            title: 'Start Time Hrs.',
            key: 'start time Hrs.',
            render: () =>
                <Input placeholder="Enter Data" />,
            width: 150,
        },
        {
            title: 'Start Time Mins..',
            dataIndex: 'start Time Mins..',
            key: 'start time Mins..',
            render: () => <Input placeholder="Enter Data" />,
            width: 150,
        },
        {
            title: 'End Time Hrs..',
            dataIndex: 'end Time Hrs..',
            key: 'end time Hrs.',
            render: () => <Input placeholder="Enter Data" />,
            width: 150,
        },
        {
            title: 'End Time Mins..',
            dataIndex: 'end Time Mins..',
            key: 'end time Mins.',
            render: () => <Input placeholder="Enter Data" />,
            width: 150,
        },
        {
            title: 'Action',
            dataIndex: '',
            width: 100,
            render: () => [
                <Space wrap>
                    <EditOutlined />
                    <DeleteOutlined onClick={showConfirm} />
                </Space>,
            ],
        },
    ]

    const onFinish = (values) => {
        // saveData({ data: values, setIsLoading: listShowLoading, userId });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    return (
        <>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Table columns={columnsAllowTimings} dataSource={data} pagination={false} />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={2} lg={24} xl={24} className={styles.buttonContainer}>
                        <Button danger>
                            <FaUserPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                        <Button htmlType="submit" danger  >
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
    )
}

export const AllowTimingsForm = AllowTimingsFormMain;