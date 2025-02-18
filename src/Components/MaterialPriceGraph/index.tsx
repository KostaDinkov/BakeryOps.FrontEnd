import { useMaterialsPriceHistory } from "../../API/Queries/queryHooks";
import { Box, CircularProgress } from "@mui/material";
import MaterialPriceGraph from "./MaterialPriceGraph";
import { MaterialDTO } from "../../Types/types";

export default function MaterialPriceGraphDataProvider({selectedItem}: {selectedItem: MaterialDTO}) {

    if(!selectedItem){
        return <Box>No material selected</Box>
    }
    const materialPriceHistoryQuery = useMaterialsPriceHistory(selectedItem.id);

    if(materialPriceHistoryQuery.isLoading){
        return <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    }
    if(materialPriceHistoryQuery.isError){
        return <Box>Error loading material price history</Box>
    }
  return (
    <>
     <MaterialPriceGraph priceHistory={materialPriceHistoryQuery.data} /> 
    </>
  )
}
