# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class AdvisorReviewsItem(scrapy.Item):
    # define the fields for your item here like:
    title = scrapy.Field()
    user_scrname = scrapy.Field()
    user_location = scrapy.Field()
    user_contribution = scrapy.Field()
    user_helpful_vote = scrapy.Field()
    rating_date = scrapy.Field()
    rating_via = scrapy.Field()
    quote = scrapy.Field()
    partial_entry = scrapy.Field()
