#!/usr/bin/env bash

npm run lint
npm test
zip -r apihandler.zip ./
