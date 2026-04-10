## Variables à injecter
- `REGISTRY_URL=35.181.151.223:443`
- `REGISTRY_USERNAME`
- `REGISTRY_PASSWORD`
- `MYSQL_DATABASE=users`
- `MYSQL_ROOT_PASSWORD`
- `REACT_APP_API_URL=http://<APP_PUBLIC_IP>:8000`

## Étapes attendues
1. Checkout du repo
2. Docker login sur le registry privé
3. Build + push :
   - `35.181.151.223:443/frontend:latest`
   - `35.181.151.223:443/backend:latest`
4. `terraform init` + `terraform apply -auto-approve` dans `terraform/app`
5. Récupérer :
   - `public_ip`
   - `private_key_pem`
6. Générer :
   - `key.pem` avec `chmod 600`
   - `inventory.ini`
7. Lancer :
   - `ansible/playbook-app.yml`
8. Vérifier :
   - `curl http://<APP_PUBLIC_IP>:3000`
   - `curl http://<APP_PUBLIC_IP>:8000/users`

## Points importants
- pas de secrets en dur
- pas de `.pem` commitée
- pas de `inventory.ini` commitée
- Adminer non public
- MySQL non public