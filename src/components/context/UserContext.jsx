import { createContext, useContext, useReducer } from "react";

const initialState = {
  userData: null,
  headerData: null,
  categoriesData: null,
  homePageData: null,
  wishlistData: null,
  compareData: null,
  localCompareData: [],
  compareLength: 0,
  cartData: null,
  cartLength: 0
};

const AppContext = createContext({
  userState: initialState,
  dispatch: () => null
});

function appReducer(userState, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...userState, userData: action.data };
    case "HEADER_DATA":
      return { ...userState, headerData: action.data };
    case "CATEGORIES_DATA":
      return { ...userState, categoriesData: action.data };
    case "HOME_PAGE_DATA":
      return { ...userState, homePageData: action.data };
    case "WISHLIST_DATA":
      return { ...userState, wishlistData: action.data };
    case "COMPARE_DATA":
      return { ...userState, compareData: action.data };
    case "LOCAL_COMPARE_DATA":
      return { ...userState, localCompareData: action.data };
    case "COMPARE_LENGTH":
      return { ...userState, compareLength: action.data };
    case "CART_DATA":
      return { ...userState, cartData: action.data };
    case "CART_LENGTH":
      return { ...userState, cartLength: action.data };
    default:
      return userState;
  }
}

export function UserContextProvider({ children }) {
  const [userState, dispatch] = useReducer(appReducer, initialState);
  const value = { userState, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default function useAppContext() {
  return useContext(AppContext);
}
