#!/usr/bin/env bash
set -e
aws s3api get-object --bucket ${BUCKET} --key ${KEY} ./src/config.js
