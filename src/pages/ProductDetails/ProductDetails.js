import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isNil } from "lodash";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import "./productDetail.css";
import instance from "../../api/axios";
import { getProductImage } from "../../utils";
import { addToCart } from "../../redux/orebiSlice";
import { userData } from "../../constants";
import { Alert, Snackbar } from "@mui/material";

const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: 0,
    description: "",
    sku: "",
    rating: 0,
    quantity: 0,
    images: null,
  });
  const [viewImage, setViewImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });
  const { _id } = useParams();

  const renderRatingIcons = (rating) => {
    const ratingIcons = [];
    for (let i = 0; i < rating; i++) {
      ratingIcons.push(<i key={i} class="fa-solid fa-star"></i>);
    }
    for (let i = rating; i < 5; i++) {
      ratingIcons.push(<i key={i} class="fa-regular fa-star"></i>);
    }
    return ratingIcons;
  };

  const handleClickImage = (image) => () => {
    // console.log(e.target);
    console.log(image);
    setViewImage(image);
  };

  const handleAddQuantity = () => {
    if (quantity >= productInfo.quantity) return;
    setQuantity(quantity + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity <= 0) return;
    setQuantity(quantity - 1);
  };

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };

  const handleAddToCart = async () => {
    if (quantity <= 0) return;
    const headers = {
      Authorization: `Bearer ${userData.token}`,
    };
    // Call api
    try {
      const { data } = await instance.get(`/cart?email=${userData.email}`, {
        headers,
      });
      console.log(data);
      await instance.post(
        `/cart/${data.cartId}/${productInfo.id}/quantity/${quantity}`,
        {},
        {
          headers,
        }
      );
      dispatch(
        addToCart({
          _id: productInfo.id,
          name: productInfo.productName,
          quantity: quantity,
          image: productInfo.images[0],
          badge: productInfo.badge,
          price: productInfo.price,
          colors: productInfo.color,
        })
      );
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Add product to cart successfully!!!",
      });
    } catch (error) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    const getProductById = async (id) => {
      try {
        const { data } = await instance.get(`/product/${id}`);
        setProductInfo({
          ...data,
          images: data.images.map((image) => getProductImage(image)),
        });
        setViewImage(getProductImage(data.images[0]));
      } catch (error) {
        setProductInfo(null);
      }
    };
    setProductInfo(location.state.item);
    setPrevLocation("Shop");
    getProductById(_id);
  }, [location]);
  console.log("Product Info", productInfo);

  return (
    <div className="px-[100px]">
      <Breadcrumbs prevLocation={prevLocation} />
      <Snackbar
        anchorOrigin={{
          vertical: message.vertical,
          horizontal: message.horizontal,
        }}
        open={message.open}
        onClose={handleCloseSnack}
        message="I love snacks"
        key={message.vertical + message.horizontal}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={message.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message.content}
        </Alert>
      </Snackbar>
      <div className="flex justify-around">
        <div className="w-[600px] flex flex-col justify-start items-center">
          <div className="w-[100%] h-[600px] flex justify-center items-center border border-[#F0F0F0] mb-4">
            {viewImage && (
              <img className="w-[250px] h-[300px]" src={viewImage} alt="" />
            )}
          </div>
          <div className="w-[100%] flex gap-5 justify-center">
            {!isNil(productInfo.images) &&
              productInfo.images.map((image, index) => (
                <div
                  className="picturetwo hover:cursor-pointer hover:bg-[var(--hover-color)]"
                  key={index}
                  onClick={handleClickImage(image)}
                >
                  <img className="w-[90px] h-[90px]" src={image} alt="" />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col w-[40%]">
          <div className="flex justify-between">
            {productInfo.quantity > 0 ? (
              <div className="text-white rounded-bl-md rounded-br-md rounded-tr-lg rounded-tl-lg bg-[#39B54A] w-[82px] h-[24px] flex justify-center items-center">
                In Stock
              </div>
            ) : (
              <div className="text-white rounded-bl-md rounded-br-md rounded-tr-lg rounded-tl-lg bg-red-500 w-[82px] h-[24px] flex justify-center items-center">
                Out Stock
              </div>
            )}

            <div className="divrightbuttons">
              <button className="buttons text-[#999]">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
              <div className="mr-[20px] ml-[10px] text-[#999] font-bold">
                Prev
              </div>
              <div className="mr-[10px] ml-[10px] text-[#999] font-bold">
                Next
              </div>
              <button className="buttons text-[#999]">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="my-[10px] font-bold text-[20px]">
            {productInfo.title}
          </div>
          <div className="flex items-center">
            <div className="mr-[5px] text-[#999] items-center">SKU:</div>
            <div className="items-center">{productInfo.sku}</div>
          </div>
          <div className="text-[var(--hover-color)] text-[20px] my-[10px]">
            $ {productInfo.price}
          </div>
          <div className="flex items-center mb-[10px]">
            <div className="product-ratings">
              {renderRatingIcons(productInfo.rating)}
              {/* <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i> */}
            </div>
            <div className="text-[#999999] font-bold-400">(5 reviews)</div>
          </div>
          <div className="p">{productInfo.description}</div>
          <div className="divrightimg">
            <div className="flex justify-between">
              <div className="flex">
                <div className="orange">
                  {/* <img src={product1} alt="" /> */}
                  {productInfo.images && (
                    <img
                      className="w-[90px] h-[90px]"
                      src={productInfo.images[1]}
                      alt=""
                    />
                  )}
                </div>
                <div className="textall">
                  <div className="ok">$262.45</div>
                  <div className="small">Small Bronze Chair</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="iconbuttons group hover:bg-[var(--hover-color)]"
                  onClick={handleMinusQuantity}
                >
                  <i className="fa-solid fa-minus group-hover:text-white"></i>
                </button>
                <div className="zero">{quantity}</div>
                <button
                  className="iconbuttons group hover:bg-[var(--hover-color)]"
                  onClick={handleAddQuantity}
                >
                  <i className="fa-solid fa-plus group-hover:text-white"></i>
                </button>
              </div>
            </div>
          </div>
          <div
            className="addall group hover:bg-[var(--hover-color)] hover:cursor-pointer"
            onClick={handleAddToCart}
          >
            <div className="text-white ">
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="text-white items-center font-bold">Add to cart</div>
          </div>
          <div className="flex mt-[50px] gap-10">
            <div className="flex items-center">
              <div className="text-[#666] mr-2">
                <i class="fa-solid fa-heart"></i>
              </div>
              <div className="textwishlist">Add to wishlist</div>
            </div>
            <div className="flex">
              <div className="text-[#666] mr-2">
                <i class="fa-solid fa-code-compare"></i>
              </div>
              <div className="textcompare">Compare</div>
            </div>
          </div>

          <div className="flex mt-[70px] items-center">
            <div className="text-[#666] text-[14px] font-bold mr-1">
              Categories:
            </div>
            <div className="Clothings">Clothings</div>
            <div className="phay">,</div>
            <div className="Crates">Crates</div>
          </div>
          <div className="texttwo">
            <div className="text-[#666] text-[14px] font-bold mr-1">Tags:</div>
            <div className="Collection">Collection</div>
            <div className="phaytwo">,</div>
            <div className="Puppy">Puppy</div>
          </div>
          <div className="textthree">
            <div className="text-[#666] text-[14px] font-bold mr-1">Share:</div>
            <div className="w-[20px] h-[20px] bg-blue-800 mx-[10px] text-[18px] flex items-center justify-center text-white">
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="w-[20px] h-[20px] bg-blue-600 mx-[10px] text-[18px] flex items-center justify-center text-white">
              <i className="fa-brands fa-twitter"></i>
            </div>
            <div className="w-[20px] h-[20px] bg-blue-700 mx-[10px] text-[18px] flex items-center justify-center text-white">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
            <div className="w-[20px] h-[20px] bg-red-700 mx-[10px] text-[18px] flex items-center justify-center text-white">
              <i className="fa-brands fa-pinterest"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
