import React, { useState, useEffect, useContext } from "react";
// import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./actions/productsAction";
import { setCurrentShoppingCartList } from "./actions/shoppingCartAction";
import { app, db } from "../src/firebase/config";
import {
  writeBatch,
  doc,
  collection,
  addDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import NavBar from "./components/navBar/navBar";
import Hero from "./components/hero/hero";
import Products from "./components/products/products";
import SignupIn from "./components/signup/signupIn";
import Search from "./components/search/search";
import signContext from "./context/signContext";
import shopCartContext from "./context/shopcartContext";
import allContext from "./context";
import Account from "./pages/account";
import Checkout from "./pages/checkout";
import Confirmation from "./components/checkoutstep/confirmation/confirmation";

import Footer from "./components/footer/footer";
import ShopProductsList from "./components/shoppages/shopProductList/shopProductList";
import FeaturedProducts from "./components/featuredpages/featuredproducts/featuredproducts";
import Productdetail from "./components/detail/detail";
import img_green from "../src/assest/green.jpg";
import CheckoutStep1 from "./components/checkoutstep/checkoutstep1";
import CheckoutStep2 from "./components/checkoutstep/checkoutstep2";
import CheckoutStep3 from "./components/checkoutstep/checkoutstep3";

//Routes
import Home from "./pages/home";
import Shop from "./pages/shop";
import Featured from "./pages/featured";
import Recommended from "./pages/recommended";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

import { getGlassesAndDocuments } from "./utils/fireBaseAPI";
function App() {
  const dispatch = useDispatch();
  const db = getFirestore();
  const allglassesData = [
    {
      itemNumber: 1,
      cardtype: "shopcard",
      img: "img_blue",
      // imgurl:"",
      title: "Sugat",
      subtitle: "Betsin Maalat",
      price: 68,
      addedInCart: false,
      quantity: 0,
      colors: ["primary", "neutral"],
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 2,
      cardtype: "shopcard",
      img: "img_biscut",
      imgurl: "",
      title: "Kulangot",
      subtitle: "Sexbomb",
      price: 67,
      recommended: true,
      colors: ["primary", "neutral", "danger", "success", "warning"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 3,
      cardtype: "shopcard",
      img: "img_blue",
      // imgurl:"",
      title: "Tiktilaok Manok",
      subtitle: "Sexbomb",
      price: 78,
      recommended: true,
      colors: ["primary", "success", "warning"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 4,
      cardtype: "shopcard",
      img: "img_sbrown",
      imgurl: "",
      title: "Very Nice",
      subtitle: "Salt Maalat",
      price: 79,
      featured: true,
      colors: ["primary", "success", "warning"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 5,
      cardtype: "shopcard",
      img: "img_red",
      // imgurl:"",
      title: "Quake Overload",
      subtitle: "Salt Maalat",
      price: 80,
      recommended: true,
      colors: ["danger", "primary", "success", "warning"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 6,
      cardtype: "shopcard",
      img: "img_brown",
      // imgurl:"",
      title: "Kutu",
      subtitle: "Sexbomb",
      price: 129,
      colors: ["danger", "success", "warning", "neutral"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 7,
      cardtype: "shopcard",
      img: "img_sbrown",
      imgurl: "",
      title: "Tuluk",
      subtitle: "Black Kibal",
      price: 142,
      recommended: true,
      colors: ["success", "warning", "neutral", "danger"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 8,
      cardtype: "shopcard",
      img: "img_green",
      // imgurl:"",
      title: "Takla Green",
      subtitle: "Sexboomb",
      price: 150,
      recommended: true,
      colors: ["success", "warning", "neutral"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 9,
      cardtype: "shopcard",
      img: "img_golden",
      imgurl: "",
      title: "Balakubak",
      subtitle: "Betsin Maalat",
      price: 170,
      colors: ["success", "warning", "danger"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 10,
      cardtype: "shopcard",
      img: "img_golden",
      imgurl: "",
      title: "Pitaklan",
      subtitle: "Black Kibal",
      price: 174,
      colors: ["success", "neutral", "danger"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 11,
      cardtype: "shopcard",
      img: "img_brown",
      // imgurl:"",
      title: "Burnikk",
      subtitle: "Sexbomb",
      price: 240,
      featured: true,
      colors: ["danger", "warning"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 12,
      cardtype: "shopcard",
      img: "img_red",
      // imgurl:"",
      title: "Sipon Malapot",
      subtitle: "Salt Maalat",
      price: 250,
      featured: true,
      colors: ["neutral", "danger", "success"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 13,
      cardtype: "shopcard",
      img: "img_biscut",
      imgurl: "",
      title: "Buldit",
      subtitle: "Salt Maalat",
      price: 250,

      colors: ["warning", "danger", "success"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 14,
      cardtype: "shopcard",
      img: "img_blue",
      // imgurl:"",
      title: "Merry Christmas",
      subtitle: "Salt Maalat",
      price: 78,
      colors: ["warning", "danger", "success", "neutral"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 15,
      cardtype: "shopcard",
      img: "img_blue",
      // imgurl:"",
      title: "Tilis Malaput",
      subtitle: "Betsin Maalat",
      price: 340,
      featured: true,
      colors: ["danger", "neutral"],
      quantity: 0,
      framesize: ["28 mm", "36 mm", "42 mm"],
      addedInCart: false,
    },
    {
      itemNumber: 16,
      cardtype: "shopcard",
      img: "img_golden",
      imgurl: "",
      title: "Merry Christmas",
      subtitle: "Salt Maalat",
      price: 365,
      featured: true,
      colors: ["success", "primary", "neutral"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 17,
      cardtype: "shopcard",
      img: "img_sbrown",
      imgurl: "",
      title: "Tilapia",
      subtitle: "Salt Maalat",
      price: 450,
      recommended: true,
      colors: ["warning", "success", "neutral"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
    {
      itemNumber: 18,
      cardtype: "shopcard",
      img: "img_blue",
      imgurl: "",
      title: "Kibal Batal",
      subtitle: "Kibal Black",
      price: 674,
      featured: true,
      colors: ["neutral"],
      quantity: 0,
      addedInCart: false,
      framesize: ["28 mm", "36 mm", "42 mm"],
    },
  ];
  //Add All Glassess to firebase

  // async function addMultipleProducts() {
  //   // Create a new batch instance
  //   const batch = writeBatch(db);

  //   // Reference to your collection
  //   const productsCollection = collection(db, "allglassesData");

  //   // Add each product to the batch
  //   allglassesData.forEach((data) => {
  //     const newDocRef = doc(productsCollection); // Create a new document reference
  //     batch.set(newDocRef, data);
  //   });

  //   // Commit the batch
  //   try {
  //     await batch.commit();
  //     console.log("All products added!");
  //   } catch (error) {
  //     console.error("Error adding products: ", error);
  //   }
  // }
  // addMultipleProducts();

  const [allproducts, setAllProducts] = useState([]);
  //const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const db = getFirestore();
    const allglassesData = collection(db, "allglassesData");
    try {
      const allglassesDataSnapshot = await getDocs(allglassesData);
      const allglassesDataList = allglassesDataSnapshot.docs.map((doc) => ({
        key: doc.id,
        id: doc.id,
        ...doc.data(),
      }));
      //console.log("allglassesDataList", allglassesDataList);
      setAllProducts(allglassesDataList);
      dispatch(setProducts(allglassesDataList));
    } catch (error) {
      console.error("Error fetching products: ", error);
    }

    //setLoading(false);
  };

  const fetchGlassesInTheShopCart = async () => {
    // Get a reference to the Firestore database
    const db = getFirestore();

    // Reference the 'glassesInTheShopCart' collection
    const glassesCollectionRef = collection(db, "glassesInTheShopCart");

    try {
      // Fetch the collection data
      const querySnapshot = await getDocs(glassesCollectionRef);

      // Map through documents and get the data
      const glassesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Do something with glassesList, e.g., set state, dispatch to Redux, etc.
      //console.log(glassesList);
      dispatch(setCurrentShoppingCartList(glassesList));
      return glassesList;
    } catch (error) {
      console.error("Error fetching glasses in the shop cart:", error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGlassesInTheShopCart();
  }, []);
  // (async () => {
  //   try {
  //     // Your batch code here
  //     await batch.commit();
  //     console.log("Batched write successful");
  //   } catch (error) {
  //     console.error("Error writing batch: ", error);
  //   }
  // })();

  // Commit the batch

  // useEffect(() => {
  //   axios
  //     .get("https://vivaser.onrender.com/api/v1/")
  //     .then((res) => {
  //       // console.log("/ response.data", res.data);
  //       dispatch(setProducts(res.data));
  //     })
  //     .catch((error) => {
  //       console.log("could not get data from server", error);
  //     });

  //   axios
  //     .get("https://vivaser.onrender.com/api/v1/shop")
  //     .then((res) => {
  //       // console.log("Get shoppingCartList data", res.data.data);
  //       dispatch(setCurrentShoppingCartList(res.data.data));
  //     })
  //     .catch((error) => {
  //       console.log("get shop item fail", error);
  //     });
  // }, []);
  // useEffect(() => {
  //   const getGlassesData = async () => {
  //     const shoppingCartGlassesMap = await getGlassesAndDocuments();
  //     console.log("shoppingCartGlassesMap", shoppingCartGlassesMap);
  //   };
  //   getGlassesData();
  // }, []);
  //Get Data from  Backend Server

  //Shop页面中的18张眼镜卡片里的所有资料：img,title,subtitle,price
  const Shopcard18 = useSelector((state) => {
    return state.productsReducer?.allglassesProducts;
  });
  //console.log("shopcard18", Shopcard18);
  // const iflogedin = useSelector((state) => {
  //   return state?.loginReducer.ifLogedin;
  // });
  // console.log("app", iflogedin);
  const ifSignedStatus = localStorage.getItem;
  //定义useState,把18张卡片传进去。
  const [card18, setCard18] = useState(Shopcard18 || []);
  useEffect(() => {
    setCard18(Shopcard18);
    setFilterdData(Shopcard18);
  }, [Shopcard18]);

  // console.log("shopcard18", Shopcard18);
  // const card18 = useSelector((state) => {
  //   return state.productsReducer?.data?.glassesProducts;
  // });
  //定义useState,为了取得实时变量signupInfo
  const [signupInfo, setSignupInfo] = useState("");
  //取local Storage里面的token，赋值到signed
  const signed = localStorage.getItem("token");
  // const signed = false;
  // 定义useState, 确定user有没有登录，有就return true，没有拿到token就是False。
  const [ifsigned, setIfsigned] = useState(signed ? true : false);
  //设置useState状态，selectedCard变量名，setselectedCard函数，初始值里嵌套了数组方法slice0-11个卡片，也就是会出现12个卡片

  //定义函数filterdData, 并设置进context
  const [filterdData, setFilterdData] = useState(Shopcard18);
  //showMoreItem 按钮
  const [showMoreItem, setShowMoreItem] = useState(true);
  //shoppingCartList 购物车State
  const [shoppingCartList, setShoppingCartList] = useState([]);
  // shop页面显示State
  const [productDisplayList, setProductDispalyList] = useState(card18);
  const [shippingCost, setShippingCost] = useState(0);

  //Auth function to check login status for Shop page。If the user did not sign in, it will redirect to sign in page.Otherwise, it can access Shop page
  function Auth({ children }) {
    //let islogin = iflogedin;
    // console.log("auth", islogin);
    let islogin = localStorage.getItem("token");
    return islogin ? children : <Navigate to="/signin"></Navigate>;
  }
  // useEffect(() => {
  //   localStorage.setItem("showMoreItem", false);
  // }, [showMoreItem]);

  return (
    <BrowserRouter>
      <shopCartContext.Provider
        value={{
          card18,
          // setCard18,
          filterdData,
          setFilterdData,
          shoppingCartList,
          setShoppingCartList,
          showMoreItem,
          setShowMoreItem,
          productDisplayList,
          setProductDispalyList,
          shippingCost,
          setShippingCost,
        }}
      >
        <signContext.Provider
          value={{ signupInfo, setSignupInfo, ifsigned, setIfsigned }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home productsInfo={card18} />}></Route>
              <Route path="/shop" element={<Shop />}></Route>
              <Route
                path="/featured"
                element={<Featured productsInfo={card18} />}
              ></Route>
              <Route
                path="/recommended"
                element={<Recommended productsInfo={card18} />}
              ></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route
                path="/productdetail/:itemNumber"
                element={
                  <Productdetail
                    // Shopcard18={Shopcard18}
                    productsInfo={card18}
                  />
                }
              ></Route>
              <Route
                path="/search/:searchid"
                element={<Search productsInfo={card18} />}
              ></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route
                path="/checkout"
                element={
                  <Auth>
                    <Checkout />
                  </Auth>
                }
              >
                <Route path="step1" element={<CheckoutStep1 />}></Route>
                <Route path="step2" element={<CheckoutStep2 />}></Route>
                <Route path="step3" element={<CheckoutStep3 />}></Route>
                <Route path="confirmation" element={<Confirmation />}></Route>
              </Route>
            </Routes>
            {/* 函数传参Shopcard18个卡片，传参：updateFilter函数，这样navbar里面就能使用这些数据和函数 */}
            <NavBar shopCard18={card18} />
          </div>
        </signContext.Provider>
      </shopCartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
