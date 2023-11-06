import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./shopproductcard.css";
import shopCartContext from "../../../context/shopcartContext";
// import { addItemToShoppingCart } from "../../../apiService";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import renderGlassImg from "../../../utils/renderGlassImg";
import { setCurrentShoppingCartList } from "../../../actions/shoppingCartAction";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

//firebase
import { app, db } from "../../../firebase/config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import fetchShoppingCartData from "../../../utils/fireBaseAPI";

export default function ShopProductCard({
  img,
  title,
  subtitle,
  price,
  itemNumber,
  addedInCart,
  quantity,
  colors,
  framesize,
}) {
  //shopcart context data
  const { shoppingCartList, setShoppingCartList } = useContext(shopCartContext);

  // get selected Color=
  const [selectedColor, setSelectedColor] = useState("neutral");
  //get selected frame size
  const [selectedFrameSize, setSelectedFrameSize] = useState("36 mm");
  const dispatch = useDispatch();

  //  const handleAddToBasket = async () => {
  // setShoppingCartList([
  //   ...shoppingCartList,
  //   {
  //     img,
  //     title,
  //     subtitle,
  //     price,
  //     itemNumber,
  //     addedInCart,
  //     colors,
  //     framesize,
  //     quantity: quantity + 1,
  //   },
  // ]);
  //   const item = {
  //     img,
  //     title,
  //     subtitle,
  //     price,
  //     itemNumber,
  //     addedInCart,
  //     colors,
  //     framesize,
  //     quantity: quantity + 1,
  //   };
  //   // axios
  //   //   .post("https://vivaser.onrender.com/api/v1/shop", item)
  //   //   .then((res) => {
  //   //     // console.log("iii", item);
  //   //     // console.log("add to shopping cart api response", res.data.data);

  //   //     // setShoppingCartList(res.data);
  //   //     axios
  //   //       .get("https://vivaser.onrender.com/api/v1/shop")
  //   //       .then((res) => {
  //   //         // console.log("Get shoppingCartList data", res.data.data);
  //   //         dispatch(setCurrentShoppingCartList(res.data.data));
  //   //       })
  //   //       .catch((error) => {
  //   //         // console.log("get shop item fail", error);
  //   //       });
  //   //   })
  //   //   .catch((error) => {
  //   //     // console.log("addItem Failed", error);
  //   //   });

  //   // Shopping Cart: Add glasses data to Firestore
  //   try {
  //     const db = getFirestore();
  //     const glassesCollection = collection(db, "glassesInTheShopCart");
  //     await addDoc(glassesCollection, {
  //       item,
  //     });
  //     console.log("iiiiitem", item);
  //     dispatch(setCurrentShoppingCartList(item));
  //     return item;
  //   } catch (error) {
  //     console.error("Error in Adding Glasses to Shopping Cart", error);
  //     throw error;
  //   }
  // };
  const handleAddToBasket = async () => {
    const item = {
      img,
      title,
      subtitle,
      price,
      itemNumber,
      addedInCart,
      colors,
      framesize,
      quantity: quantity + 1,
    };

    try {
      const db = getFirestore();
      const glassesCollection = collection(db, "glassesInTheShopCart");
      // Create a query against the collection to find an item with the same itemNumber
      const queryRef = query(
        glassesCollection,
        where("item.itemNumber", "==", itemNumber)
      );
      // Execute the query
      const querySnapshot = await getDocs(queryRef);
      // If the querySnapshot is empty, no item exists with the same itemNumber; you can add a new item
      if (querySnapshot.empty) {
        await addDoc(glassesCollection, item);
        //console.log("Item added to shopping cart:", item);
        const currentDataSnapshot = await getDocs(glassesCollection);
        const glassesInTheShopCart = currentDataSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(
        //   "Current data in glassesInTheShopCart:",
        //   glassesInTheShopCart
        // );
        dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
      } else {
        console.log(
          "Item with the same itemNumber already exists in the shopping cart."
        );
        // Handle the case where the item already exists, perhaps by updating its quantity
        // if that's the desired behavior.
      }
      // const currentDataSnapshot = await getDocs(glassesCollection);
      // const glassesInTheShopCart = currentDataSnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      // console.log(
      //   "Current data in glassesInTheShopCart:",
      //   glassesInTheShopCart
      // );
      // dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
    } catch (error) {
      console.error("Error in Adding Glasses to Shopping Cart", error);
      throw error;
    }
  };
  // const handleRemovefromBasket = async () => {
  //   // const newList = shoppingCartList.filter((eachProduct) => {
  //   //   return eachProduct.itemNumber !== itemNumber;
  //   // });
  //   // console.log("newList", newList);
  //   // setShoppingCartList(newList);
  //   let itemNumber = { itemNumber };
  //   console.log("itemNumber", itemNumber);
  //   // axios
  //   //   .post(
  //   //     "https://vivaser.onrender.com/api/v1/shopproductCardDelete",
  //   //     itemNumbernum
  //   //   )
  //   //   .then((res) => {
  //   //     // console.log("shopProductCardDelete", res.data);
  //   //     // console.log("remove item", itemNumber);
  //   //     axios
  //   //       .get("https://vivaser.onrender.com/api/v1/shop")
  //   //       .then((res) => {
  //   //         // console.log("Get shoppingCartList data", res.data.data);
  //   //         dispatch(setCurrentShoppingCartList(res.data.data));
  //   //       })
  //   //       .catch((error) => {
  //   //         // console.log("get shop item fail", error);
  //   //       });
  //   //   })
  //   //   .catch((error) => {
  //   //     // console.log("Fail to remove item", error);
  //   //   });

  //   //Remove glasses from firebase database
  //   const db = getFirestore();

  //   try {
  //     // Use a query to find the document with the given itemNumber
  //     const glassesCollection = collection(db, "glassesInTheShopCart");
  //     const q = query(glassesCollection, where("itemNumber", "==", itemNumber));
  //     const querySnapshot = await getDocs(q);

  //     // If the item exists based on itemNumber, delete it
  //     if (!querySnapshot.empty) {
  //       const itemDoc = querySnapshot.docs[0];
  //       await deleteDoc(doc(db, "glassesInTheShopCart", itemDoc.id));
  //       console.log("Item deleted successfully!");
  //     } else {
  //       console.log("Item not found!");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting the item", error);
  //   }
  // };
  // --------------------------

  // const handleRemovefromBasket = async (itemNumber) => {
  //   try {
  //     const db = getFirestore();
  //     const glassesCollection = collection(db, "glassesInTheShopCart");
  //     // Create a query against the collection to find an item with the same itemNumber
  //     const queryRef = query(
  //       glassesCollection,
  //       where("item.itemNumber", "==", itemNumber)
  //     );
  //     // Execute the query
  //     console.log("queryRef", queryRef);
  //     const querySnapshot = await getDocs(queryRef);
  //     // If there's an item in the snapshot, delete the document
  //     // querySnapshot.forEach(async (doc) => {
  //     //   await deleteDoc(doc.ref);
  //     //   console.log(
  //     //     `Item with itemNumber ${itemNumber} removed from shopping cart.`
  //     //   );
  //     // });
  //     const deletePromises = querySnapshot.docs.map((doc) =>
  //       deleteDoc("doc.ref", doc.ref)
  //     );
  //     console.log(doc.ref);
  //     await Promise.all(deletePromises);
  //     console.log(
  //       `All items with itemNumber ${itemNumber} removed from shopping cart.`
  //     );
  //     // After removing the item, retrieve the current data from the collection to update Redux
  //     const currentDataSnapshot = await getDocs(glassesCollection);
  //     const glassesInTheShopCart = currentDataSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log("Page shopProductCard : ", glassesInTheShopCart);
  //     dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
  //   } catch (error) {
  //     console.error("Error in Removing Glasses from Shopping Cart", error);
  //     throw error;
  //   }
  // };
  const handleRemovefromBasket = async (itemNumber) => {
    const db = getFirestore();
    const glassesCollection = collection(db, "glassesInTheShopCart");

    try {
      // Create a query against the collection to find an item with the same itemNumber
      const queryRef = query(
        glassesCollection,
        where("itemNumber", "==", itemNumber)
      );
      // Execute the query
      const querySnapshot = await getDocs(queryRef);

      // Collect all delete promises
      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );

      // Await all delete operations
      await Promise.all(deletePromises);

      // Log the result
      // console.log(
      //   `All items with itemNumber ${itemNumber} removed from shopping cart.`
      // );

      // After removal, fetch the updated list of items
      const updatedSnapshot = await getDocs(glassesCollection);
      const glassesInTheShopCart = updatedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Dispatch the updated list to your Redux store
      dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
    } catch (error) {
      console.error("Error in Removing Glasses from Shopping Cart", error);
    }
  };
  const shoppingCartData = useSelector((state) => {
    return state?.shoppingCartReducer.shoppingCartList;
  });
  //console.log("PAGE: shopProductCard", shoppingCartData);
  const ifItemInCart =
    shoppingCartData.filter((eachItem) => {
      return eachItem.itemNumber === itemNumber;
    })?.length === 1;
  //console.log("ifItemInCart", ifItemInCart);
  return (
    <>
      {ifItemInCart ? (
        <div
          className="smallProduct"
          style={{ border: "1px solitemNumber rgb(166, 165, 165)" }}
        >
          <svg
            className="checkmark"
            t="1690866180131"
            viewBox="0 0 1027 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-itemNumber="2259"
            witemNumberth="15"
            height="15"
          >
            <path
              d="M380.64 755.386L950.847 185.18c17.573-17.573 46.066-17.573 63.64 0 17.573 17.574 17.573 46.066 0 63.64l-582.59 582.59c-28.308 28.308-74.205 28.308-102.512 0L9.18 511.205c-17.573-17.573-17.573-46.066 0-63.64 17.574-17.573 46.066-17.573 63.64 0l307.82 307.821z"
              p-itemNumber="2260"
              fill="#3B9620"
            ></path>
          </svg>

          <div className="smallProduct_info">
            <Link
              to={`/productdetail/${itemNumber}`}
              style={{ textDecoration: "none" }}
            >
              <div className="container_img">
                <img
                  src={renderGlassImg(img)}
                  alt="Eyeglasses"
                  className="gimg"
                />
              </div>
              <div className="product_naming">
                <div className="product_name">{title}</div>
                <div className="product_nickname">{subtitle}</div>
                <div className="smallproduct_price">${price}.00</div>
              </div>
            </Link>
            {ifItemInCart ? (
              <div
                className="addBasket_butt buttonremove"
                onClick={() => {
                  handleRemovefromBasket(itemNumber);
                }}
              >
                Remove From basket
              </div>
            ) : (
              <div
                className="addBasket_butt"
                onClick={() => {
                  handleAddToBasket();
                }}
              >
                Add to basket
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="smallProduct">
          <div className="smallProduct_info">
            <Link
              to={`/productdetail/${itemNumber}`}
              style={{ textDecoration: "none" }}
            >
              <div className="container_img">
                <img
                  src={renderGlassImg(img)}
                  alt="shopeyeglasses"
                  className="gimg"
                />
              </div>
              <div className="product_naming">
                <div className="product_name">{title}</div>
                <div className="product_nickname">{subtitle}</div>
                <div className="smallproduct_price">${price}.00</div>
              </div>
            </Link>
            {ifItemInCart ? (
              <div
                className="addBasket_butt buttonremove"
                onClick={() => {
                  handleRemovefromBasket();
                }}
              >
                Remove From basket
              </div>
            ) : (
              <div
                className="addBasket_butt"
                onClick={() => {
                  handleAddToBasket();
                }}
              >
                Add to basket
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
