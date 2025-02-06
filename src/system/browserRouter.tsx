import { Link, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../Components/LoginForm/LoginForm";
import PriceList from "../Pages/Administration/Reports/PriceList";
import ReportsPage from "../Components/ReportsPage/ReportsPage";
import AdminHomePage from "../Pages/Administration/AdminHomePage";
import UserForm from "../Pages/Administration/Users/UserForm";
import UsersHomePage, {
  usersLoader,
} from "../Pages/Administration/Users/UsersHomePage";
import Home from "../Pages/Home/Home";
import DayView from "../Pages/Orders/DayView/DayView";
import OrdersHome from "../Pages/Orders";
import PrintOrder from "../Pages/Orders/PrintOrderView";
import Error from "../Components/Error";
import NomenclatureHomePage from "../Pages/Nomenclature/NomenclatureHomePage";
import MaterialsPage from "../Pages/Nomenclature/Materials/MaterialsPage";
import VendorsPage from "../Pages/Nomenclature/Vendors/VendorsPage";
import ClientsPage from "../Pages/Nomenclature/Clients/ClientsPage";
import CategoriesPage from "../Pages/Nomenclature/Categories";
import Products from "../Pages/Nomenclature/Products";
import RecipesHomePage from "../Pages/Recipes/RecipesHomePage";
import DeliveriesHome from "../Pages/Deliveries/DeliveriesHome";
import CreateUpdateOrder from "../Pages/Orders/CreateUpdateOrder";
import CalendarView from "../Pages/Orders/CalendarView/CalendarView";
import ProductsPage from "../Pages/Nomenclature/Products/ProductsPage";


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
            element: <CalendarView />,
            errorElement: <Error />,
          },
          {
            path: "create/",
            element: <CreateUpdateOrder />,
            errorElement: <Error />,
            handle: {
              crumb: () => <Link to="/orders/create">Нова Поръчка</Link>,
            },
          },
          {
            path:"update/:id",
            element: <CreateUpdateOrder />,
            errorElement: <Error />,
            handle: {
              crumb: () => <span>Редактиране на Поръчка</span>,
            },
          },
          {
            path: "print/:id",
            element: <PrintOrder/>,
            errorElement: <Error />,
            handle: {
              crumb: () => <span>Принтиране на Поръчка</span>,
            },
          },
          {
            path: "forDay/:date",
            element: <DayView />,
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
                errorElement: <Error />,
                handle: {
                  crumb: () => <Link to="/admin/reports/priceList">Ценова Листа</Link>,
                },
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
            element:<Products/>,
            errorElement: <Error />,
                handle: {
                  crumb: () => (<Link to="/nomenclature/products">Продукти</Link>),
                },
            children:[
              {
                index:true,
                element: <ProductsPage />,
                errorElement: <Error />,
                handle: {
                  crumb: () => (<Link to="/nomenclature/products">Всички</Link>),
                },
              },
              {
                path:"table",
                element:<ProductsPage/>,
                errorElement: <Error />,
                handle: {
                  crumb: () => (<Link to="/nomenclature/products/table">Таблица</Link>),
                },
              },
              {
                path:"priceList",
                element:<PriceList/>,
                handle: {
                  crumb: () => (<Link to="/nomenclature/products/priceList">Ценова Листа</Link>),
                },
              }
            ]
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
      // {
      //   path:'/test',
      //   element: <OrderFormProvider/>
      // }
    ],
  },
]);
