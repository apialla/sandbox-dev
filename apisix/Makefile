# cnet means custom network which should be similar
# to what is specified in compose file for etcd container
cnet := saqal_network

init:
	@if [ -z "$$(docker network ls --filter name=${cnet} -q)" ]; then \
		echo "Creating Docker network '${cnet}'..."; \
		docker network create ${cnet}; \
	else \
		echo "Docker network '${cnet}' already exists."; \
	fi
	docker compose up -d
	make dashbaord

reinit:
	docker compose down -v && make init

dashbaord:
	docker run -it -d --rm --name dashboard.apisix.saqal \
  -p 9000:9000 \
  --network ${cnet} \
  -v ./apisix_dashboard/config.yaml:/usr/local/apisix-dashboard/conf/conf.yaml \
  apache/apisix-dashboard:latest
