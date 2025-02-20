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

import VendorsIndex from "../Pages/Nomenclature/Vendors";
import VendorsViewer from "../Pages/Nomenclature/Vendors/VendorsViewer";
import VendorsForm from "../Pages/Nomenclature/Vendors/VendorForm";

import ProductsIndex from "../Pages/Nomenclature/Products";
import ProductsViewer from "../Pages/Nomenclature/Products/ProductsViewer";
import ProductsForm from "../Pages/Nomenclature/Products/ProductsForm";

import CreateUpdateOrder from "../Pages/Orders/CreateUpdateOrder";
import CalendarView from "../Pages/Orders/CalendarView/CalendarView";

import CategoriesForm from "../Pages/Nomenclature/Categories/CategoriesForm";
import CategoriesViewer from "../Pages/Nomenclature/Categories/CategoriesViewer";
import CategoriesIndex from "../Pages/Nomenclature/Categories";

import ClientsIndex from "../Pages/Nomenclature/Clients";
import ClientsViewer from "../Pages/Nomenclature/Clients/ClientsViewer";
import ClientsForm from "../Pages/Nomenclature/Clients/ClientsForm";

import MaterialsIndex from "../Pages/Nomenclature/Materials/MaterialsIndex";
import MaterialsViewer from "../Pages/Nomenclature/Materials/MaterialsViewer/MaterialsViewerIndex";
import MaterialsForm from "../Pages/Nomenclature/Materials/MaterialsForm/MaterialsFormIndex";

import DeliveriesIndex from "../Pages/Deliveries/";
import DeliveriesForm from "../Pages/Deliveries/DeliveriesForm/DeliveriesFormIndex";
import DeliveriesViewer from "../Pages/Deliveries/DeliveriesViewer/DeliveriesViewerIndex";

import RecipesIndex from "../Pages/Recipes/RecipesIndex"
import RecipeViewerIndex from "../Pages/Recipes/RecipeViewer/RecipeViewerIndex";
import RecipeFormIndex from "../Pages/Recipes/RecipeForm/RecipeFormIndex";

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
              element: <MaterialsIndex />,
              errorElement: <Error />,
             
              children: [
                {
                  index: true,
                  element: <MaterialsViewer />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/materials">Стоки</Link>
                    ),
                  },
                },
                {
                  path: "create",
                  element: <MaterialsForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/materials/create">
                        Добавяне на стока
                      </Link>
                    ),
                  },
                },
                {
                  path: "update",
                  element: <MaterialsForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/materials/update">
                        Редактиране на стока
                      </Link>
                    ),
                  },
                },
              ],
            },
            // -- Vendors
            {
              path: "vendors",
              element: <VendorsIndex />,
              children: [
                {
                  index: true,
                  element: <VendorsViewer />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/vendors">Доставчици</Link>
                    ),
                  },
                },
                {
                  path: "create",
                  element: <VendorsForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/vendors/create">
                        Добавяне на доставчик
                      </Link>
                    ),
                  },
                },
                {
                  path: "update",
                  element: <VendorsForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/vendors/update">
                        Редактиране на доставчик
                      </Link>
                    ),
                  },
                },
              ],
            },
            // -- Clients
            {
              path: "clients",
              element: <ClientsIndex />,
              children: [
                {
                  index: true,
                  element: <ClientsViewer />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/clients">Клиенти</Link>
                    ),
                  },
                },
                {
                  path: "create",
                  element: <ClientsForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/clients/create">
                        Добавяне на клиент
                      </Link>
                    ),
                  },
                },
                {
                  path: "update",
                  element: <ClientsForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/clients/update">
                        Редактиране на клиент
                      </Link>
                    ),
                  },
                },
              ],
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
              element: <ProductsIndex />,
              errorElement: <Error />,

              children: [
                {
                  index: true,
                  element: <ProductsViewer />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/products">Продукти</Link>
                    ),
                  },
                },
                {
                  path: "update",
                  element: <ProductsForm />,
                  errorElement: <Error />,
                  handle: {
                    crumb: () => (
                      <Link to="/nomenclature/products/update">
                        Редактиране
                      </Link>
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
          element: <RecipesIndex/>,
          
          children:[
            {
              index:true,
              element:<RecipeViewerIndex/>,
              errorElement:<Error/>,
              handle:{
                crumb:()=><Link to="/recipes">Преглед</Link>
              }
            },
            {
              path:"create",
              element:<RecipeFormIndex/>,
              errorElement:<Error/>,
              handle:{
                crumb:()=><Link to="/recipes/create">Добавяне</Link>
              }
            },
            {
              path:"update",
              element:<RecipeFormIndex/>,
              errorElement:<Error/>,
              handle:{
                crumb:()=><Link to="/recipes/update">Редактиране</Link>
              }
            }

          ]
        },
        // #endregion

        // #region Deliveries
        {
          path: "deliveries",
          element: <DeliveriesIndex />,
          handle: {
            crumb: () => <Link to="/deliveries">Доставки</Link>,
          },
          children:[
            {
              index:true,
              element:<DeliveriesViewer/>,
              errorElement:<Error/>,
              handle:{
                crumb:()=><Link to="/deliveries">Преглед</Link>
              }
            },
            {
              path:"create",
              element:<DeliveriesForm/>,
              errorElement:<Error/>,
              handle:{
                crumb:()=><Link to="/deliveries/create">Добавяне</Link>
              }
            },
            {
              path:"update",
              element:<DeliveriesForm/>,
              errorElement:<Error/>,
              handle:{
                crumb:()=><Link to="/deliveries/update">Редактиране</Link>
              }
            }
          ]
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
