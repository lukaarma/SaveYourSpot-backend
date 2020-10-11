(\*) required <br>
(\**) automatically added

# USER

- \*  firstName: string, allowed lowercase, uppercase, single/multiple names with space and single quote
- \*  lastName: string, same as firstName
- \*  birthDate: datetime, 14 years old minimum
- \*  username: string, UNIQUE, min length 6, allowed [ char number _ - . ]
- \*  password: string, min length 8, min 1 lowercase, 1 uppercase, 1 number, 1 [ @ $ ! % * ? & ], no whitespaces
- \** UUID: MongoDB unique id
- \** creationDate: datetime
- \** role: 'root' | 'admin' | 'user'

- phoneNumber: string
- email: string, on client validated only with html form   


# ROOM

- \*  title: string
- \*  street address: string
- \*  totalSpots: number
- \*  avaiableSpots: number
- \** roomId: MongoDb unique id


# RESERVATION

- \*  userUUID: MongoDb unique id
- \*  startDate: datetime
- \*  duration: number
- \*  isValid: boolean
- \** creationDate: datetime
- \** UUID: MongoDb unique id


#ORGANIZATION
