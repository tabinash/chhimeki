import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobResponse } from "@/types/api/job";
import { ProductResponse } from "@/types/api/products";
// Import Post type if available, otherwise use any for now or strictly type it if I can find it.
// I'll make it generic for now or try to import.
// For now I will assume imports exist or use 'any' if I can't verify the path, but I should try to be safe.
// I saw 'ProductResponse' used in ProductDetailModal.
// I saw 'JobResponse' used in JobDetailModal.

interface ModalState {

    postDetailModal: {
        isOpen: boolean;
        postId: number | null; // Storing ID is safer, but if instant display is needed we might store object. 
        // For now, let's store ID and maybe the object if we want to avoid refetching.
        // Actually, let's allow storing the data to match current pattern of passing props.
    };
    createStoreFrontProductModal: {
        isOpen: boolean;
        storeFrontId: number | null;
    };
    productDetailModal: {
        isOpen: boolean;
        productId: number | null;
    };
    productEditModal: {
        isOpen: boolean;
        productId: number | null;
        data: ProductResponse | null;
    };
    jobDetailModal: {
        isOpen: boolean;
        jobId: number | null;
    };
    jobEditModal: {
        isOpen: boolean;
        jobId: number | null;
        data: JobResponse | null;
    };
}

const initialState: ModalState = {
    postDetailModal: { isOpen: false, postId: null },
    createStoreFrontProductModal: { isOpen: false, storeFrontId: null },
    productDetailModal: { isOpen: false, productId: null },
    productEditModal: { isOpen: false, productId: null, data: null },
    jobDetailModal: { isOpen: false, jobId: null, },
    jobEditModal: { isOpen: false, jobId: null, data: null },
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openPostDetailModal: (state, action: PayloadAction<{ postId: number; data?: any }>) => {
            state.postDetailModal.isOpen = true;
            state.postDetailModal.postId = action.payload.postId;
        },
        closePostDetailModal: (state) => {
            state.postDetailModal.isOpen = false;
            state.postDetailModal.postId = null;
        },
        openCreateStoreFrontProductModal: (state, action: PayloadAction<{ storeFrontId: number }>) => {
            state.createStoreFrontProductModal.isOpen = true;
            state.createStoreFrontProductModal.storeFrontId = action.payload.storeFrontId;
        },
        closeCreateStoreFrontProductModal: (state) => {
            state.createStoreFrontProductModal.isOpen = false;
            state.createStoreFrontProductModal.storeFrontId = null;
        },
        openProductDetailModal: (state, action: PayloadAction<{ productId: number }>) => {
            state.productDetailModal.isOpen = true;
            state.productDetailModal.productId = action.payload.productId;
        },
        closeProductDetailModal: (state) => {
            state.productDetailModal.isOpen = false;
            state.productDetailModal.productId = null;
        },
        openProductEditModal: (state, action: PayloadAction<ProductResponse>) => {
            state.productEditModal.isOpen = true;
            state.productEditModal.productId = action.payload.id;
            state.productEditModal.data = action.payload;
        },
        closeProductEditModal: (state) => {
            state.productEditModal.isOpen = false;
            state.productEditModal.productId = null;
            state.productEditModal.data = null;
        },
        openJobDetailModal: (state, action: PayloadAction<{ jobId: number }>) => {
            state.jobDetailModal.isOpen = true;
            state.jobDetailModal.jobId = action.payload.jobId;
        },
        closeJobDetailModal: (state) => {
            state.jobDetailModal.isOpen = false;
            state.jobDetailModal.jobId = null;
        },
        openJobEditModal: (state, action: PayloadAction<JobResponse>) => {
            state.jobEditModal.isOpen = true;
            state.jobEditModal.jobId = action.payload.id;
            state.jobEditModal.data = action.payload;
        },
        closeJobEditModal: (state) => {
            state.jobEditModal.isOpen = false;
            state.jobEditModal.jobId = null;
            state.jobEditModal.data = null;
        },

    },
});

export const {
    openPostDetailModal, closePostDetailModal,
    openProductDetailModal, closeProductDetailModal,
    openProductEditModal, closeProductEditModal,
    openJobDetailModal, closeJobDetailModal,
    openJobEditModal, closeJobEditModal,
    openCreateStoreFrontProductModal, closeCreateStoreFrontProductModal,
} = modalSlice.actions;

export default modalSlice.reducer;
