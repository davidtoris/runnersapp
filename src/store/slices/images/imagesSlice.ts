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
}

const imagesSlice = createSlice({

  name: 'images',
  initialState,
  reducers: {

    imagesEvidence(state, action) {
      state.evidence = action.payload;
      state.evidenceLoading = false
    },
    imagesPhoto(state, action) {
      state.photo = action.payload;
      state.photoLoading = false
    },
    evidenceLoading(state, action) {
      state.evidenceLoading = action.payload;
    },
    photoLoading(state, action) {
      state.photoLoading = action.payload;
    },
  }
});

export const { imagesEvidence, imagesPhoto, photoLoading, evidenceLoading} = imagesSlice.actions;

export default imagesSlice.reducer;