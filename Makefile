.PHONY: install-frontend
install-frontend:
	cd web && yarn install

.PHONY: install-frontend-ci
install-frontend-ci:
	cd web && yarn install --frozen-lockfile

.PHONY: install-frontend-ci-clean
install-frontend-ci-clean: install-frontend-ci
	cd web && yarn cache clean

.PHONY: build-frontend
build-frontend:
	cd web && yarn build

.PHONY: start-frontend
start-frontend:
	cd web && yarn start

.PHONY: start-console
start-console:
	./scripts/start-console.sh

.PHONY: lint-frontend
lint-frontend:
	cd web && yarn lint

.PHONY: install-backend
install-backend:
	go mod download

.PHONY: build-backend
build-backend:
	go build -o plugin-backend cmd/main.go

.PHONY: start-backend
start-backend:
	go run ./cmd/main.go

.PHONY: build-image
build-image:
	./scripts/build-image.sh
