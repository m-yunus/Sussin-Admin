import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <>
    <div className="mainlogin">
        <div className="first-login">
            <div className="login-title-logo">
                <h2 className='login-title'>Sleeknote</h2>
            </div>
            <h1 className="wlcm-title">Welcome Back</h1>
            <div className="google-button">
               
                    <img className='google-img' src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=893&height=600&name=image8-2.jpg" alt="" />
                    Log in with Google
              
            </div>
            <h4 className="or-title">Or Login with Email</h4>
            <div className="input-section">
                <div className="email-section">
                <h4 className="email-title">Email Address</h4>
                <input className='email-input' type="email" placeholder='Email Address' />
                </div>
                <div className="paswrd-section">
                    <h4 className="pswrd-title">Password</h4>
                    <input className='pswrd-input' type="password" placeholder='password' />
                </div>
                <div className="keep-forgot-section">
                    <h2 className="keep-text">Keep me logged in</h2>
                    <h2 className="forgot-text">Forgot Your Password</h2>
                </div>
                <div className="login-button">
                <button className="login-btn">Log in</button>
                </div>
                <div className="login-footer ">
                    <h2 className="first-ftr ">Don't have an account? </h2>
                    <h2 className='scnd-ftr '> Signup</h2>
                </div>
            </div>
        </div>
        <div className="secnd-login">

        </div>
    </div>
    
      
    </>
  )
}

export default Login
