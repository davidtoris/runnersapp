import { createSlice } from '@reduxjs/toolkit';

interface ImageInterface {
  evidence: {
    imagen: '', 
    uploaded: boolean
  },
  photo: {
    imagen: '', 
    uploaded: boolean
  },
  evidenceLoading: boolean,
  photoLoading: boolean,
  statusCode: null,
}

const initialState : ImageInterface = {
  evidence: {
    imagen: '',
    uploaded: false
  },
  photo: {
    imagen: '',
    uploaded: false
  },
  evidenceLoading: false,
  photoLoading: false,
  statusCode: null,
}

const imagesSlice = createSlice({

  name: 'images',
  initialState,
  reducers: {
    imagesEvidence(state, action) {
      state.evidence = action.payload;
      state.evidenceLoading = false
      state.statusCode = null
    },
    imagesPhoto(state, action) {
      state.photo = action.payload;
      state.photoLoading = false
      state.statusCode = null
    },
    evidenceLoading(state, action) {
      state.evidenceLoading = action.payload;
    },
    photoLoading(state, action) {
      state.photoLoading = action.payload;
    },
    statusCodeFunc(state, action) {
      state.statusCode = action.payload;
      state.photoLoading = false
      state.evidenceLoading = false
      
    },
  }
});

export const { imagesEvidence, imagesPhoto, photoLoading, evidenceLoading, statusCodeFunc } = imagesSlice.actions;

export default imagesSlice.reducer;