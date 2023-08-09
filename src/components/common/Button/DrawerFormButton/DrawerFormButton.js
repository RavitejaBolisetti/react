/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from 'components/common/Common.module.css';

const DrawerButtons = ({ formData, onCloseAction, buttonData, setButtonData, saveButtonName = 'Save', handleButtonClick, isLoadingOnSave, multipleForm = false }) => {
    return (
        <Row gutter={20} className={multipleForm ? styles.formFooterNew : ''}>
            <Col xs={24} sm={6} md={6} lg={6} xl={6} className={styles.footerBtnLeft}>
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

            <Col xs={24} sm={18} md={18} lg={18} xl={18} className={styles.footerBtnRight}>
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

                {buttonData?.cancelOTFBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.CANCEL_OTF })} type="primary" htmlType="submit">
                        Cancel OTF
                    </Button>
                )}

                {buttonData?.transferOTFBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.TRANSFER_OTF })} type="primary" htmlType="submit">
                        Transfer OTF
                    </Button>
                )}
            </Col>
        </Row>
    );
};

export const DrawerFormButton = (props) => {
    return (
        <div className={!props.multipleForm ? styles.formFooter : ''}>
            <DrawerButtons {...props} />
        </div>
    );
};

export default DrawerFormButton;