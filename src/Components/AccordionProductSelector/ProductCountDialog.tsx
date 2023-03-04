import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProductDTO from "../../Types/ProductDTO";
import { DefaultSelectorValues } from "../OrderFormHelperFunctions";

export default function ProductCountDialog({
  product,
  open,
  handleClose,
  caller
}: {
  product: ProductDTO;
  open: boolean;
  caller:HTMLElement;
  handleClose: (caller:HTMLElement) => void;
}) {
  const [count, setCount] = useState(0);
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(
    null
  );

  useEffect(() => {
    if (open) {
      console.log(inputElement);
      inputElement?.focus();
    }
  }, [inputElement]);

  function handleSubmit() {
    let selectorValues = new DefaultSelectorValues();
    selectorValues.productAmount = count;
    selectorValues.productId = product.id;
    console.log(selectorValues);
    handleClose(caller);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <Dialog open={open} onClose={()=>handleClose(caller)}>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent>
        <input
          style={{ width: "50%" }}
          autoFocus
          id="count"
          type="number"
          onChange={(e) => {
            setCount(parseInt(e.target.value));
          }}
          onKeyDown={handleKeyDown}
          /* @ts-ignore */
          ref={setInputElement}
          placeholder="количество"
        />
      </DialogContent>

      <DialogActions>
        
        <Button onClick={()=>{handleClose(caller)}}>Cancel </Button>
        <Button>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
