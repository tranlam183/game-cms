import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";
import { Snackbar } from "./reducer";

export const updateSnackbar = createAction<Snackbar | null>(
  "application/updateSnackbar",
);
export const SignatureMsg = createAsyncThunk(
  "racetrack/SignatureMsg",
  async (address: string) => {
    const response = await client.post(Endpoint.AUTH,address)
    return response?.data;
  },
);

export const Auth = createAsyncThunk(
  "racetrack/Auth",
  async (BodyAuth: string) => {
    const response = await client.post(Endpoint.AUTH,BodyAuth)
    return response?.data;
  },
);
