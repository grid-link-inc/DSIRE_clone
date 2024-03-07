locally host template with firebase
## where is firebase's run command?


## what is the template's?
react-script start in package.json

## how do I make firebase do what the template does?
look into CORS, CSP. permit app to look in various locations for various file types

public url
### where is PUBLIC URL "/free" getting set from?
- no clue
- but i can set it with export PUBLIC_URL
### homepage it set to 

### when i run yarn start where does it load assets from. /free?? but it doesn't exist

### when I emulate I get back index.html for the css and js request


# Live data
## firebase app
DONE
## cloud function
https://firebase.google.com/docs/functions/callable?gen=2nd
DONE

## Security
App check https://firebase.google.com/docs/app-check/cloud-functions
grant admin creds for Functions: https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
env vars for secrets - not necessary: https://firebase.google.com/docs/projects/api-keys
squash commits

const firebaseConfig = {
    apiKey: "xxxx",
    authDomain: "policy-db.firebaseapp.com",
    projectId: "policy-db",
    storageBucket: "policy-db.appspot.com",
    messagingSenderId: "681212162559",
    appId: "1:681212162559:web:d62bf83caa104c306f77ca",
    measurementId: "G-RF37VLFW3T"
};

Run locally access secret
How do I access the secret?
How do I view the function

gcloud functions deploy get_programs \
--set-secrets 'PROTOTYPING_DB_PW=prototyping-db-pw:1'
--runtime RUNTIME \

## query
maube need: https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
https://firebase.google.com/docs/functions/config-env?gen=2nd#node.js

## load into table






<!-- Firebase Config -->
  <!-- update the version number as needed -->
  <script defer src="/__/firebase/10.7.2/firebase-app-compat.js"></script>
  <!-- include only the Firebase features as you need -->
  <script defer src="/__/firebase/10.7.2/firebase-auth-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-database-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-firestore-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-functions-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-messaging-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-storage-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-analytics-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-remote-config-compat.js"></script>
  <script defer src="/__/firebase/10.7.2/firebase-performance-compat.js"></script>


## Async data fetching


# import asyncio
# from sqlalchemy.ext.asyncio import create_async_engine
# from sqlalchemy.future import select

# class AsyncConnectionContextManager:
#     def __init__(self, connection):
#         self.connection = connection

#     async def __aenter__(self):
#         # Return the connection object when entering the context
#         return self.connection

#     async def __aexit__(self, exc_type, exc_val, exc_tb):
#         # Close the connection when exiting the context
#         await self.connection.close()
# # Use like this
# # async def main():
# #     # Assuming `get_async_connection` is your method to obtain an async connection
# #     conn = await get_async_connection()
# #     async with AsyncConnectionContextManager(conn) as connection:

# @https_fn.on_call(secrets=[PROTOTYPING_DB_PW])
# def get_program_enriched_async(request: https_fn.CallableRequest):
#     try: 
#         print("get_program_enriched")
#         program_id = request.data.get('id')
#         db_user = 'postgres'
#         db_name = 'dsire'
#         db_pass = PROTOTYPING_DB_PW.value
#         db_connection_name = "double-runway-412322:us-west1:prototyping-db"

#         # initialize Connector object
#         connector = Connector()

#         # function to return the database connection object
#         def getconn():
#             conn = connector.connect(
#                 db_connection_name,
#                 "asyncpg",
#                 user=db_user,
#                 password=db_pass,
#                 db=db_name
#             )
#             return conn

#         pool = create_async_engine(
#             "postgresql+asyncpg://",
#             creator=getconn,
#         )


#         print("get_program_enriched pool created")
#         # with pool.connect() as db_conn:
#         #     res = asyncio.run(fetch_program_info(db_conn, program_id))
#         #     print(res)
#         #     return res
#         # async with pool.connect() as db_conn:
#         #     res = await fetch_program_info(db_conn, program_id)
#         #     print(res)
#         #     return res
#         with pool.connect() as db_conn:
#             res = asyncio.run(fetch_program_info_v2(db_conn, program_id))
#             print(res)
#             return res

#         # db_conn = pool.connect()
#         # try:
#         #     return asyncio.run(fetch_program_info(db_conn, program_id))
#         # finally:
#         #     db_conn.close()

#     except Exception as e:
#         print(e)
#         raise https_fn.HttpsError(
#             code=https_fn.FunctionsErrorCode.INTERNAL,
#             message=(str(e))
#         )
    

# async def fetch_one(db_conn, query):
#     print("fetch_one")
#     result = await db_conn.execute(sqlalchemy.text(query))
#     print("fetch_one, result", result)
#     return await result.fetchone()

# async def fetch_all(db_conn, query):
#     print("fetch_all")
#     result = await db_conn.execute(sqlalchemy.text(query))
#     print("fetch_all, result", result)
#     return await result.fetchall()

# async def fetch_program_info(db_conn, program_id):
#     results = await asyncio.gather(
#         fetch_one(db_conn, program_query.format(id=program_id)),
#         fetch_all(db_conn, authorities_query.format(id=program_id)),
#         fetch_all(db_conn, contacts_query.format(id=program_id)),
#         fetch_all(db_conn, utilities_query.format(id=program_id)),
#         fetch_all(db_conn, cities_query.format(id=program_id)),
#         fetch_all(db_conn, counties_query.format(id=program_id)),
#         fetch_all(db_conn, zipcodes_query.format(id=program_id)),
#         fetch_all(db_conn, details_query.format(id=program_id))
#     )

#     return {
#         "program": program_details_to_dict(*results[0]),
#         "authorities": [authority_row_to_obj(*row) for row in results[1]],
#         "contacts": [contact_row_to_obj(*row) for row in results[2]],
#         "utilities": [utiltiy_row_to_obj(*row) for row in results[3]],
#         "cities": [city_row_to_obj(*row) for row in results[4]],
#         "counties": [county_row_to_obj(*row) for row in results[5]],
#         "zipcodes": [zip_row_to_obj(*row) for row in results[6]],
#         "details": [program_details_row_to_dict(*row) for row in results[7]]
#     }

# async def fetch_program_info_v2(db_conn, program_id):
#     async with AsyncConnectionContextManager(db_conn) as session:
#         results = await asyncio.gather(
#             fetch_one(session, program_query.format(id=program_id)),
#             fetch_all(session, authorities_query.format(id=program_id)),
#             fetch_all(session, contacts_query.format(id=program_id)),
#             fetch_all(session, utilities_query.format(id=program_id)),
#             fetch_all(session, cities_query.format(id=program_id)),
#             fetch_all(session, counties_query.format(id=program_id)),
#             fetch_all(session, zipcodes_query.format(id=program_id)),
#             fetch_all(session, details_query.format(id=program_id))
#         )

#         return {
#             "program": program_details_to_dict(*results[0]),
#             "authorities": [authority_row_to_obj(*row) for row in results[1]],
#             "contacts": [contact_row_to_obj(*row) for row in results[2]],
#             "utilities": [utiltiy_row_to_obj(*row) for row in results[3]],
#             "cities": [city_row_to_obj(*row) for row in results[4]],
#             "counties": [county_row_to_obj(*row) for row in results[5]],
#             "zipcodes": [zip_row_to_obj(*row) for row in results[6]],
#             "details": [program_details_row_to_dict(*row) for row in results[7]]
#         }










# async def fetch_one(db_conn, query):
#     print("fetch_one")
#     result = await db_conn.execute(sqlalchemy.text(query))
#     print("fetch_one, result", result)
#     return result.fetchone()

# async def fetch_all(db_conn, query):
#     print("fetch_all")
#     result = await db_conn.execute(sqlalchemy.text(query))
#     print("fetch_all, result", result)
#     return result.fetchall()