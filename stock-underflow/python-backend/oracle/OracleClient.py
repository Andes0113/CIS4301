import oracledb
import json

pw = 'AvMbhaON3ItAhMGfdGlAesTG'

connection = oracledb.connect(
    user="af.rowe",
    password=pw,
    dsn="oracle.cise.ufl.edu/orcl",
    port=1521,)

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

def getStockData(ticker, start_date, end_date, indvar):
    cursor = connection.cursor()
    data = []
    for row in cursor.execute("""
        select Ticker, "{}" as "Price", "Date"
        from StockInstances
        where Ticker = '{}' and "Date" between '{}' and '{}' ORDER BY "Date"
        """.format(indvar, ticker, start_date, end_date)):
        data.append({
            f"{row[0]}": row[1],
            "date": row[2].date(),
        })
    return data

def getTwoStockData(ticker1, ticker2, start_date, end_date, indvar):
    cursor = connection.cursor()
    data = []
    for row in cursor.execute("""
        select Ticker, "{}" as "Price", "Date"
        from StockInstances
        where Ticker = '{}' and "Date" between '{}' and '{}' ORDER BY "Date"
        """.format(indvar, ticker1, start_date, end_date)):
        data.append({
            f"{row[0]}": row[1],
            "date": row[2].date(),
        })
    return data


# getStocks()
# getStockData('AAPL', '17-JAN-2019', '30-JAN-2019')
