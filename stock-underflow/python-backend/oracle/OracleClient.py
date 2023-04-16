import oracledb
import json

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
def get_daily_volume_of_posts(ticker: str):
    cursor = connection.cursor()
    query = """
        SELECT COUNT(*), "DATE"
        FROM
        (
            select ticker,
            CAST("TIMESTAMP" AS DATE) as "DATE"
            from Posts
            where ticker = '{}'
        )
        GROUP BY "DATE"
    """.format(ticker)
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

    data = []
    for row in cursor.execute(query):
        data.append({
            "id": row[0],
            "ticker": row[1],
            "timestamp": row[2].date(),
            "username": row[3],
            "title": row[4],
            "Content": row[5],
        })
    return data

def getPostsByTicker(ticker, limit = 100):
    limit = 100
    cursor = connection.cursor()
    query = """
        SELECT PostID, Ticker, TIMESTAMP, Username, Title, Content FROM Posts
        WHERE Ticker = '{0}' and rownum between 0 and {1}
        ORDER BY "TIMESTAMP" desc
    """.format(ticker, limit)

    data = []
    for row in cursor.execute(query):
        data.append({
            "id": row[0],
            "ticker": row[1],
            "timestamp": row[2].date(),
            "username": row[3],
            "title": row[4],
            "Content": row[5],
        })
    return data
# getStocks()
# getStockData('AAPL', '17-JAN-2019', '30-JAN-2019')
