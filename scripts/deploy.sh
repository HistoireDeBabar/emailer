#!/usr/bin/env bash
set -e
aws s3api put-object --bucket ${BUCKET} --key ${CODE} --body apihandler.zip
