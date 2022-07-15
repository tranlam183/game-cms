import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";


export const RacetrackCR = createAsyncThunk(
  "racetrack/RacetrackCR",
  async (BodyAuth: string) => {
    const response = await client.post(Endpoint.RACETRACK,BodyAuth)
    return response?.data;
  },
);