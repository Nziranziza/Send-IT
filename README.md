# Send-IT API Endpoints [![Build Status](https://travis-ci.org/Nziranziza/Send-IT.svg?branch=master)](https://travis-ci.org/Nziranziza/Send-IT) [![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/Nziranziza/Send-IT)
SendIT is a courier service that helps users deliver parcels to different destinations. SendIT
provides courier quotes based on weight categories.

I have already upload the UI template for this project on github and if you want to have a look follow this [link](https://github.com/Nziranziza/sendit)

Here is a list of all API Endpoints that you will find:
* **GET/parcels** Fetch all parcel delivery orders
* **GET/parcels/<parcelid>** Fetch a specific parcel delivery order
* **GET/users/<userid>/parcels** Fetch all parcel delivery order by a specific user
* **PUT/parcels/<parcelid>/cancel** Cancel a specific parcel delivery order
* **POST/parcels** Create a parcel delivery order
* **GET/users** Fetch all users
* **GET/users/<userid>** Fetch a specific user by id
* **POST/users** Create a user
* **PUT/users/login** Login a user account
* **PUT/users/logout** Logout a user account
* **PUT/users/<userid>/update-profile** Update the user profile
# Technology Tools used
* Server-side Framework: **Node/Express JS**
* Linting Library: **ESlint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha** or **Jasmine**
