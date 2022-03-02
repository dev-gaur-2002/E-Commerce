import React from 'react'
import './Header.css'

export const Header = () => {


    // to change the navbar on click
    const ham = document.getElementsByClassName('ham')
    const navbarWrapper = document.getElementsByClassName('nav-wrapper')

    const fadeHam = ()=>{
        console.log(ham)
        // console.log(nav)
        console.log(navbarWrapper)
        ham[0].style.display = 'none'
        navbarWrapper[0].style.display = 'block'
    }

  return (
    <div className='navbar'>
            <div className="ham" id="hamburger" onClick={fadeHam}>
                <hr className='ham-lines' id='ham1'/>
                <hr className='ham-lines' id='ham2' />
                <hr className='ham-lines' id='ham3' />
            </div>
        <div className="nav-wrapper" id='nav'>
            <nav>
                <div className="nav-left">
                    E-Commerce Website
                </div>
                <div className="nav-mid">
                    <div className="nav-items">Home</div>
                    <div className="nav-items">Products</div>
                    <div className="nav-items">contact</div>
                    <div className="nav-items">about</div>
                </div>
                <div className="nav-right">
                    <div>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <div>
                        <i className="fa-solid fa-address-card"></i>
                    </div>
                </div>
            </nav>
        </div>
    </div>
  )
}
