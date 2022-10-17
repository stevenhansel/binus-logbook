import { ZodIssue } from "zod";

import { ErrorCodeToMessageMap } from "../types/errors";

const parseError = (keys: string[], errors: ZodIssue[]): ErrorCodeToMessageMap => {
  const errorCodeToMessageMap: ErrorCodeToMessageMap = {}
  errors.forEach((error) => {
    keys.forEach((key) => {
      if (error.path.includes(key)) {
        errorCodeToMessageMap[key] = error.message
      }
    })
  })
  return errorCodeToMessageMap
}

export default parseError;
