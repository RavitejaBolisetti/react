/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Button, Space, Divider, Tag, Typography } from 'antd';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import * as IMAGES from 'assets';

import styles from './Dashboard.module.scss';
import DashboardActionItems from './DashboardActionItems';
import PieChart from './PieChart';
import WidgetDrawer from './WidgetDrawer';
import NewsDrawer from './NewsDrawer';
import LatestNews from './LatestNews';
import BirthDayCalender from './BirthDayCalender';

const { Text, Title } = Typography;

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
            Header: { data: loginUserData = [] },
        },
    } = state;

    return {
        collapsed,
        firstName: loginUserData?.firstName || '',
    };
};

const keyHightliteData = [
    { shortDescription: 'GST Update', longDescription: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply text of the printing.', date: '5 min ago' },
    { shortDescription: 'Revised Tax', longDescription: 'Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply dummy text of the printing.', date: '50 min ago' },
    { shortDescription: 'Subsidy on row material', longDescription: 'Lorem Ipsum is simply dummy text of the printing Lorem is simply dummy text of the printing.', date: '9 min ago' },
];

const detailNews = {
    content:
        'Mahindra & Mahindra, the popular Indian car manufacturing brand, has recorded its highest ever sales in the month of July 2023. Mahindra & Mahindra is popularly known for their rugged luxury SUV’s such as XUV 700, Scorpio-N, Scorpio Classic, Thar and compact SUV’s such as XUV 300 and XUV 400 EV.Mahindra & Mahindra, the popular Indian car manufacturing brand, has recorded its highest ever sales in the month of July 2023. Mahindra & Mahindra is popularly known for their rugged luxury SUV’s such as XUV 700, Scorpio-N, Scorpio Classic, Thar and compact SUV’s such as XUV. Mahindra & Mahindra, the popular Indian car manufacturing brand, has recorded its highest ever sales in the month of July 2023. Mahindra & Mahindra is popularly known for their rugged luxury SUV’s such as XUV 700, Scorpio-N, Scorpio Classic, Thar and compact SUV’s such as XUV 300 and XUV 400 EV.',
};
const newsData = [
    { shortDescription: 'Mahindra & Mahindra sells 36,205 SUVs in July 2023', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand.', date: '5 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Sales in July hits highest mark as per TOI Survey', longDescription: 'Mahindra & Mahindra is popularly known for their rugged luxury.', date: '50 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Scorpio Sales Rise By Over 2-Folds', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand', date: '9 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra & Mahindra sells 36,205 SUVs in July 2023', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand.', date: '5 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Sales in July hits highest mark as per TOI Survey', longDescription: 'Mahindra & Mahindra is popularly known for their rugged luxury.', date: '50 min ago', content: detailNews?.content },
    { shortDescription: 'Mahindra Scorpio Sales Rise By Over 2-Folds', longDescription: 'Mahindra & Mahindra, the popular Indian car manufacturing brand', date: '9 min ago', content: detailNews?.content },
];
const birthDayData = {
    birthDaytoday: [
        { name: 'Shally Gupta', date: '17, Feb 2023 Sunday', image: '' },
        { name: 'Vimal Kumar Bhati', date: '21, July 2023 Friday', image: '' },
        { name: 'Vivek Verma', date: '07, December 2023 Friday', image: '' },
    ],
    upcomingBirthDay: [
        { name: 'Vishal Gaurav', date: '19, November 2023 Sunday', image: '' },
        { name: 'Shally Gupta', date: '17, December 2023 Sunday', image: '' },
        { name: 'Vimal Kumar Bhati', date: '21, July 2023 Friday', image: '' },
    ],
};

const DashboardBase = ({ props }) => {
    const [isVisible, serIsVisible] = useState(false);
    const [isNewsVisible, setIsNewsVisible] = useState(false);
    const [highlightsTextIndex, setHighlightsTextIndex] = useState(0);
    const [record, setRecord] = useState('');

    const handleButtonClick = (direction) => {
        if (direction === 'next') {
            if (keyHightliteData?.length === highlightsTextIndex + 1) {
                setHighlightsTextIndex(0);
            } else {
                setHighlightsTextIndex((prev) => Number(prev) + 1);
            }
        } else {
            if (highlightsTextIndex === 0) {
                setHighlightsTextIndex(keyHightliteData?.length - 1);
            } else {
                setHighlightsTextIndex((prev) => Number(prev) - 1);
            }
        }
    };
    const onCloseAction = () => {
        serIsVisible(false);
        setIsNewsVisible(false);
    };

    const onAddWidget = () => {
        serIsVisible(true);
    };

    const handleNewsClick = (data) => {
        setIsNewsVisible(true);
        setRecord(data);
    };

    const WidgetDrawerProps = {
        isVisible,
        onCloseAction,
        titleOverride: 'Add Widget',
    };

    const newsDrawerProps = {
        isVisible: isNewsVisible,
        onCloseAction,
        titleOverride: 'Latest News',
        handleNewsClick,
        newsData,
        record,
    };
    const birthDayProps = {
        birthDayData,
    };

    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.dashboardPageHeading}>
                                <span className={styles.headingGradient}>Dashboard</span>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.keyHighlightBox}>
                        <Row justify="space-between" align="middle">
                            <Space size={10}>
                                <Title level={5}>Key Highlights</Title>
                                <Divider type="vertical" />
                                {keyHightliteData?.map(
                                    (i, index) =>
                                        index === highlightsTextIndex && (
                                            <>
                                                <Tag color="error">{i?.shortDescription}</Tag>
                                                <Text color="danger">
                                                    {i?.longDescription}
                                                    <span>{' ' + i?.date}</span>
                                                </Text>
                                            </>
                                        )
                                )}
                            </Space>
                            <Space size={10}>
                                <Button onClick={() => handleButtonClick('previous')} className={styles.verticallyCentered} icon={<BsChevronLeft size={20} />} type="link"></Button>
                                <Button onClick={() => handleButtonClick('next')} className={styles.verticallyCentered} icon={<BsChevronRight size={20} />} type="link"></Button>
                            </Space>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row gutter={30} className={styles.marB20}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                    <div className={styles.dashboardActionItems}>
                        <Title level={5}>Action Items</Title>
                        <DashboardActionItems />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <div className={styles.dashboardBannerImage}>
                        <img src={IMAGES.BANNER_IMG} alt="banner-images" />
                    </div>
                </Col>
            </Row>
            <Row gutter={20} className={`${styles.marB20} ${styles.dashboardKPI}`}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.verticallyCentered}>
                    <Title level={3}>Dashboard KPI</Title>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.buttonsGroupRight}>
                    {/* <Button type="primary" icon={<FiPlus />} className={styles.verticallyCentered} onClick={onAddWidget}>
                        Add Widget
                    </Button> */}
                </Col>
            </Row>
            <div className={`${styles.marB20} ${styles.dashboardPieChart}`}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Card title={'Stock'}>
                            <PieChart />
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Card title={'Billing'}>
                            <PieChart />
                        </Card>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Card title={'Stock in day'}>
                            <PieChart />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Row gutter={40} className={styles.marB20}>
                <LatestNews {...newsDrawerProps} />
                <BirthDayCalender {...birthDayProps} />
            </Row>

            {/* <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <AiFillDashboard size={21} className={styles.svgIcon} /> Dashboard
                            </>
                        }
                        className={styles.dashboardCard}
                    >
                        <div className={styles.dashboardGraph}>
                            <div className={styles.dashboardGraphBox}>
                                <div className={styles.graphBoxfirstSec}>
                                    <BsFillBarChartFill />
                                </div>
                                <div className={styles.graphBoxSecoundSec}>
                                    <FaChartPie />
                                </div>
                                <div className={styles.graphBoxthirdSec}>
                                    <BiLineChart />
                                </div>
                                <div className={styles.graphBoxforthSec}>
                                    <FaChartArea />
                                </div>
                            </div>

                            <div className={styles.buttonHolder}>
                                <Button className=" mrl15" type="primary">
                                    View Dashboard
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <FaClock size={21} className={styles.svgIcon} /> Action Items
                            </>
                        }
                        className={styles.dashboardCard}
                    >
                        <div className={styles.directChatMessages}>
                            <div className={styles.scrollbar}>
                                <div className="force-overflow">
                                    <ul className={styles.dashboardList}>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Pending POs to be released <span className={`${styles.badge} ${styles.badgedanger}`}>12</span>
                                        </li>
                                        <li>
                                            Vehicles to be delivered <span className={`${styles.badge} ${styles.badgedanger}`}>10</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                        <li>
                                            Enquiries to be followed up <span className={`${styles.badge} ${styles.badgedanger}`}>6</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <TbSpeakerphone size={21} className={styles.svgIcon} /> News
                            </>
                        }
                        className={styles.dashboardCard}
                    >
                        <div className={styles.dashboardGraph}>
                            <div className={styles.dashboardGraphBox}>
                                <div className={styles.newsCard}>
                                    <h4>New Mahindra showroom</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur....</p>
                                </div>
                            </div>
                            <div className={styles.buttonHolder}>
                                <Button className=" mrl15" type="primary">
                                    View More
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <FaChalkboard size={21} className={styles.svgIcon} /> Upcoming Trainings
                            </>
                        }
                        className={styles.dashboardCard}
                    >
                        <div className={styles.dashboardGraph}>
                            <div className={styles.dashboardGraphBox}>
                                <div className={styles.trainingCard}>
                                    <h4>Mahindra powertrain</h4>
                                    <p>Greeting and welcoming the customer</p>
                                </div>
                                <div className={styles.trainingCard}>
                                    <h4>Mahindra powertrain</h4>
                                    <p>Greeting and welcoming the customer</p>
                                </div>
                            </div>
                            <div className={styles.buttonHolder}>
                                <Button className=" mrl15" type="primary">
                                    View More
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <BsCalendarEvent size={21} className={styles.svgIcon} /> Birthday Calendar
                            </>
                        }
                        className={styles.dashboardCard}
                    >
                        <div className={styles.birthContainer}>
                            <div className={styles.birthdayItem}>
                                <div className={styles.birthdayImgcontaner}>
                                    <img src={imdimg} alt="" />
                                </div>
                                <div className={styles.birthdayTxtcontaner}>
                                    <div className={styles.birthdayName}>First Name, Last Name</div>
                                    <div>Today - {convertDateTime(moment(), 'D MMM ')}.</div>
                                </div>
                            </div>
                            <div className={styles.separator}></div>
                            <div className={styles.birthdayItem}>
                                <div className={styles.birthdayImgcontaner}>
                                    <img src={imdimg} alt="" />
                                </div>
                                <div className={styles.birthdayTxtcontaner}>
                                    <div className={styles.birthdayName}>First Name, Last Name</div>
                                    <div>Today - {convertDateTime(moment(), 'D MMM ')}.</div>
                                </div>
                            </div>
                            <div className={styles.separator}></div>
                            <div className={styles.birthdayItem}>
                                <div className={styles.birthdayImgcontaner}>
                                    <img src={imdimg} alt="" />
                                </div>
                                <div className={styles.birthdayTxtcontaner}>
                                    <div className={styles.birthdayName}>First Name, Last Name</div>
                                    <div>Today - {convertDateTime(moment(), 'D MMM ')}.</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                    <Card
                        title={
                            <>
                                <FaBookOpen size={21} className={styles.svgIcon} /> Knowledge Center
                            </>
                        }
                        className={styles.dashboardCard}
                    >
                        <div className={styles.dashboardGraph}>
                            <div className={styles.dashboardGraphBox}>
                                <div className={styles.trainingCard}>
                                    <h4>Lorem Ipsum</h4>
                                    <p>It is sometimes known as dummy text</p>
                                </div>
                                <div className={styles.trainingCard}>
                                    <h4>Lorem Ipsum</h4>
                                    <p>It is sometimes known as dummy text</p>
                                </div>
                            </div>
                            <div className={styles.buttonHolder}>
                                <Button className=" mrl15" type="primary">
                                    View More
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row> */}
            <WidgetDrawer {...WidgetDrawerProps} />
            <NewsDrawer {...newsDrawerProps} />
        </div>
    );
};

export const DashboardNew = connect(mapStateToProps, null)(DashboardBase);
