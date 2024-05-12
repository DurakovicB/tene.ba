import requests

# URL of the API endpoint
url = 'https://www.intersport.ba/api/intersport/shared/Api/fetchCatalog'

# Headers
headers = {
    'Content-Type': 'text/plain;charset=UTF-8',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'en-US,en;q=0.9,hr;q=0.8',
    'Origin': 'https://www.intersport.ba',
    'Referer': 'https://www.intersport.ba/muskarci/obuca?product_list_order=price_asc',
    'Sec-Ch-Ua': '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
}

# Payload (cookies)
cookies = {
    'wp_segUserObj': '%7B%22isLogin%22%3Afalse%7D',
    'wp_ga4_customerGroup': 'NOT%20LOGGED%20IN',
    'cookiesession1': '678A3E0D2FC08D435AC884BAA2A98B1F',
    'gdpr_popup_shown': 'true',
    'gdpr-allow-analytics': 'false',
    'gdpr-allow-marketing': 'false',
    '_ga_GV8P2J2QNP': 'GS1.2.1692462150.6.1.1692462319.53.0.0',
    'private_content_version': '89877ea7074fc5a1b1ba2ba434c15b01',
    '_gcl_au': '1.1.1723735225.1709747932',
    '_ga': 'GA1.1.1714976974.1689058627',
    'newsletter_popup_shown': 'true',
    '_ga_T6SH171Z1K': 'GS1.1.1715541067.32.1.1715541618.57.0.0',
}

# Payload (request data)
data = {}  # You may need to provide specific data for the request, if required by the API

# Send POST request
response = requests.post(url, headers=headers, cookies=cookies, data=data)

# Check if request was successful (status code 200)
if response.status_code == 200:
    # Print the JSON response
    print(response.json())
else:
    print('Failed to retrieve data:', response.status_code)
