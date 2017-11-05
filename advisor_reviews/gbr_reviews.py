import codecs
import shutil
import json
import os

with codecs.open("gbr_reviews.json", "r", encoding="utf-8") as fr:
    gbr_reviews = json.load(fr)

titles = dict()
for gbr_review in gbr_reviews:
    title = gbr_review["title"]
    if title not in titles:
        titles[title] = [gbr_review]
    else:
        titles[title].append(gbr_review)

if os.path.exists("gbr_reviews"):
    shutil.rmtree("gbr_reviews")
os.mkdir("gbr_reviews")

for title in titles:
    with codecs.open("gbr_reviews/" + title + ".json", "w", encoding="utf-8") as fw:
        json.dump(titles[title], fw, indent=4, ensure_ascii=False)
