import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ReCAPTCHA from 'react-google-recaptcha';

import * as IMAGES from '../../../assets';
import styles from './Login.module.css';
import { validateRequiredInputField } from 'utils//validation';
import { BASE_URL_LOGIN, BASE_URL_USER_DETAIL } from 'constants/routingApi';

const Login = (props) => {
    const [form] = Form.useForm();
    const [post, setPost] = useState();
    console.log('🚀 ~ file: Login.js:20 ~ Login ~ post', post);
    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState('jdksjdks');
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const recaptchaRef = React.useRef(null);

    useEffect(() => {
        axios.get(BASE_URL_USER_DETAIL.concat('/101')).then((response) => {
            console.log('🚀 ~ file: Login.js:27 ~ axios.get ~ response', response);
        });
    }, []);

    const onFinish = (values) => {
        if (captcha) {
            const userLoginData = {
                userId: values?.userId,
                password: values?.password,
            };

            axios.post(BASE_URL_LOGIN, userLoginData).then((response) => {
                if (response?.data?.statusCode === 400) {
                    message.error(response.data.responseMessage || 'Invalid username or password');
                } else if (response?.data?.statusCode === 200) {
                    localStorage.setItem('userData', JSON.stringify(response.data));
                    message.info(response.data.responseMessage);
                    setPost(response.data);
                    form.resetFields();
                    recaptchaRef.current.reset();
                    setCaptcha('');
                    navigate('/dashboard');
                }
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        // recaptchaRef.current.reset();

        form.validateFields().then((values) => {});
    };

    const onReCAPTCHAChange = async (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        } else {
            setCaptcha(captchaCode);
        }
    };
    return (
        <div
            id="login"
            className={`h-screen w-full flex flex-col justify-around relative overflow-hidden bg-no-repeat bg-cover`}
            style={{
                backgroundImage: `url(${IMAGES.BG_IMG})`,
            }}
        >
            {/* logo images */}
            <div className="w-full flex flex-col lg:mt-[10px] mt-[20px]">
                <div className="w-full h-[20px] flex lg:justify-end justify-center lg:pr-[25px]">
                    <img src={IMAGES.LOGO} className="h-full lg:w-[160px] w-[140px]" alt="logo-images" />
                </div>
            </div>
            {/* robin logo and content*/}
            {/* 1x1:mt-6 mt-4 */}
            <div className="h-max flex flex-col items-center mb-7 xs:mt-6 mt-3">
                {/* robin logo */}
                <div className="h-max flex flex-col items-center justify-center lg:gap-6 gap-3">
                    <img src={IMAGES.ROBIN_DARK_THEME} className="h-[55px] sm:w-[245px] w-[100px]" alt="robin-images" />
                    <img src={IMAGES.LINE} className="h-[1px] w-[300px] mb-3" alt="line-images" />
                </div>
                {/* content */}
                <div>
                    <h2 className="text-white 1x1:text-[24px] sm:text-[20px] text-[16px]">Dealer Management System</h2>
                </div>
            </div>
            {/* display contents */}
            <div className="w-full h-max flex flex-col justify-center gap-[10px] z-20 relative">
                {/* main contents */}
                <div className="h-max flex flex-col justify-center">
                    {/* login content */}
                    <div className="flex flex-col">
                        <div className="w-full h-max flex items-center justify-center">
                            {/* sm:w-[360px] w-[320px] */}
                            <div className="1x1:w-[420px] sm:w-[360px] w-[320px] h-max rounded-2xl bg-[rgba(40,39,44,0.8)]  p-[25px]">
                                {/* 1x1:py-[25px] sm:py-[15px] py-[10px] */}
                                {/* gap-[5px] */}
                                <div className="flex flex-col items-center gap-[8px]">
                                    <h1 className="font-bold sm:text-[26px] text-[20px] text-white">Welcome!</h1>
                                    <p className="text-[#DEDEDE] xl:text-[14px] text-[12px] font-[400] lg:mt-2 md:mt-3">Please enter your credentials to login</p>
                                    <Form form={form} name="login_from" onFinish={onFinish} onFinishFailed={onFinishFailed} className="flex flex-col w-full h-full md:mt-4 mt-3 1x1:gap-[1rem] lg:gap-[1.3rem] gap-[1.6rem]">
                                        <Form.Item name="userId" rules={[validateRequiredInputField('User ID(MILE ID.Parent ID)')]}>
                                            <div className="relative flex items-center border-b-[1px] border-[#DEDEDE] 1x1:pb-[6px] pb-[4px]">
                                                <input type="text" className="bg-transparent w-full xl:text-base text-[14px] pl-[30px] placeholder:text-[#8E8585] text-white" placeholder="User ID(MILE ID.Parent ID)" autoComplete="off" />
                                                <FiMail className="absolute left-0 text-white" size={18} />
                                            </div>
                                        </Form.Item>

                                        <Form.Item name="password" rules={[validateRequiredInputField('password')]}>
                                            <div className="relative flex items-center border-b-[1px] border-[#DEDEDE] 1x1:pb-[6px] pb-[4px]">
                                                <input type={showPassword ? 'text' : 'password'} className="bg-transparent w-full xl:text-base text-[14px] pl-[30px] placeholder:text-[#8E8585] text-white" placeholder="Password" autoComplete="off" />
                                                <FiLock className="absolute left-0 text-white" size={18} />
                                                <div onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1 cursor-pointer">
                                                    {!showPassword ? <AiOutlineEyeInvisible className="text-[#DEDEDE]" size={18} /> : <AiOutlineEye className="text-white" size={18} />}
                                                </div>
                                                {/* <BiError size={12} /> */}
                                            </div>
                                        </Form.Item>

                                        <div className="relative flex items-center w-full border-[#DEDEDE] 1x1:pb-[6px] pb-[4px]">
                                            <div className={styles.captcha}>
                                                <ReCAPTCHA
                                                    ref={recaptchaRef}
                                                    size="normal"
                                                    sitekey={'6Le-8AgkAAAAAAcF2YucKomhni5jlAy49mdZqwF2'}
                                                    // sitekey={"6Lfkk_8jAAAAAH1pXlMIf1UQKqmsQSzpDhsu_Ti5"}
                                                    onChange={onReCAPTCHAChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full h-full flex flex-col justify-center items-center">
                                            <button className="rounded bg-[#FF3E5B] text-whiet w-full 1x1:h-[50px] h-[45px] text-white">Login</button>
                                            {/* forget password */}
                                            <button className="rounded 1x1:mt-5 mt-3 font-light text-whiet w-max text-white text-center" type="button">
                                                Forgot password?
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div className="w-full lg:h-[40px] lg:gap-0 gap-2 sm:pb-[15px] pb-[10px] flex items-center justify-between lg:flex-row flex-col 1x1:mt-3 lg:mt-0 md:mt-3">
                <div className="flex items-center gap-4 divide-x-[1px] divide-[#8E8585]">
                    <a href="#terms" className="text-[#8E8585] sm:text-[14px] text-[9px] sm:px-[25px] px-[8px] cursor-pointer">
                        TERMS OF USE
                    </a>
                    <a href="#about" className="text-[#8E8585] sm:text-[14px] text-[9px] sm:px-[25px] px-[8px] cursor-pointer">
                        ABOUT US
                    </a>
                    <a href="#disclaimer" className="text-[#8E8585] sm:text-[14px] text-[9px] sm:px-[25px] px-[8px] cursor-pointer">
                        DISCLAIMER
                    </a>
                    <a href="#contact" className="text-[#8E8585] sm:text-[14px] text-[9px] sm:px-[25px] px-[8px] cursor-pointer">
                        CONTACT US
                    </a>
                </div>
                <div className="sm:pr-[25px]">
                    <span className="text-[#8E8585] sm:text-[14px] text-[9px] sm:pl-[25px]">© 2022 ROBIN. All Rights Reserved.</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
