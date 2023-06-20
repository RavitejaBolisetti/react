import { Button, Row, Col, Input, Select } from 'antd';
import styles from 'components/common/Common.module.css';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

export default function AdvanceFilter(props) {
    const { showDealersDataList, DealerSearchvalue, ChangeSearchHandler, onSearchHandle, handleChange, settoggleButton, toggleButton, FROM_ACTION_TYPE, handleAdd } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                    <Button className={styles.marR5} type={toggleButton === 'Individual' ? 'primary' : 'link'} danger onClick={() => settoggleButton('Individual')}>
                                        Individual
                                    </Button>
                                    <Button type={toggleButton === 'Firm/Company' ? 'primary' : 'link'} danger onClick={() => settoggleButton('Firm/Company')}>
                                        Corporate
                                    </Button>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div className={styles.selectSearchBg}>
                                    <Select className={styles.headerSelectField} onChange={handleChange} placeholder="Select Parameter" allowClear>
                                        {showDealersDataList?.map((item) => (
                                            <Option value={item.dealerId}>{item.dealerNm}</Option>
                                        ))}
                                    </Select>
                                    <Search placeholder="Search" value={DealerSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={7} lg={7} xl={7} className={styles.advanceFilterClear}>
                                <Button danger type="primary" icon={<PlusOutlined />} onClick={() => handleAdd({ buttonAction: FROM_ACTION_TYPE?.ADD, record: '' })}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    );
}