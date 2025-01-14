#!/bin/bash

# 設置項目 ID
PROJECT_ID="your-project-id"

# 確保已經登入 gcloud
gcloud auth login

# 設置當前項目
gcloud config set project $PROJECT_ID

# 啟用需要的 API
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

# 構建並部署
gcloud builds submit --config cloudbuild.yaml 