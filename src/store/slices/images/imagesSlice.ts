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
  errorPhoto: null,
  errorEvidence: null
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
  errorPhoto: null,
  errorEvidence: null,
}

const imagesSlice = createSlice({

  name: 'images',
  initialState,
  reducers: {
    imagesEvidence(state, action) {
      state.evidence = action.payload;
      state.evidenceLoading = false
      state.errorPhoto = null
      state.errorEvidence = null
    },
    imagesPhoto(state, action) {
      state.photo = action.payload;
      state.photoLoading = false
      state.errorPhoto = null
      state.errorEvidence = null
    },
    evidenceLoading(state, action) {
      state.evidenceLoading = action.payload;
    },
    photoLoading(state, action) {
      state.photoLoading = action.payload;
    },
    errorPhotoFunc(state, action) {
      state.errorPhoto = action.payload;
      state.photoLoading = false
    },
    errorEvidenceFunc(state, action) {
      state.errorEvidence = action.payload;
      state.evidenceLoading = false
    },
  }
});

export const { imagesEvidence, imagesPhoto, photoLoading, evidenceLoading, errorPhotoFunc, errorEvidenceFunc } = imagesSlice.actions;

export default imagesSlice.reducer;