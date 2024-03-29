/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Popover } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const OTFFormButton = ({ record, handleChangeHistory, handleOtfSoMappingHistory, onCloseAction, buttonData, setButtonData, saveButtonName = 'Save & Next', handleButtonClick, isLoadingOnSave, isLastSection }) => {
    const content = <div>{translateContent('global.generalMessage.comingSoon')}</div>;
    return (
        <div className={styles.formFooter}>
            <Row gutter={20}>
                <Col xs={24} sm={8} md={6} lg={4} xl={4} className={styles.buttonsGroupLeft}>
                    {buttonData?.closeBtn && (
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.close')}
                        </Button>
                    )}

                    {buttonData?.cancelBtn && (
                        <Button danger onClick={onCloseAction}>
                            {translateContent('global.buttons.cancel')}
                        </Button>
                    )}
                </Col>

                <Col xs={24} sm={16} md={18} lg={20} xl={20} className={styles.buttonsGroupRight}>
                    {buttonData?.editBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.EDIT, record, openDefaultSection: false })} type="primary">
                            {translateContent('global.buttons.edit')}
                        </Button>
                    )}

                    {buttonData?.otfSoMappingHistoryBtn && (
                        <Button onClick={handleOtfSoMappingHistory} type="primary">
                            {translateContent('global.buttons.bookingMappingHistory')}
                        </Button>
                    )}

                    {buttonData?.allotBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.ALLOT, record })} type="primary">
                            {translateContent('global.buttons.allot')}
                        </Button>
                    )}

                    {buttonData?.unAllotBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.UNALLOT, record })} type="primary">
                            {translateContent('global.buttons.unAllot')}
                        </Button>
                    )}

                    {buttonData?.invoiceBtn && (
                        <Popover content={content} trigger="hover">
                            <Button onClick={() => {}} type="primary">
                                {translateContent('global.buttons.invoice')}
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.deliveryNoteBtn && (
                        <Popover content={content} trigger="hover">
                            <Button onClick={() => {}} type="primary">
                                {translateContent('global.buttons.deliveryNote')}
                            </Button>
                        </Popover>
                    )}

                    {buttonData?.transferOTFBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.TRANSFER_OTF, record })} type="primary">
                            {translateContent('global.buttons.transferBooking')}
                        </Button>
                    )}

                    {buttonData?.cancelOTFBtn && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.CANCEL_OTF, record })} type="primary">
                            {translateContent('global.buttons.cancelBooking')}
                        </Button>
                    )}

                    {buttonData?.changeHistory && (
                        <Button onClick={handleChangeHistory} type="primary">
                            {translateContent('global.changeHistory.title')}
                        </Button>
                    )}

                    {buttonData?.nextBtn && !isLastSection && (
                        <Button onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.NEXT, record })} type="primary">
                            {translateContent('global.buttons.next')}
                        </Button>
                    )}

                    {buttonData?.saveBtn && (
                        <Button loading={isLoadingOnSave} disabled={!buttonData?.formBtnActive} onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">
                            {saveButtonName}
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
