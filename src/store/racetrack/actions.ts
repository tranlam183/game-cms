import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";
import { HttpStatusCode } from "constant/enum";
import { BodyUrlRacetrack, Param } from "./reducer";

export const postRacetrack = createAsyncThunk(
  "racetrack/postRacetrack",
  async (bodyvalue: BodyUrlRacetrack) => {
    try {
      const resp = await client.post(Endpoint.RACETRACK, bodyvalue);
      console.log("🚀 ~ file: actions.ts ~ line 11 ~ resp", resp)
      if (resp.status === HttpStatusCode.CREATED) {
        return resp?.data
      }
    } catch (err) {
      console.log(" ~ err", err);
    }
  },
);

export const getRacetrack = createAsyncThunk(
  "racetrack/getRacetrack",
  async (param?: Param) => {
    try {
      let paramReq = {
        pageIndex: param?.pageIndex ?? 1,
        pageSize: param?.pageSize ?? 10,
      };
      const response = await client.get(Endpoint.RACETRACK, {
        params: paramReq,
      });
      return response?.data?.items;
    } catch (err) {
      console.log(" ~ err", err);
    }
  },
);
