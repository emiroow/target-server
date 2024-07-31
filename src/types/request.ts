import { Request } from "express";
import Payload from "./payload";

export type request = Request & Payload;
