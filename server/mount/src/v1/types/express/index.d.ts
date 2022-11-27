import express, { Request } from "express"

declare module 'express' {
  interface Request {
    token?: string
  }
}