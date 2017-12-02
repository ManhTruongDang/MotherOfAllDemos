# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import os
os.environ["CLOUDINARY_URL"] = settings["CLOUDINARY_URL"]

from openi_crawler.items import OpeniCrawlerInfoItem
from openi_crawler.items import OpeniCrawlerItem
from pymongo import MongoClient
from scrapy.conf import settings

import cloudinary
import cloudinary.uploader


class OpeniCrawlerPipeline(object):
    def __init__(self):
        client = MongoClient(settings["MONGOLAB_URI"])
        db = client.xraychest
        self.collection = db.data
        self.collection.find_one()

    def process_item(self, item, spider):
        if isinstance(item, OpeniCrawlerInfoItem):
            self.collection.insert(item["data"])
        if isinstance(item, OpeniCrawlerItem):
            callback = cloudinary.uploader.upload(
                item["image_src"], folder="x-ray-chest")
            self.collection.update({"nodeRef": item["site_url"]}, {
                "$set": {
                    "contents": item["contents"],
                    "callback": callback
                }
            })
        return item
