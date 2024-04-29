from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time


def scrape_intersport_shoes(driver, url,size):
    driver.get(url)
    time.sleep(1)
    
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    shoe_list_items = soup.find_all('li', class_='item product product-item')

    shoes_data = []
    for li in shoe_list_items:
        product_image = li.find('img', class_='product-image-photo')['src']
        old_price = li.find('span', class_='max-price').text.strip()
        discounted_price = li.find('span', class_='price').text.strip()
        product_name = li.find('a', class_='product-item-link').text.strip()
        shoe_link = li.find('a', class_='product-item-link')['href']
        
        shoe_data = {
            'product_image': product_image,
            'old_price': old_price,
            'discounted_price': discounted_price,
            'product_name': product_name,
            'shoe_link': shoe_link,
            'sizes':size
        }
        shoes_data.append(shoe_data)

    return shoes_data
