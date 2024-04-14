{{
    config(
        tags=['basic', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT

        id,
        username,
        password

    FROM {{ source('etms', 'admin') }}

)

SELECT * FROM required_fields