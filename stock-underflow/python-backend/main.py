from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from oracle import OracleClient


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/companies")
def get_stocks():
    return { "data": OracleClient.getStocks()}

@app.get("/stock_data")
def get_stock_data(ticker: str, start_date: str, end_date: str, indvar: str, dataType: str, multiSelect: str, multiSelectType: str, ticker2: str):
    if indvar == 'Price':
        indvar = 'Open'
    if multiSelectType != 'None':
        return {"data": OracleClient.getTwoStockData(ticker, ticker2, start_date, end_date, indvar, dataType, multiSelectType )}
    return { "data": OracleClient.getStockData(ticker, start_date, end_date, indvar, dataType)}

@app.get("/volume_of_posts")
def get_volume_of_posts(ticker: str):
    return {"data": OracleClient.get_daily_volume_of_posts(ticker)}

@app.get("/posts")
def get_posts(ticker: str, username: str):
    if username != 'null':
        return {"data": OracleClient.getPostsByUsername(username)}
    else:  
        return {"data": OracleClient.getPostsByTicker(ticker)}