import { Link, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../Components/LoginForm/LoginForm";
import PriceList, {
  loader as PriceListLoader,
} from "../Components/PriceList/PriceList";
import ReportsPage from "../Components/ReportsPage/ReportsPage";
import AdminHomePage from "../Pages/Administration/AdminHomePage";
import UserForm from "../Pages/Administration/Users/UserForm";
import UsersHomePage, {
  usersLoader,
} from "../Pages/Administration/Users/UsersHomePage";
import Home from "../Pages/Home/Home";
import ColumnView, {
  loader as ordersLoader,
} from "../Pages/Orders/ColumnView/ColumnView";
import DayView, { DayViewLoader } from "../Pages/Orders/DayView/DayView";
import OrderForm, {
  orderFormLoader,
} from "../Pages/Orders/OrderForm/OrderForm";
import OrdersHome from "../Pages/Orders/OrdersHome/OrdersHome";
import PrintOrderView, {
  loader as PrintOrderViewLoader,
} from "../Pages/Orders/PrintOrderView/PrintOrderView";
import Error from "../Components/Error";
import NomenclatureHomePage from "../Pages/Nomenclature/NomenclatureHomePage";
import MaterialsPage from "../Pages/Nomenclature/Materials/MaterialsPage";
import VendorsPage from "../Pages/Nomenclature/Vendors/VendorsPage";
import ClientsPage from "../Pages/Nomenclature/Clients/ClientsPage";
import CategoriesPage from "../Pages/Nomenclature/Categories/CategoriesPage";
import ProductsPage from "../Pages/Nomenclature/Products/ProductsPage";
import RecipesHomePage from "../Pages/Recipes/RecipesHomePage";
import DeliveriesHome from "../Pages/Deliveries/DeliveriesHome";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //-----------------Home-----------------
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      //-----------------Orders-----------------
      {
        element: <OrdersHome />,
        path: "/orders/",
        handle: {
          crumb: () => <Link to="/orders">Поръчки</Link>,
        },
        children: [
          {
            index: true,
            element: <ColumnView />,
            loader: ordersLoader,
            errorElement: <Error />,
          },
          {
            path: ":method/:id",
            element: <OrderForm />,
            loader: orderFormLoader,
            errorElement: <Error />,
          },
          {
            path: ":method/",
            element: <OrderForm />,
            loader: orderFormLoader,
            errorElement: <Error />,
          },
          {
            path: "print/:id",
            element: <PrintOrderView />,
            loader: PrintOrderViewLoader,
            errorElement: <Error />,
          },
          {
            path: "forDay/:date",
            element: <DayView />,
            loader: DayViewLoader,
            errorElement: <Error />,
          },
        ],
      },
      //-----------------Admin-----------------
      {
        path: "admin/",
        handle: {
          crumb: () => <Link to="/admin">Администрация</Link>,
        },
        children: [
          {
            index: true,
            element: <AdminHomePage />,
          },
          {
            path: "reports/",
            element: <ReportsPage />,
            handle: {
              crumb: () => <Link to="/admin/reports">Справки</Link>,
            },
            children: [
              {
                path: "priceList/",
                element: <PriceList />,
                loader: PriceListLoader,
              },
            ],
          },

          {
            path: "users/",
            handle: {
              crumb: () => <Link to="/admin/users">Потребители</Link>,
            },
            children: [
              {
                index: true,
                element: <UsersHomePage />,
                loader: usersLoader,
              },
              {
                path: "add",
                element: <UserForm />,
              },
              {
                path: "edit/:id",
                element: <UserForm />,
              },
            ],
          },
        ],
      },
      //-----------------Nomenclature-----------------
      {
        path: "/nomenclature/",
        handle: {
          crumb: () => <Link to="/nomenclature">Номенклатура</Link>,
        },
        children: [
          {
            index: true,
            element: <NomenclatureHomePage />,
            errorElement: <Error />,
          },

          {
            path: "materials",
            element: <MaterialsPage />,
            errorElement: <Error />,
            handle: {
              crumb: () => <Link to="/nomenclature/materials">Стоки</Link>,
            },
          },
          {
            path: "vendors",
            element: <VendorsPage />,
            errorElement: <Error />,
            handle: {
              crumb: () => <Link to="/nomenclature/vendors">Доставчици</Link>,
            },
          },
          {
            path: "clients",
            element: <ClientsPage />,
            errorElement: <Error />,
            handle: {
              crumb: () => <Link to="/nomenclature/clients">Клиенти</Link>,
            },
          },
          {
            path: "categories",
            element: <CategoriesPage />,
            errorElement: <Error />,
            handle: {
              crumb: () => (
                <Link to="/nomenclature/categories">Категории Стоки</Link>
              ),
            },
          },
          {
            path: "products",
            element: <ProductsPage />,
            errorElement: <Error />,
            handle: {
              crumb: () => (
                <Link to="/nomenclature/products">Категории Стоки</Link>
              ),
            },
          },
        ],
      },
      //-----------------Recipes-----------------
      {
        path: "recipes",
        element: <RecipesHomePage />,
        handle: {
          crumb: () => <Link to="/recipes">Рецепти</Link>,
        },
      },
      //-----------------Deliveries-----------------
      {
        path: "deliveries",
        element: <DeliveriesHome />,
        handle: {
          crumb: () => <Link to="/deliveries">Доставки</Link>,
        },
      },
      //-----------------Login-----------------
      {
        path: "/login/",
        element: <LoginForm />,
      },
    ],
  },
]);
