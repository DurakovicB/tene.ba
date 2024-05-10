def upload_shoes_to_database(connection, shoes_data, store_id):
    try:
        with connection.cursor() as cursor:
            for shoe in shoes_data:
                # Check if 'old_price' key exists, if not set it to 0
                old_price = shoe.get('old_price', 0)
                # Use the new 'price' key instead of 'old_price' for the 'price' field
                price = shoe.get('price', 0)
                sql = """
                    INSERT INTO shoe
                    (store_id, name, price, previous_price, image_url, sizes, link, sex)
                    VALUES
                    (%s, %s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    store_id,
                    shoe['product_name'],
                    price,
                    old_price,
                    shoe['product_image'],
                    shoe['sizes'],
                    shoe['shoe_link'],
                    shoe['sex']
                ))

        connection.commit()
        print("Shoes uploaded to the database.")
    except Exception as e:
        print(f"Error uploading shoes to the database: {e}")
