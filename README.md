# lauraewingferrer.com

This website is built with [Parcel][parcel]

## Deployment

1. Remove any existing `dist` folder

```
rm -rf ./dist
```

2. Create production build

```
yarn build
```

3. Upload build to S3

```
aws s3 sync ./dist s3://lauraewingferrer.com
```

Done! The website is served from S3 trough CloudFlare

[parcel]: https://parceljs.org
