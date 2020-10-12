 ➡️ Required <br>
 ⚙️ Field added automatically <br>

# USER

- ➡️ `firstName: string` → allowed lowercase, uppercase, single/multiple names with space and single quote
- ➡️ `lastName: string` → same as firstName
- ➡️ `birthDate: datetime` → 14 years old minimum
- ➡️ `email: string` → on client validated only with html form
- ➡️ `password: string` → min length 8, min 1 lowercase, 1 uppercase, 1 number, 1 [ @ $ ! % * ? & ], no whitespaces
- ➡️ `phoneNumber: string` → on client validated with html element, when changed must update al past reservations
- ⚙️ `creationDate: datetime`
- ⚙️ `role: 'root' | 'admin' | 'user'`
- ⚙️ `UUID: MongoDB unique id`


# RESERVATION

- ➡️ `date: date-only`
- ➡️ `duration: number` → allowed lowercase, uppercase, single/multiple names with space and single quote
- ➡️ `roomUUID: MongoDb unique id`
- ⚙️ `userUUID: MongoDb unique id`
- ⚙️ `isValid: boolean` → modified every time the user requests his reservations or the organization lists their reservation
- ⚙️ `creationDate: datetime`
- ⚙️ `UUID: MongoDb unique id`


# ROOM
<!-- the returned object will have the actual dates with only the free Spots in the body -->
- ➡️ `name: string`
- ➡️ `streetAddress: string`
- ➡️ `totalSpots: number`
- ➡️ `avaiableSpots: number`
- ➡️ turns:
```js
{
    0: [
        {
            start: number // number of minutes from 00:00
            end: number // number of minutes from 00:00
            // NOTE: (|end - start|)%duration=0
            duration: number // [15, 30, 60, 90, 120]
        }
    ],
    etc.. (Mon (0) => Sun (6))
}
```
- `location: string`
- ⚙️ `UUID: MongoDb unique id`





# ORGANIZATION

- ➡️ `name: string`
- ➡️ `streetAddress: string`
- ➡️ `phoneNumber: string`
- ⚙️ `rooms: [ ROOM.UUIDs ]`
- ⚙️ `totalRooms: number`
- ⚙️ `UUID: MongoDb unique id`
