/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { connect } from 'react-redux';
import imdimg from 'assets/img/img_md.png';
import { Row, Col, Card, Button } from 'antd';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillBarChartFill, BsCalendarEvent } from 'react-icons/bs';
import { BiLineChart } from 'react-icons/bi';
import { TbSpeakerphone } from 'react-icons/tb';
import { FaChartPie, FaChartArea, FaClock, FaChalkboard, FaBookOpen } from 'react-icons/fa';
import { convertDateTime } from 'utils/formatDateTime';
import styles from './Dashboard.module.scss';
//import styles from './Dashboard.module.css';
import moment from 'moment';

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

const DashboardBase = ({ props }) => {
    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <div className={styles.dashboardPageHeading}>
                                <span className={styles.headingGradient}>Home</span>
                            </div>
                        </Col>
                    </Row>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20}>
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
            </Row>
        </div>
    );
};

export const Dashboard = connect(mapStateToProps, null)(DashboardBase);
