###########
# BUILDER #
###########

# Base Image
FROM python:3.6.7-alpine3.7 as builder

# Install Requirements
COPY requirements.txt /
RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
        linux-headers \
        gcc \
        musl-dev \
        python3-dev \
        libffi-dev \
        build-base \
        mariadb-dev

RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt


#########
# FINAL #
#########
FROM python:3.6.7-alpine3.7

WORKDIR /opt/app

RUN mkdir -p /opt/app && cd /opt/app

# Install Requirements
COPY --from=builder /wheels /wheels
RUN apk add --no-cache mariadb-client-libs && \
    pip install --no-cache /wheels/* && \
    rm -rf /wheels

# Copy the code
COPY . .

# Run uwsgi unpriviledged
RUN addgroup -S uwsgi && adduser -S -G uwsgi uwsgi && chown -R uwsgi:uwsgi /opt/app

# Run celery unpriviledged
RUN addgroup -S celery && adduser -S -G celery celery && chown -R celery:celery /opt/app

COPY uwsgi.ini /etc/uwsgi/

EXPOSE 5000
