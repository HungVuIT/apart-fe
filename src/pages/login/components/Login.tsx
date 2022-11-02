import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import Input from "../../../components/Input";
export default function Login() {
  return (
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Đăng nhập</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
        <span>hoặc tài khoản của bạn</span>
          <Input type='text' placeholder='Email hoặc tên đăng nhập' />
          <Input type="password" placeholder="Mật khẩu" />
        <a href="#" className="forgot">
          Quên mật khẩu
        </a>
        <button>Đăng nhập</button>
      </form>
    </div>
  );
}
