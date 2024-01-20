import React, { useState } from 'react'
import personIcon from "../assets/images/key.png"
import SocialIcons from './SocialIcons'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Please enter valid email").required("Please enter your registered email!"),
            password: Yup.string().required("Please enter your password / registration id!")
        }),
        onSubmit: async values => {
            let loginData = {
                email: values.email.trim().toLowerCase(),
                password: values.password,
            }

            await axios.get('http://localhost:3005/login')
                .then((response) => {
                    if (response.data) {
                        if (response.data?.find((d) => d.email === loginData.email &&
                            JSON.parse(
                                CryptoJS.AES.decrypt(d?.password, 'my-secret-key@123').toString(
                                    CryptoJS.enc.Utf8)
                            ) === loginData.password
                        )) {
                            sessionStorage.setItem('auth', 'authenticated');
                            navigate('/');
                        }
                        else {
                            alert('Invalid UserName or Password ❌');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })


    return (
        <div className='container  d-flex justify-content-between outer-box'>
            <div className='first-inner ml-5'>
                <h3> Sign In </h3>
                <div className='new-user-outer d-flex mt-3'>
                    <p className='new-user'>New User?</p>
                    <a href='#' className='ml-2'>Create an account</a>
                </div>

                <div>
                    <form onSubmit={loginFormik.handleSubmit}>
                        <div className="form-group custom-border mt-3">
                            <input type="email" className="form-control"
                                id="inputEmail"
                                placeholder="Username or email"
                                name="email"
                                value={loginFormik.values.email}
                                onChange={loginFormik.handleChange}
                            />
                            {loginFormik.errors.email && loginFormik.touched.email && (
                                <p className='text-danger'>{loginFormik.errors.email}</p>
                            )}
                        </div>

                        <div className="form-group custom-border">
                            <input type="password"
                                className="form-control"
                                id="inputPassword"
                                name="password"
                                placeholder="Password"
                                value={loginFormik.values.password}
                                onChange={loginFormik.handleChange}
                            />
                            {loginFormik.errors.password && loginFormik.touched.password && (
                                <p className='text-danger'>{loginFormik.errors.password}</p>
                            )}
                        </div>

                        <div className="form-check">
                            <input type="checkbox" className="form-check-input big-checkbox" id="keepSignedIn" />
                            <label className="form-check-label ml-3 keep-me" for="keepSignedIn">Keep me signed in</label>
                        </div>

                        <button type="submit" className="btn sign-btn btn-block mt-3">Sign in</button>
                    </form>
                </div>

                <div className="d-flex custom-container mt-3">
                    <div className="solid-line"></div>
                    <div className="custom-text">Or Sign In With</div>
                    <div className="solid-line"></div>
                </div>

                <SocialIcons />

            </div>
            <div className='second-inner mr-5'>
                <img src={personIcon} />
            </div>
        </div>
    )
}

export default Login
