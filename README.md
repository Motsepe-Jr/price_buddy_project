# price_buddy_project
A mobile app to compare prices between the biggest retailers


Data Engineering Project (Mobile App to compare Prices between Woolies, Pick n Pay, Shoprite, and Spar).

In this video, we are going to integrate Software Engineering, Data Engineering, and Mobile Development to build an App that compares prices between the biggest retailers.

Product Features:

1. Data Engineering:

We going to batch-extract and process (Python) all the collected data, as well as model our data. MongoDB to store product/store data and BloB/S3 to store images

We going to schedule our data collection and processing using Prefect (an Orchestration tool similar to Airflow).

2. Software engineering

We create our backend with Nodejs/Typescript to handle our requests. This includes authentication/authorization with JWT token and CRUD operations. Password encryption,

The backend handle pagination, search, and filter on every request. A rate limiter on the API using the leaky bucket algorithm.

3. Mobile App

Using Flutter (Dart framework) we are going to create the below app you are seeing on this post. I'm not a mobile developer, but it was nice building an app using Flutter it felt natural.

The youtube link: https://lnkd.in/djswbbfB
