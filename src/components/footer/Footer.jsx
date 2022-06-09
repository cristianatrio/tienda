import React from "react";
import { FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer  bg-white text-black">
            <footer>
                <div className="container">
                    <div className="row">
                        
                       
                        <div className="col-md-6 item text">
                            <h3>Tienda Airkids</h3>
                            <p>Somos una tienda de pijamas</p>
                        </div>
                        <div className="col item social">
                            <a href="https://www.facebook.com/Tienda-airkids-102568845468740/"><FaFacebook/></a>
                            <a href="https://www.instagram.com/airkids2/?hl=es-la"><RiInstagramFill/></a>
                        </div>
                    </div>
                    <p className="copyright">Tienda Airkids  © 2022</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;