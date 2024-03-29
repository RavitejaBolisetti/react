/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const CustomerFormButton = ({ record, onCloseAction, buttonData, handleChangeHistory, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoadingOnSave, isLastSection, isLoading }) => {
    const disabled = isLoading || isLoadingOnSave;
    const disabledProps = { disabled };
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupLeft}>
                    {buttonData?.closeBtn && (
                        <Button {...disabledProps} danger onClick={onCloseAction}>
                            {translateContent('global.buttons.close')}
                        </Button>
                    )}

                    {buttonData?.cancelBtn && (
                        <Button {...disabledProps} danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                    {buttonData?.changeHistory && (
                        <Button {...disabledProps} onClick={handleChangeHistory} type="primary">
                            {translateContent('global.buttons.viewHistory')}
                        </Button>
                    )}
                    {buttonData?.editBtn && (
                        <Button {...disabledProps} data-testid="editBtn" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record, openDefaultSection: false })} type="primary">
                            {translateContent('global.buttons.edit')}
                        </Button>
                    )}

                    {buttonData?.nextBtn && !isLastSection && (
                        <Button {...disabledProps} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record, isNextBtnClick: true })} type="primary">
                            {translateContent('global.buttons.next')}
                        </Button>
                    )}

                    {buttonData?.saveBtn && (
                        <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive || disabled} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                            {saveButtonName}
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
