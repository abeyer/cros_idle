CHROME:=/opt/google/chrome/chrome

EXTNAME:=cros_idle

DIST:=dist/$(EXTNAME)
TARGET:=dist/$(EXTNAME).crx
PEM:=dist/$(EXTNAME).pem
ifneq ("$(wildcard $(PEM))", "")
	PEM_ARG:=--pack-extension-key=$(PEM)
else
	PEM_ARG:=
endif

SRC:=$(wildcard src/*)
PKG:=$(SRC:src/%=$(DIST)/%)

$(TARGET): $(DIST) $(PKG)
	rm -rf $@
	$(CHROME) --pack-extension=$(DIST) $(PEM_ARG)

clean:
	rm -rf $(TARGET) $(DIST)

distclean:
	rm -rf dist

$(PKG): $(SRC)
	cp -r $(SRC) $(DIST)/

$(DIST):
	mkdir -p $@
