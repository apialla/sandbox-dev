# Define the subdirectories containing Makefiles
SUBDIRS = apisix keyclock active-directory

# Define targets for each directory
.PHONY: init

# Run 'make init' in each subdirectory
init:
	@for dir in $(SUBDIRS); do \
		echo "Running 'make init' in $$dir..."; \
		$(MAKE) -C $$dir init; \
	done
