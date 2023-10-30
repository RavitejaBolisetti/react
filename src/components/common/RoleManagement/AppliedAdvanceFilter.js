/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Row, Col, Form, Input } from 'antd';
import { searchValidator } from 'utils/validation';
import styles from 'assets/sass/app.module.scss';

import { TfiReload } from 'react-icons/tfi';
import { PlusOutlined } from '@ant-design/icons';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';

const { Search } = Input;
export default function AppliedAdvanceFilter(props) {
    const { tableData = [], showAddButton = true, title, from, handleClearInSearch, onSearchHandle, handleReferesh, handleButtonClick, validator = searchValidator } = props;
    const { currentItem, handleToggleButton, isToggleBtnVisible = false } = props;

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form autoComplete="off" colon={false} form={from} className={styles.masterListSearchForm}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={18} lg={18} xl={18} className={styles.verticallyCentered}>
                                            {isToggleBtnVisible && (
                                                <div className={`${styles.headingToggle}`}>
                                                    {Object.values(USER_TYPE_USER)?.map((item) => {
                                                        return (
                                                            <Button onClick={() => handleToggleButton(item?.id)} type={currentItem === item?.id ? 'primary' : 'link'}>
                                                                {item?.title}
                                                            </Button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                            <div className={styles.fullWidth}>
                                                <Form.Item
                                                    label={`${title || ''}`}
                                                    name="code"
                                                    rules={[
                                                        {
                                                            validator: validator,
                                                        },
                                                    ]}
                                                    validateTrigger={['onSearch']}
                                                    style={{ width: '300px' }}
                                                >
                                                    <Search placeholder="Search" allowClear onSearch={onSearchHandle} onChange={handleClearInSearch} />
                                                </Form.Item>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={8} lg={8} xl={8}>
                        {tableData?.length > 0 && (
                            <>
                                <Button icon={<TfiReload />} onClick={handleReferesh} data-testid="refreshBtn" danger />
                                {showAddButton && (
                                    <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                        Add
                                    </Button>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
}
