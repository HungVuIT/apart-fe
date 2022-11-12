import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGooglePlusG, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import Input from "../../../components/Input";
export default function Register() {
  return (
    <div className="form-container sign-up-container have-input">
      <form action="#">
        <h1>Đăng Ký</h1>
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
        <span>hoặc tạo tài khoản</span>
          <Input type="text" placeholder="Họ và Tên" />
          <Input type="text" placeholder="Tên đăng nhập" />
          <Input type="password" placeholder="Mật khẩu" />
        <button>Đăng ký</button>
      </form>
    </div>
  );
}
