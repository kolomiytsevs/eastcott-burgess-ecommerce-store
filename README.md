# Eastcott and Burgess Ecommerce Store

Thanks for viewing my Online Tea Store repository.

You can view my site [here](https://www.eastcottandburgess.com/home) or see my process by clicking on the image down below.

[![Online Store YoutUbe Video](https://res.cloudinary.com/eastcott-and-burgess/image/upload/v1560367740/Website_Screenshot_2_hdiezz.jpg)](https://www.youtube.com/watch?v=YIv21AMN9IY&t=1s)

# Scripts
## Running
`npm run client`: Runs only the front-end client.

`npm run server`: Runs only the back-end server.

`npm run dev`: Runs both the front and back end concurrently

# Environmental Variables

`MONGO_URI_SECRET`: MongoDB URI Key

`PAYPAL_CLIENT_SECRET`: Paypal Payment Gateway Client Secret

`PAYPAL_CLIENT_ID`: Paypal Payment Gateway Cleint ID 

`MAILCHIMP_AUTH`: Mailchimp authorisation key

# Additional Config

## External Libraries

### Google Analytics ID (gtag.js)
The Google Analytics SDK allowed me to integrate 'tags' into the website and send event data to Google Anlaytics. Since the inception of our company, it has been incredibly useful in helping us make design, functionality, as well as business decisions. It requires a Google Anlaytics ID to connect to the relevant account. 


# Tech-Stack
## Back-End Dependencies (Production)

### Compression
An incredibly easy to use NodeJS middleware which allowed for the compression of files into Gzip upon deployment. This significantly improved page loading times. 

### Cors 
Used to secure communication between the front-end and the NodeJS back-end API, without violating CORS policy. 

### ExpressJS
This minimalist NodeJS framework which allows for very fast server side setup. Together with Node (which is run on Google's V8 engine), this allowed for fast perfomance and requests, while the native use of javascript makes handling of JSON data super easy. Additionally Node's single theraded event loop mechanism also allows it to handle multiple simultaneous connection efficiently. This helps ensure that our site can scale as engaement grows. 

### Helmet
### MongoDB
### Mongoose 
### PayPal REST SDK

## Back-End Depndencies (Development)

### DotEnv 
### Nodemon
### Concurrently 
### Request 


## Front-End Dependencies (Production)

### React
### Context API
### React Helmet
### Axios
### Local Storage
### Query String
### React Snapshot 
### Instafeed.js 

## Front-End Depndencies (Development)

### Jest
### Enzyme 


