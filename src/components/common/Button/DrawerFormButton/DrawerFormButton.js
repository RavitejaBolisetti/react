/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from './DrawerFormButton.module.scss';
import { translateContent } from 'utils/translateContent';

const DrawerButtons = ({ formData, onCloseAction, buttonData, setButtonData, saveButtonName = translateContent('global.buttons.save'), handleButtonClick, isLoadingOnSave, multipleForm = false }) => {
    return (
        <Row gutter={20} className={multipleForm ? styles.formFooterNew : ''}>
            <Col xs={24} sm={6} md={6} lg={6} xl={6} className={styles.buttonsGroupLeft}>
                {buttonData?.closeBtn && (
                    <Button danger onClick={onCloseAction} data-testid="close_btn">
                        {translateContent('global.buttons.close')}
                    </Button>
                )}

                {buttonData?.cancelBtn && (
                    <Button danger onClick={onCloseAction}>
                        {translateContent('global.buttons.cancel')}
                    </Button>
                )}
            </Col>

            <Col xs={24} sm={18} md={18} lg={18} xl={18} className={styles.buttonsGroupRight}>
                {buttonData?.printDownloadBtn && (
                    <Button danger onClick={onCloseAction}>
                        {translateContent('global.buttons.print/download')}
                    </Button>
                )}
                {buttonData?.saveBtn && (
                    <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive} data-testid="save" onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                        {saveButtonName}
                    </Button>
                )}

                {buttonData?.saveAndNewBtn && (
                    <Button loading={isLoadingOnSave} data-testid="save-and-new" htmlType="submit" disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: true })} type="primary">
                        {translateContent('global.buttons.saveAndNew')}
                    </Button>
                )}

                {buttonData?.editBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record: formData })} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                        {translateContent('global.buttons.edit')}
                    </Button>
                )}

                {buttonData?.cancelOTFBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.CANCEL_OTF })} type="primary" htmlType="submit">
                        {translateContent('global.buttons.edit')}
                    </Button>
                )}

                {buttonData?.transferOTFBtn && (
                    <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.TRANSFER_OTF })} type="primary" htmlType="submit">
                        {translateContent('global.buttons.transferBooking')}
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
