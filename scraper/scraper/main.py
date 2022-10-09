from scraper.binus import BinusScraper

import uvicorn
from pydantic import BaseModel
from fastapi import Depends, FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

class LoginRequestBody(BaseModel):
    email: str
    password: str

@app.post("/v1/login")
async def login(
        body: LoginRequestBody,
        binus: BinusScraper = Depends(BinusScraper),
    ):
    return await binus.login(body.email, body.password)

def start():
    """Launched with `poetry run start` at root level"""
    # todo: find free port
    uvicorn.run("scraper.main:app", host="0.0.0.0", port=8080, reload=True)
