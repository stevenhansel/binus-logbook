import { Body, fetch, ResponseType } from '@tauri-apps/api/http'
import type { HttpVerb, Response } from '@tauri-apps/api/http'

interface Request {
  url: string
  method: HttpVerb
  body: Record<string, any>
  headers?: Array<Record<string, string>>
}

type DoRequest<T = any> = (request: Request) => Promise<T>

const baseUrl = 'http://localhost:8080'

const doRequest: DoRequest = async <T = any>(request: Request): Promise<Response<T>> => {
  const response = await fetch<T>(baseUrl + request.url, {
    method: request.method,
    headers: (request.headers != null) ? request.headers.map((header) => Body.json(header)) : undefined,
    body: Body.json(request.body),
    responseType: ResponseType.JSON
  })

  return response
}

export type { Request }

export default doRequest
