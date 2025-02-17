type InvoiceSchema = {
  invoice_type: string,
  invoice_number: string,
  invoice_date: string,
  supplier: {
    name: string,
    address: string | undefined,
    eik: string | undefined,
    dds_no: string | undefined,
    mol: string | undefined,
  },
  items: 
    {
      no: number,
      code: string | undefined,
      itemName: string,
      itemQuantity: number,
      unit: string,
      unit_price: number,
      total_price: number,
    }[]
  ,
  totals: {
    subtotal: number,
    discount_percentage: number,
    discount_amount: number,
    tax_base: number,
    vat_rate: number,
    vat_amount: number,
    total_amount: number,
    total_in_words: string,
  },
};
