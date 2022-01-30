# React-native app for Amateur Ice Hockey Games organization

### Test login
-   email: **a@a.com**
-   password: **passwd**
***

## Used API description

All the endpoints mentioned below require JWT to be sent in the header of the request.

- Athlete role indexes:
-   1 - user (every signed-up athlete is a user)
-   2 - player
-   3 - goalie
-   4 - referee

### /api/athlete
Athlete (user in general) creation or retrieval
- **GET** - returns all the registered users along with their roles
- **POST** - creates a new athlete (user)
  - Requires 'login', 'password', 'name', 'email', 'perf_level' (1-6) and 'roles' (array of indexes of athlete roles) parameters

### /api/event
Events creation/retrieval
- **GET** - returns all the events in the database along with all the details about the participants
- **POST** - creates a new event (probably not functional)
  - Requires:
    - *'name'*
    - *'organizer_id'*
    - *'total_places'*
    - *'start'* - start of the event in format '**YYYY-MM-DD**T**HH:MM:SS**'
    - *'duration'* - duration of the event in format '**HH:MM:SS**'
    - *'exp_level'* - integer value from 1 to 6

### /api/game/date
- **GET** - return all the events in a given timeframe, specifically from *YYYY-MM-DD 00:00:00* to *YYYY-MM-DD 23:59:00* 
  - Requires:
    - *'start_date'* - format 'YYYY-MM-DD'
    - *'end_date'* - format 'YYYY-MM-DD'
    - e.g.: /api/event/date?start_date=2021-12-02&end_date=2021-12-03

### /api/game/<event_id>
Specific event update/removal
- **GET** - retrieves the event with id <event_id> along with all the participants' details
- **DELETE** - deletes the event with id <event_id>
- **PUT** - updates the event with id <event_id>
  - Requires: see /api/event

### /api/game/<event_id>/participants
- **GET** - returns all the participants of the event <event_id>, grouped by their role (player, organizer, referee, goalie)
- **POST** - adds a new participant to the event <event_id>
  - Requires *'athlete_id'* and *'athlete_role'* parameters
- **DELETE** - removes the participant from the given event
  - Requires *'athlete_id'* and *'athlete_role'* parameters (athlete role probably redundant, as in one match only one role can be fulfilled - TBD)