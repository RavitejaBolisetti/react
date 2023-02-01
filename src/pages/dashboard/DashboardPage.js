import React from 'react';

import 'assets/style/new_robin.scss';
import 'font-awesome/css/font-awesome.min.css';
import styles from './DashboardPage.module.css';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { connect } from 'react-redux';
import imdimg from 'assets/img/img_md.png';
import { Carousel, Card, Button, Row, Col } from 'antd';
import { AiFillDashboard } from 'react-icons/ai';
import { BsFillBarChartFill } from 'react-icons/bs';
import { BiLineChart } from 'react-icons/bi';
import { RiFileShield2Line } from 'react-icons/ri';
import { FaRupeeSign, FaChartPie, FaChartArea, FaClock, FaNewspaper, FaChalkboard, FaBirthdayCake } from 'react-icons/fa';

const mapStateToProps = (state) => {
    return {
        kuldeep: 'Singh',
    };
};

const DashboardPageBase = (props) => {
    return (
        <>
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12 fl dashboardleftPanne">
                            <div className="pageHeaderNameSection">
                                <div className="row">
                                    <div className="col-md-8 padl9">
                                        <span className="headingGradient">
                                            <span className="innerheading">Welcome back John! </span>
                                        </span>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row searchSec">
                                            <div className="col-md-11 pad0 ">
                                                <input type="text" className="form-control searchfiedld" placeholder="Enter Doc ID..." />
                                            </div>
                                            <div className="buttonHolder col-md-1 pad0 ">
                                                <button type="button" className="btn btn-outline-light rightbtn searchbutt">
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Row>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Card
                                        title={
                                            <>
                                                {' '}
                                                <AiFillDashboard /> Dashboard
                                            </>
                                        }
                                        avatar=""
                                        bordered={false}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <div>
                                            <div className="direct-chat-messages">
                                                <div className="dashboardGraphBox">
                                                    <div className="graphBoxfirstSec">
                                                        <BsFillBarChartFill />
                                                    </div>
                                                    <div className="graphBoxSecoundSec">
                                                        <FaChartPie />
                                                    </div>
                                                    <div className="graphBoxthirdSec">
                                                        <BiLineChart />
                                                    </div>
                                                    <div className="graphBoxforthSec">
                                                        <FaChartArea />
                                                    </div>
                                                </div>

                                                <div className="buttonHolder">
                                                    <Button onclick="window.location.href='dasboard.html'" className="btn btn-outline centerbtn boxShdwNon mrl15" danger>
                                                        View Dashboard
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Card
                                        title={
                                            <>
                                                <FaClock /> Action Items
                                            </>
                                        }
                                        bordered={false}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <div className="direct-chat-messages">
                                            <div className="scrollbar" id="scrollHBar">
                                                <div className="force-overflow">
                                                    <ul className="dashboardList">
                                                        <li>
                                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                                        </li>
                                                        <li>
                                                            Pending POs to be released <span className="badge badge-danger right">12</span>
                                                        </li>
                                                        <li>
                                                            Vehicles to be delivered <span className="badge badge-danger right">10</span>
                                                        </li>
                                                        <li>
                                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                                        </li>
                                                        <li>
                                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                                        </li>
                                                        <li>
                                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                                        </li>
                                                        <li>
                                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                                        </li>
                                                        <li>
                                                            Enquiries to be followed up <span className="badge badge-danger right">6</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Card
                                        title={
                                            <>
                                                <FaNewspaper /> News
                                            </>
                                        }
                                        bordered={false}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Carousel autoplay>
                                            <div>
                                                <h4>Lorem Ipsum is simply dummy text.</h4>
                                                <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                                <div className="buttonHolder">
                                                    <Button danger onclick="window.location.href='dasboard.html'" className="btn btn-outline centerbtn boxShdwNon mrl15">
                                                        View Dashboard
                                                    </Button>
                                                </div>
                                            </div>

                                            <div>
                                                <h4>Lorem Ipsum is simply dummy text.</h4>
                                                <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                                <div className="buttonHolder">
                                                    <Button danger onclick="window.location.href='dasboard.html'" className="btn btn-outline centerbtn boxShdwNon mrl15">
                                                        View Dashboard
                                                    </Button>
                                                </div>
                                            </div>

                                            <div>
                                                <h4>Lorem Ipsum is simply dummy text.</h4>
                                                <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                                <div className="buttonHolder">
                                                    <Button danger onclick="window.location.href='dasboard.html'" className="btn btn-outline centerbtn boxShdwNon mrl15">
                                                        View Dashboard
                                                    </Button>
                                                </div>
                                            </div>
                                        </Carousel>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Card
                                        title={
                                            <>
                                                <FaChalkboard /> Upcoming Trainings
                                            </>
                                        }
                                        bordered={false}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <div>
                                            <div className="direct-chat-messages"></div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Card
                                        title={
                                            <>
                                                {' '}
                                                <FaBirthdayCake /> Birthday Calendar
                                            </>
                                        }
                                        bordered={false}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Carousel autoplay>
                                            <div>
                                                <div className="row ">
                                                    <div className="col-md-3">
                                                        <img src={imdimg} alt="" />
                                                    </div>
                                                    <div className="col-md-8 birthdayTxtcontaner">
                                                        <div className="birthdayName">First Name, Last Name</div>
                                                        <div>Today - 22 Nov.</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="row ">
                                                    <div className="col-md-3">
                                                        <img src={imdimg} alt="" />
                                                    </div>
                                                    <div className="col-md-8 birthdayTxtcontaner">
                                                        <div className="birthdayName">First Name1, Last Name1</div>
                                                        <div>Today - 22 Nov.</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="row ">
                                                    <div className="col-md-3">
                                                        <img src={imdimg} alt="" />
                                                    </div>
                                                    <div className="col-md-8 birthdayTxtcontaner">
                                                        <div className="birthdayName">First Name2, Last Name2</div>
                                                        <div>Today - 22 Nov.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Card
                                        title={
                                            <>
                                                {' '}
                                                <RiFileShield2Line /> Knowledge Center
                                            </>
                                        }
                                        bordered={false}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <div className="card-body">
                                            <div className="direct-chat-messages"></div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <ul className="drag-sort-enable">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export const DashboardPage = connect(mapStateToProps, null)(withLayoutMaster(DashboardPageBase));
