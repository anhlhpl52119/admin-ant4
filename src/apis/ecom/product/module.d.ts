
type ProductImage = {
    id: string;
    file_name: string;
    is_main_pic: boolean;
    image_type: string;
    amis_product_id: number;
    url: string;
}
type ProductUnitConversion = {
    id: string;
    amis_id: string;
    product_id: number;
    conversion_unit_id: number;
    conversion_unit_id_text: string;
    sort_order: number;
    description: string;
    conversion_rate: number;
    conversion_operator_id: number;
    conversion_operator_id_text: string;
    conversion_unit_price: number;
    conversion_unit_price_1: number;
    conversion_unit_price_2: number;
    conversion_unit_price_fixed: number;

}
type ProductCategory = {
    id: string;
    amis_id: number;
    product_category_code: string;
    product_category_name: string;
    parent_product_category_id: number;
    parent_product_category_id_text: string;
    in_active: string;
    description?: any;
    modified_date: string;
    created_date: string;
    form_layout_id: number;
    custom_id: number;
    is_active: boolean;
    is_show: boolean;
}
type ProductLedger = {
    id: string;
    amis_id: number;
    avatar?: any;
    owner_id?: any;
    owner_id_text?: any;
    organization_unit_id?: any;
    organization_unit_id_text?: any;
    vendor_name_id?: any;
    vendor_name_id_text?: any;
    unit_price: string;
    taxable?: any;
    tax_id: number;
    tax_id_text: string;
    usage_unit_id: string;
    description?: any;
    is_deleted?: any;
    async_id: number;
    purchased_price: string;
    quantity_ordered?: any;
    quantity_instock?: any;
    quantity_demanded?: any;
    conversion_unit?: any;
    conversion_rate?: any;
    operator_id?: any;
    operator_id_text?: any;
    created_by?: any;
    modified_by?: any;
    created_date?: any;
    modified_date?: any;
    stock_quantity_summary: number;
    product_code: string;
    product_name: string;
    product_category_id: number;
    product_category_id_text: string;
    usage_unit_id_text: string;
    conversion_unit_id_text?: any;
    sale_description: string;
    unit_price_1?: any;
    unit_price_2?: any;
    quantity_formula?: any;
    unit_cost?: any;
    unit_price_fixed?: any;
    default_stock_id: number;
    default_stock_id_text: string;
    source?: any;
    warranty_period?: any;
    last_sync_date?: any;
    shipping_amount_summary?: any;
    quantity_summary?: any;
    amount_summary?: any;
    stock_id: number;
}
type ProductItem = {
    id: string;
    amis_id: number;
    product_code: string;
    product_name: string;
    product_category_id: number;
    product_category_id_text: string;
    usage_unit_id: number;
    usage_unit_id_text: string;
    unit_price: string;
    tax_id: number;
    tax_id_text: string;
    sale_description: string;
    default_stock_id: number;
    default_stock_id_text: string;
    description?: any;
    source: string;
    modified_date: string;
    created_date: string;
    unit_price_1: string;
    unit_price_2: string;
    unit_price_fixed: string;
    unit_cost?: any;
    purchased_price: string;
    organization_unit_id: number;
    organization_unit_id_text: string;
    custom_id: number;
    is_active: boolean;
    cx_description?: any;
    is_hidden: boolean;
    product_ledger_exist: boolean;
    amis_product_ledgers: ProductLedger[];
    amis_product_category: ProductCategory;
    product_images: ProductImage[]
    amis_product_conversions: ProductUnitConversion[]
}
type ProductResponse = {
    amis_product: ProductItem[]
}
type ProductPriceBook = {
    amis_id: number;
    custom_id: number;
    product_id: number;
    product_id_text: string;
    product_code: string;
    description: string;
    product_category_id: number;
    product_category_id_text: string;
    product_unit_id: number;
    product_unit_id_text: string;
    based_on?: any;
    based_on_text?: any;
    procedure_price?: any;
    procedure_price_text?: any;
    price_value: number;
    price: number;
    discount_type_id: string;
    discount_type_id_text: string;
    discount?: any;
    async_id: string;
    product_name: string;
    avatar: string;
    amis_price_book_id: string;
    amis_price_book_amis_id: number;
    pb_amis_id: number;
    object_id: number;
    pb_created_date: string;

}
