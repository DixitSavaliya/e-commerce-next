import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../app/types';
import productService from '../../services/product.service';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: true,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;

// Fetch Products Dataa
export const fetchProducts = (): any => async (
    dispatch: any
) => {
    dispatch(fetchProductsStart());
    try {
        const products = await productService.getProducts();
        dispatch(fetchProductsSuccess(products));
    } catch (error: any) {
        dispatch(fetchProductsFailure(error.message || 'Failed to fetch products'));
    }
};

// Selector to get filtered products
export const selectFilteredProducts = (state: any) => state?.product?.products;

export default productSlice.reducer;



