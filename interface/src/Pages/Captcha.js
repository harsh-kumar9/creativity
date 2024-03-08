import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/blur-background.svg";
import './Captcha.css';


const Introduction = () => {
    const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/creativity/consent')
    // }
    const [captchaMessage, setCaptchaMessage] = useState("");  
    const [inputCaptcha, setInputCaptcha] = useState("");  
    const canvasRef = useRef(null);  
    
    useEffect(() => {  
        generateCaptchaCheck();  
    }, []);  
    
    const generateCaptchaCheck = () => {  
        let captcha_text = "";  
        const c_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";  
        for (let i = 1; i < 5; i++) {  
        captcha_text += c_chars.charAt(Math.random() * c_chars.length);  
        }  
        setCaptchaMessage(captcha_text);  
    };  
    
    const handleSubmit = () => {  
        if (inputCaptcha === "") {  
        alert("Please input something.");  
        } else if (inputCaptcha !== captchaMessage) {  
        alert("Check doesn't match. Please try again");  
        setInputCaptcha("");  
        generateCaptchaCheck();  
        } else {  
        navigate('/creativity/consent');  
        }  
    };  
    
    useEffect(() => {  
        if (canvasRef.current) {  
        const canvas = canvasRef.current;  
        const ctx = canvas.getContext("2d");  
        if (ctx) {  
            ctx.clearRect(0, 0, canvas.width, canvas.height);  
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";  
            ctx.fillText(captchaMessage, 10, 50);  
            ctx.beginPath();  
            ctx.moveTo(0, 40);  
            ctx.lineTo(80, 40);  
            ctx.lineWidth = 2;
            ctx.strokeStyle = "white";  
            ctx.stroke();  
            ctx.beginPath();  
            ctx.moveTo(0, 40);  
            ctx.lineTo(80, 30);  
            ctx.lineWidth = 2;
            ctx.strokeStyle = "white";  
            ctx.stroke();  
        }  
        }  
    }, [captchaMessage]);  

    return (
    <div style={{ backgroundImage: `url(${background})` }} className="text-white h-screen w-screen items-center justify-center flex text-3xl font-semibold p-14 bg-cover"> 
        <div className="flex flex-col h-full w-full items-center justify-center outline outline-2 outline-white rounded-[60px] px-32 bg-slate-500" style={{ backgroundColor: 'rgba(64, 64, 64, 0.17)' }}>
        <div className="custom-captcha">  
        <h2>Input the code that appears in the box below:</h2>  
        <canvas ref={canvasRef} height="75" width="100" />  
        <div>  
            <input  
            type="text"  
            value={inputCaptcha}  
            className="text-black"
            onChange={(e) => setInputCaptcha(e.target.value)}  
            />  
        </div>  
        <input type="submit" value="SUBMIT" onClick={handleSubmit}
        className="mt-3 text-2xl outline outline-offset-8 outline-2 rounded-md font-semibold p-8 hover:bg-orange-600"/>
        </div>  
        </div>
    </div>
    );
}

export default Introduction;