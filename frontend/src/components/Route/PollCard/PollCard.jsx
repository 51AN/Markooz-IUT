import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar

} from "react-icons/ai";
import {  BiUpvote,
    BiDownvote} from "react-icons/bi"
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const PollCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[350px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}></Link>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
       
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                ৳
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + "৳" : null}
              </h4>
            </div>
          </div>
        

        {/* side options */}
        {/* {click ? (
            <BiUpvote
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            //   onClick={() => removeFromWishlistHandler(data)}
            color={click ? "green" : "#34eb3a"}
            title="Remove Vote"
            />
        ) : (
            <BiUpvote
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            //   onClick={() => addToWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Up Vote"
            />
        )}
    
        {click ? (
                <BiDownvote
                size={22}
                className="cursor-pointer absolute right-2 top-14"
                //   onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove Vote"
                />
            ) : (
                <BiDownvote
                size={22}
                className="cursor-pointer absolute right-2 top-14"
                //   onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Down Vote"
                />
            )} */}
           

        
      </div>
    </>
  );
};

export default PollCard;
