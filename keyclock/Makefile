init:
	docker run -it -d --rm --name keycloak.saqal \
  -p 8080:8080 \
  --network saqal_network \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:25.0.4 start-dev