import { Button, Row, Col, Form, Input } from 'antd';
import { searchValidator } from 'utils/validation';
import { RxCross2 } from 'react-icons/rx';
import { FilterIcon } from 'Icons';
// import styles from './AppliedAdvanceFilter.module.css';
import styles from 'components/common/Common.module.css';

import { TfiReload } from 'react-icons/tfi';
import { PlusOutlined } from '@ant-design/icons';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

const { Search } = Input;
export default function AppliedAdvanceFilter(props) {
    const { advanceFilter = false, title, filterString, from, onFinish, onFinishFailed, extraParams, removeFilter, handleResetFilter, onSearchHandle, setAdvanceSearchVisible, handleReferesh, handleButtonClick } = props;
    const onKeyPressHandler = ( e) => {
         e.key === 'Enter' && e.preventDefault()
    };

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                <Form onKeyPress={onKeyPressHandler} autoComplete="off" colon={false} form={from} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                    <Form.Item
                                        label={`${title}`}
                                        name="code"
                                        rules={[
                                            {
                                                validator: searchValidator,
                                            },
                                        ]}
                                        validateTrigger={['onSearch']}
                                    >
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onPressEnter={false} />
                                    </Form.Item>
                                </Form>
                            </Col>
                            {advanceFilter && (
                                <Col xs={24} sm={12} md={10} lg={10} xl={10}>
                                    <Button icon={<FilterIcon />} type="link" className={styles.filterBtn} onClick={() => setAdvanceSearchVisible(true)} danger>
                                        Advanced Filters
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </Col>

                    <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                        <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                            Add
                        </Button>
                    </Col>
                </Row>
                {advanceFilter && filterString?.advanceFilter && (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                    <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                                    {extraParams?.map((filter) => {
                                        return (
                                            filter?.value && (
                                                <div className={styles.advanceFilterItem} key={filter?.key}>
                                                    {filter?.name}
                                                    {filter?.canRemove && (
                                                        <span>
                                                            <RxCross2 onClick={() => removeFilter(filter?.key)} />
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        );
                                    })}
                                </Col>
                                <Col xs={24} sm={2} md={2} lg={2} xl={2} className={styles.advanceFilterClear}>
                                    <Button className={styles.clearBtn} onClick={handleResetFilter} danger>
                                        Clear
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
            </div>
        </>
    );
}
