import { db } from "../firebase/config";
import { collection, getDocs, query } from "firebase/firestore";

import { setCurrentShoppingCartList } from "../actions/shoppingCartAction";
import { useDispatch } from "react-redux";

const glassesInTheShopCartRef = collection(db, "glassesInTheShopCart");

export const getItemInShoppingCart = async () => {
  const data = await getDocs(glassesInTheShopCartRef);
  const itemList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log("data is ::", itemList);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getGlassesAndDocuments = async () => {
  const collectionRef = collection(db, "glassesInTheCart");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const glassesData = querySnapshot.docs.reduce((docSnapshot) => {
    const { eachGlasses } = docSnapshot.data();
    console.log(eachGlasses, "eachGlasses");
  }, {});
  return glassesData;
};
