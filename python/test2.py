from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import pymysql.cursors

def connect_to_database():
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='WebProgrammer',
        database='studentinformationsystem',
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

def office_shoes_men(url):
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    driver.get(url)

    time.sleep(1)
    driver.execute_script('$(".cookie-button").click();')

    page_source = driver.page_source
    driver.quit()

    soup = BeautifulSoup(page_source, 'html.parser')
    shoe_articles = soup.find_all('article', class_='product-article_wrapper')

    shoes_data = []
    for article in shoe_articles:
        brand_logo = article.find('a', class_='logo')['href']
        product_image = article.find('img', class_='product_item_img')['src']
        old_price = article.find('span', class_='old-price').text.strip()
        discounted_price = article.find('span', class_='price').text.strip()
        product_name = article.find('h2', class_='product_list_title').text.strip()
        sizes = [button.text for button in article.select('.product-size-button')]
        shoe_link = article.find('a', class_='send-search')['href']

        shoe_data = {
            'brand_logo': brand_logo,
            'product_image': product_image,
            'old_price': old_price,
            'discounted_price': discounted_price,
            'product_name': product_name,
            'sizes': ', '.join(sizes),
            'shoe_link': shoe_link
        }
        shoes_data.append(shoe_data)

    return shoes_data

def upload_shoes_to_database(connection, shoes_data):
    try:
        with connection.cursor() as cursor:
            for shoe in shoes_data:
                sql = """
                    INSERT INTO shoe
                    (store_id, name, brand, category, product_code, price, discount,
                    previous_price, image_url, description, sizes, link)
                    VALUES
                    (1, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    shoe['product_name'],
                    shoe['brand_logo'],
                    'Men',  # Assuming these are men's shoes
                    '',  # No specific product code in the provided data
                    0,  # No price information in the provided data
                    0,  # No discount information in the provided data
                    shoe['old_price'],
                    shoe['product_image'],
                    '',  # No description in the provided data
                    shoe['sizes'],
                    shoe['shoe_link']
                ))

        connection.commit()
        print("Shoes uploaded to the database.")
    except Exception as e:
        print(f"Error uploading shoes to the database: {e}")

if __name__ == "__main__":
    db_connection = connect_to_database()
    empty_shoe_table(db_connection)
    shoes_data = office_shoes_men('https://www.officeshoes.ba/obuca-muska-obuca/2/48/order_asc?page=20')
    upload_shoes_to_database(db_connection, shoes_data)
    db_connection.close()
