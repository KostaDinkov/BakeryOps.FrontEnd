import React from "react";
import GenericCRUDView, { IItemOperations, ItemFormType } from "./GenericCRUD";
import z from "zod";
import { handleApiResponse } from "../../API/apiUtils";

type ExampleItem = {
  id?: string;
  name: string;
};

export default function CrudTemplate() {
  //Todo: Implement item schema. See the example below
  const exampleItemSchema: z.ZodSchema<ExampleItem> = z.object({
    id: z.string().uuid().default("00000000-0000-0000-0000-000000000000"),
    name: z.string().min(3).max(50),
  });

  //Todo: Implement item operations. See the example below

  /**
   * React functional component for creating and updating crud items
   * @param selectedItem  provided when the form is being used for updating and item. If not null, the form should be populated with the selectedItem data
   * @param { (item: object): void;} handleSave call this function inside handleSubmit with the object constructed from the form data
   * @param Buttons the 'Save' and 'Cancel' buttons provided by the GenericCRUDView component
   * @param queryData optional data that can be used in the form
   * @returns
   */
  function ItemForm({
    selectedItem,
    handleSave,
    Buttons,
    queryData,
  }: {
    selectedItem: ExampleItem | null;
    handleSave: (item: object) => void;
    Buttons: React.FC;
    queryData?: object;
  }) {
    //Todo: Implement form submit handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //Todo: Call handleSave with the object constructed from the form data
      handleSave({});
    };

    return (
      <form onSubmit={handleSubmit}>
        {/* Todo: implement form inputs  */}
        <Buttons />
      </form>
    );
  }

  /**
   * React functional component for listing crud items
   * @param data the list of items to be displayed
   * @param setSelectedItem function to set the selected item
   * @returns
   */
  function ItemsList({
    data,
    setSelectedItem,
  }: {
    data: ExampleItem[];
    setSelectedItem: React.Dispatch<ExampleItem | null>;
  }) {
    //Todo: implement the proper view for the list items
    //Todo: for each item implement onClick event that calls setSelectedItem with the item

    return(
    <>
    </>)
  }

    /**
     * React functional component for displaying the details of a selected item
     * @param selectedItem the selected item
     * @param queryData optional data that can be used in the details view
     * @returns
     */
    function ItemDetails({ selectedItem, queryData }: { selectedItem: ExampleItem | null, queryData?: object }) {

        return(
            <>
            </>
        )
    }
    //Todo:Implement item operations. See the example below
    const itemOperations: IItemOperations<ExampleItem> = {
        queryKey: ["enter query key here"],
        getItems: async () =>  handleApiResponse (async ()=>{}/* TODO: make the appropriate apiClient request*/),
        createItem: async (item: ExampleItem) => handleApiResponse (async ()=>{}/* TODO: make the appropriate apiClient request*/),
        updateItem: async (item: ExampleItem) => handleApiResponse (async ()=>{}/* TODO: make the appropriate apiClient request*/),
        deleteItem: async (id: string) => handleApiResponse (async ()=>{}/* TODO: make the appropriate apiClient request*/),
    }

  // Todo: change 'title' and 'newBtnText' strings as fit
  return (
    <GenericCRUDView
      title={"Enter Name Of The Page"}
      ItemForm={ItemForm}
      ItemsList={ItemsList}
      ItemDetails={ItemDetails}
      itemSchema={exampleItemSchema}
      itemOperations={itemOperations}
      newBtnText={"Enter name of the button"}
    />
  );
}
