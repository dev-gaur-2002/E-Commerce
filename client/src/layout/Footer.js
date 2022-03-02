import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <div>
        <div className="footer-container">
            <footer>
                  <div className="socials">
                        <div className="socials_item"><i className="fa-brands fa-facebook-square"></i></div>
                        <div className="socials_item"><i className="fa-brands fa-instagram-square"></i></div>
                        <div className="socials_item"><i className="fa-brands fa-twitter-square"></i></div>
                  </div>
                  <div className="links">
                        <div className='links-sub' id='link1'>
                            <span>Home</span>
                            <span>Products</span>
                            <span>Contact</span>
                            <span>About</span>
                        </div>
                  </div>
                  <div className="copyright">
                        <p><i className="fa-solid fa-copyright"></i> Copyrights 2022 , E-Commerce</p>
                  </div>
            </footer>
        </div>
    </div>
  )
}
