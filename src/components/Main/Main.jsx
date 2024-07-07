import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const { sent, recent, result, load, rdata, setInput, input } = useContext(Context)

    return (
        <div className="main">
            <div className="start">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-inside">
                {!result
                    ? <>
                        <div className="greet">
                            <p><span>Hello, User</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="boxes">
                            <div className="box">
                                <p>Give me tips to help care for a tricky plant</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="box">
                                <p>Help me get organized with a list of 10 tips</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="box">
                                <p>Revise my writing and fix my grammar</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                            <div className="box">
                                <p>Help me plan a game night with 5 friends for under $100</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className="result-class">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recent}</p>
                        </div>
                        <div className="data">
                            <img src={assets.gemini_icon} alt="" />
                            {load
                                ?<div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            :<p dangerouslySetInnerHTML={{ __html: rdata }}></p>}
                        </div>
                    </div>
                }

                <div className="prompt">
                    <div className="search">
                        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input?<img className='ic-s' onClick={() => sent()} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className='info'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
                </div>
            </div>
        </div>
    )
}

export default Main
