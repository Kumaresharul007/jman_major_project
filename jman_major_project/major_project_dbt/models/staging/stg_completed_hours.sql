{{
    config(
        tags=['basic', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT

        id,
        email,
        designation,
        training_name,
        hours,
        total_hours

    FROM {{ source('etms', 'completed_hours') }}

)

SELECT * FROM required_fields