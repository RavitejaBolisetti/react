import React from 'react';
import { Button, Form, Row, Col } from 'antd';
import { FiUpload, FiDownload } from 'react-icons/fi';
import { connect } from 'react-redux';
import { withDrawer } from 'components/withDrawer';
import { bindActionCreators } from 'redux';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';

const mapStateToProps = (state) => {
    const {
        data: {
            ManufacturerAdminHierarchy: {  uploadVisible },
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

const UploadMain = () => {
    return (
        
            <>
                <Form>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Upload File" name="uploadfile">
                                <Button icon={<FiUpload />}>Click to Uploadfile</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Download File" name="downloadfile">
                                <Button icon={<FiDownload />}>Click to downloadfile</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Button style={{ marginTop: '20px' }}>Cancel</Button>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                            <Button style={{ marginTop: '20px' }} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        
    );
};

export const ManufactureAdminHierarchyUpload = connect(mapStateToProps, mapDispatchToProps) (withDrawer(UploadMain, { title: 'Upload', width: '520px' }));