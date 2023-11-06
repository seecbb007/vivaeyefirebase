import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../detail/detail.css";
import { useDispatch } from "react-redux";
import { setCurrentShoppingCartList } from "../../actions/shoppingCartAction";
// import { Theme, useTheme } from "@mui/material/styles";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Dropdownlist from "../shoppages/dropdownlist/dropdown";
import ColorList from "../shoppages/dropdownlist/colorlist";
import Products from "../products/products";
import { useParams, Link } from "react-router-dom";
import shopCartContext from "../../context/shopcartContext";
import { useSelector } from "react-redux/es/hooks/useSelector";
//firebase
import { app, db } from "../../firebase/config";
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
  setDoc,
} from "firebase/firestore";
import renderGlassImg from "../../utils/renderGlassImg";

export default function Productdetail({ productsInfo }) {
  const dispatch = useDispatch();
  // state 里面存了shopcard18，
  const { card18, shoppingCartList, setShoppingCartList } =
    useContext(shopCartContext);
  // get selected Color
  const [selectedColor, setSelectedColor] = useState("");
  //get selected frame size
  const [selectedFrameSize, setSelectedFrameSize] = useState("");
  //If the id has changed, it will jump to the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useParams()?.itemNumber]);
  //如果在filter数据中，filter到recommended是true的就返回这个数据在一个新数组中。
  const RecommendedProduct = productsInfo?.filter((eachitem) => {
    return eachitem.recommended === true;
  });

  //params传参，取id值
  const params = useParams();
  let paramsId = params?.itemNumber;

  //如果参选中的每一个卡片id等于传参接到的那个id，就返回那个卡片。Filter出来会是一个
  //新数组，我需要拿到它的第一位，那就是【0】

  const currentParamsId_Card = card18?.filter((eachcard) => {
    if (eachcard?.itemNumber === Number(paramsId)) {
      return eachcard;
    }
  })[0];
  //console.log("currentParamsId_Card", currentParamsId_Card);
  let itemNumber = currentParamsId_Card?.itemNumber;

  // const handleAddtoCart = () => {
  //   const currentParamsId_Cardinfo = {
  //     ...currentParamsId_Card,
  //     quantity: currentParamsId_Card.quantity + 1,
  //     selectedColor: selectedColor,
  //     selectedFrameSize: selectedFrameSize,
  //   };
  //   // axios
  //   //   .post(
  //   //     "https://vivaser.onrender.com/api/v1/shop",
  //   //     currentParamsId_Cardinfo
  //   //   )
  //   //   .then((res) => {
  //   //     // console.log("46464", currentParamsId_Cardinfo);
  //   //     // console.log("iii", item);
  //   //     // console.log("DETAIL:add to shopping cart", res.data.data);

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
  //   //     console.log("DETAIL:addItem Failed", error);
  //   //   });
  // };
  // ---- firebase
  // const handleAddtoCart = async () => {
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

  //   try {
  //     const db = getFirestore();
  //     const glassesCollection = collection(db, "glassesInTheShopCart");
  //     // Create a query against the collection to find an item with the same itemNumber
  //     const queryRef = query(
  //       glassesCollection,
  //       where("item.itemNumber", "==", itemNumber)
  //     );
  //     // Execute the query
  //     const querySnapshot = await getDocs(queryRef);
  //     // If the querySnapshot is empty, no item exists with the same itemNumber; you can add a new item
  //     if (querySnapshot.empty) {
  //       await addDoc(glassesCollection, { item });
  //       console.log("Item added to shopping cart:", item);
  //       const currentDataSnapshot = await getDocs(glassesCollection);
  //       const glassesInTheShopCart = currentDataSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(
  //         "Current data in glassesInTheShopCart:",
  //         glassesInTheShopCart
  //       );
  //       dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
  //     } else {
  //       console.log(
  //         "Item with the same itemNumber already exists in the shopping cart."
  //       );
  //       // Handle the case where the item already exists, perhaps by updating its quantity
  //       // if that's the desired behavior.
  //     }
  //     // const currentDataSnapshot = await getDocs(glassesCollection);
  //     // const glassesInTheShopCart = currentDataSnapshot.docs.map((doc) => ({
  //     //   id: doc.id,
  //     //   ...doc.data(),
  //     // }));
  //     // console.log(
  //     //   "Current data in glassesInTheShopCart:",
  //     //   glassesInTheShopCart
  //     // );
  //     // dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
  //   } catch (error) {
  //     console.error("Error in Adding Glasses to Shopping Cart", error);
  //     throw error;
  //   }
  // };
  // ------------------------------
  // const handleAddtoCart = async () => {
  //   const currentParamsId_Cardinfo = {
  //     ...currentParamsId_Card,

  //     quantity: currentParamsId_Card.quantity + 1,
  //     selectedColor: selectedColor,
  //     selectedFrameSize: selectedFrameSize,
  //   };
  //   console.log("INSIDE currentParamsId_Card", currentParamsId_Card);
  //   const db = getFirestore();
  //   const glassesCollection = collection(db, "glassesInTheShopCart");

  //   try {
  //     // Check if the item already exists in the cart
  //     const queryRef = query(
  //       glassesCollection,
  //       where("itemNumber", "==", currentParamsId_Card.itemNumber)
  //     );
  //     const querySnapshot = await getDocs(queryRef);

  //     if (querySnapshot.empty) {
  //       // If the item doesn't exist, create a new document
  //       const newDocRef = doc(collection(db, "glassesInTheShopCart"));
  //       await addDoc(glassesCollection,{ currentParamsId_Cardinfo});
  //       console.log("Item added to shopping cart:", currentParamsId_Cardinfo);
  //     } else {
  //       // If the item exists, update its quantity (and other details if necessary)
  //       const existingDocRef = querySnapshot.docs[0].ref;
  //       await setDoc(existingDocRef, currentParamsId_Cardinfo, { merge: true });
  //       console.log("Item updated in shopping cart:", currentParamsId_Cardinfo);
  //     }

  //     // Fetch the updated shopping cart list from Firestore
  //     const updatedSnapshot = await getDocs(glassesCollection);
  //     const updatedCartList = updatedSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     console.log("updatedCartList", updatedCartList);
  //     // Dispatch the updated cart list to the Redux store
  //     //dispatch(setCurrentShoppingCartList(updatedCartList));
  //   } catch (error) {
  //     console.error("Error handling add to cart", error);
  //   }
  // };
  const handleAddtoCart = async () => {
    const currentParamsId_Cardinfo = {
      ...currentParamsId_Card,
      quantity: currentParamsId_Card.quantity + 1,
      selectedColor: selectedColor,
      selectedFrameSize: selectedFrameSize,
    };

    const db = getFirestore();
    const glassesCollection = collection(db, "glassesInTheShopCart");

    try {
      // Add a new document to Firestore with addDoc
      const docRef = await addDoc(glassesCollection, currentParamsId_Cardinfo);
      //console.log("currentParamsId_Cardinfo", currentParamsId_Cardinfo);

      // Fetch the updated shopping cart list from Firestore
      const updatedSnapshot = await getDocs(glassesCollection);
      // const updatedCartList = updatedSnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   // ...doc.data(),
      //   ...(data.item ? data.item : data),
      // }));
      const updatedCartList = updatedSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...(data.item ? data.item : data), // Use data.item if it exists, otherwise use data directly
        };
      });
      //console.log("Detail PAGE : ", updatedCartList);
      // Dispatch the updated cart list to the Redux store
      dispatch(setCurrentShoppingCartList(updatedCartList));
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  //Remove item from shopping cart
  // const handlerRemovefromCart = () => {
  //   // const newList = shoppingCartList.filter((eachItem) => {
  //   //   return eachItem.itemNumber !== currentParamsId_Card.itemNumber;
  //   // });
  //   // setShoppingCartList(newList);
  //   let itemNumbernum = { itemNumber };
  //   axios
  //     .post(
  //       "https://vivaser.onrender.com/api/v1/shopproductCardDelete",
  //       itemNumbernum
  //     )
  //     .then((res) => {
  //       // console.log("shopProductCardDelete", res.data);
  //       // console.log("remove item", itemNumber);
  //       axios
  //         .get("https://vivaser.onrender.com/api/v1/shop")
  //         .then((res) => {
  //           // console.log("Get shoppingCartList data", res.data.data);
  //           dispatch(setCurrentShoppingCartList(res.data.data));
  //         })
  //         .catch((error) => {
  //           // console.log("get shop item fail", error);
  //         });
  //     })
  //     .catch((error) => {
  //       // console.log("Fail to remove item", error);
  //     });
  // };
  // const handlerRemovefromCart = async (itemNumber) => {
  //   const db = getFirestore();
  //   const glassesCollection = collection(db, "glassesInTheShopCart");

  //   try {
  //     // Create a query against the collection to find an item with the same itemNumber
  //     const queryRef = query(
  //       glassesCollection,
  //       where("item.itemNumber", "==", itemNumber)
  //     );
  //     // Execute the query
  //     const querySnapshot = await getDocs(queryRef);

  //     // Create an array of promises for each delete operation
  //     // const deletePromises = querySnapshot.docs.map((doc) =>
  //     //   deleteDoc(doc.ref)
  //     // );
  //     querySnapshot.forEach(async (doc) => {
  //       await deleteDoc(doc.ref);
  //       console.log(
  //         `Item with itemNumber ${itemNumber} removed from shopping cart.`
  //       );
  //     });
  //     // Wait for all delete operations to complete
  //     // await Promise.all(deletePromises);
  //     // console.log(
  //     //   `All items with itemNumber ${itemNumber} removed from shopping cart.`
  //     // );

  //     // After removing the items, retrieve the current data from the collection to update Redux
  //     const currentDataSnapshot = await getDocs(glassesCollection);
  //     const glassesInTheShopCart = currentDataSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data().item, // Assuming that the structure includes an 'item' property
  //     }));
  //     console.log("DETAIL DELETE: glassesInTheShopCart", glassesInTheShopCart);
  //     // Dispatch the updated cart list to the Redux store
  //     //dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
  //   } catch (error) {
  //     console.error("Error in Removing Glasses from Shopping Cart", error);
  //     throw error;
  //   }
  // };
  // const handlerRemovefromCart = async (itemNumber) => {
  //   const db = getFirestore();
  //   const glassesCollection = collection(db, "glassesInTheShopCart");

  //   try {
  //     // Create a query against the collection to find an item with the same itemNumber
  //     const queryRef = query(
  //       glassesCollection,
  //       where("item.itemNumber", "==", itemNumber)
  //     );
  //     // Execute the query
  //     const querySnapshot = await getDocs(queryRef);

  //     // // Create an array of promises for each delete operation
  //     // const deletePromises = querySnapshot.docs.map((doc) =>
  //     //   deleteDoc(doc.ref)
  //     // );

  //     // Wait for all delete operations to complete
  //     // await Promise.all(deletePromises);
  //     querySnapshot.forEach(async (doc) => {
  //       await deleteDoc(doc.ref);
  //       console.log(
  //         `Item with itemNumber ${itemNumber} removed from shopping cart.`
  //       );
  //     });
  //     // After removing the items, retrieve the current data from the collection to update Redux
  //     const currentDataSnapshot = await getDocs(glassesCollection);
  //     const glassesInTheShopCart = currentDataSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     console.log("DELETE:glassesInTheShopCart", glassesInTheShopCart);
  //     // Dispatch the updated cart list to the Redux store
  //     //dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
  //   } catch (error) {
  //     console.error("Error in Removing Glasses from Shopping Cart", error);
  //     throw error;
  //   }
  // };
  // Third times

  const handlerRemovefromCart = async (itemNumber) => {
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
  // console.log("detail setSelectedFrameSize", setSelectedFrameSize);
  const shoppingCartData = useSelector((state) => {
    return state?.shoppingCartReducer?.shoppingCartList;
  });

  const ifItemInCart =
    shoppingCartData.filter((eachItem) => {
      return eachItem?.itemNumber === currentParamsId_Card?.itemNumber;
    })?.length === 1;

  return (
    <div className="Productdetail">
      <Link to="/shop" style={{ textDecoration: "none" }}>
        <div className="Backtoshop">
          <svg
            t="1688882332934"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1770"
            width="20"
            height="20"
          >
            <path
              d="M143 462h800c27.6 0 50 22.4 50 50s-22.4 50-50 50H143c-27.6 0-50-22.4-50-50s22.4-50 50-50z"
              p-id="1771"
              fill="#3E3E3E"
            ></path>
            <path
              d="M116.4 483.3l212.1 212.1c19.5 19.5 19.5 51.2 0 70.7s-51.2 19.5-70.7 0L45.6 554c-19.5-19.5-19.5-51.2 0-70.7 19.6-19.6 51.2-19.6 70.8 0z"
              p-id="1772"
              fill="#3E3E3E"
            ></path>
            <path
              d="M328.5 328.6L116.4 540.7c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7z"
              p-id="1773"
              fill="#3E3E3E"
            ></path>
          </svg>
          Back to Shop
        </div>
      </Link>
      <div className="productmodles">
        <div className="productmodle_img">
          <img
            src={renderGlassImg(currentParamsId_Card?.img)}
            alt="model1"
            className="modelsimg"
          />
        </div>
        <div className="showcase">
          <img
            src={renderGlassImg(currentParamsId_Card?.img)}
            alt="model1"
            className="showcaseimg"
          />
        </div>
        <div className="modelDetails">
          <div className="modelDetails_toppart">
            <div className="md_subtitle">{currentParamsId_Card?.subtitle}</div>
            <div className="md_title">{currentParamsId_Card?.title}</div>
            <div className="md_explaination">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              placeat similique dicta nulla praesentium deserunt. Corporis
              repellendus deleniti dolores eligendi.
            </div>
          </div>
          <div className="modelDetails_middlepart">
            <div className="glassesSize">
              <div className="gs_text">Lens Width and Frame Size</div>
              <div className="gs_selections">
                <Dropdownlist
                  dropdownName="sizelist"
                  dropdownwith={450}
                  inputLable="-- Select Size --"
                  names={[`28 mm`, `36 mm`, `42 mm`]}
                  setSelectedFrameSize={setSelectedFrameSize}
                />
              </div>
            </div>
            <div className="glassesColor">
              <div className="gc_text">Choose Color</div>
              <div className="gc_colors">
                <div className="gc_colorcircle">
                  <ColorList
                    currentColorlist={currentParamsId_Card?.colors}
                    setSelectedColor={setSelectedColor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modleDetails_bottompart">
            <div className="glasses_pricing">
              ${currentParamsId_Card?.price}.00
            </div>

            {ifItemInCart ? (
              <div
                className="glasses_addtobask_remove"
                onClick={() => handlerRemovefromCart(itemNumber)}
              >
                Remove From Basket
              </div>
            ) : (
              <div
                className="glasses_addtobask"
                onClick={() => handleAddtoCart()}
              >
                Add To Basket
              </div>
            )}
          </div>
        </div>
      </div>
      <Products
        productTitle="Recommended Products"
        productsInfo={RecommendedProduct}
        whichPage="recommended"
      />
    </div>
  );
}
