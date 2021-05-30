URL=$(grep GRAPHQL_URL= .env.development | cut -d '=' -f2 | sed -e 's/^"//' -e 's/"$//' )
KEY=$(grep GRAPHQL_SECRETKEY= .env.development | cut -d '=' -f2 | sed -e 's/^"//' -e 's/"$//' )
SECRET=$(grep GRAPHQL_SECRET= .env.development | cut -d '=' -f2 | sed -e 's/^"//' -e 's/"$//' )

./node_modules/.bin/apollo schema:download --endpoint="$URL" --header="$KEY: $SECRET"