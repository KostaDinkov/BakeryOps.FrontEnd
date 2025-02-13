import { useRecipesQuery } from "../../../API/Queries/queryHooks";
import GenericCrud2 from "../../../Components/GenericCRUD2/GenericCrud2";
import QueryViewWrapper from "../../../Components/QueryWrapper/QueryViewWrapper";
import TitleBar from "../../../Components/TitleBar/TitleBar";
import { RecipeDTO } from "../../../Types/types";

export default function RecipeViewerIndex() {
  const recipesQuery = useRecipesQuery();
  return (
    <>
      <TitleBar title="Рецепти" />
      <QueryViewWrapper<RecipeDTO> query={recipesQuery}>
        {(data) => {
          return (
            <GenericCrud2<RecipeDTO>
              items={data}
              viewConfig={[
                {name:{label:"Име"}},
                {description:{label:"Описание"}},
                {cost:{label:"Себестойност"}},
                {yield:{label:"Изходно количество"}},
                {workHours:{label:"Работни часове"}},
                {ingredients:{label:"Съставки", columnDef:[
                    {field:"materialName", headerName:"Материал"},
                    {field:"quantity", headerName:"Количество"},
                ]}},
                {subRecipes:{label:"Подрецепти", columnDef:[
                    {field:"subRecipeName", headerName:"Подрецепта"},
                    {field:"quantity", headerName:"Количество"},
                ]}},
              ]}
              actions={{
                delete: null,
                edit: null,
                add: null,
              }}
            />
          );
        }}
      </QueryViewWrapper>
    </>
  );
}
