import codecs
import shutil
import json
import os

with codecs.open("foursquare_reviews.json", "r", encoding="utf-8") as fr:
    foursquare_reviews = json.load(fr)

places = dict()
for foursquare_review in foursquare_reviews:
    place = foursquare_review["place"]
    if place not in places:
        places[place] = [foursquare_review]
    else:
        places[place].append(foursquare_review)

if os.path.exists("foursquare_reviews"):
    shutil.rmtree("foursquare_reviews")
os.mkdir("foursquare_reviews")

for place in places:
    with codecs.open("foursquare_reviews/" + place + ".json", "w", encoding="utf-8") as fw:
        json.dump(places[place], fw, indent=4, ensure_ascii=False)