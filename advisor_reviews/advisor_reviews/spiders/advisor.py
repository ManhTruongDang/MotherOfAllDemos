from scrapy import Spider, Request
from advisor_reviews.items import AdvisorReviewsItem
from advisor_reviews.activities import DATA


class Advisor(Spider):
    name = "advisor"
    start_urls = [(item["review_url"], item["title"]) for item in DATA]

    def start_requests(self):
        for url in self.start_urls:
            yield Request(url[0] % ('Attraction_Review', 'Reviews'), self.request_review_user, meta={"url": url})

    def request_review_user(self, response):
        reviews_ids = response.xpath('//div[@class="reviewSelector"]/@data-reviewid').extract()
        if reviews_ids.__len__() != 0:
            url = response.meta['url']
            yield Request(url[0] % ('ShowUserReviews', 'r' + reviews_ids[0]), self.parse, meta={"url": url})

    def parse(self, response):
        review_contents = response.xpath('//div[@class="reviewSelector"]')
        for review_content in review_contents:
            review_item = AdvisorReviewsItem()
            review_item["title"] = response.meta["url"][1]
            user_scrname = review_content.xpath('.//span[@class="expand_inline scrname"]/text()').extract_first()
            review_item["user_scrname"] = user_scrname if user_scrname is not None else ""
            user_location = review_content.xpath('.//span[@class="expand_inline userLocation"]/text()').extract_first()
            review_item["user_location"] = user_location if user_location is not None else ""
            user_contribution = review_content.xpath('.//div[@class="memberBadgingNoText"]//*[@class="badgetext"][1]/text()').extract_first()
            review_item["user_contribution"] = user_contribution if user_contribution is not None else ""
            user_helpful_vote = review_content.xpath('.//div[@class="memberBadgingNoText"]//*[@class="badgetext"][2]/text()').extract_first()
            review_item["user_helpful_vote"] = user_helpful_vote if user_helpful_vote is not None else ""
            rating_date = review_content.xpath('.//*[@class="ratingDate relativeDate"]/@title').extract_first()
            review_item["rating_date"] = rating_date if rating_date is not None else ""
            rating_via = review_content.xpath('.//*[@class="viaMobile"]/text()').extract_first()
            review_item["rating_via"] = rating_via if rating_via is not None else ""
            quote = review_content.xpath('.//*[@class="noQuotes"]/text()').extract_first()
            review_item["quote"] = quote if quote is not None else ""
            partial_entry = review_content.xpath('.//*[@class="partial_entry"]/text()').extract_first()
            review_item["partial_entry"] = partial_entry if partial_entry is not None else ""
            yield review_item

        next_url = response.xpath('//*[@class="nav next taLnk "]/@href').extract_first()
        if next_url is not None:
            yield Request("http://www.tripadvisor.co.uk" + next_url, self.parse, meta={"url": response.meta["url"]})
