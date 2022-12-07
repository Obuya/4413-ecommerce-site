import express, { Request } from "express"
import { User } from "../../../db/models/user"

declare module 'express' {
  interface Request {
    token?: string,
    user?: any,
    session?: any
  }
}