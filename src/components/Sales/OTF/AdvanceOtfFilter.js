import { Button, Row, Col, Input,Select } from 'antd';
import { FilterIcon } from 'Icons';
import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

export default function AdvanceOtfFilter(props) {
    const { advanceFilter = false, otfFilter=false, title, filterString, otfSearchList, from, handleOTFChange,otfSearchvalue, ChangeSearchHandler,onSearchHandle, setAdvanceSearchVisible  } = props;

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                    {title}
                        <Row gutter={20}>
                            {otfFilter && (
                                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                    <div className={styles.selectSearchBg}>
                                        <Select className={styles.headerSelectField} onChange={handleOTFChange} placeholder="Select Parameter" allowClear>
                                            {otfSearchList?.map((item) => (
                                                <Option value={item.id}>{item.value}</Option>
                                            ))}
                                        </Select>

                                        <Search placeholder="Search" value={otfSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
                                        
                                    </div>
                                </Col>
                            )}
                            {advanceFilter && (
                                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
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