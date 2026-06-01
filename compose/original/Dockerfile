FROM centos:7

# Force yum to use the official Vault archive and disable GPG checks for seamless installation
RUN rm -f /etc/yum.repos.d/*.repo && \
    echo -e "[base]\nname=CentOS-7 - Base - vault.centos.org\nbaseurl=http://vault.centos.org/7.9.2009/os/\$basearch/\ngpgcheck=0\nenabled=1\n\n[updates]\nname=CentOS-7 - Updates - vault.centos.org\nbaseurl=http://vault.centos.org/7.9.2009/updates/\$basearch/\ngpgcheck=0\nenabled=1" > /etc/yum.repos.d/CentOS-Vault.repo

# Install Apache, strict PHP 5.4, and all required WordPress extensions
RUN yum clean all && \
    yum makecache && \
    yum install -y \
    httpd \
    php \
    php-mysql \
    php-gd \
    php-mbstring \
    && yum clean all

# Ensure Apache configuration allows WordPress .htaccess rewrite overrides
RUN sed -i '/<Directory "\/var\/www\/html">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/httpd/conf/httpd.conf

# Suppress the AH00558 domain name warning globally
RUN echo "ServerName localhost" >> /etc/httpd/conf/httpd.conf

EXPOSE 80
# RUN echo -e "php_flag display_errors on\nphp_value error_reporting 32767" >> /etc/httpd/conf/httpd.conf
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]