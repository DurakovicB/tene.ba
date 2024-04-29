# database.py
import pymysql.cursors

def connect_to_database():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='WebProgrammer',
        database='tene',
        port=3306,
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

def empty_shoe_table(connection):
    try:
        with connection.cursor() as cursor:
            # Delete all rows from the shoe table
            sql = "DELETE FROM shoe"
            cursor.execute(sql)
        connection.commit()
        print("Shoe table emptied.")
    except Exception as e:
        print(f"Error emptying shoe table: {e}")
