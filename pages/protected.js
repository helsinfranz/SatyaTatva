import Image from "next/image";
import classes from "@/styles/protected.module.css";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Protected() {
  const [passwordEnable, setPasswordEnable] = useState(false);
  return (
    <div className={classes.container}>
      <div className={classes.bigImage}>
        <Image
          src="/protected.jpg"
          alt="protected background"
          fill={true}
          priority={true}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          quality={1}
        />
      </div>
      <div className={classes.protected}>
        <div className={classes.protectedImage}>
          <Image
            src="/protected.jpg"
            alt="protected background"
            width={192}
            height={128}
          />
          <BsFillShieldLockFill />
        </div>
        <div className={classes.protectedTitle}>
          This content is password protected
        </div>
        <div className={classes.protectedSubTitle}>
          Please, enter the password to view this page
        </div>
        <div className={classes.protectedInput}>
          <label className={classes.protectedInputText} htmlFor="password">
            Password:
          </label>
          <div className={classes.protectedInputField}>
            <input type={passwordEnable ? "text" : "password"} id="password" />
            {passwordEnable ? (
              <FaEyeSlash onClick={() => setPasswordEnable(false)} />
            ) : (
              <FaEye onClick={() => setPasswordEnable(true)} />
            )}
          </div>
        </div>
        <div className={classes.protectedSubmit}>Enter Page</div>
      </div>
    </div>
  );
}
