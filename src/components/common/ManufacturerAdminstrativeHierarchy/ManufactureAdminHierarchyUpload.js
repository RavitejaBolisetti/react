import React from 'react';
import { Button, Form, Row, Col, Typography, Upload, message } from 'antd';
import { FiUpload, FiDownload } from 'react-icons/fi';
import { InboxOutlined } from '@ant-design/icons';
import { FaAngleUp } from "react-icons/fa"
import { connect } from 'react-redux';
import { withDrawer } from 'components/withDrawer';
import { bindActionCreators } from 'redux';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import styles from 'components/common/Common.module.css';

const { Text } = Typography;
const { Dragger } = Upload;

const mapStateToProps = (state) => {
    const {
        data: {
            ManufacturerAdminHierarchy: { uploadVisible },
        },
    } = state;

    let returnValue = {
        isVisible: uploadVisible,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            onCloseAction: manufacturerAdminHierarchyDataActions.uploadModelClose,
        },
        dispatch
    ),
});

const uploadProps = {
    name: 'file',
    multiple: true,
    action: '',
    onChange(info) {
      const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // onDrop(e) {
    //   console.log('Dropped files', e.dataTransfer.files);
    // },
  };

const UploadMain = (props) => {
    const { isFormBtnActive, setFormBtnActive } = props;
    const { onCloseAction } = props;
    return (
        <>
            <Form>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Text>Please download file and after filling the details upload it</Text>
                        <Button icon={<FiDownload style={{margin:'0 0.5rem 0 0'}} />} type="primary" style={{margin:'0 0 0 1rem'}} >
                            Download
                        </Button>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {/* <Button icon={<FiUpload style={{margin:'0 0.5rem 0 0'}}/>} type="primary">Upload</Button> */}
                            <Dragger {...uploadProps} style={{margin:'2rem 0 0 0'}}>
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                {/* <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                                </p> */}
                            </Dragger>
                    </Col>
                </Row>
                <Row gutter={20} className={styles.formFooter}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                        <Button danger onClick={onCloseAction}>
                            Cancel
                        </Button>
                    </Col>

                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                        <Button htmlType="submit" danger disabled={!isFormBtnActive}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export const ManufactureAdminHierarchyUpload = connect(mapStateToProps, mapDispatchToProps)(withDrawer(UploadMain, { title: 'Upload', width: '520px' }));
