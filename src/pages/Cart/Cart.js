import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { deleteItem } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import "./mainCart.css";
import { round, sumBy } from "lodash";
import instance from "../../api/axios";
import { Alert, Snackbar } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.orebiReducer.userInfo);
  // const products = useSelector((state) => state.orebiReducer.products);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });

  const fetchCart = async () => {
    const headers = {
      Authorization: `Bearer ${userData.token}`,
    };
    try {
      const { data } = await instance.get(`/cart?email=${userData.email}`, {
        headers,
      });
      console.log(data);
      const fetchProducts = data.products.map((item) => ({
        ...item,
        image: `http://localhost:8080/api/product/images/${item.image}`,
      }));
      setProducts(fetchProducts);
    } catch (error) {
      console.log(error);
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };

  const handleIncreaseQuantity = (item) => () => {
    const updatedProducts = products.map((product) => {
      if (product.productId === item.productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDecreaseQuantity = (item) => async () => {
    if (item.quantity > 1) {
      const updatedProducts = products.map((product) => {
        if (product.productId === item.productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProducts(updatedProducts);
    } else {
      try {
        const headers = {
          Authorization: `Bearer ${userData.token}`,
        };
        const { data } = await instance.get(`/cart?email=${userData.email}`, {
          headers,
        });
        // Delete product
        await instance.delete(`/cart/${data.cartId}/${item.productId}`, {
          headers,
        });

        dispatch(deleteItem(item.productId));
        await fetchCart();
        setMessage({
          ...message,
          open: true,
          type: "success",
          content: "Delete product from cart !!!",
        });
      } catch (error) {
        setMessage({
          ...message,
          open: true,
          type: "error",
          content: error.response.data.message,
        });
      }
    }
  };

  const handleUpdateQuantity = (item) => async () => {
    const headers = {
      Authorization: `Bearer ${userData.token}`,
    };
    try {
      const { data } = await instance.get(`/cart?email=${userData.email}`, {
        headers,
      });
      console.log(data);
      await instance.put(
        `/cart/${data.cartId}/${item.productId}/quantity/${item.quantity}`,
        {},
        {
          headers,
        }
      );
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Update successfully!!!",
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
  console.log(round(15001.539999999999, 2));

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div className="px-[100px]">
      <Breadcrumbs title="Cart" />
      <Snackbar
        anchorOrigin={{
          vertical: message.vertical,
          horizontal: message.horizontal,
        }}
        autoHideDuration={3000}
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
      {products.length > 0 ? (
        <div className="flex justify-between items-start gap-20">
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>PRODUCT</th>
                <th>DISCOUNT</th>
                <th>QUANTITY</th>
                <th>Action</th>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <img src={item.image} alt="" width="100px" height="120px" />
                  </td>
                  <td className="text-[#666]">{item.productTitle}</td>
                  <td className="font-bold">{item.discount}%</td>
                  <td className="">
                    <button
                      className="w-[35px] h-[35px] shadow-md shadow-grey-500/50"
                      onClick={handleDecreaseQuantity(item)}
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                    <span className="px-[20px] text-[20px]">
                      {item.quantity}
                    </span>
                    <button
                      className="w-[35px] h-[35px] shadow-md shadow-grey-500/50"
                      onClick={handleIncreaseQuantity(item)}
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="align-center text-white font-bold bg-[var(--violet-color)] py-[5px] px-[10px] rounded-[30px] hover:bg-[var(--hover-color)]"
                      onClick={handleUpdateQuantity(item)}
                    >
                      Update Quantity
                    </button>
                  </td>
                  <td className="font-bold">
                    {round(
                      Number(item.quantity) * Number(item.productSpecialPrice),
                      2
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-[330px] h-[278px] border-[5px] border-[#E5E5E5]">
            <div className="flex flex-col items-center">
              <div className="text-[30px] font-bold border-b-2 border-black w-[80%] py-[8px]">
                Cart Total
              </div>
              <div className="flex justify-between items-center gap-[20px] py-[12px] border-b-2 border-black w-[80%]">
                <div className="text-[16px] font-bold-400">Subtotal</div>
                <div className="font-bold text-[16px]">
                  ${" "}
                  {sumBy(products, (item) =>
                    round(
                      Number(item.quantity) * Number(item.productSpecialPrice),
                      2
                    )
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center gap-[20px] py-[12px] border-b-2 border-black w-[80%]">
                <div className="text-[16px] font-bold-400">Total</div>
                <div className="font-bold text-[26px] text-[var(--hover-color)]">
                  ${" "}
                  {sumBy(products, (item) =>
                    round(
                      Number(item.quantity) * Number(item.productSpecialPrice),
                      2
                    )
                  )}
                </div>
              </div>
              <button className="w-[80%] h-[40px] bg-[var(--hover-color)] text-white font-bold text-[16px] rounded-[50px] mt-[20px]">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item.productId}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <p className="text-sm mdl:text-base font-semibold">
                Apply Coupon
              </p>
            </div>
            <p className="text-lg font-semibold">Update Cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt + shippingCharge}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )} */}
    </div>
  );
};

export default Cart;
