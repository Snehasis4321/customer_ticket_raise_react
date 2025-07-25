#!/bin/bash

# Navigate to the deployment directory
cd /home/servers/frontend

echo "Deployment completed successfully"

systemctl restart support_frontend.service
systemctl status support_frontend.service