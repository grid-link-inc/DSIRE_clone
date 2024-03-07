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
                    program.end_date,
                    technology.name AS technology
                FROM program
                JOIN state on program.state_id = state.id
                JOIN program_type on program.program_type_id = program_type.id
                JOIN program_category on program.program_category_id = program_category.id
                LEFT JOIN program_technology ON program.id = program_technology.program_id
                LEFT JOIN technology ON program_technology.technology_id = technology.id
                WHERE program.published = 1;
            """)).fetchall()

            programs = {}
            for row in results:
                id, name, state, website, program_type, program_category, start_date, end_date, technology = row
                if id not in programs:
                    programs[id] = row_to_base_program(*row)
                if technology and technology != "Yes; specific technologies not identified":
                    programs[id]["technologies"].append(technology)

            # TODO create view for this query
            return {"programs": list(programs.values())}
            return {"programs": []}
    except Exception as e:
        print(e)
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=(str(e))
        )
    
def row_to_base_program(id, name, state, website, program_type, program_category, start_date, end_date, technology):
    return {
        "id": id,
        "name": name,
        "state": state,
        "website": website,
        "program_type": program_type,
        "program_category": program_category,
        "start_date": start_date,
        "end_date": end_date,
        "technologies": []
    }

@https_fn.on_call(
    secrets=[PROTOTYPING_DB_PW],
    enforce_app_check=ENFORCE_APP_CHECK
)
def get_program_enriched_v2(
    request: https_fn.CallableRequest
):
    try: 
        program_id = request.data.get('id')
        db_user = 'postgres'
        db_name = 'postgres'
        db_pass = PROTOTYPING_DB_PW.value
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
        # TODO fetch all technologies
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