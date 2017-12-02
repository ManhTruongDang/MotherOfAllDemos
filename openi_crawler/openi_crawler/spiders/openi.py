# -*- coding: utf-8 -*-
from openi_crawler.items import OpeniCrawlerInfoItem
from openi_crawler.items import OpeniCrawlerItem
import scrapy, json


class OpeniSpider(scrapy.Spider):
    name = "openi"
    allowed_domains = ["openi.nlm.nih.gov"]
    start_urls = ['https://openi.nlm.nih.gov/gridquery.php?coll=cxr']

    def start_requests(self):
        yield scrapy.Request(self.start_urls[0], callback=self.parse_entity, meta={"m": 1, "n": 100})

    def parse_entity(self, response):
        image_urls = response.xpath("//script[contains(text(), \"var oi =\")]/text()")
        data_urls = json.loads(image_urls.extract_first().strip()[8:-1].strip())
        for data_url in data_urls:
            yield OpeniCrawlerInfoItem(data=data_url)
            yield scrapy.Request("https://openi.nlm.nih.gov/" + data_url["nodeRef"],
                                 callback=self.parse, meta={"nodeRef": data_url["nodeRef"]})
        m = response.meta["m"] + 100
        n = response.meta["n"] + 100
        m = 7470 if m > 7470 else m
        n = 7470 if n > 7470 else n
        if n > m:
            yield scrapy.Request(self.start_urls[0] + "&m=%d&n=%d" % (m, n),
                                 callback=self.parse_entity, meta={"m": m, "n": n})

    def parse(self, response):
        image_contents = response.xpath("//*[@id=\"other\" and contains(., \"ABSTRACT\")]")[0]
        image_contents = image_contents.xpath("./p//text()").extract()
        contents = {}
       	for i in range(len(image_contents) // 2):
            key = image_contents[2 * i].strip().replace(":", "").lower().strip()
            contents[key] = image_contents[2 * i + 1].strip().lower()
        image_src = response.xpath("//*[@id=\"theImage\"]/@src").extract_first()
        item = OpeniCrawlerItem()
        item["site_url"] = response.meta["nodeRef"]
        item["contents"] = contents
        item["image_src"] = "https://openi.nlm.nih.gov/" + image_src
        yield item
