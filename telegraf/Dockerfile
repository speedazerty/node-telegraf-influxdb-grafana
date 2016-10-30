FROM telegraf:1.0.1

COPY ./telegraf.conf /etc/telegraf/telegraf.conf

ENTRYPOINT ["/entrypoint.sh"]
CMD ["telegraf"]
