import { z } from "zod";

export type CategoryDTO = z.infer<typeof CategoryDTO>;
export const CategoryDTO = z.object({
  id: z.string(),
  name: z.string(),
});

export type ClientDTO = z.infer<typeof ClientDTO>;
export const ClientDTO = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.string(),
  phone: z.union([z.string(), z.null(), z.undefined()]).optional(),
  email: z.union([z.string(), z.null(), z.undefined()]).optional(),
  hasDiscount: z.union([z.boolean(), z.undefined()]).optional(),
  isCompany: z.union([z.boolean(), z.undefined()]).optional(),
  isSpecialPrice: z.union([z.boolean(), z.undefined()]).optional(),
});

export type DeliveryItemDto = z.infer<typeof DeliveryItemDto>;
export const DeliveryItemDto = z.object({
  id: z.string().optional(),
  materialId: z.string().optional(),
  materialName: z.union([z.string(), z.null()]).optional(),
  materialUnit: z.union([z.string(), z.null()]).optional(),
  quantity: z.number().optional(),
  unitPrice: z.union([z.number(), z.null()]).optional(),
  vat: z.number().optional(),
  expirationDate: z.union([z.string(), z.null()]).optional(),
  lotNumber: z.union([z.string(), z.null()]).optional(),
  notes: z.union([z.string(), z.null()]).optional(),
});

export type DeliveryDto = z.infer<typeof DeliveryDto>;
export const DeliveryDto = z.object({
  id: z.string().optional(),
  deliveryDate: z.string().optional(),
  vendorId: z.string().optional(),
  vendorName: z.union([z.string(), z.null()]).optional(),
  items: z.array(DeliveryItemDto).optional(),
  invoiceNumber: z.union([z.string(), z.null()]).optional(),
  notes: z.union([z.string(), z.null()]).optional(),
  total: z.number().optional(),
  tax: z.number().optional(),
  totalWithTax: z.number().optional(),
});

export type MaterialDto = z.infer<typeof MaterialDto>;
export const MaterialDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.union([z.string(), z.null(), z.undefined()]).optional(),
  unitId: z.union([z.string(), z.null(), z.undefined()]).optional(),
  unitName: z.union([z.string(), z.null(), z.undefined()]).optional(),
  latestPrice: z.union([z.number(), z.null(), z.undefined()]).optional(),
  categoryId: z.union([z.string(), z.null(), z.undefined()]).optional(),
  categoryName: z.union([z.string(), z.null(), z.undefined()]).optional(),
  vendorId: z.union([z.string(), z.null(), z.undefined()]).optional(),
  vendorName: z.union([z.string(), z.null(), z.undefined()]).optional(),
});

export type MaterialPriceDto = z.infer<typeof MaterialPriceDto>;
export const MaterialPriceDto = z.object({
  id: z.string().optional(),
  price: z.number().optional(),
  date: z.string().optional(),
});

export type MaterialPriceHistoryDto = z.infer<typeof MaterialPriceHistoryDto>;
export const MaterialPriceHistoryDto = z.object({
  materialId: z.string().optional(),
  materialName: z.string().optional(),
  priceHistory: z.array(MaterialPriceDto).optional(),
});

export type NewUserDTO = z.infer<typeof NewUserDTO>;
export const NewUserDTO = z.object({
  id: z.union([z.string(), z.null(), z.undefined()]).optional(),
  firstName: z.union([z.string(), z.undefined()]).optional(),
  lastName: z.union([z.string(), z.undefined()]).optional(),
  userName: z.union([z.string(), z.undefined()]).optional(),
  permissions: z.union([z.array(z.string()), z.undefined()]).optional(),
  password: z.string(),
});

export type Status = z.infer<typeof Status>;
export const Status = z.union([z.literal(0), z.literal(1), z.literal(2)]);

export type OrderItemDTO = z.infer<typeof OrderItemDTO>;
export const OrderItemDTO = z.object({
  id: z.number().optional(),
  productId: z.string().optional(),
  productName: z.union([z.string(), z.null()]).optional(),
  productAmount: z.number().optional(),
  description: z.union([z.string(), z.null()]).optional(),
  cakeFoto: z.union([z.string(), z.null()]).optional(),
  cakeTitle: z.union([z.string(), z.null()]).optional(),
  itemUnitPrice: z.number().optional(),
  itemTotalPrice: z.number().optional(),
  isInProgress: z.boolean().optional(),
  isComplete: z.boolean().optional(),
});

export type OrderDTO = z.infer<typeof OrderDTO>;
export const OrderDTO = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  operatorId: z.union([z.number(), z.null(), z.undefined()]).optional(),
  createdDate: z.union([z.string(), z.undefined()]).optional(),
  pickupDate: z.string(),
  clientName: z.string(),
  clientPhone: z.union([z.string(), z.null(), z.undefined()]).optional(),
  clientId: z.union([z.string(), z.null(), z.undefined()]).optional(),
  isPaid: z.boolean(),
  advancePaiment: z.number(),
  totalPrice: z.number(),
  status: Status,
  orderItems: z.union([z.array(OrderItemDTO), z.undefined()]).optional(),
});

export type Product = z.infer<typeof Product>;
export const Product = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.string(),
  category: z.string(),
  priceDrebno: z.number(),
  priceEdro: z.number(),
  hasDiscount: z.union([z.boolean(), z.undefined()]).optional(),
  keepPriceDrebno: z.union([z.boolean(), z.undefined()]).optional(),
  inPriceList: z.union([z.boolean(), z.undefined()]).optional(),
  unit: z.string(),
  code: z.union([z.string(), z.null(), z.undefined()]).optional(),
  isActive: z.union([z.boolean(), z.undefined()]).optional(),
  dateCreated: z.union([z.string(), z.undefined()]).optional(),
});

export type RecipeMaterialDto = z.infer<typeof RecipeMaterialDto>;
export const RecipeMaterialDto = z.object({
  id: z.string().optional(),
  materialId: z.string().optional(),
  materialName: z.union([z.string(), z.null()]).optional(),
  quantity: z.number().optional(),
});

export type SubRecipeDto = z.infer<typeof SubRecipeDto>;
export const SubRecipeDto = z.object({
  id: z.string().optional(),
  subRecipeId: z.string().optional(),
  subRecipeName: z.union([z.string(), z.null()]).optional(),
  quantity: z.number().optional(),
});

export type RecipeDto = z.infer<typeof RecipeDto>;
export const RecipeDto = z.object({
  createdOn: z.union([z.string(), z.undefined()]).optional(),
  updatedOn: z.union([z.string(), z.null(), z.undefined()]).optional(),
  createdBy: z.union([z.string(), z.null(), z.undefined()]).optional(),
  updatedBy: z.union([z.string(), z.null(), z.undefined()]).optional(),
  id: z.string(),
  name: z.union([z.string(), z.null(), z.undefined()]).optional(),
  productId: z.union([z.string(), z.null(), z.undefined()]).optional(),
  description: z.union([z.string(), z.null(), z.undefined()]).optional(),
  ingredients: z.union([z.array(RecipeMaterialDto), z.undefined()]).optional(),
  subRecipes: z.union([z.array(SubRecipeDto), z.undefined()]).optional(),
  workHours: z.union([z.number(), z.undefined()]).optional(),
  yield: z.union([z.number(), z.undefined()]).optional(),
  unitId: z.union([z.string(), z.undefined()]).optional(),
  cost: z.union([z.number(), z.undefined()]).optional(),
});

export type Unit = z.infer<typeof Unit>;
export const Unit = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type UserCredentialsDTO = z.infer<typeof UserCredentialsDTO>;
export const UserCredentialsDTO = z.object({
  userName: z.string().optional(),
  password: z.string().optional(),
});

export type VendorDTO = z.infer<typeof VendorDTO>;
export const VendorDTO = z.object({
  id: z.union([z.string(), z.undefined()]).optional(),
  name: z.string(),
  address: z.union([z.string(), z.null(), z.undefined()]).optional(),
  phoneNumber: z.union([z.string(), z.null(), z.undefined()]).optional(),
  email: z.union([z.string(), z.null(), z.undefined()]).optional(),
  description: z.union([z.string(), z.null(), z.undefined()]).optional(),
});

export type get_ApiCategoriesGetCategories = typeof get_ApiCategoriesGetCategories;
export const get_ApiCategoriesGetCategories = {
  method: z.literal("GET"),
  path: z.literal("/api/Categories/GetCategories"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiCategoriesGetCategoryId = typeof get_ApiCategoriesGetCategoryId;
export const get_ApiCategoriesGetCategoryId = {
  method: z.literal("GET"),
  path: z.literal("/api/Categories/GetCategory/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_ApiCategoriesAddCategory = typeof post_ApiCategoriesAddCategory;
export const post_ApiCategoriesAddCategory = {
  method: z.literal("POST"),
  path: z.literal("/api/Categories/AddCategory"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CategoryDTO,
  }),
  response: z.unknown(),
};

export type put_ApiCategoriesUpdateCategory = typeof put_ApiCategoriesUpdateCategory;
export const put_ApiCategoriesUpdateCategory = {
  method: z.literal("PUT"),
  path: z.literal("/api/Categories/UpdateCategory"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: CategoryDTO,
  }),
  response: z.unknown(),
};

export type delete_ApiCategoriesDeleteCategoryId = typeof delete_ApiCategoriesDeleteCategoryId;
export const delete_ApiCategoriesDeleteCategoryId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Categories/DeleteCategory/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiClients = typeof get_ApiClients;
export const get_ApiClients = {
  method: z.literal("GET"),
  path: z.literal("/api/Clients"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type post_ApiClients = typeof post_ApiClients;
export const post_ApiClients = {
  method: z.literal("POST"),
  path: z.literal("/api/Clients"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: ClientDTO,
  }),
  response: z.unknown(),
};

export type put_ApiClients = typeof put_ApiClients;
export const put_ApiClients = {
  method: z.literal("PUT"),
  path: z.literal("/api/Clients"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: ClientDTO,
  }),
  response: z.unknown(),
};

export type get_ApiClientsId = typeof get_ApiClientsId;
export const get_ApiClientsId = {
  method: z.literal("GET"),
  path: z.literal("/api/Clients/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type delete_ApiClientsId = typeof delete_ApiClientsId;
export const delete_ApiClientsId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Clients/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiDeliveriesGetAll = typeof get_ApiDeliveriesGetAll;
export const get_ApiDeliveriesGetAll = {
  method: z.literal("GET"),
  path: z.literal("/api/Deliveries/GetAll"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      page: z.number().optional(),
      pageSize: z.number().optional(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiDeliveriesGetByIdId = typeof get_ApiDeliveriesGetByIdId;
export const get_ApiDeliveriesGetByIdId = {
  method: z.literal("GET"),
  path: z.literal("/api/Deliveries/GetById/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_ApiDeliveriesCreate = typeof post_ApiDeliveriesCreate;
export const post_ApiDeliveriesCreate = {
  method: z.literal("POST"),
  path: z.literal("/api/Deliveries/Create"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeliveryDto,
  }),
  response: z.unknown(),
};

export type put_ApiDeliveriesUpdate = typeof put_ApiDeliveriesUpdate;
export const put_ApiDeliveriesUpdate = {
  method: z.literal("PUT"),
  path: z.literal("/api/Deliveries/Update"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: DeliveryDto,
  }),
  response: z.unknown(),
};

export type delete_ApiDeliveriesDeleteId = typeof delete_ApiDeliveriesDeleteId;
export const delete_ApiDeliveriesDeleteId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Deliveries/Delete/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiMaterialsGetMaterials = typeof get_ApiMaterialsGetMaterials;
export const get_ApiMaterialsGetMaterials = {
  method: z.literal("GET"),
  path: z.literal("/api/Materials/GetMaterials"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiMaterialsGetMaterialId = typeof get_ApiMaterialsGetMaterialId;
export const get_ApiMaterialsGetMaterialId = {
  method: z.literal("GET"),
  path: z.literal("/api/Materials/GetMaterial/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiMaterialsGetMaterialPriceHistoryId = typeof get_ApiMaterialsGetMaterialPriceHistoryId;
export const get_ApiMaterialsGetMaterialPriceHistoryId = {
  method: z.literal("GET"),
  path: z.literal("/api/Materials/GetMaterialPriceHistory/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: MaterialPriceHistoryDto,
};

export type post_ApiMaterialsAddMaterial = typeof post_ApiMaterialsAddMaterial;
export const post_ApiMaterialsAddMaterial = {
  method: z.literal("POST"),
  path: z.literal("/api/Materials/AddMaterial"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: MaterialDto,
  }),
  response: z.unknown(),
};

export type put_ApiMaterialsUpdateMaterial = typeof put_ApiMaterialsUpdateMaterial;
export const put_ApiMaterialsUpdateMaterial = {
  method: z.literal("PUT"),
  path: z.literal("/api/Materials/UpdateMaterial"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: MaterialDto,
  }),
  response: z.unknown(),
};

export type delete_ApiMaterialsDeleteMaterialId = typeof delete_ApiMaterialsDeleteMaterialId;
export const delete_ApiMaterialsDeleteMaterialId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Materials/DeleteMaterial/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiOrdersGetOrderId = typeof get_ApiOrdersGetOrderId;
export const get_ApiOrdersGetOrderId = {
  method: z.literal("GET"),
  path: z.literal("/api/Orders/GetOrder/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiOrdersGetOrdersBetween = typeof get_ApiOrdersGetOrdersBetween;
export const get_ApiOrdersGetOrdersBetween = {
  method: z.literal("GET"),
  path: z.literal("/api/Orders/GetOrdersBetween"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    query: z.object({
      startDate: z.string(),
      endDate: z.union([z.string(), z.undefined()]),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiOrdersGetOrders = typeof get_ApiOrdersGetOrders;
export const get_ApiOrdersGetOrders = {
  method: z.literal("GET"),
  path: z.literal("/api/Orders/GetOrders"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type post_ApiOrdersCreateOrder = typeof post_ApiOrdersCreateOrder;
export const post_ApiOrdersCreateOrder = {
  method: z.literal("POST"),
  path: z.literal("/api/Orders/CreateOrder"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: OrderDTO,
  }),
  response: z.unknown(),
};

export type put_ApiOrdersUpdateOrder = typeof put_ApiOrdersUpdateOrder;
export const put_ApiOrdersUpdateOrder = {
  method: z.literal("PUT"),
  path: z.literal("/api/Orders/UpdateOrder"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: OrderDTO,
  }),
  response: z.unknown(),
};

export type delete_ApiOrdersDeleteOrderId = typeof delete_ApiOrdersDeleteOrderId;
export const delete_ApiOrdersDeleteOrderId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Orders/DeleteOrder/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiProductsGetAllProducts = typeof get_ApiProductsGetAllProducts;
export const get_ApiProductsGetAllProducts = {
  method: z.literal("GET"),
  path: z.literal("/api/Products/GetAllProducts"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiProductsGetProductId = typeof get_ApiProductsGetProductId;
export const get_ApiProductsGetProductId = {
  method: z.literal("GET"),
  path: z.literal("/api/Products/GetProduct/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: Product,
};

export type put_ApiProductsUpdateProductId = typeof put_ApiProductsUpdateProductId;
export const put_ApiProductsUpdateProductId = {
  method: z.literal("PUT"),
  path: z.literal("/api/Products/UpdateProduct/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
    body: Product,
  }),
  response: z.unknown(),
};

export type get_ApiProductsSyncDatabasesyncDatabase = typeof get_ApiProductsSyncDatabasesyncDatabase;
export const get_ApiProductsSyncDatabasesyncDatabase = {
  method: z.literal("GET"),
  path: z.literal("/api/Products/SyncDatabase/syncDatabase"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiRecipesGetRecipes = typeof get_ApiRecipesGetRecipes;
export const get_ApiRecipesGetRecipes = {
  method: z.literal("GET"),
  path: z.literal("/api/Recipes/GetRecipes"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiRecipesGetRecipeId = typeof get_ApiRecipesGetRecipeId;
export const get_ApiRecipesGetRecipeId = {
  method: z.literal("GET"),
  path: z.literal("/api/Recipes/GetRecipe/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_ApiRecipesAddRecipe = typeof post_ApiRecipesAddRecipe;
export const post_ApiRecipesAddRecipe = {
  method: z.literal("POST"),
  path: z.literal("/api/Recipes/AddRecipe"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RecipeDto,
  }),
  response: z.unknown(),
};

export type put_ApiRecipesUpdateRecipe = typeof put_ApiRecipesUpdateRecipe;
export const put_ApiRecipesUpdateRecipe = {
  method: z.literal("PUT"),
  path: z.literal("/api/Recipes/UpdateRecipe"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: RecipeDto,
  }),
  response: z.unknown(),
};

export type delete_ApiRecipesDeleteRecipeId = typeof delete_ApiRecipesDeleteRecipeId;
export const delete_ApiRecipesDeleteRecipeId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Recipes/DeleteRecipe/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_ApiSecurityGetToken = typeof post_ApiSecurityGetToken;
export const post_ApiSecurityGetToken = {
  method: z.literal("POST"),
  path: z.literal("/api/Security/GetToken"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: UserCredentialsDTO,
  }),
  response: z.unknown(),
};

export type get_ApiSecurityGetPermissions = typeof get_ApiSecurityGetPermissions;
export const get_ApiSecurityGetPermissions = {
  method: z.literal("GET"),
  path: z.literal("/api/Security/GetPermissions"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiUnitsGetUnits = typeof get_ApiUnitsGetUnits;
export const get_ApiUnitsGetUnits = {
  method: z.literal("GET"),
  path: z.literal("/api/Units/GetUnits"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type post_ApiUnitsAddUnit = typeof post_ApiUnitsAddUnit;
export const post_ApiUnitsAddUnit = {
  method: z.literal("POST"),
  path: z.literal("/api/Units/AddUnit"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: Unit,
  }),
  response: z.unknown(),
};

export type get_ApiUsersGetUsers = typeof get_ApiUsersGetUsers;
export const get_ApiUsersGetUsers = {
  method: z.literal("GET"),
  path: z.literal("/api/Users/GetUsers"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiUsersGetUserByUsernameUserName = typeof get_ApiUsersGetUserByUsernameUserName;
export const get_ApiUsersGetUserByUsernameUserName = {
  method: z.literal("GET"),
  path: z.literal("/api/Users/GetUserByUsername/{userName}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      userName: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiUsersGetUserByIdUserId = typeof get_ApiUsersGetUserByIdUserId;
export const get_ApiUsersGetUserByIdUserId = {
  method: z.literal("GET"),
  path: z.literal("/api/Users/GetUserById/{userId}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      userId: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_ApiUsersAddUser = typeof post_ApiUsersAddUser;
export const post_ApiUsersAddUser = {
  method: z.literal("POST"),
  path: z.literal("/api/Users/AddUser"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: NewUserDTO,
  }),
  response: z.unknown(),
};

export type put_ApiUsersUpdateUser = typeof put_ApiUsersUpdateUser;
export const put_ApiUsersUpdateUser = {
  method: z.literal("PUT"),
  path: z.literal("/api/Users/UpdateUser"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: NewUserDTO,
  }),
  response: z.unknown(),
};

export type delete_ApiUsersDeleteUserId = typeof delete_ApiUsersDeleteUserId;
export const delete_ApiUsersDeleteUserId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Users/DeleteUser/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type get_ApiVendorsGetVendors = typeof get_ApiVendorsGetVendors;
export const get_ApiVendorsGetVendors = {
  method: z.literal("GET"),
  path: z.literal("/api/Vendors/GetVendors"),
  requestFormat: z.literal("json"),
  parameters: z.never(),
  response: z.unknown(),
};

export type get_ApiVendorsGetVendorId = typeof get_ApiVendorsGetVendorId;
export const get_ApiVendorsGetVendorId = {
  method: z.literal("GET"),
  path: z.literal("/api/Vendors/GetVendor/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

export type post_ApiVendorsAddVendor = typeof post_ApiVendorsAddVendor;
export const post_ApiVendorsAddVendor = {
  method: z.literal("POST"),
  path: z.literal("/api/Vendors/AddVendor"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: VendorDTO,
  }),
  response: z.unknown(),
};

export type put_ApiVendorsUpdateVendor = typeof put_ApiVendorsUpdateVendor;
export const put_ApiVendorsUpdateVendor = {
  method: z.literal("PUT"),
  path: z.literal("/api/Vendors/UpdateVendor"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    body: VendorDTO,
  }),
  response: z.unknown(),
};

export type delete_ApiVendorsDeleteVendorId = typeof delete_ApiVendorsDeleteVendorId;
export const delete_ApiVendorsDeleteVendorId = {
  method: z.literal("DELETE"),
  path: z.literal("/api/Vendors/DeleteVendor/{id}"),
  requestFormat: z.literal("json"),
  parameters: z.object({
    path: z.object({
      id: z.string(),
    }),
  }),
  response: z.unknown(),
};

// <EndpointByMethod>
export const EndpointByMethod = {
  get: {
    "/api/Categories/GetCategories": get_ApiCategoriesGetCategories,
    "/api/Categories/GetCategory/{id}": get_ApiCategoriesGetCategoryId,
    "/api/Clients": get_ApiClients,
    "/api/Clients/{id}": get_ApiClientsId,
    "/api/Deliveries/GetAll": get_ApiDeliveriesGetAll,
    "/api/Deliveries/GetById/{id}": get_ApiDeliveriesGetByIdId,
    "/api/Materials/GetMaterials": get_ApiMaterialsGetMaterials,
    "/api/Materials/GetMaterial/{id}": get_ApiMaterialsGetMaterialId,
    "/api/Materials/GetMaterialPriceHistory/{id}": get_ApiMaterialsGetMaterialPriceHistoryId,
    "/api/Orders/GetOrder/{id}": get_ApiOrdersGetOrderId,
    "/api/Orders/GetOrdersBetween": get_ApiOrdersGetOrdersBetween,
    "/api/Orders/GetOrders": get_ApiOrdersGetOrders,
    "/api/Products/GetAllProducts": get_ApiProductsGetAllProducts,
    "/api/Products/GetProduct/{id}": get_ApiProductsGetProductId,
    "/api/Products/SyncDatabase/syncDatabase": get_ApiProductsSyncDatabasesyncDatabase,
    "/api/Recipes/GetRecipes": get_ApiRecipesGetRecipes,
    "/api/Recipes/GetRecipe/{id}": get_ApiRecipesGetRecipeId,
    "/api/Security/GetPermissions": get_ApiSecurityGetPermissions,
    "/api/Units/GetUnits": get_ApiUnitsGetUnits,
    "/api/Users/GetUsers": get_ApiUsersGetUsers,
    "/api/Users/GetUserByUsername/{userName}": get_ApiUsersGetUserByUsernameUserName,
    "/api/Users/GetUserById/{userId}": get_ApiUsersGetUserByIdUserId,
    "/api/Vendors/GetVendors": get_ApiVendorsGetVendors,
    "/api/Vendors/GetVendor/{id}": get_ApiVendorsGetVendorId,
  },
  post: {
    "/api/Categories/AddCategory": post_ApiCategoriesAddCategory,
    "/api/Clients": post_ApiClients,
    "/api/Deliveries/Create": post_ApiDeliveriesCreate,
    "/api/Materials/AddMaterial": post_ApiMaterialsAddMaterial,
    "/api/Orders/CreateOrder": post_ApiOrdersCreateOrder,
    "/api/Recipes/AddRecipe": post_ApiRecipesAddRecipe,
    "/api/Security/GetToken": post_ApiSecurityGetToken,
    "/api/Units/AddUnit": post_ApiUnitsAddUnit,
    "/api/Users/AddUser": post_ApiUsersAddUser,
    "/api/Vendors/AddVendor": post_ApiVendorsAddVendor,
  },
  put: {
    "/api/Categories/UpdateCategory": put_ApiCategoriesUpdateCategory,
    "/api/Clients": put_ApiClients,
    "/api/Deliveries/Update": put_ApiDeliveriesUpdate,
    "/api/Materials/UpdateMaterial": put_ApiMaterialsUpdateMaterial,
    "/api/Orders/UpdateOrder": put_ApiOrdersUpdateOrder,
    "/api/Products/UpdateProduct/{id}": put_ApiProductsUpdateProductId,
    "/api/Recipes/UpdateRecipe": put_ApiRecipesUpdateRecipe,
    "/api/Users/UpdateUser": put_ApiUsersUpdateUser,
    "/api/Vendors/UpdateVendor": put_ApiVendorsUpdateVendor,
  },
  delete: {
    "/api/Categories/DeleteCategory/{id}": delete_ApiCategoriesDeleteCategoryId,
    "/api/Clients/{id}": delete_ApiClientsId,
    "/api/Deliveries/Delete/{id}": delete_ApiDeliveriesDeleteId,
    "/api/Materials/DeleteMaterial/{id}": delete_ApiMaterialsDeleteMaterialId,
    "/api/Orders/DeleteOrder/{id}": delete_ApiOrdersDeleteOrderId,
    "/api/Recipes/DeleteRecipe/{id}": delete_ApiRecipesDeleteRecipeId,
    "/api/Users/DeleteUser/{id}": delete_ApiUsersDeleteUserId,
    "/api/Vendors/DeleteVendor/{id}": delete_ApiVendorsDeleteVendorId,
  },
};
export type EndpointByMethod = typeof EndpointByMethod;
// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod["get"];
export type PostEndpoints = EndpointByMethod["post"];
export type PutEndpoints = EndpointByMethod["put"];
export type DeleteEndpoints = EndpointByMethod["delete"];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | MutationMethod;

type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  requestFormat: RequestFormat;
  parameters?: TConfig["parameters"];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig["response"];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined,
) => Promise<Endpoint["response"]>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = "";

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("get", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.get>

  // <ApiClient.post>
  post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("post", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.post>

  // <ApiClient.put>
  put<Path extends keyof PutEndpoints, TEndpoint extends PutEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("put", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.put>

  // <ApiClient.delete>
  delete<Path extends keyof DeleteEndpoints, TEndpoint extends DeleteEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<z.infer<TEndpoint["parameters"]>>
  ): Promise<z.infer<TEndpoint["response"]>> {
    return this.fetcher("delete", this.baseUrl + path, params[0]) as Promise<z.infer<TEndpoint["response"]>>;
  }
  // </ApiClient.delete>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? "");
}

/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/

// </ApiClient
