import React, {useState} from 'react';
import _ from "lodash";
import Swal from "sweetalert2";

const ContactUs = () => {

  const initRequestValue = {
    company: '',
    managerName: '',
    tel01: '',
    tel02: '',
    tel03: '',
    email: '',
    section: '',
    consultCnt: ''
  };

  const [request, setRequest] = useState(initRequestValue);

  const handleChange = event => {
    const curName = event.target.id;
    let curValue = event.target.value;

    // if(curName.includes('tel01') && curValue.length > 3) {
    //   curValue = curValue.slice(0, 3);
    // }
    //
    // if((curName.includes('tel02') || curName.includes('tel03')) && curValue.length > 4) {
    //   curValue = curValue.slice(0, 4);
    // }

    let currentValue = { [curName]: curValue };
    setRequest({ ...request, ...currentValue });

  };

  const handleSend = (e) => {
    let message = '성공적으로 전송 되었습니다.';
    let icon = 'success';
    e.preventDefault();

    if(!isVaild()) {
      icon = 'warning'
      message = '* 항목은 필수 입력 항목 입니다.'
    } else if(!validateEmail(request.email)) {
      icon = 'warning'
      message = 'Email주소가 유효하지 않습니다.';
    } else {
      submitWithoutRefresh(e);
    }
    Swal.fire({
      icon: icon,
      text: message,
    });
  }

  const submitWithoutRefresh = (e) => {
    let form = e.target;
    let formData = getFormData(form);
    let data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    let url = form.action;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        var formElements = form.querySelector(".form-elements")
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);

    setRequest(initRequestValue);
  }


  const isVaild = () => !(_.isEmpty(request.company) || _.isEmpty(request.managerName) || _.isEmpty(request.tel01) || _.isEmpty(request.tel02) || _.isEmpty(request.tel03) || _.isEmpty(request.email) || _.isEmpty(request.section) || _.isEmpty(request.consultCnt))

  const getFormData = (form) => {
    let elements = form.elements;
    let honeypot;

    let fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    let formData = {};
    fields.forEach(function(name){
      let element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        let data = [];
        for (let i = 0; i < element.length; i++) {
          let item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function disableAllButtons(form) {
    let buttons = form.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  const validateEmail = (email) => {
    // 간단한 이메일 형식 검사 정규 표현식 사용
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };


  return (<div id="contents">
    <div className="inner">
      <h3 className="main-title">상담 신청</h3>
      <ul className="tab-wrap">
        <li><a href="#" className="tab-btn active">상담 신청</a></li>
        <li><a href="#" className="tab-btn">오시는 길</a></li>
      </ul>
      <article className="consult-wrap">
        <img src={`${process.env.PUBLIC_URL}/images/img_consult.png`} alt=""/>
          <div className="consult-list-wrap">
            <form className="gform"
                  action="https://script.google.com/macros/s/AKfycbwmn2MjPoNXIWRMN7oQn362IJQ_BneMYsukHBkh3iJPvyrhzPtVrXLz5_W4cxBqD1B9/exec"
                  method="POST" data-email="admass79@daum.net" onSubmit={e => handleSend(e)}>
              <ul className="consult-list">
                <li>
                  <label className="head imp" htmlFor="company">업체명</label>
                  <span className="value"><input type="text" id="company" name="company" className="input" onChange={e => handleChange(e)} value={request.company}/></span>
                </li>
                <li>
                  <label className="head imp" htmlFor="managerName">담당자 성함</label>
                  <span className="value"><input type="text" id="managerName" name="managerName" className="input" onChange={e => handleChange(e)} value={request.managerName}/></span>
                </li>
                <li>
                  <label className="head imp" htmlFor="tel01">연락처</label>
                  <span className="value tel">
                    <input type="text" id="tel01" name="tel01" className="input" onChange={e => handleChange(e)} value={request.tel01}/>
                    <input type="text" id="tel02" name="tel02" className="input" onChange={e => handleChange(e)} value={request.tel02}/>
                    <input type="text" id="tel03" name="tel03" className="input" onChange={e => handleChange(e)} value={request.tel03}/>
                  </span>
                </li>
                <li>
                  <label className="head imp" htmlFor="email">이메일</label>
                  <span className="value"><input type="text" id="email" name="email" className="input" onChange={e => handleChange(e)} value={request.email}/></span>
                </li>
                <li>
                  <label className="head imp" htmlFor="section">문의분야</label>
                  <span className="value"><input type="text" id="section" name="section" className="input" onChange={e => handleChange(e)} value={request.section}/></span>
                </li>
                <li>
                  <label className="head imp" htmlFor="consultCnt">문의내용</label>
                  <span className="value"><textarea id="consultCnt" className="textarea" name="consultCnt" onChange={e => handleChange(e)} value={request.consultCnt}></textarea></span>
                </li>
              </ul>

            <div className="btn-wrap">
              <button type="submit" className="btn-blue">문의하기</button>
            </div>
            </form>
          </div>
      </article>
    </div>
  </div>);
};

export default ContactUs;