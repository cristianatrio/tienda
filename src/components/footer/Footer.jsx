import React from "react";
import { FaFacebook, FaTwitter, FaSnapchat } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <footer>
                <div className="container">
                    <div className="row">
                        
                       
                        <div className="col-md-6 item text">
                            <h3>Tienda Airkids</h3>
                            <p>Somos una tienda de pijamas</p>
                        </div>
                        <div className="col item social">
                            <a href="#"><FaFacebook/></a>
                            <a href="#"><FaTwitter/></a>
                            <a href="#"><FaSnapchat/></a>
                            <a href="#"><RiInstagramFill/></a>
                        </div>
                    </div>
                    <p className="copyright">Tienda Airkids  © 2022</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;