FROM docker.elastic.co/beats/filebeat:7.15.0

USER root

COPY filebeat.yml /usr/share/filebeat/filebeat.yml

RUN chown root:root /usr/share/filebeat/filebeat.yml && \
    chmod go-w /usr/share/filebeat/filebeat.yml

WORKDIR /usr/share/filebeat

# Create a directory for logs
RUN mkdir -p /usr/share/filebeat/logs && \
    chown -R root:root /usr/share/filebeat/logs && \
    chmod -R 777 /usr/share/filebeat/logs

CMD ["filebeat", "-e", "-c", "filebeat.yml"]