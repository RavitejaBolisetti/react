import { Button, Row, Col } from 'antd';
import React from 'react';
import { OTF_FORM_ACTION_TYPE } from 'constants/otfActionType';
import styles from './OTFDrawerFormButton.module.css';

const OTFDrawerFormButton = ({ buttonData, id = { edit: 'edit', transfer: 'transfer', cancel: 'cancelOTF', allot: 'allot', unallot: 'unallot', invoice: 'invoice', deliverynote: 'deliveryNote', Next: 'myform' }, loader, onCloseAction, handleButtonClick, formData }) => {
    return (
        <Row gutter={20} className={styles.formFooter}>
            <Col xs={24} sm={2} md={2} lg={2} xl={2}>
                <Button danger onClick={onCloseAction}>
                    Close
                </Button>
            </Col>

            <Col xs={24} sm={22} md={22} lg={22} xl={22} className={styles.footerBtnRight}>
                {buttonData?.editBtn && (
                    <Button type="primary" form={id?.edit} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                        Edit
                    </Button>
                )}

                {buttonData?.transferBtn && (
                    <Button type="primary" form={id?.edit} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.EDIT, record: formData })}>
                        Transfer
                    </Button>
                )}
                {buttonData?.cancelBtn && (
                    <Button type="primary" onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.CANCEL, record: formData })}>
                        Cancel OTF
                    </Button>
                )}

                {buttonData?.allotBtn && (
                    <Button type="primary" form={id?.allot} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                        Allot
                    </Button>
                )}
                {buttonData?.unallotBtn && (
                    <Button type="primary" form={id?.allot} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.ALLOT, record: formData })}>
                        Un-Allot
                    </Button>
                )}

                {buttonData?.invoiceBtn && (
                    <Button type="primary" form={id?.invoice} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.INVOICE, record: formData })}>
                        Invoice
                    </Button>
                )}

                {buttonData?.deliverBtn && (
                    <Button type="primary" form={id?.deliverynote} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                        Delivery Note
                    </Button>
                )}
                {buttonData?.nextBtn && (
                    <Button type="primary" form={id?.Next} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                        Next
                    </Button>
                )}
                {buttonData?.saveNext && (
                    <Button type="primary" htmlType="submit" form={id?.Next} onClick={() => handleButtonClick({ buttonAction: OTF_FORM_ACTION_TYPE.NEXT, record: formData })}>
                        Save & Next
                    </Button>
                )}
            </Col>
        </Row>
    );
};

export default OTFDrawerFormButton;
