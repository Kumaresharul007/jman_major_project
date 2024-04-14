{{
    config(
        tags=['basic', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT

        id,
        first_name,
        last_name,
        email,
        pass,
        new_user,
        designation

    FROM {{ source('etms', 'users') }}

)

SELECT * FROM required_fields