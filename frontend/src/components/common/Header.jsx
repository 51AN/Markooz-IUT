import React from 'react'
import logo from '../assets/images/m_logo.jpg'
import cartimg from "../assets/images/cart.png"
import { BiSearch } from "react-icons/bi"
import { BsBagCheck } from "react-icons/bs"
import { RiUser3Line } from "react-icons/ri"
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import { navlist } from '../assets/data/data'
import { Link } from 'react-router-dom'
import { DELETE } from "../../controller/action"
import { useEffect } from "react"
import { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { mapValues } from 'lodash'
export const Header = () => {

    window.addEventListener("scroll", function () {
        const header = this.document.querySelector(".header")
        header.classList.toggle("active", this.window.scrollY > 100)
      })

      const[mobile, setMobile] = useState(false)

        // cartopen and close
        const [cartList, setCartList] = useState(false)
        const handleClose = () => {
            setCartList(null)
        }
        // cart add in shop
        const getdata = useSelector((state) => state.cartReducer.carts)
        console.log(getdata)

        // delete cart
        const dispatch = useDispatch()
        const delet = (id) => {
            dispatch(DELETE(id))
        }

        // total price
        const [price, setPrice] = useState(0)
        console.log(price)

        const totals = () => {
            let price = 0
            getdata.map((e, i) => {
            price = parseFloat(e.price) * e.qty + price
            })
            setPrice(price)
        }

        useEffect(() => {
            totals()
        }, [totals])

        const handleCloses = () => {
            setCartList(null)
        }
    return (
        <>
            <header className="header">
                <div className="container">
                    <nav>
                        <div className="toggle">
                            <button onClick={() => setMobile(!mobile)}>
                              {mobile?<AiOutlineClose className="close heIcon"/>:<AiOutlineMenu className="open heIcon"/>}
                            </button>
                        </div>
                        <div className="left">
                            <img src={logo} alt="" height="50" width="50"/>
                        </div>
                        <div className="center">
                            <ul className={mobile? "mobile-nav" : "menu"}>
                                {navlist.map((nav) => (
                                    <li key={nav.id}>
                                        <Link to={nav.path}>{nav.text}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                    <div className="right">
                        <div className="right_search">
                            <input type="text" placeholder="Search Products ..." />
                            <BiSearch className='searchIcon heIcon'/>
                        </div>
                        <div className="right_user">
                            <Link to={'/login'}>
                                <RiUser3Line className="userIcon heIcon"/>
                            </Link>
                        </div>
                        <div className="right_favorites">
                            <AiOutlineHeart className="userIcon heIcon"/>
                        </div>
                        <div className="right_card">
                            <button className="button" onClick={() => setCartList(!cartList)}>
                                <BsBagCheck className='shop heIcon'/>
                                MY CART <span> ({getdata.length})</span>
                            </button>
                            <div className={cartList ? "showCart" : "hideCart"}>
                                {getdata.length ? (
                                <section className='details'>
                                    <div className='details_title'>
                                    <h3>Photo</h3>
                                    <p>Product Name</p>
                                    </div>
                                    {getdata.map((e) => (
                                    <div className='details_content'>
                                        <div className='details_content_img'>
                                        <Link to={`/cart/${e.id}`} onClick={handleCloses}>
                                            <img src={e.cover} alt='' />
                                        </Link>
                                        </div>
                                        <div className='details_content_detail'>
                                        <div className='details_content_detail_price'>
                                            <p>{e.title.slice(0, 20)}...</p>
                                            <p>Price : ${e.price}</p>
                                            <p>Quantity : {e.qty}</p>
                                        </div>
                                        </div>
                                        <div className='details_content_detail_icon'>
                                        <i onClick={() => delet(e.id)}>
                                            <AiOutlineDelete />
                                        </i>
                                        </div>
                                    </div>
                                    ))}
                                    <div className='details_total'>
                                    <h4>Total : ${price}</h4>
                                    </div>
                                </section>
                                ) : (
                                <div className='empty'>
                                    <p>Your cart is empty</p>
                                    <img src={cartimg} alt='' />
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
