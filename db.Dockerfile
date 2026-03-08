FROM postgres:15-alpine

# Install locales
RUN apk add --no-cache icu-libs icu-data-full

# Ensure the database is initialized with the correct locale
ENV LANG en_US.utf8
ENV LC_ALL en_US.utf8
