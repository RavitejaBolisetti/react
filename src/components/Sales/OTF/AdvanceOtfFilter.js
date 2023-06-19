import { Button, Row, Col, Input, Select } from 'antd';
import { FilterIcon } from 'Icons';
import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

export default function AdvanceOtfFilter(props) {
    const { advanceFilter = false, otfFilter = false, title, otfSearchList, handleOTFChange, otfSearchvalue, ChangeSearchHandler, onSearchHandle, setAdvanceSearchVisible } = props;

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <span className={styles.headerText}>{title}</span>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                        <Row gutter={20}>
                            {otfFilter && (
                                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                    <div className={styles.selectSearchBg}>
                                        <Select className={styles.headerSelectField} onChange={handleOTFChange} placeholder="OTF No." allowClear>
                                            {otfSearchList?.map((item) => (
                                                <Option value={item.id}>{item.value}</Option>
                                            ))}
                                        </Select>
                                        <Search placeholder="Search" value={otfSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
                                    </div>
                                </Col>
                            )}
                            {advanceFilter && (
                                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <Button
                                        icon={<FilterIcon />}
                                        type="link"
                                        className={styles.filterBtn}
                                        onClick={() => {
                                            setAdvanceSearchVisible(true);
                                        }}
                                    >
                                        Advanced Filters
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
}
