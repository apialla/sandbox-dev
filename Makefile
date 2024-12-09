# Define the subdirectories containing Makefiles
SUBDIRS = apisix keycloak active-directory

# Define targets for each directory
.PHONY: init

intranet_network := saqal_intranet
dmz_network := saqal_dmz

# Run 'make init' in each subdirectory
init:
	@if [ -z "$$(docker network ls --filter name=${intranet_network} -q)" ]; then \
		echo "Creating Docker network '${intranet_network}'..."; \
		docker network create ${intranet_network}; \
	else \
		echo "Docker network '${intranet_network}' already exists."; \
	fi

	@if [ -z "$$(docker network ls --filter name=${dmz_network} -q)" ]; then \
		echo "Creating Docker network '${dmz_network}'..."; \
		docker network create ${dmz_network}; \
	else \
		echo "Docker network '${dmz_network}' already exists."; \
	fi

	@for dir in $(SUBDIRS); do \
		echo "Running 'make init' in $$dir..."; \
		$(MAKE) -C $$dir init; \
	done
