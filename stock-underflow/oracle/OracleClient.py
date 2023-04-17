import oracledb
import uuid
import datetime

pw = ''

connection = oracledb.connect(
    user="af.rowe",
    password=pw,
    dsn="oracle.cise.ufl.edu/orcl",
    port=1521,
    )

print("Successfully connected to Oracle Database")


def getStocks():
    cursor = connection.cursor()
    data = []
    for row in cursor.execute("""select * from Stocks order by Ticker"""):
        data.append({
            "ticker": row[0],
            "name": row[1],
        })
    return data

def getStockData(ticker, start_date, end_date, indvar, dataType):
    cursor = connection.cursor()
    query = """
        select Ticker, "{}", "Date"
        from StockInstances
        where Ticker = '{}' and "Date" between '{}' and '{}' ORDER BY "Date"
        """.format(indvar, ticker, start_date, end_date)
    if dataType == 'difference':
        query = """
            with CurrInstances as
            (select * from StockInstances where Ticker = '{0}')
            select Ticker, "{1}" - "YDay" as "Diff", "Date"
            from CurrInstances, 
            (select "{1}" as "YDay", "Date" + 1 as "Date2" from CurrInstances)
            where "Date"="Date2" and "Date" between '{2}' and '{3}' ORDER BY "Date"
            """.format(ticker, indvar, start_date, end_date)
    elif dataType == 'percent_difference':
        query = """
            with CurrInstances as
            (select * from StockInstances where Ticker = '{0}')
            select Ticker, TRUNC(("{1}" - "YDay")/("YDay") * 100,2) as "Diff", "Date"
            from CurrInstances, 
            (select "{1}" as "YDay", "Date" + 1 as "Date2" from CurrInstances)
            where "Date"="Date2" and "Date" between '{2}' and '{3}' ORDER BY "Date"
        """.format(ticker, indvar, start_date, end_date)
    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            f"{row[0]}": row[1],
            "date": row[2].date(),
        })
    return data

def getTwoStockData(ticker1, ticker2, start_date, end_date, indvar, dataType, multiSelectType):
    cursor = connection.cursor()
    if multiSelectType == "difference":
        query = """select (A."{0}" - B."{0}") as "diff", A."Date" from
""".format(indvar)
    else:
        query = """select A."{0}", B."{0}", A."Date" from""".format(indvar)
    
    if dataType == "plain":
        query += """
            (select "{0}", "Date" from StockInstances where ticker = '{1}') A
            join
            (select "{0}", "Date" from StockInstances where ticker = '{2}') B
            """.format(indvar, ticker1, ticker2)
    
    elif dataType == "difference" or dataType == "percent_difference":
        if dataType == "difference":
            select_query = """
                select Ticker, "{0}" - "YDay" as "{0}", "Date"
            """.format(indvar)
        else:
            select_query = """
                select Ticker, TRUNC(("{0}" - "YDay")/"YDay" * 100, 2) as "{0}", "Date"
            """.format(indvar)
        query += """
            (
                with CurrInstances as
                (select * from StockInstances where Ticker = '{1}')
                {5}
                from CurrInstances, 
                (select "{0}" as "YDay", "Date" + 1 as "Date2" from CurrInstances)
                where "Date"="Date2" and "Date" between '{3}' and '{4}'
            ) A
            join
            (
                with CurrInstances as
                (select * from StockInstances where Ticker = '{2}')
                {5}
                from CurrInstances, 
                (select "{0}" as "YDay", "Date" + 1 as "Date2" from CurrInstances)
                where "Date"="Date2" and "Date" between '{3}' and '{4}'
            ) B
        """.format(indvar, ticker1, ticker2, start_date, end_date, select_query)
    query += """
        on A."Date" = B."Date" and A."Date" between '{0}' and '{1}'
        ORDER BY "Date"
    """.format(start_date, end_date)
    print(query)
    data = []
    for row in cursor.execute(query):
        if multiSelectType == "difference":
            data.append({
                "diff": row[0],
                "date": row[1].date(),
            })
        else:
            data.append({
                f"{ticker1}": row[0],
                f"{ticker2}": row[1],
                "date": row[2].date(),
            })
    return data
def get_daily_volume_of_posts(ticker: str, start_date: str, end_date: str, dataType):
    cursor = connection.cursor()
    query = """
        SELECT COUNT(*), "DATE"
        FROM
        (
            select ticker,
            TRUNC(CAST("TIMESTAMP" AS DATE)) as "DATE"
            from Posts
            where ticker = '{0}' 
        )
        GROUP BY "DATE"
        HAVING "DATE" between '{1}' AND '{2}'
        ORDER BY "DATE"
    """.format(ticker, start_date, end_date)
    if dataType == "difference" or dataType == "percent_difference":
        if dataType == "difference":
            query = """select TRUNC((A.POST_VOLUME - B.POST_VOLUME)/B.POST_VOLUME * 100, 2) as "Posts", "DATE" FROM"""
        else:
            query = """select (A.POST_VOLUME - B.POST_VOLUME) as "Posts", "DATE" FROM"""
        query += """
            (
                SELECT COUNT(*) as POST_VOLUME, "DATE"
                FROM
                (
                    select ticker,
                    TRUNC(CAST("TIMESTAMP" AS DATE)) as "DATE"
                    from Posts
                    where ticker = '{0}' 
                )
                GROUP BY "DATE"
                HAVING "DATE" between '{1}' AND '{2}'
            ) A
            join
            (
                SELECT COUNT(*) as POST_VOLUME, "DATE" + 1 as YDAY
                FROM
                (
                    select ticker,
                    TRUNC(CAST("TIMESTAMP" AS DATE)) as "DATE"
                    from Posts
                    where ticker = '{0}' 
                )
                GROUP BY "DATE"
                HAVING "DATE" between '{1}' AND '{2}'
            ) B
            on A."DATE" = B.YDAY
            ORDER BY "DATE"
        """.format(ticker, start_date, end_date)
    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            "date": row[1].date(),
            "volume": row[0],
        })
    return data

def getPostsByUsername(username, limit = 100):
    limit = 100
    cursor = connection.cursor()
    query = """
        SELECT PostID, Ticker, TIMESTAMP, Username, Title, Content FROM Posts
        WHERE Username = '{0}' and rownum between 0 and {1}
        ORDER BY "TIMESTAMP" desc
    """.format(username, limit)

    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            "id": row[0],
            "ticker": row[1],
            "timestamp": row[2].date(),
            "username": row[3],
            "title": row[4],
            "content": row[5],
        })
    return data

def getPostsByTicker(ticker, limit = 100):
    cursor = connection.cursor()
    query = """
        select * from(
            SELECT PostID, Ticker, TIMESTAMP, Username, Title, Content FROM Posts
            WHERE Ticker = '{0}'
            ORDER BY "TIMESTAMP" desc
        ) where rownum between 0 and {1}
    """.format(ticker, limit)

    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            "id": row[0],
            "ticker": row[1],
            "timestamp": row[2].date(),
            "username": row[3],
            "title": row[4],
            "content": row[5],
        })
    return data

def getPaperTradesByTicker(ticker):
    cursor = connection.cursor()
    query = """
        select TradeID, PURCHASEDATE, SELLDATE, USERNAME, TICKER,
        TRUNC(("SellPrice" - "PurchasePrice")/"PurchasePrice" * 100, 2) as Percent_Profit from
        (
            select TradeID, SELLDATE, PURCHASEDATE, USERNAME, P.Ticker, "Open" as "PurchasePrice" from
            (select * from PaperTrades where Ticker='{0}') P
            join
            (select * from StockInstances where Ticker='{0}') S
            on TRUNC(P.PURCHASEDATE) = TRUNC(S."Date")
        ) A
        join 
        (select "Date", "Open" as "SellPrice" from StockInstances where Ticker='{0}') B
        on TRUNC(A.SELLDATE) = TRUNC(B."Date")
        ORDER BY PERCENT_PROFIT desc
    """.format(ticker)

    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            "trade_id": row[0],
            "sell_date": row[1].date(),
            "purchase_date": row[2].date(),
            "username": row[3],
            "ticker": row[4],
            "percent_profit": row[5],
        })
    return data
def getPaperTradesByUsername(username):
    cursor = connection.cursor()
    query = """
        select TradeID, PURCHASEDATE, SELLDATE, USERNAME, A.TICKER,
        TRUNC(("SellPrice" - "PurchasePrice")/"PurchasePrice" * 100, 2) as Percent_Profit from
        (
            select TradeID, SELLDATE, PURCHASEDATE, USERNAME, P.Ticker, "Open" as "PurchasePrice" from
            (select * from PaperTrades where username='{0}') P
            join
            (select * from StockInstances) S
            on TRUNC(P.PURCHASEDATE) = TRUNC(S."Date") and P.Ticker = S.Ticker
        ) A
        join 
        (select "Date", "Open" as "SellPrice", TICKER from StockInstances) B
        on TRUNC(A.SELLDATE) = TRUNC(B."Date") and A.Ticker = B.Ticker
        ORDER BY PERCENT_PROFIT desc
    """.format(username)

    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            "trade_id": row[0],
            "sell_date": row[1].date(),
            "purchase_date": row[2].date(),
            "username": row[3],
            "ticker": row[4],
            "percent_profit": row[5]
        })
    return data
def getIndexFundsByUsername(username):
    cursor = connection.cursor()
    query = """
        select * from IndexFunds
        where Username='{0}'
    """.format(username)

    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            "fund_id": row[0],
            "name": row[1],
            "username": row[2],
        })
    return data
def getIndexFundStocks(fundID):
    cursor = connection.cursor()
    query = """
        select X.TICKER, COMPANYNAME from
        (
            select A.FUNDID, Name, Ticker from
            (select * from IndexFunds where FUNDID='{0}') A
            join
            (select * from IndexFundStocks) B
            on A.FUNDID = B.FUNDID
        ) X
        join Stocks on X.Ticker = Stocks.Ticker
    """.format(fundID)

    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            "ticker": row[0],
            "name": row[1],
        })
    return data
def getIndexFundStockData(fundID, start_date, end_date):
    cursor = connection.cursor()
    query = """
        select NAME,sum("Open") as "Price", "Date" from
        (
            select A.FUNDID, NAME, Ticker, Username from
            (select * from IndexFunds where FUNDID='{0}') A
            join
            (select * from IndexFundStocks) B
            on A.FUNDID = B.FUNDID
        ) X
        join
        (
            select "Open", "Date", Ticker from StockInstances
            where "Date" between '{1}' and '{2}'
        ) Y
        on X.TICKER = Y.TICKER
        group by NAME, "Date"
        ORDER BY "Date"
    """.format(fundID, start_date, end_date)

    print(query)
    data = []
    for row in cursor.execute(query):
        data.append({
            f"{row[0]}": row[1],
            "date": row[2].date(),
        })
    return data

def login(username, password):
    cursor = connection.cursor()
    query = """
        select * from Users
        where Username='{0}' and password='{1}'
    """.format(username, password)
    print(query)
    success = False
    for _ in cursor.execute(query):
        success = True
    return success

def createPost(post):
    cursor = connection.cursor()
    postid = uuid.uuid4()
    ts = datetime.datetime.now().strftime('%d-%b-%y %I:%M:%S %p')
    query ="""
    insert into Posts values('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')
    """.format(postid, post.title, post.content, ts, post.username, post.ticker)
    print(query)
    cursor.execute(query)
    connection.commit()
    return True

def createIndexFund(fund):
    cursor = connection.cursor()
    fundid = uuid.uuid4()
    name = fund.name
    username = fund.username
    cursor.execute("""
        insert into IndexFunds
        values('{0}', '{1}', '{2}')
    """.format(fundid, name, username))

    tickers = fund.stocks
    for ticker in tickers:
        cursor.execute("""
            insert into IndexFundStocks
            values('{0}', '{1}')
        """.format(fundid, ticker))
    connection.commit()
    return True

def createTrade(trade):
    cursor = connection.cursor()
    tradeid = uuid.uuid4()
    username = trade.username
    ticker = trade.ticker
    SellDate = trade.sell_date
    PurchaseDate = trade.purchase_date
    cursor.execute("""
        insert into PaperTrades
        values('{0}', '{1}', '{2}', '{3}', '{4}')
    """.format(tradeid, SellDate, PurchaseDate, username, ticker))
    connection.commit()
    return True