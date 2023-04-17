from typing import List
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from oracle import OracleClient

class Post(BaseModel):
    title: str
    content: str
    ticker: str
    username: str

class Fund(BaseModel):
    name: str
    username: str
    stocks: List[str] = []

class Trade(BaseModel):
    username: str
    ticker: str
    purchase_date: str
    sell_date: str


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
def get_volume_of_posts(ticker: str, start_date: str, end_date: str, dataType):
    return {"data": OracleClient.get_daily_volume_of_posts(ticker, start_date, end_date, dataType)}

@app.get("/posts")
def get_posts(ticker: str, username: str):
    if username != 'null':
        return {"data": OracleClient.getPostsByUsername(username)}
    else:  
        return {"data": OracleClient.getPostsByTicker(ticker)}
    
@app.get("/trades")
def get_trade_ticker(ticker: str, username: str):
    if username != 'null':
        return {"data": OracleClient.getPaperTradesByUsername(username)}
    return {"data": OracleClient.getPaperTradesByTicker(ticker)}

@app.get("/funds/user")
def get_user_funds(username: str):
    return {"data": OracleClient.getIndexFundsByUsername(username) }

@app.get("/fund-stocks")
def get_fund_stocks(id: str):
    return {"data": OracleClient.getIndexFundStocks(id) }

@app.get("/fund-data")
def get_fund_data(id: str, start_date: str, end_date: str):
    return {"data": OracleClient.getIndexFundStockData(id, start_date, end_date) }

@app.get("/login")
def login(username: str, password: str):
    return {"success": OracleClient.login(username, password) }

@app.post("/posts")
def create_post(post: Post):
    return { "success": OracleClient.createPost(post) }

@app.post("/funds")
def create_fund(fund: Fund):
    return { "success": OracleClient.createIndexFund(fund) }

@app.post("/trades")
def create_trade(trade: Trade):
    return {"success": OracleClient.createTrade(trade)}