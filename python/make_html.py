from database import connect_to_database
def generate_html_shoe_list_from_db(connection, filename="shoes.html"):
    try:
        with connection.cursor() as cursor:
            # Fetch shoes data from the database
            cursor.execute("SELECT * FROM shoe")
            shoes_data = cursor.fetchall()
    except Exception as e:
        print(f"Error fetching shoes data from the database: {e}")
        return

    html_content = '''
    <html>
        <head>
            <title>Office Shoes</title>
            <style>
                .shoe-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                }
                .shoe {
                    width: 16%;  # Set the width to fit 6 shoes in a row
                    margin: 1%;
                    box-sizing: border-box;
                }
                .shoe img {
                    width: 100%;
                    max-width: 100%;  # Adjust the max-width according to your preference
                    height: auto;
                }
            </style>
        </head>
        <body>
            <div class="shoe-container">
    '''

    for shoe in shoes_data:
        product_image = shoe['image_url']
        product_name = shoe['name']
        brand = shoe['brand']
        category = shoe['category']
        product_code = shoe['product_code']
        price = shoe['price']
        discount = shoe['discount']
        previous_price = shoe['previous_price']
        sizes = shoe['sizes']
        link = shoe['link']
        sex = shoe['sex']

        shoe_div = f'''
                <div class="shoe">
                    <a href="{link}" target="_blank">
                        <img src="{product_image}" alt="{product_name}">
                    </a>
                    <h3>{product_name}</h3>
                    <p>Brand: {brand}</p>
                    <p>Category: {category}</p>
                    <p>Product Code: {product_code}</p>
                    <p>Price: {price}</p>
                    <p>Discount: {discount}</p>
                    <p>Previous Price: {previous_price}</p>
                    <p>Sizes: {sizes}</p>
                    <p>Sex: {sex}</p>
                </div>
        '''
        html_content += shoe_div

    html_content += '''
            </div>
        </body>
    </html>
    '''

    with open(filename, 'w', encoding='utf-8') as html_file:
        html_file.write(html_content)

    print(f"HTML file '{filename}' generated successfully.")


db_connection = connect_to_database()
generate_html_shoe_list_from_db(db_connection, "shoes_from_db.html")
