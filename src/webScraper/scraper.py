from os.path import basename
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import requests
import json
import re


base_url = 'http://uverse.com/uv/uverse/movie_list'
page = requests.get(base_url).text

soup = BeautifulSoup(page, "lxml")

regex = re.compile("\([^)]*\)")

#Load Data By Category

categories = ["All", "Action-Adventure", "Comedy", "Drama", "Foreign Films", "Horror", "Independent", "Kids-Family", "Romance", "SciFi-Fantasy", "Suspense-Thriller"]

for title in categories:
    result = soup.find("div", attrs={"title":title})
    if (result is not None):
        li_arr = []
        for ul in result.find_all("ul"):
            li_list = ul.find_all("li")
            t = li_list[0].text
            result = t.strip()
            result = result.replace(", The","")
            noParens = re.sub(r'\([^)]*\)', '', result)
            end = re.sub(r'\{[^)]*\}', '', noParens)
            end = end.strip()

            obj = {
                "title":end,
                "rating":li_list[1].text
            }
            li_arr.append(obj) #append object to array

        json_object = {"category": title, "movies": li_arr}
        with open('../scraped/' + title + '.json', 'w') as fp:
            json.dump(json_object, fp)
