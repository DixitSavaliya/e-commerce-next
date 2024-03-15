export interface Product {
    id: number;
    title: string;
    price: number;
    category?: string;
    rating?: any;
    description?: string;
    image?: string;
}

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity?: number | undefined;
    image?: string;
    category?: string;
    rating?: any;
    description?: string;
}

export interface RootState {
    products: Product[];
    cart: {
        items: CartItem[];
    };
}