
import { useState } from "react";
import { Button } from "@mui/material";
import ConfirmationDialog from "../../../Components/ConfirmationDialog/ConfirmationDialog";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export interface IItemOperations<TItem> {
  queryKey: string[];
  getItems: () => Promise<TItem[]>;
  createItem: (item: TItem) => Promise<TItem>;
  updateItem: (item: TItem) => Promise<TItem>;
  deleteItem: (id: string | number) => Promise<void>;
}

export default function GenericCRUDView<TItem>({
  title,
  ItemFormFields,
  ItemsList,
  ItemDetails,
  itemSchema,
  itemOperations,
}: {
  title: string;
  ItemFormFields: React.FC<{ selectedItem: TItem | null }>;
  ItemsList: React.FC<{
    setSelectedItem: React.Dispatch<TItem | null>;
    data: any;
  }>;
  ItemDetails: React.FC<{ selectedItem: TItem | null }>;
  itemSchema: z.ZodSchema<TItem>;
  itemOperations: IItemOperations<TItem>;
}) {
  type IId = TItem & { id: string | number };

  const [mode, setMode] = useState<"viewItem" | "updateItem" | "createItem">(
    "viewItem"
  );
  const [deleteItemDialogOpen, setDeleteItemDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const queryClient = useQueryClient();

  const itemsQuery = useQuery({
    queryKey: itemOperations.queryKey,
    queryFn: itemOperations.getItems,
  });

  const createItemMutation = useMutation({
    mutationFn: itemOperations.createItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
  });
  const updateItemMutation = useMutation({
    mutationFn: itemOperations.updateItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
  });
  const deleteItemMutation = useMutation({
    mutationFn: itemOperations.deleteItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
  });

  function GenericForm({ children }: { children: React.ReactNode }) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const parsedResult = itemSchema.safeParse(formData);

      if (parsedResult.success) {
        const item = parsedResult.data as IId;

        if (mode === "createItem") {
          try {
            const data = await createItemMutation.mutateAsync(item);
            console.log(data);
          } catch (e) {
            console.log("Error creating item", e);
          }
        } else if (mode === "updateItem") {
          item.id = (selectedItem as IId).id;

          const data = await updateItemMutation.mutateAsync(item);
          console.log(data);
        }
        setMode("viewItem");
        setSelectedItem(null);
      } else {
        console.log(parsedResult.error.errors);
      }
    };

    return <form onSubmit={handleSubmit}>{children}</form>;
  }

  return (
    <div className="verticalMenu">
      <h1>{title}</h1>
      <div className={"twoColumnView"}>
        <div className="allMaterials">
          {itemsQuery.isLoading && <div>Loading...</div>}
          {itemsQuery.isError && <div>{itemsQuery.error.message}</div>}
          {itemsQuery.isSuccess && (
            <ItemsList
              setSelectedItem={setSelectedItem}
              data={itemsQuery.data}
            />
          )}
        </div>
        <div className="materialDetails">
          {mode === "viewItem" ? (
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  setMode("createItem");
                  setSelectedItem(null);
                }}
              >
                Нов
              </Button>
              <ItemDetails selectedItem={selectedItem} />
              {selectedItem && (
                <div>
                  <Button
                    variant="contained"
                    onClick={() => setMode("updateItem")}
                  >
                    Редактирай
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setDeleteItemDialogOpen(true);
                    }}
                  >
                    Изтрий
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <GenericForm>
                <ItemFormFields selectedItem={selectedItem} />
                <Button variant="outlined" onClick={() => setMode("viewItem")}>
                  Откажи
                </Button>
                <Button variant="contained" type="submit" color="error">
                  Запази
                </Button>
              </GenericForm>
            </div>
          )}
        </div>
      </div>
      <ConfirmationDialog
        isOpen={deleteItemDialogOpen}
        setIsOpen={function (isOpen: boolean): void {
          setDeleteItemDialogOpen(isOpen);
        }}
        title={"Изтриване на стока"}
        promptText={"Сигурни ли сте, че искате да изтриете стоката"}
        agreeBtnText={"Да"}
        disagreeBtnText={"Не"}
        handleAgree={() => {
          deleteItemMutation.mutate((selectedItem as IId).id);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
