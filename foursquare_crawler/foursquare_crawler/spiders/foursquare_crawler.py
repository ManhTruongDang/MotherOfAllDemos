from scrapy import Request, Spider
from foursquare_crawler.spiders import *
from foursquare_crawler.collections import DATA
from foursquare_crawler.items import FoursquareCrawlerItem


class FourSquareSpider(Spider):
    name = "foursquare_crawler"

    def start_requests(self):
        for data in DATA:
            yield Request(url=data["url"], callback=self.parse, dont_filter=True, meta={"data": data})

    def parse(self, response):
        review_crawler = response.xpath("//div[@class=\"tipContents\"]")
        for review in review_crawler:
            name = review.xpath(".//span[@class=\"userName\"]//text()").extract_first()
            review_entity = review.xpath(".//div[@class=\"tipText\"]")
            text = review_entity.xpath(".//text()").extract()
            entity = review_entity.css("span.entity::text").extract()
            review_date = review.xpath(".//span[@class=\"tipDate\"]//text()").extract_first()
            up_vote = review.xpath(".//span[@class=\"tipUpvoteCount\"]//text()").extract_first()
            down_vote = review.xpath(".//span[@class=\"tipDownvoteCount\"]//text()").extract_first()

            item = FoursquareCrawlerItem()
            item["place"] = response.meta["data"]["name"]
            item["name"] = name
            item["text"] = re.sub(" +", " ", " ".join(text))
            item["entity"] = entity
            item["review_date"] = review_date
            item["up_vote"] = 0 if up_vote is None else up_vote
            item["down_vote"] = 0 if down_vote is None else down_vote

            yield item
