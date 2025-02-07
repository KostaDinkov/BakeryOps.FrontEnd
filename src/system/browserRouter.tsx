import { Link, createBrowserRouter } from "react-router";
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
import Products from "../Pages/Nomenclature/Products";
import RecipesHomePage from "../Pages/Recipes/RecipesHomePage";
import DeliveriesHome from "../Pages/Deliveries/DeliveriesHome";
import CreateUpdateOrder from "../Pages/Orders/CreateUpdateOrder";
import CalendarView from "../Pages/Orders/CalendarView/CalendarView";
import ProductsPage from "../Pages/Nomenclature/Products/ProductsPage";
import CategoriesForm from "../Pages/Nomenclature/Categories/CategoriesForm";
import CategoriesViewer from "../Pages/Nomenclature/Categories/CategoriesViewer";
import CategoriesIndex from "../Pages/Nomenclature/Categories";

export const browserRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        // #region Home
        {
          path: "/",
          element: <Home />,
          errorElement: <Error />,
        },
        // #endregion

        // #region Orders
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
              path: "update/:id",
              element: <CreateUpdateOrder />,
              errorElement: <Error />,
              handle: {
                crumb: () => <span>Редактиране на Поръчка</span>,
              },
            },
            {
              path: "print/:id",
              element: <PrintOrder />,
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
        // #endregion

        // #region Admin
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
                    crumb: () => (
                      <Link to="/admin/reports/priceList">Ценова Листа</Link>
                    ),
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
        // #endregion

        // #region Nomenclature
        // -- Nomenclature Home
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
            // -- Materials
            {
              path: "materials",
              element: <MaterialsPage />,
              errorElement: <Error />,
              handle: {
                crumb: () => <Link to="/nomenclature/materials">Стоки</Link>,
              },
            },
            // -- Vendors
            {
              path: "vendors",
              element: <VendorsPage />,
              errorElement: <Error />,
              handle: {
                crumb: () => <Link to="/nomenclature/vendors">Доставчици</Link>,
              },
            },
            // -- Clients
            {
              path: "clients",
              element: <ClientsPage />,
              errorElement: <Error />,
              handle: {
                crumb: () => <Link to="/nomenclature/clients">Клиенти</Link>,
              },
            },
            // -- Categories
            {
              path: "categories",
              element: <CategoriesIndex />,
              children: [
                {
                  index: true,
                  element: <CategoriesViewer />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/categories">Категории Стоки</Link>
                    ),
                  },
                },
                {
                  path: "create",
                  element: <CategoriesForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/categories/create">
                        Добавяне на категория
                      </Link>
                    ),
                  },
                },
                {
                  path: "update",
                  element: <CategoriesForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/categories/update">
                        Редактиране на Категория
                      </Link>
                    ),
                  },
                },
              ],
            },
            // -- Products
            {
              path: "products",
              element: <Products />,
              errorElement: <Error />,
              handle: {
                crumb: () => <Link to="/nomenclature/products">Продукти</Link>,
              },
              children: [
                {
                  index: true,
                  element: <ProductsPage />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/products">Всички</Link>
                    ),
                  },
                },
                {
                  path: "table",
                  element: <ProductsPage />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/products/table">Таблица</Link>
                    ),
                  },
                },
                {
                  path: "priceList",
                  element: <PriceList />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/products/priceList">
                        Ценова Листа
                      </Link>
                    ),
                  },
                },
              ],
            },
          ],
        },
        // #endregion

        // #region Recipes
        {
          path: "recipes",
          element: <RecipesHomePage />,
          handle: {
            crumb: () => <Link to="/recipes">Рецепти</Link>,
          },
        },
        // #endregion

        // #region Deliveries
        {
          path: "deliveries",
          element: <DeliveriesHome />,
          handle: {
            crumb: () => <Link to="/deliveries">Доставки</Link>,
          },
        },
        //#endregion

        // #region Login
        {
          path: "/login/",
          element: <LoginForm />,
        },
        // #endregion
        // {
        //   path:'/test',
        //   element: <OrderFormProvider/>
        // }
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
