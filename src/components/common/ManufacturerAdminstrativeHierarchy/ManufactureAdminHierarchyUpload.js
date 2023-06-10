import React from 'react';
import { Button, Form, Row, Col, Typography, Upload, message } from 'antd';
import { connect } from 'react-redux';
import { withDrawer } from 'components/withDrawer';
import { bindActionCreators } from 'redux';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import styles from 'components/common/Common.module.css';
import Svg from '../../../assets/images/Filter.svg';

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
    const { isFormBtnActive } = props;
    const { onCloseAction } = props;
    return (
        <>
            <Form autoComplete="off">
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button style={{ width: '100%', padding: '1.75rem 20px', color: '#0B0B0C', fontWeight: '400', fontSize: '14px', lineHeight: '23px', background: 'rgba(190, 190, 190, 0.1)', border: '1px solid rgba(62, 62, 62, 0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            Please download file and after filling the details upload it.
                            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.4768 13.2119L9.08699 16.5763C8.8532 16.8087 8.47563 16.8087 8.24184 16.5763L4.85207 13.2119C4.49523 12.8579 4.74555 12.25 5.24758 12.25H7.03906H7.53906V11.75V9.4375C7.53906 9.12672 7.79078 8.875 8.10156 8.875H9.22656C9.53734 8.875 9.78906 9.12672 9.78906 9.4375V11.75V12.25H10.2891H12.0805C12.5826 12.25 12.8329 12.8579 12.4768 13.2119ZM12.4768 13.2119L12.1243 12.8573L8.73477 16.2215L8.73451 16.2217C8.69573 16.2603 8.6331 16.2603 8.59432 16.2217L8.59406 16.2215L5.2043 12.857L5.20422 12.8569C5.18909 12.8419 5.1862 12.8315 5.1851 12.8252C5.18351 12.8162 5.18413 12.803 5.19014 12.7884C5.19616 12.7738 5.20498 12.7641 5.21232 12.7589C5.21737 12.7553 5.22656 12.75 5.24758 12.75H7.53906H8.03906V12.25V9.4375C8.03906 9.40286 8.06692 9.375 8.10156 9.375H9.22656C9.2612 9.375 9.28906 9.40286 9.28906 9.4375V12.25V12.75H9.78906H12.0805C12.1016 12.75 12.1108 12.7553 12.1158 12.7589C12.1232 12.7641 12.1321 12.7739 12.1381 12.7886C12.1442 12.8033 12.1448 12.8166 12.1432 12.8257C12.1421 12.832 12.1393 12.8423 12.1243 12.8572L12.1245 12.857L12.4768 13.2119ZM10.2891 1V0.5H9.78906H2.75781C2.01409 0.5 1.41406 1.10003 1.41406 1.84375V18.1562C1.41406 18.9 2.01409 19.5 2.75781 19.5H14.5703C15.314 19.5 15.9141 18.9 15.9141 18.1562V6.625V6.125H15.4141H10.6328C10.4449 6.125 10.2891 5.96917 10.2891 5.78125V1ZM12.0799 0.892721L12.0797 0.89254L15.5217 4.33803L15.5215 4.33785L12.0799 0.892721ZM11.7262 1.24608L11.7262 1.24607L11.7262 1.24608Z"
                                    stroke="#FF3E5B"
                                />
                            </svg>
                        </Button>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Dragger
                            {...uploadProps}
                            style={{
                                margin: '1.5rem 0 0 0',
                                background: '#F2F2F2',

                                border: '1px dashed #B5B5B5',

                                borderRadius: '6px',
                                minHeight: '172px',
                                padding: '1rem 0 0 0',
                            }}
                        >
                            <p className="ant-upload-drag-icon" style={{ textAlign: 'center' }}>
                                <img src={Svg} alt="" />
                            </p>
                            <p className="ant-upload-text" style={{ textAlign: 'center', fontWeight: '600', fontSize: '18px', lineHeight: '23px', color: '#0B0B0C' }}>
                                Click or drag file to this area to upload
                            </p>
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
