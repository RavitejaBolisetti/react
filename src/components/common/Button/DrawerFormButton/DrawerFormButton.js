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

const DrawerButtons = ({ formData, onCloseAction, buttonData, setButtonData, saveButtonName = translateContent('global.buttons.save'), handleButtonClick, isLoading, isLoadingOnSave, multipleForm = false, handlePrintDownload }) => {
    const disabled = isLoadingOnSave || isLoading;
    const disabledProps = { disabled: disabled };
    return (
        <Row gutter={20} className={multipleForm ? styles.formFooterNew : ''}>
            <Col xs={24} sm={6} md={6} lg={6} xl={6} className={styles.buttonsGroupLeft}>
                {buttonData?.closeBtn && (
                    <Button danger {...disabledProps} onClick={onCloseAction} data-testid="close_btn">
                        {translateContent('global.buttons.close')}
                    </Button>
                )}

                {buttonData?.cancelBtn && (
                    <Button danger {...disabledProps} onClick={onCloseAction} data-testid="cancel_btn">
                        {translateContent('global.buttons.cancel')}
                    </Button>
                )}
            </Col>

            <Col xs={24} sm={18} md={18} lg={18} xl={18} className={styles.buttonsGroupRight}>
                {buttonData?.printDownloadBtn && (
                    <Button {...disabledProps} onClick={() => handlePrintDownload({ record: formData })} danger>
                        {translateContent('global.buttons.print/download')}
                    </Button>
                )}

                {buttonData?.saveBtn && (
                    <Button loading={isLoadingOnSave?.isSaveBtnLoading || isLoadingOnSave} disabled={!buttonData?.formBtnActive || disabled} data-testid="save" onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                        {saveButtonName}
                    </Button>
                )}

                {buttonData?.saveAndNewBtn && (
                    <Button loading={isLoadingOnSave?.isSaveAndNewBtnLoading || isLoadingOnSave} disabled={!buttonData?.formBtnActive || disabled} data-testid="save-and-new" htmlType="submit" onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: true })} type="primary">
                        {translateContent('global.buttons.saveAndNew')}
                    </Button>
                )}

                {buttonData?.editBtn && (
                    <Button data-testid="edit" {...disabledProps} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record: formData })} form="configForm" key="submitAndNew" htmlType="submit" type="primary">
                        {translateContent('global.buttons.edit')}
                    </Button>
                )}

                {buttonData?.cancelOTFBtn && (
                    <Button data-testid="otf-cancel" {...disabledProps} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.CANCEL_OTF })} type="primary" htmlType="submit">
                        {translateContent('global.buttons.cancelBooking')}
                    </Button>
                )}

                {buttonData?.transferOTFBtn && (
                    <Button data-testid="transferBooking" {...disabledProps} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.TRANSFER_OTF })} type="primary" htmlType="submit">
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
