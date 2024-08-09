import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProductDTO from "../../../Types/ProductDTO";
import { ProductSelectorValues } from "./OrderFormHelperFunctions";

export default function ProductCountDialog({
  product,
  open,
  handleClose,
  caller,
  addNewProductSelector
}: {
  product: ProductDTO;
  open: boolean;
  caller:HTMLElement;
  handleClose: (caller:HTMLElement) => void;
  addNewProductSelector:(selectorValues:ProductSelectorValues)=>void
}) {
  const [count, setCount] = useState(0);
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );

  useEffect(() => {
    if (open) {
      
      inputElement?.focus();
    }
  }, [inputElement]);

  function handleSubmit() {
    let selectorValues = new ProductSelectorValues();
    selectorValues.productAmount = count;
    selectorValues.productId = product.id;
    
    addNewProductSelector(selectorValues);
    setCount(0);
    handleClose(caller);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }
  return (
    <Dialog open={open} onClose={()=>{handleClose(caller)}}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <input
          style={{ width: "50%" }}
          autoFocus
          step={1}
          id="count"
          type="number"
          onChange={(e) => {
            setCount(parseFloat(e.target.value));
          }}
          onKeyDown={handleKeyDown}
          /* @ts-ignore */
          ref={setInputElement}
          placeholder="количество"
          required
          min={0.001}
        />
      </DialogContent>

      <DialogActions>      
        <Button onClick={()=>{handleClose(caller)}}>Откажи</Button>
        <Button onClick = {handleSubmit}>Добави</Button>
      </DialogActions>
    </Dialog>
  );
}
