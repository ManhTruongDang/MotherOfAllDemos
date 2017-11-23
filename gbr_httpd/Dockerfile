FROM centos:latest

RUN yum install -y epel-release; yum -y clean all
RUN yum install -y python-pip; yum -y clean all
RUN yum install -y httpd; yum -y clean all
RUN yum install -y mod_wsgi; yum -y clean all
RUN yum -y update; yum -y clean all

COPY html /var/www/html
COPY httpd.conf /etc/httpd/conf/

RUN pip install --upgrade pip; \
	pip install --no-cache-dir -r /var/www/html/gbr_tools/requirements.txt; \
	yum -y clean all

RUN rm -rf /var/cache/yum
RUN chmod 777 /var/www/html/gbr_tools/
RUN chmod 777 /var/www/html/gbr_tools/annotation.sqlite3

EXPOSE 80

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]