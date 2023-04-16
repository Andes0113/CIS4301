from typing import Union

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


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/companies")
def get_stocks():
    return { "data": OracleClient.getStocks()}

@app.get("/stock_data")
def get_stock_data(ticker: str, start_date: str, end_date: str, indvar: str):
    print(indvar)
    if indvar == 'Price':
        indvar = 'Open'
    return { "data": OracleClient.getStockData(ticker, start_date, end_date, indvar)}