import { Link, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginForm from "../Components/LoginForm/LoginForm";
import PriceList, {
  loader as PriceListLoader,
} from "../Components/PriceList/PriceList";
import ReportsPage from "../Components/ReportsPage/ReportsPage";
import AdminHomePage from "../Modules/Administration/AdminHomePage";
import UserForm from "../Modules/Administration/Users/UserForm";
import UsersHomePage, {
  usersLoader,
} from "../Modules/Administration/Users/UsersHomePage";
import Home from "../Modules/Home/Home";
import ColumnView, {
  loader as ordersLoader,
} from "../Modules/Orders/ColumnView/ColumnView";
import DayView, { DayViewLoader } from "../Modules/Orders/DayView/DayView";
import OrderForm, {
  orderFormLoader,
} from "../Modules/Orders/OrderForm/OrderForm";
import OrdersHome from "../Modules/Orders/OrdersHome/OrdersHome";
import PrintOrderView, {
  loader as PrintOrderViewLoader,
} from "../Modules/Orders/PrintOrderView/PrintOrderView";
import Error from "../Components/Error";
export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        element: <OrdersHome />,
        path: "/orders/",
        handle:{
            crumb:()=><Link to="/orders">Поръчки</Link>
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

      {
        path: "/login/",
        element: <LoginForm />,
      },
      {
        path: "/admin/",
        handle:{
            crumb:()=><Link to="/admin">Администрация</Link>
        },
        children: [
          {
            index: true,
            element: <AdminHomePage />,
          },

          {
            path: "users/",
            handle:{
                crumb:()=><Link to="/admin/users">Потребители</Link>
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

      {
        path: "/reports/",
        element: <ReportsPage />,
        children: [
          {
            path: "/reports/priceList/",
            element: <PriceList />,
            loader: PriceListLoader,
          },
        ],
      },
    ],
  },
]);