import { db } from "../firebase/config";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";

import { setCurrentShoppingCartList } from "../actions/shoppingCartAction";
import { useDispatch } from "react-redux";

const glassesInTheShopCartRef = collection(db, "glassesInTheShopCart");

export const getItemInShoppingCart = async () => {
  const data = await getDocs(glassesInTheShopCartRef);
  const itemList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log("data is ::", itemList);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// export const getGlassesAndDocuments = async () => {
//   try {
//     const db = getFirestore();
//     const glassesCollectionRef = collection(db, "glassesInTheCart");
//     const querySnapshot = await getDocs(glassesCollectionRef);

//     const items = querySnapshot.docs.map((doc) => {
//       const data = doc.data();
//       console.log("data", data);
//       // 假设每个文档都有一个 'item' 字段
//     });
//     console.log("items is : ", items);
//   } catch (error) {
//     console.error("Error on Fetching shopping cart data : ", error);
//   }
// };
export const fetchGlassesInTheShopCart = async () => {
  try {
    const db = getFirestore();
    const glassesCollectionRef = collection(db, "glassesInTheShopCart");
    const querySnapshot = await getDocs(glassesCollectionRef);

    // querySnapshot.forEach((doc) => {
    //   shoppingCartData.push({ item: doc.data() });
    //   //shoppingCartData.push(...doc.data());
    // });
    const items = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data.item; // 假设每个文档都有一个 'item' 字段
    });
    console.log("items", items);

    setCurrentShoppingCartList(items);
    return items; // Set the state
  } catch (error) {
    console.error("Error fetching glasses from the shop cart:", error);
  }
};
