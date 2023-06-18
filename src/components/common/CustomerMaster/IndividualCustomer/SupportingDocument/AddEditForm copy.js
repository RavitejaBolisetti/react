import React, { useState } from 'react';
import { Row, Col, Form, Select, Input, message, Upload, Button, Empty, Progress } from 'antd';

import { FiEye, FiTrash } from 'react-icons/fi';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'components/common/Common.module.css';
import axios from 'axios';

const { Option } = Select;
const { Dragger } = Upload;

const AddEditForm = (props) => {
    const { typeData, userId, onFinish, onFinishFailed, setUploadedFile, uploadFile, listShowLoading, showGlobalNotification } = props;
    const [form] = Form.useForm();

    const onChange = (info) => {
        console.log('info', info);
        const { status } = info.file;
        console.log('status', status);

        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const onDrop = (e) => {
        console.log('Dropped files', e.dataTransfer.files);
    };

    const showUploadList = {
        showRemoveIcon: true,
        showPreviewIcon: true,
        showDownloadIcon: false,
        previewIcon: <FiEye onClick={(e) => console.log(e, 'custom removeIcon event')} />,
        removeIcon: <FiTrash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    };

    const uploadProps = {
        onChange,
        onDrop,
        showUploadList,
    };

    const handleUpload = (options) => {
        const { file } = options;
        console.log(options, 'options');

        const data = new FormData();
        data.append('applicationId', 'app');
        data.append('file', file);

        const onSuccess = (res) => {
            setUploadedFile(res.data);
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage || 'File uploaded successfuly' });
        };

        const onError = (message) => {
            showGlobalNotification({ message, placement: 'bottomRight' });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        uploadFile(requestData);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const fileProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 4,
            format: (percent) => console.log(percent, 'percent') || (percent && `${parseFloat(percent.toFixed(2))}%`),
        },
    };

    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);

    const uploadImage = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event) => {
                console.log('🚀 ~ file: AddEditForm.js:124 ~ uploadImage ~ event:', event);
                const percent = Math.floor((event.loaded / event.total) * 100);
                console.log('percent', percent);
                setProgress(percent);
                if (percent === 100) {
                    setTimeout(() => setProgress(0), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            },
        };
        fmData.append('image', file);
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', fmData, config);

            onSuccess('Ok');
            console.log('server res: ', res);
        } catch (err) {
            console.log('Eroor: ', err);
            const error = new Error('Some error');
            onError({ err });
        }
    };

    const handleOnChange = ({ file, fileList, event }) => {
        // console.log(file, fileList, event);
        //Using Hooks to update the state to the current filelist
        setDefaultFileList(fileList);
        //filelist - [{uid: "-1",url:'Some url to image'}]
    };

    return (
        <Form form={form} autoComplete="off" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Upload {...fileProps}>
                        <Button>Click to Upload</Button>
                    </Upload>
                    <Upload
                        accept="image/*"
                        customRequest={uploadImage}
                        onChange={handleOnChange}
                        listType="picture-card"
                        defaultFileList={defaultFileList}
                        className="image-upload-grid"
                        // onProgress={({ percent }) => {
                        //   console.log("progre...", percent);
                        //   if (percent === 100) {
                        //     setTimeout(() => setProgress(0), 1000);
                        //   }
                        //   return setProgress(Math.floor(percent));
                        // }}
                    >
                        {defaultFileList.length >= 1 ? null : <div>Upload Button</div>}
                    </Upload>
                    {progress > 0 ? <Progress percent={progress} /> : null}
                    <Form.Item label="Document Type" name="documentTypeId" placeholder={preparePlaceholderSelect('document type')} rules={[validateRequiredSelectField('document type')]}>
                        <Select className={styles.headerSelectField} loading={!(typeData?.CUST_FILES?.length !== 0)} placeholder="Select" {...selectProps}>
                            {typeData?.CUST_FILES?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="File Name" name="documentName">
                        <Input placeholder={preparePlaceholderText('File Name')} rules={[validateRequiredInputField('fileName')]} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.uploadDragger}>
                        <Dragger customRequest={handleUpload} {...uploadProps}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 100,
                                }}
                                description={
                                    <>
                                        <span>
                                            Click or drop your file here to upload the signed and <br />
                                            scanned customer form.
                                        </span>
                                        <span>
                                            <br />
                                            File type should be png, jpg or pdf and max file size to be 5Mb
                                        </span>
                                    </>
                                }
                            />

                            <Button type="primary">Upload File</Button>
                        </Dragger>
                    </div>
                </Col>
            </Row>
            <Button htmlType="submit" type="primary">
                Submit
            </Button>
        </Form>
    );
};

export default AddEditForm;
