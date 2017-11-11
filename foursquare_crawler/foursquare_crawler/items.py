# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class FoursquareCrawlerItem(scrapy.Item):
    # define the fields for your item here like:
    place = scrapy.Field()
    name = scrapy.Field()
    text = scrapy.Field()
    entity = scrapy.Field()
    review_date = scrapy.Field()
    up_vote = scrapy.Field()
    down_vote = scrapy.Field()

