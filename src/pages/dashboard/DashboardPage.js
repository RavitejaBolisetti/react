import React, { useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';

import HeaderInner from 'pages/common/Header';
import Footer from 'pages/common/Footer';
import LeftSideBar from 'pages/common/LeftSideBar';

import 'assets/style/new_robin.scss';
// import 'assets/style/sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import styles from './DashboardPage.module.css';

import { Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;

export function DashboardPage() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <Layout hasSider style={{ backgroundColor: '#ffffff' }} theme="dark">
                <Sider width={collapsed ? 95 : 250} collapsible className="light-bg" collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, backgroundColor: '#ffffff' }}>
                    <LeftSideBar collapsed={collapsed} />
                    <div className={styles.changeTheme}>Change Theme</div>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: collapsed ? 90 : 250, backgroundColor: '#ffffff' }}>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <HeaderInner />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'initial',
                            background: '#ffffff',
                        }}
                    >
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
                                        <ul className="drag-sort-enable">
                                            <li>
                                                <div className="col-md-12 pad0">
                                                    <div className="card card-outline direct-chat direct-chat-primary">
                                                        <div className="card-header">
                                                            <h3 className="card-title">
                                                                <i className="titleICO fa-solid fa-gauge"></i> Dashboard
                                                            </h3>

                                                            <div className="card-tools">&nbsp;</div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="direct-chat-messages">
                                                                <div className="dashboardGraphBox">
                                                                    <div className="graphBoxfirstSec">
                                                                        <i className="fa-solid fa-chart-simple"></i>
                                                                    </div>
                                                                    <div className="graphBoxSecoundSec">
                                                                        <i className="fa-solid fa-chart-pie"></i>
                                                                    </div>
                                                                    <div className="graphBoxthirdSec">
                                                                        <i className="fa-solid fa-chart-line"></i>
                                                                    </div>
                                                                    <div className="graphBoxforthSec">
                                                                        <i className="fa-solid fa-chart-area"></i>
                                                                    </div>
                                                                </div>

                                                                <div className="buttonHolder">
                                                                    <button type="button" onclick="window.location.href='dasboard.html'" className="btn btn-outline centerbtn boxShdwNon mrl15">
                                                                        View Dashboard
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="col-md-12 pad0">
                                                    <div className="card card-outline direct-chat direct-chat-primary">
                                                        <div className="card-header">
                                                            <h3 className="card-title">
                                                                <i className="titleICO fa-solid fa-clock"></i> Action Items
                                                            </h3>

                                                            <div className="card-tools">&nbsp;</div>
                                                        </div>

                                                        <div className="card-body">
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="col-md-12 pad0">
                                                    <div className="card card-outline direct-chat direct-chat-primary">
                                                        <div className="card-header">
                                                            <h3 className="card-title">
                                                                <i className="titleICO fa-solid fa-newspaper"></i> News
                                                            </h3>

                                                            <div className="card-tools">
                                                                <button type="button" className="btn btn-tool">
                                                                    <i className="fa-solid fa-gear"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="direct-chat-messages card-body">
                                                            <div className="row">
                                                                <div id="myCarousel" className="carousel slide newsCarsulal" data-ride="carousel">
                                                                    <ul className="carousel-indicators">
                                                                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                                                        <li data-target="#myCarousel" data-slide-to="1"></li>
                                                                        <li data-target="#myCarousel" data-slide-to="2"></li>
                                                                    </ul>

                                                                    <div className="carousel-inner newsCarsulal_contaner" role="listbox">
                                                                        <div className="carousel-item active">
                                                                            <h4>Lorem Ipsum is simply dummy text.</h4>
                                                                            <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                                                            <div className="buttonHolder">
                                                                                <button type="button" onclick="window.location.href='dasboard.html'" className="btn btn-outline_main">
                                                                                    View Dashboard
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="carousel-item">
                                                                            <h4>Lorem Ipsum is simply dummy text.</h4>
                                                                            <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                                                            <div className="buttonHolder">
                                                                                <button type="button" onclick="window.location.href='dasboard.html'" className="btn btn-outline_main">
                                                                                    View Dashboard
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                        <div className="carousel-item">
                                                                            <h4>Lorem Ipsum is simply dummy text.</h4>
                                                                            <div className="textContaner">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </div>
                                                                            <div className="buttonHolder">
                                                                                <button type="button" onclick="window.location.href='dasboard.html'" className="btn btn-outline_main">
                                                                                    View Dashboard
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                                                        <span className="carousel-control-prev-icon"></span>
                                                                    </a>
                                                                    <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                                                                        <span className="carousel-control-next-icon"></span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="col-md-12 pad0">
                                                    <div className="card card-outline direct-chat direct-chat-primary">
                                                        <div className="card-header">
                                                            <h3 className="card-title">
                                                                <i className="titleICO fa-solid fa-chalkboard"></i>
                                                                Upcoming Training
                                                            </h3>

                                                            <div className="card-tools">&nbsp;</div>
                                                        </div>

                                                        <div className="card-body">
                                                            <div className="direct-chat-messages"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="col-md-12 pad0">
                                                    <div className="card  card-outline direct-chat direct-chat-primary">
                                                        <div className="card-header">
                                                            <h3 className="card-title">
                                                                <i className="titleICO fa-solid fa-cake-candles"></i>
                                                                Birthday Calender
                                                            </h3>

                                                            <div className="card-tools">&nbsp;</div>
                                                        </div>

                                                        <div className="card-body">
                                                            <div className="direct-chat-messages">
                                                                <div className="row">
                                                                    <div id="myCarousel" className="carousel slide newsCarsulal" data-ride="carousel">
                                                                        <ul className="carousel-indicators">
                                                                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                                                            <li data-target="#myCarousel" data-slide-to="1"></li>
                                                                            <li data-target="#myCarousel" data-slide-to="2"></li>
                                                                        </ul>

                                                                        <div className="carousel-inner newsCarsulal_contaner" role="listbox">
                                                                            <div className="birthContaner">
                                                                                <div className="carousel-item active">
                                                                                    <div className="row ">
                                                                                        <div className="col-md-3">
                                                                                            <img src="asset/img/img_md.png" alt="" />
                                                                                        </div>
                                                                                        <div className="col-md-8 birthdayTxtcontaner">
                                                                                            <div className="birthdayName">First Name, Last Name</div>
                                                                                            <div>Today - 22 Nov.</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="carousel-item">
                                                                                    <div className="row ">
                                                                                        <div className="col-md-3">
                                                                                            <img src="asset/img/img_md.png" alt="" />
                                                                                        </div>
                                                                                        <div className="col-md-8 birthdayTxtcontaner">
                                                                                            <div className="birthdayName">First Name1, Last Name1</div>
                                                                                            <div>Today - 22 Nov.</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="carousel-item">
                                                                                    <div className="row ">
                                                                                        <div className="col-md-3">
                                                                                            <img src="asset/img/img_md.png" alt="" />
                                                                                        </div>
                                                                                        <div className="col-md-8 birthdayTxtcontaner">
                                                                                            <div className="birthdayName">First Name2, Last Name2</div>
                                                                                            <div>Today - 22 Nov.</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                                                            <span className="carousel-control-prev-icon"></span>
                                                                        </a>
                                                                        <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                                                                            <span className="carousel-control-next-icon"></span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="col-md-12 pad0">
                                                    <div className="card  card-outline direct-chat direct-chat-primary">
                                                        <div className="card-header">
                                                            <h3 className="card-title">
                                                                <i className="titleICO fa-solid fa-file-shield"></i>
                                                                Knowledge Center
                                                            </h3>

                                                            <div className="card-tools">&nbsp;</div>
                                                        </div>

                                                        <div className="card-body">
                                                            <div className="direct-chat-messages"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </>
    );
}
