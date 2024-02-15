# Deploy with `firebase deploy`
from firebase_admin import initialize_app
from firebase_functions import https_fn
from firebase_functions.params import SecretParam
from google.cloud.sql.connector import Connector
import sqlalchemy

initialize_app()

PROTOTYPING_DB_PW = SecretParam('PROTOTYPING_DB_PW')
ENFORCE_APP_CHECK=False

@https_fn.on_call(
        secrets=[PROTOTYPING_DB_PW], 
        enforce_app_check=ENFORCE_APP_CHECK
)
def get_programs(request: https_fn.CallableRequest):
    try: 
        db_user = 'postgres'
        db_name = 'postgres'
        db_pass = PROTOTYPING_DB_PW.value
        # db_connection_name = "double-runway-412322:us-west1:prototyping-db"
        db_connection_name = "policy-db:us-west1:dsire-clone-db"

        # initialize Connector object
        connector = Connector()

        # function to return the database connection object
        def getconn():
            conn = connector.connect(
                db_connection_name,
                "pg8000",
                user=db_user,
                password=db_pass,
                db=db_name
            )
            return conn

        # create connection pool with 'creator' argument to our connection object function
        pool = sqlalchemy.create_engine(
            "postgresql+pg8000://",
            creator=getconn,
        )
        with pool.connect() as db_conn:
            results = db_conn.execute(sqlalchemy.text("""
                SELECT 
                    program.id, 
                    program.name, 
                    state.name AS state_name, 
                    program.websiteurl, 
                    program_type.name AS program_type_name, 
                    program_category.name AS program_category_name,
                    program.start_date, 
                    program.end_date 
                FROM program
                JOIN state on program.state_id = state.id
                JOIN program_type on program.program_type_id = program_type.id
                JOIN program_category on program.program_category_id = program_category.id
                WHERE program.published = 1;
            """)).fetchall()
            rows = [list(row) for row in results]
            return {"programs": rows}
    except Exception as e:
        print(e)
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=(str(e))
        )

def program_to_dict(program_id ,program_name, program_summary , program_websiteurl , start_date , end_date ,program_type_name , program_category_name , authority_id , authority_code ,authority_websiteurl , authority_effective_date , authority_effective_text , authority_expired_date , authority_expired_text , state_name , utility_name , county_name , city_name , zipcode):
    return {
        "id": program_id,
        "name": program_name,
        "summary": program_summary,
        "websiteurl": program_websiteurl,
        "start_date": start_date,
        "end_date": end_date,
        "program_type_name": program_type_name,
        "program_category_name": program_category_name,
        "authority_id": authority_id,
        "authority_code": authority_code,
        "authority_websiteurl": authority_websiteurl,
        "authority_effective_date": authority_effective_date,
        "authority_effective_text": authority_effective_text,
        "authority_expired_date": authority_expired_date,
        "authority_expired_text": authority_expired_text,
        "state_name": state_name,
        "utility_name": utility_name,
        "county_name": county_name,
        "city_name": city_name,
        "zipcode": zipcode
    }


@https_fn.on_call(
    secrets=[PROTOTYPING_DB_PW],
    enforce_app_check=ENFORCE_APP_CHECK
)
def get_program_enriched(
    request: https_fn.CallableRequest
):
    try: 
        program_id = request.data.get('id')
        db_user = 'postgres'
        db_name = 'postgres'
        db_pass = PROTOTYPING_DB_PW.value
        # db_connection_name = "double-runway-412322:us-west1:prototyping-db"
        db_connection_name = "policy-db:us-west1:dsire-clone-db"
        # db_connection_name = "/cloudsql/double-runway-412322:us-west1:prototyping-db"
        # socketPath: '/cloudsql/' + '$PROJECT_ID:$REGION:$SPANNER_INSTANCE_NAME',

        # initialize Connector object
        connector = Connector()

        # function to return the database connection object
        def getconn():
            conn = connector.connect(
                db_connection_name,
                "pg8000",
                user=db_user,
                password=db_pass,
                db=db_name
            )
            return conn

        pool = sqlalchemy.create_engine(
            "postgresql+pg8000://",
            creator=getconn,
        )

        with pool.connect() as db_conn:
            res = fetch_program_info(db_conn, program_id)
            print(res)
            return res

    except Exception as e:
        print(e)
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=(str(e))
        )
    

def fetch_one(db_conn, query):
    return db_conn.execute(sqlalchemy.text(query)).fetchone()

def fetch_all(db_conn, query):
    return db_conn.execute(sqlalchemy.text(query)).fetchall()

def fetch_program_info(db_conn, program_id):
    results = [
        fetch_one(db_conn, program_query.format(id=program_id)),
        fetch_all(db_conn, authorities_query.format(id=program_id)),
        fetch_all(db_conn, contacts_query.format(id=program_id)),
        fetch_all(db_conn, utilities_query.format(id=program_id)),
        fetch_all(db_conn, cities_query.format(id=program_id)),
        fetch_all(db_conn, counties_query.format(id=program_id)),
        fetch_all(db_conn, zipcodes_query.format(id=program_id)),
        fetch_all(db_conn, details_query.format(id=program_id))
    ]

    return {
        "program": program_row_to_obj(*results[0]),
        "authorities": [authority_row_to_obj(*row) for row in results[1]],
        "contacts": [contact_row_to_obj(*row) for row in results[2]],
        "utilities": [utiltiy_row_to_obj(*row) for row in results[3]],
        "cities": [city_row_to_obj(*row) for row in results[4]],
        "counties": [county_row_to_obj(*row) for row in results[5]],
        "zipcodes": [zip_row_to_obj(*row) for row in results[6]],
        "details": [program_details_row_to_dict(*row) for row in results[7]]
    }






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

"""
details_query()

Known labels: 
Aggregate Capacity Limit
Alternative Compliance Payment
Applicable Utilities
Availability
Carryover Provisions
Certification Requirements
Charge
Code Change Cycle
Commercial Code
Compliance Multipliers
Credit Trading/Tracking System
Density Bonus
Distribution and Frequency
Duration
Electric Peak Demand Reduction
Electric Sales Reduction
Eligible System Size
Emissions
Energy Reduction Goal/Requirement
Equipment Efficiency Requirement
Equipment Requirements
Expedited Permitting Process
External Disconnect Switch
Fuel Mix
Green Building Requirement
Implementing Agency
Incentive Amount
Installation Requirements
Insurance Requirements
Interest Rate
Jurisdictions
Loan Term
Low-Moderate Income Provisions
Maximum Incentive
Maximum Loan
Meter Aggregation
Natural Gas Sales Reduction
Net Excess Generation
Net Metering Required
Ownership of Renewable Energy Credits
Participant Credit Rate
Permit Fee Waiver / Reduction
Program Capacity Limit
Rate Impact Parameters
REC Lifetime
Renewable Energy Requirement
Renewables % or Amount
Requirements
Residential Code
Review
Service
Source
Standard
Standard Agreement
Standard Format Required
System Capacity Limit
Technology Minimum
Terms
Test Methods
Total Fund
Types
"""
details_query = """
SELECT 
id,
label,
value,
display_order
FROM program_detail
WHERE program_id = {id};
"""

"""
program_query()
Known categories:
 Financial Incentive
 Regulatory Policy

Known types:
 Appliance/Equipment Efficiency Standards
 Bond Program
 Building Energy Code
 Community Solar Rules
 Corporate Depreciation
 Corporate Tax Credit
 Corporate Tax Deduction
 Corporate Tax Exemption
 Energy Efficiency Resource Standard
 Energy Standards for Public Buildings
 Energy Storage Target
 Equipment Certification
 Feed-in Tariff
 Generation Disclosure
 Grant Program
 Green Building Incentive
 Green Power Purchasing
 Industry Recruitment/Support
 Interconnection
 Leasing Program
 Line Extension Analysis
 Loan Program
 Mandatory Utility Green Power Option
 Net Metering
 Other Incentive
 Other Policy
 PACE Financing
 Performance-Based Incentive
 Personal Tax Credit
 Personal Tax Deduction
 Personal Tax Exemption
 Production Incentive
 Property Tax Assessment
 Property Tax Incentive
 Public Benefits Fund
 Rebate Program
 Renewables Portfolio Standard
 Sales Tax Incentive
 Solar Access Law/Guideline
 Solar Renewable Energy Credit Program
 Solar/Wind Access Policy
 Solar/Wind Contractor Licensing
 Solar/Wind Permitting Standards
 Utility Rate Discount
 Value of Solar Tariff
"""
program_query = """
SELECT 
    program.id AS program_id,
    program.name AS program_name,
    program.summary AS program_summary,
    program.websiteurl AS program_websiteurl,
    program.start_date,
    program.end_date,
    program_type.name AS program_type_name,
    program_category.name AS program_category_name,
    state.name AS state_name
FROM program
LEFT JOIN program_type ON program.program_type_id = program_type.id
LEFT JOIN program_category ON program.program_category_id = program_category.id
LEFT JOIN state ON program.state_id = state.id
WHERE program.id = {id}
;
"""

authorities_query = """
SELECT 
    id,
    program_id,
    code,
    website,
    enacted,
    enactedtext,
    effective,
    effectivetext,
    expired,
    expiredtext,
    file_key,
    file_name
FROM authority
WHERE program_id = {id}
;
"""

contacts_query = """
SELECT 
contact.id,
contact.first_name,
contact.last_name,
contact.organization_name,
contact.phone,
contact.email,
contact.website_url
FROM program
LEFT JOIN program_contact ON program.id = program_contact.program_id
LEFT JOIN contact ON program_contact.contact_id = contact.id
WHERE program_id = {id}
AND contact.web_visible_default = 1
;
"""

utilities_query = """
SELECT 
utility.id,
utility.name
FROM program
LEFT JOIN program_utility ON program.id = program_utility.program_id
LEFT JOIN utility ON program_utility.utility_id = utility.id
WHERE program_id = {id}
;
"""

cities_query = """
SELECT 
city.id,
city.name
FROM program
LEFT JOIN program_city ON program.id = program_city.program_id
LEFT JOIN city ON program_city.city_id = city.id
WHERE program_id = {id}
;
"""

counties_query = """
SELECT 
county.id,
county.name
FROM program
LEFT JOIN program_county ON program.id = program_county.program_id
LEFT JOIN county ON program_county.county_id = county.id
WHERE program_id = {id}
;
"""

zipcodes_query = """
SELECT 
zipcode.id, 
zipcode.zipcode
FROM zipcode
INNER JOIN program_zipcode ON zipcode.id = program_zipcode.zipcode_id
WHERE program_zipcode.program_id = {id}
;
"""

def program_details_row_to_dict(id, label, value, display_order):
    return {
        "id": id,
        "label": label,
        "value": value,
        "display_order": display_order
    }


def program_row_to_obj(
    id,
    name,
    summary,
    website,
    start_date,
    end_date,
    type,
    category,
    state
):
    return {
        "id": id,
        "name": name,
        "summary": summary,
        "website": website,
        "start_date": start_date,
        "end_date": end_date,
        "type": type,
        "category": category,
        "state": state
    }



def authority_row_to_obj(    
    id,
    program_id,
    code,
    website,
    enacted,
    enactedtext,
    effective,
    effectivetext,
    expired,
    expiredtext,
    file_key,
    file_name
):
    return {
        "id": id,
        "program_id": program_id,
        "code": code,
        "website": website,
        "enacted": enacted,
        "enactedtext": enactedtext,
        "effective": effective,
        "effectivetext": effectivetext,
        "expired": expired,
        "expiredtext": expiredtext,
        "file_key": file_key,
        "file_name": file_name
    }

def contact_row_to_obj(
    id,
    first_name,
    last_name,
    organization_name,
    phone,
    email,
    website_url
):
    return {
        "id": id,
        "first_name": first_name,
        "last_name": last_name,
        "organization_name": organization_name,
        "phone": phone,
        "email": email,
        "website_url": website_url
    }

def utiltiy_row_to_obj(id, name):
    return {
        "id": id,
        "name": name
    }

def city_row_to_obj(id, name):
    return {
        "id": id,
        "name": name,
    }

def county_row_to_obj(id, name):
    return {
        "id": id,
        "name": name,
    }

def zip_row_to_obj(id, zip_code):
    return {
        "id": id,
        "zip_code": zip_code
    }