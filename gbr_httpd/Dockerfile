FROM centos:latest

RUN mkdir /www

RUN yum install -y epel-release; yum -y clean all
RUN yum install -y python-pip; yum -y clean all
RUN yum install -y httpd; yum -y clean all
RUN yum install -y mod_wsgi; yum -y clean all
RUN yum -y update; yum -y clean all

COPY html /www/
COPY httpd.conf /etc/httpd/conf/

RUN pip install --upgrade pip; \
	pip install --no-cache-dir -r /www/gbr_tools/requirements.txt; \
	yum -y clean all

RUN rm -rf /var/cache/yum
RUN chmod 777 /www/gbr_tools/
RUN chmod 777 /www/gbr_tools/annotation.sqlite3

EXPOSE 80

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]