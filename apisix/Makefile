# saqal_intranet means custom network which should be similar
# to what is specified in compose file for etcd container
saqal_intranet := saqal_intranet

init:
	docker compose up -d
	make dashboard

reinit:
	docker compose down -v && make init

dashboard:
	docker run -it -d --rm --name dashboard.apisix.saqal \
  -p 19000:9000 \
  --network ${saqal_intranet} \
  -v ./apisix_dashboard/config.yaml:/usr/local/apisix-dashboard/conf/conf.yaml \
  apache/apisix-dashboard:latest