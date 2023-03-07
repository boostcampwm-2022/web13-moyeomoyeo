#!/bin/sh
echo "Init localstack"
awslocal s3 mb s3://test-bucket
