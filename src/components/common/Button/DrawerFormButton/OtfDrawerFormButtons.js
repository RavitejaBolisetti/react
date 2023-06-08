import { Button, Row, Col } from 'antd';
import React from 'react';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';
import styles from './DrawerFormButton.module.css';

const otfDrawerButtons = ({ buttonData, id = { edit: 'edit', allot: 'allot', invoice: 'invoice', Transfer: 'Transfer', Next: 'Next' }, loader, onCloseAction, handleButtonClick, formData }) => {
    return (
        <Row gutter={20} className={styles.formFooter}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                {buttonData?.closeBtn && (
                    <Button danger onClick={onCloseAction}>
                        Close
                    </Button>
                )}
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Row gutter={20}>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        {buttonData?.editBtn && (
                            <Button type="primary" form={id?.edit} onClick={handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                                Edit
                            </Button>
                        )}
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        {buttonData?.cancelBtn && (
                            <Button type="primary"  onClick={handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.CANCEL, record: formData })}>
                                Cancel
                            </Button>
                        )}
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        {buttonData?.allotbtn && (
                            <Button type="primary" form={id?.allot} onClick={handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                                Allot
                            </Button>
                        )}
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        {buttonData?.invoiceBtn && (
                            <Button type="primary" form={id?.invoice} onClick={handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.INVOICE, record: formData })}>
                                Invoice
                            </Button>
                        )}
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        {buttonData?.transferBtn && (
                            <Button type="primary" form={id?.Transfer} onClick={handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.TRANSFER, record: formData })}>
                                Transfer
                            </Button>
                        )}
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        {buttonData?.nextBtn && (
                            <Button type="primary" form={id?.Next} onClick={handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                                Next
                            </Button>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};
export const Otfbuttons = otfDrawerButtons;
