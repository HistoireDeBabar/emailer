#!/usr/bin/env bash
set -e
BUCKET=\$${1}_BUCKET
KEY=\$${1}_CODE
aws s3api put-object --bucket ${BUCKET} --key ${KEY} ${KEY}
