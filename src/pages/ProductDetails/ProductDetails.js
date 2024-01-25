import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import "./productDetail.css";
import instance from "../../api/axios";
import { product1 } from "../../assets/images";
import { isNil, set } from "lodash";
import { getProductImage } from "../../utils";
import { addToCart } from "../../redux/orebiSlice";
import { useDispatch } from "react-redux";

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
    setQuantity(quantity + 1);
  };

  const handleMinusQuantity = () => {
    if (quantity <= 0) return;
    setQuantity(quantity - 1);
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
      {/* <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div> */}

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
            {/* <div className="picturetwo">
              {productInfo.images && (
                <img
                  className="w-[90px] h-[90px]"
                  src={productInfo.images[0]}
                  alt=""
                />
              )}
            </div>
            <div className="picturetwo">
              {productInfo.images && (
                <img
                  className="w-[90px] h-[90px]"
                  src={productInfo.images[1]}
                  alt=""
                />
              )}
            </div>
            <div className="picturetwo">
              {productInfo.images && (
                <img
                  className="w-[90px] h-[90px]"
                  src={productInfo.images[1]}
                  alt=""
                />
              )}
            </div> */}
          </div>
        </div>
        <div className="flex flex-col w-[40%]">
          <div className="flex justify-between">
            <div className="text-white rounded-bl-md rounded-br-md rounded-tr-lg rounded-tl-lg bg-[#39B54A] w-[82px] h-[24px] flex justify-center items-center">
              In Stock
            </div>
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
            onClick={() =>
              dispatch(
                addToCart({
                  _id: productInfo.id,
                  name: productInfo.productName,
                  quantity: 1,
                  image: productInfo.img,
                  badge: productInfo.badge,
                  price: productInfo.price,
                  colors: productInfo.color,
                })
              )
            }
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
