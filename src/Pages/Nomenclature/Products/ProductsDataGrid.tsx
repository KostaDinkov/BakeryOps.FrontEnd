import { components } from "../../../API/apiSchema";

import { DataGridPremium, GridColDef, GridRowsProp, useGridApiRef, useKeepGroupedColumnsHidden } from "@mui/x-data-grid-premium";

type Product = components["schemas"]["Product"];

export default function ProductsDataGrid({products}: {products: Product[]}) {

  const apiRef = useGridApiRef();  
  const rows:GridRowsProp = 
    products?.map((product: Product) => {
      return {
        id: product.id,
        category: product.category,
        code: product.code,
        name: product.name,
        unit: product.unit,
        priceDrebno: product.priceDrebno,
        priceEdro: product.priceEdro,
        isActive: product.isActive,
        keepPriceDrebno: product.keepPriceDrebno,
        inPriceList: product.inPriceList,
      };
    })

  //const productsByCategory = getProductsByCategory(productsQuery.data);
  const cols:GridColDef[] = [
    {field: 'category', headerName: 'Категория', width: 150},
    {field: 'name', headerName: 'Име', width: 150},
    {field: 'code', headerName: 'Код', width: 150},
    {field: 'unit', headerName: 'Мярка', width: 150},
    {field: 'priceDrebno', headerName: 'Цена Дербно', width: 150},
    {field: 'priceEdro', headerName: 'Цена Едро', width: 150},
    {field: 'isActive', headerName: 'Активен', width: 150},
    {field: 'keepPriceDrebno', headerName: 'Запази цена дребно', width: 150},
    {field: 'inPriceList', headerName: 'В ценовия лист', width: 150},
  ]

 const initialState = useKeepGroupedColumnsHidden(
  {
    apiRef,
    initialState:{
      rowGrouping:
        { model:['category']}
    }
  }
 )

  return (
    <div>
       <DataGridPremium 
       rows={rows} 
       columns={cols} 
       apiRef={apiRef} 
       initialState={initialState}
       sx={{
        boxShadow: 2,
        border: 2,
        backgroundColor:"white",
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
      }}
       />
    </div>
  );
}
