from database import connect_to_database, empty_shoe_table
from intersport import *
from office_shoes import *
from upload import upload_shoes_to_database

db_connection = connect_to_database()
empty_shoe_table(db_connection)

options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
shoes_data = []
shoes_data += get_all_office_shoes(driver)
#shoes_data+= scrape_intersport_shoes(driver,"https://www.intersport.ba/muskarci/obuca?ow_fw_size=4315",'47 1/3')

driver.quit()
sex = "Male"
store_id=1
upload_shoes_to_database(db_connection, shoes_data, sex,store_id)
db_connection.close()

print(shoes_data[1])
total_shoes = len(shoes_data)
print(f"Found {total_shoes} shoes total.")