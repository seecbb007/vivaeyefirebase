import React, { useContext, useEffect } from "react";
import "../shoppingcart/shoppingcartCard.css";
import Radio, { radioClasses } from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import shopCartContext from "../../context/shopcartContext";
import renderGlassImg from "../../utils/renderGlassImg";
import axios from "axios";
import { setCurrentShoppingCartList } from "../../actions/shoppingCartAction";
import { useDispatch, useSelector } from "react-redux";
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
  increment,
} from "firebase/firestore";

export default function ShoppingcartCard({ eachItem }) {
  const {
    framesize,
    title,
    quantity,
    size,
    colors,
    price,
    img,
    itemNumber,
    subtotalprice,
    selectedFrameSize,
    selectedColor,
  } = eachItem;

  const dispatch = useDispatch();
  const currentColor =
    selectedColor === undefined || selectedColor === ""
      ? colors[0]
      : selectedColor;
  const currentFrameSize =
    selectedFrameSize === undefined || selectedFrameSize === ""
      ? framesize[0]
      : selectedFrameSize;

  let totalPricing = quantity * price;
  const { shoppingCartList, setShoppingCartList } = useContext(shopCartContext);
  // const currentCard = useSelector((state) => {
  //   return state?.shoppingCartReducer?.shoppingCartList;
  // });

  // shopping cart CARD___ADD Quantity
  // const handleAddQuantity = () => {
  //   // const newList = shoppingCartList?.map((eachcard) => {
  //   //   if (eachcard.itemNumber === itemNumber) {
  //   //     return {
  //   //       ...eachcard,
  //   //       quantity: quantity + 1,
  //   //     };
  //   //   }
  //   //   return eachcard;
  //   // });
  //   // setShoppingCartList(newList);
  //   const dataSet = { value: itemNumber };
  //   axios
  //     .post(
  //       "https://vivaser.onrender.com/api/v1/shopproductCardUpdate",
  //       dataSet
  //     )
  //     .then((res) => {
  //       // console.log("iii", item);
  //       // console.log("DETAIL:updateOne to shopping cart", res.data.data);

  //       // setShoppingCartList(res.data);
  //       axios
  //         .get("https://vivaser.onrender.com/api/v1/shop")
  //         .then((res) => {
  //           // console.log(
  //           //   "add quantity:Get shoppingCartList data",
  //           //   res.data.data
  //           // );
  //           dispatch(setCurrentShoppingCartList(res.data.data));
  //         })
  //         .catch((error) => {
  //           // console.log("get shop item fail", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("DETAIL:updateItem Failed", error);
  //     });
  // };
  const handleAddQuantity = async (itemNumber) => {
    const db = getFirestore();
    const glassesCollection = collection(db, "glassesInTheShopCart");

    try {
      // Step 1: Find the specific document
      const querySnapshot = await getDocs(
        query(glassesCollection, where("itemNumber", "==", itemNumber))
      );
      if (!querySnapshot.empty) {
        // Assuming itemNumber is unique and there's only one document
        const documentRef = querySnapshot.docs[0].ref;

        // Step 2: Update the quantity in Firestore
        await updateDoc(documentRef, {
          quantity: increment(1), // Use Firebase's increment to ensure atomic update
        });

        // Step 3: Fetch the updated list
        const updatedSnapshot = await getDocs(glassesCollection);
        const updatedCartList = updatedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Assuming the data structure matches what you expect
        }));

        // Step 4: Dispatch the updated list to Redux store
        dispatch(setCurrentShoppingCartList(updatedCartList));
      }
    } catch (error) {
      console.error("Error updating item quantity", error);
    }
  };
  // const handleRemoveQuantity = () => {
  //   // const newList = shoppingCartList?.map((eachcard) => {
  //   //   if (eachcard.itemNumber === itemNumber && quantity > 1) {
  //   //     return {
  //   //       ...eachcard,
  //   //       quantity: quantity - 1,
  //   //     };
  //   //   }
  //   //   return eachcard;
  //   // });
  //   // setShoppingCartList(newList);
  //   const dataSet = { itemNumber: itemNumber };
  //   axios
  //     .post(
  //       "https://vivaser.onrender.com/api/v1/shopproductCardUpdatedecrese",
  //       dataSet
  //     )
  //     .then((res) => {
  //       // console.log("iii", item);
  //       console.log("DECREASE:updateOne to shopping cart", res.data.data);
  //       axios
  //         .get("https://vivaser.onrender.com/api/v1/shop")
  //         .then((res) => {
  //           // console.log(
  //           //   "remove quantity:Get shoppingCartList data",
  //           //   res.data.data
  //           // );
  //           dispatch(setCurrentShoppingCartList(res.data.data));
  //         })
  //         .catch((error) => {
  //           // console.log("get shop item fail", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("DETAIL:updateItem Failed", error);
  //     });
  // };
  // -----------
  const handleRemoveQuantity = async (itemNumber) => {
    const db = getFirestore();
    const glassesCollection = collection(db, "glassesInTheShopCart");

    try {
      // Step 1: Find the specific document
      const querySnapshot = await getDocs(
        query(glassesCollection, where("itemNumber", "==", itemNumber))
      );
      if (!querySnapshot.empty) {
        const documentSnapshot = querySnapshot.docs[0];
        const documentRef = documentSnapshot.ref;
        const currentQuantity = documentSnapshot.data().quantity;

        // Check if quantity is greater than 1 before decrementing
        if (currentQuantity > 1) {
          // Step 2: Update the quantity in Firestore
          await updateDoc(documentRef, {
            quantity: currentQuantity - 1, // Decrement the quantity by 1
          });

          // Step 3: Fetch the updated list
          const updatedSnapshot = await getDocs(glassesCollection);
          const updatedCartList = updatedSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(), // Assuming the data structure matches what you expect
          }));

          // Step 4: Dispatch the updated list to Redux store
          dispatch(setCurrentShoppingCartList(updatedCartList));
        } else {
          console.log("Quantity is already at the minimum value of 1.");
        }
      }
    } catch (error) {
      console.error("Error updating item quantity", error);
    }
  };
  // shopping cart CARD___DELETE
  // const handleDelete = () => {
  //   // let newList = shoppingCartList.filter((eachItem) => {
  //   //   return eachItem.itemNumber !== itemNumber;
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
  //           console.log("ShoppingCartCARD: get shop item fail", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log("ShoppingCartCARD: Fail to remove item", error);
  //     });
  // };

  const handleDelete = async (itemNumber) => {
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
      //console.log("PAGE shopping Cart Card", glassesInTheShopCart);
      // Dispatch the updated list to your Redux store
      dispatch(setCurrentShoppingCartList(glassesInTheShopCart));
    } catch (error) {
      console.error("Error in Removing Glasses from Shopping Cart", error);
    }
  };

  return (
    <div>
      <div className="BasketCard">
        <div className="BasketCard_Container">
          <div className="BasketCardInformation">
            <div className="plusminusButtons">
              <button
                id={itemNumber}
                className="pm_buttn plus"
                onClick={() => handleAddQuantity(itemNumber)}
              >
                +
              </button>
              <button
                id={itemNumber}
                className="pm_buttn minus"
                onClick={() => handleRemoveQuantity(itemNumber)}
              >
                -
              </button>
            </div>
            <div className="card_imgContainer">
              <img
                src={renderGlassImg(img)}
                alt="BasketCard_img"
                className="cardImg"
              />
            </div>
            <div className="card_allinfo">
              <div className="allinfo_title">{title}</div>
              <div className="allinfo_detailInformation">
                <div className="detailList">
                  <div className="detailList_text">Quantity</div>
                  <div className="detailList_content">{quantity}</div>
                </div>
                <div className="detailList">
                  <div className="detailList_text">Size</div>
                  <div className="detailList_content">{currentFrameSize}</div>
                </div>
                <div className="detailList">
                  <div className="detailList_text">Color</div>
                  <div className="detailList_content">
                    <Sheet
                      key={currentColor}
                      sx={{
                        position: "relative",
                        // top: "10px",
                        left: "5px",
                        width: 15,
                        height: 15,
                        flexShrink: 0,
                        bgcolor: `${currentColor}.solidBg`,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Radio
                        overlay
                        variant="solid"
                        color={currentColor}
                        value={currentColor}
                        slotProps={{
                          input: { "aria-label": currentColor },
                          radio: {
                            sx: {
                              display: "contents",
                              "&, &.Mui-checked": {
                                color: "white",
                                fontSize: "25px",
                              },
                              "--variant-borderWidth": "2px",
                            },
                          },
                        }}
                        sx={{
                          "--joy-focus-outlineOffset": "4px",
                          "--joy-palette-focusVisible": (theme) =>
                            // theme.vars.palette[color][500],
                            theme.vars.palette[currentColor],
                          [`& .${radioClasses.action}.${radioClasses.focusVisible}`]:
                            {
                              outlineWidth: "2px",
                            },
                        }}
                      />
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>
            <div className="cardPricing">${totalPricing}.00</div>
            <div
              className="deleteButton"
              id={itemNumber}
              onClick={() => handleDelete(itemNumber)}
            >
              X
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
