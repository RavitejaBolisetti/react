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
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} className={styles.searchAndLabelAlign}>
                        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                            <Button className={styles.marR5} type={menuType === 'W' ? 'primary' : 'link'} danger onClick={() => handleTypeClick('W')}>
                                {toggleFirst}
                            </Button>
                            <Button type={menuType === 'M' ? 'primary' : 'link'} danger onClick={() => handleTypeClick('M')}>
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
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
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
                        <Col className={styles.buttonHeadingContainer} xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Button type="primary" className={`${styles.changeHistoryModelOpen} ${styles.floatRight}`} onClick={changeHistoryModelOpen}>
                                <FaHistory className={styles.buttonIcon} />
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
