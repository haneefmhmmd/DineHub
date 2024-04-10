
## 1. Customer:
-   _id: ObjectId
-   firstName: String
-   lastName: String
-   username: String
-   email: String
-   phoneNumber: Number
-   password: String

## Endpoint:
-   Base URL: http://localhost:3000/customer

### Create/Update Customer
-   OST (for creating) **Endpoint:** `/customer`
-   PUT (for updating) **Endpoint:** `/customer/:id`
-   **Use this JSON Body:**
    {
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "email": "johndoe@example.com",
        "phoneNumber": 1234567890,
        "password": "P@ssw0rd"
    }

### Login
-   POST **Endpoint:** `/customer/login`
-   **Use this JSON Body:**
    {
        "email": "johndoe@example.com",
        "password": "P@ssw0rd"
    }

### Delete Customer
-   DELETE **Endpoint:** `/customer/:id`

### Get All Customers
-   GET **Endpoint:** `/customer`

### Get Customer by ID
-   GET **Endpoint:** `/customer/:id`

-------------------------------------------------------------------------



## 2. Restaurant
- _id: ObjectId
- name: String
- businessEmail: String (Email)
- password: String
- address:
    - city: String
    - country: String
    - province: String
    - street: String
    - postalCode: String
- contactNumber: String
- url: String (URL)
- bannerImageHref: String (Image URL)
- logoHref: String (Image URL)
- cuisine (String)
- rating: Number
- about: String
- businessHours: Array
  - day: Array
    - startTime: String
    - endTime: String
- seatingArrangements: Array
  - tableNumber: Number
  - tableCapacity: Number

## Endpoint:
-   Base URL: http://localhost:3000/restaurant

### Create/Update Restaurant
-   OST (for creating) **Endpoint:** `/restaurant`
-   PUT (for updating) **Endpoint:** `/restaurant/:id`
-   **Use this JSON Body:**
    {
    "name": "Delicious Delights",
    "businessEmail": "info@deliciousdelights.com",
    "password": "deliciousdelights",
    "address": {
        "street": "344 Yonge Street",
        "city": "Toronto",
        "postalCode": "M1X2B1",
        "province": "Ontario",
        "country": "Canada"
    },
    "contactNumber": "4165324532",
    "url": "https://deliciousdelights.com",
    "bannerImageHref": "https://deliciousdelights.com/banner.jpg",
    "logoHref": "https://deliciousdelights.com/logo.png",
    "cuisine": "Italian",
    "about": "Delicious Delights serves authentic Italian cuisine with a modern twist. Come experience our cozy ambiance and indulge in our flavorful dishes.",
    "businessHours": [
        {
            "day": "Monday",
            "openHours": {
                "startTime": "10:00 AM",
                "endTime": "9:00 PM"
            }
        },
        {
            "day": "Tuesday",
            "openHours": {
                "startTime": "10:00 AM",
                "endTime": "9:00 PM"
            }
        },
        {
            "day": "Wednesday",
            "openHours": {
                "startTime": "10:00 AM",
                "endTime": "9:00 PM"
            }
        },
        {
            "day": "Thursday",
            "openHours": {
                "startTime": "10:00 AM",
                "endTime": "9:00 PM"
            }
        },
        {
            "day": "Friday",
            "openHours": {
                "startTime": "10:00 AM",
                "endTime": "10:00 PM"
            }
        },
        {
            "day": "Saturday",
            "openHours": {
                "startTime": "11:00 AM",
                "endTime": "10:00 PM"
            }
        },
        {
            "day": "Sunday",
            "openHours": {
                "startTime": "11:00 AM",
                "endTime": "9:00 PM"
            }
        }
    ],
    "seatingArrangements": [
        {
            "tableNumber": 1,
            "tableCapacity": 4
        },
        {
            "tableNumber": 2,
            "tableCapacity": 6
        },
        {
            "tableNumber": 3,
            "tableCapacity": 2
        }
    ]
}

### Login
-   POST **Endpoint:** `/restaurant/login`
-   **Use this JSON Body:**
    {
        "businessEmail": "johndoe@example.com",
        "password": "P@ssw0rd"
    }

### Delete Restaurant
-   DELETE **Endpoint:** `/restaurant/:id`

### Get All Restaurants
-   GET **Endpoint:** `/restaurant`

### Get Restaurant by ID
-   GET **Endpoint:** `/restaurant/:id`

-------------------------------------------------------------------------



## 3. Menu
- _id (String)
- Restaurant ObjectId
- menuName (String)
- menuItems [ (Array)
    - _id ObjectId
    - categoryName (String)
    - categoryItems (Array)
        - _id ObjectId
        - name (String)
        - image (String)
        - descrition (String)
        - price (Number)

## Endpoint:
-   Base URL: http://localhost:3000/menu

### Create/Update Menu
-   OST (for creating) **Endpoint:** `/menu`
-   PUT (for updating) **Endpoint:** `/menu/:id`
-   **Use this JSON Body:**
    {
        "restaurant": "8923g4hy3g4g2f3u4u34",
        "menuName": "Specialty Drinks",
        "menuItems": [
            {
            "categoryName": "Non-Alcoholic Beverages",
            "categoryItems": [
                {
                "name": "Virgin Mojito",
                "image": "https://example.com/virgin_mojito.jpg",
                "description": "A refreshing blend of mint, lime, and soda water",
                "price": 4.99
                },
                {
                "name": "Strawberry Smoothie",
                "image": "https://example.com/strawberry_smoothie.jpg",
                "description": "Fresh strawberries blended with yogurt and ice",
                "price": 5.49
                }
            ]
            },
            {
            "categoryName": "Cocktails",
            "categoryItems": [
                {
                "name": "Margarita",
                "image": "https://example.com/margarita.jpg",
                "description": "Tequila, triple sec, lime juice, and a salted rim",
                "price": 8.99
                },
                {
                "name": "Piña Colada",
                "image": "https://example.com/pina_colada.jpg",
                "description": "Rum, coconut cream, pineapple juice, and crushed ice",
                "price": 9.49
                }
            ]
            }
        ]
    }


### Delete Menu
-   DELETE **Endpoint:** `/menu/:id`

### Get All Menus
-   GET **Endpoint:** `/menu`

### Get Menu by ID
-   GET **Endpoint:** `/menu/:id`

### Get Items in Menu by Category
-   GET **Endpoint:** `/menu/category`
-   **Use this JSON Body:**
    {
        restaurantId = req.body.restaurantId;
        categoryName = req.body.categoryName;
    }

### Get Menus by given restaurantID
-   GET **Endpoint:** `/menu/category`
-   **Use this JSON Body:**
    {
        restaurantId = req.body.restaurantId;
    }

-------------------------------------------------------------------------



## 4. Reservation
- _id (String)
- restaurant ObjectId
- customer ObjectId
- reservedDate (String)
- slotInterval (String)
- paymentInfo (Array)
    - _id ObjectId
    - paymentDate (String)
    - paymentTime (String)
    - paymentAmount (Number)
    - paymentType (String)
    - cardNumber (String)
    - expiryDate (String)
- tableNumber (Number)
- status (String)


## Endpoint:
-   Base URL: http://localhost:3000/reservation

### Create/Update Reservation
-   OST (for creating) **Endpoint:** `/reservation`
-   PUT (for updating) **Endpoint:** `/reservation/:id`
-   **Use this JSON Body:**
    {
        "restaurant": "6615b68bcac0973d19e836bb",
        "customer": "6615f4a6f0a22cbe9e3c9be9",
        "slotInterval": "18:00 - 20:00",
        "paymentInfo": [ `Optional - You can leave it as an empty array []`
            {
                "paymentAmount": 159.99,
                "paymentType": "Credit Card",
                "cardNumber": "1234567890123456",
                "expiryDate": "04/27"
            }
        ],
        "tableNumber": 5
    }

### Delete Reservation
-   DELETE **Endpoint:** `/reservation/:id`

### Get All Reservations
-   GET **Endpoint:** `/reservation`

### Get Reservation by ID
-   GET **Endpoint:** `/reservation/:id`

### Get Payment by Reservation ID
-   GET **Endpoint:** `/reservation/payment/:id`

### Update Payment by Reservation ID
-   PUT **Endpoint:** `/reservation/payment/:id`

    ## If Cash Payment
        **Use this JSON Body:**
        {
            "paymentAmount": 149.99,
            "paymentType": "Credit Card",
            "cardNumber": "1234567890123456",
            "expiryDate": "04/27"
        }

    ## If Credit Card Payment
        **Use this JSON Body:**
        {
            "paymentAmount": 149.99,
            "paymentType": "Cash"
        }