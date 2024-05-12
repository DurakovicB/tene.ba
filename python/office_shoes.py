from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time


def scrape_office_shoes(driver, url,sex):
    driver.get(url)
    time.sleep(1)
    driver.execute_script('$(".cookie-button").click();')
    
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    shoe_articles = soup.find_all('article', class_='product-article_wrapper')

    shoes_data = []
    for article in shoe_articles:
        product_image = article.find('img', class_='product_item_img')['src']
        price = article.find('span', class_='price').text.strip()
        product_name = article.find('h2', class_='product_list_title').text.strip()
        sizes = [button.text.strip() for button in article.select('.product-size-button')]
        shoe_link = article.find('a', class_='send-search')['href']
        brand = article.find('img', class_='article-wishlist-image')['data-brand']
        shoe_data = {
            'product_image': product_image,
            'price': price,
            'product_name': product_name,
            'sizes': ', '.join(sizes),
            'shoe_link': shoe_link,
            'brand': brand,
            'sex': sex
            }
        shoes_data.append(shoe_data)

    return shoes_data


def office_shoes_men(driver):
    url = 'https://www.officeshoes.ba/obuca-muska-obuca/2/48/order_asc?page=20'
    return scrape_office_shoes(driver, url, "Male")

def office_shoes_women(driver):
    url = "https://www.officeshoes.ba/obuca-zenska-obuca/1/48/order_asc?page=40"
    return scrape_office_shoes(driver, url, "Female")

def office_shoes_kids(driver):
    url = "https://www.officeshoes.ba/obuca-djecija-obuca/3/48/order_asc?page=40"
    return scrape_office_shoes(driver, url, "Kid")

def get_all_office_shoes(driver):
    men_shoes = office_shoes_men(driver)
    print(f"Found {len(men_shoes)} men's shoes.")

    women_shoes = office_shoes_women(driver)
    print(f"Found {len(women_shoes)} women's shoes.")

    kids_shoes = office_shoes_kids(driver)
    print(f"Found {len(kids_shoes)} kids' shoes.")
    return men_shoes+women_shoes+kids_shoes


