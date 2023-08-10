/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Col, Form, Row, Input } from 'antd';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { FaHistory } from 'react-icons/fa';
import TreeSelectField from 'components/common/TreeSelectField';

const { Search } = Input;

const ContentHeader = ({ isAdvanceFilter = false, isTogglePresent = false, isDefaultContentHeader = true, toggleFirst = 'Web', toggleSecond = 'Mobile', styles, onChange, handleTypeClick, onFinish, onFinishFailed, validateTriggervalue, treeSelectFieldProps, organizationId = undefined, changeHistoryModelOpen, menuType = 'W', title, advanceFilterResultProps }) => {
    if (isAdvanceFilter) {
        return <AppliedAdvanceFilter {...advanceFilterResultProps} />;
    } else if (isTogglePresent) {
        return (
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles.verticallyCentered}>
                        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                            <Button className={styles.marR5} type={menuType === 'W' ? 'primary' : 'link'} onClick={() => handleTypeClick('W')}>
                                {toggleFirst}
                            </Button>
                            <Button type={menuType === 'M' ? 'primary' : 'link'} onClick={() => handleTypeClick('M')}>
                                {toggleSecond}
                            </Button>
                        </div>
                        <Search placeholder="Search" allowClear onChange={onChange} className={styles.headerSearchField} />
                    </Col>
                </Row>
            </div>
        );
    } else if (isDefaultContentHeader) {
        return (
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item label={`${title}`} name="code" validateTrigger={validateTriggervalue}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Col>
                                    {organizationId && (
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Search placeholder="Search" allowClear onChange={onChange} className={styles.headerSearchField} />
                                        </Col>
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                    {organizationId && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.buttonsGroupRight}>
                            <Button icon={<FaHistory />} type="primary" className={styles.verticallyCentered} onClick={changeHistoryModelOpen}>
                                Change History
                            </Button>
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
};

export default ContentHeader;
