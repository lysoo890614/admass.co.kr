import React from 'react';

const Footer = () => {
    return (<footer id="footer">
        <div className="inner">
            <div className="left">
                <h1 className="foot-logo"><a href="main.html" title="to home"><img src={`${process.env.PUBLIC_URL}/images/foot_logo.png`} alt="애드매스"/></a></h1>
                <p>Copyright ⓒ 애드매스 All rights reserved.</p>
            </div>
            <div className="right">
                <button type="button" className="btn-kakao"><img src={`${process.env.PUBLIC_URL}/images/btn_kakao.png`} alt="카카오 이동"/>
                </button>
                <ul className="foot-info">
                    <li>상호: 애드매스</li>
                    <li>주소: 서울특별시 금천구 가산디지털1로 142 스카이밸리1차 5층 516호</li>
                    <li>사업자등록번호: 496-17-00820 ㅣ 전화: 02-2067-1213</li>
                </ul>
            </div>
        </div>
    </footer>);
};

export default Footer;