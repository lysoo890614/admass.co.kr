import React from 'react';

const Header = () => {
    return (<header id="header">
        <div className="inner">
            <h1 className="logo"><a href="main.html" title="to home"><img src={`${process.env.PUBLIC_URL}/images/logo_sub.png`} alt="애드매스"/></a>
            </h1>
            <nav id="gnb" className="total-menu">
                <h2 className="blind">Menu</h2>
                <div id="gnbBg"></div>
                <ul className="area">
                    <li className="gnb1">
                        <a href=""><span>COMPANY</span></a>
                        <div className="gnb-2dep">
                            <ul>
                                <li><a href=""><span>회사 소개</span></a></li>
                                <li><a href=""><span>회사 연혁</span></a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="gnb2">
                        <a href=""><span>SERVICE</span></a>
                        <div className="gnb-2dep">
                            <ul>
                                <li><a href=""><span>SKB 우리동네광고</span></a></li>
                                <li><a href=""><span>KT스카이라이프 IPTV광고</span></a></li>
                                <li><a href=""><span>체험단 마케팅</span></a></li>
                                <li><a href=""><span>기자단 마케팅</span></a></li>
                                <li><a href=""><span>인스타 마케팅</span></a></li>
                                <li><a href=""><span>바이럴 마케팅</span></a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="gnb3">
                        <a href=""><span>PORTFOLIO</span></a>
                    </li>
                    <li className="gnb4">
                        <a href=""><span>NOTICE</span></a>
                    </li>
                    <li className="gnb5">
                        <a href=""><span>CONTACT</span></a>
                        <div className="gnb-2dep">
                            <ul>
                                <li><a href=""><span>상담 신청</span></a></li>
                                <li><a href=""><span>오시는 길</span></a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
            <button type="button" className="btn-menu"><img src={`${process.env.PUBLIC_URL}/images/ico_menu_bk.png`} alt="메뉴보기"/></button>
        </div>
    </header>);
};

export default Header;