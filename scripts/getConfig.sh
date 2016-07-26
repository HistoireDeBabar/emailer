#!/usr/bin/env bash
set -e
BUCKET=\$${1}_BUCKET
KEY=\$${1}_KEY
aws s3api get-object --bucket ${BUCKET} --key ${KEY} config.js
