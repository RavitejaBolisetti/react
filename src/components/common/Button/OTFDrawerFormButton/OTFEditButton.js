import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from './OTFDrawerFormButton.module.css';

const OTFEditButton = ({ formData, onCloseAction, buttonData, setButtonData, saveButtonName = 'Save', handleButtonClick, isLoadingOnSave }) => {
    return (
        <Row gutter={20} className={styles.formFooter}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnLeft}>
                {buttonData?.closeBtn && (
                    <Button danger onClick={onCloseAction}>
                        Close
                    </Button>
                )}

                {buttonData?.cancelBtn && (
                    <Button danger onClick={onCloseAction}>
                        Cancel
                    </Button>
                )}
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                {buttonData?.saveBtn && (
                    <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                        {saveButtonName}
                    </Button>
                )}

                {buttonData?.saveAndNewBtn && (
                    <Button loading={isLoadingOnSave} htmlType="submit" disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: true })} type="primary">
                        Save & Add New
                    </Button>
                )}

                {buttonData?.editBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record: formData })} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                        Edit
                    </Button>
                )}
            </Col>
        </Row>
    );
};

export default OTFEditButton;
