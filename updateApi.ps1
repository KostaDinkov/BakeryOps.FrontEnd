(Invoke-WebRequest -Uri "https://localhost:5001/swagger/v1/swagger.yaml").Content | Out-File "swagger.yaml" -Encoding utf8

