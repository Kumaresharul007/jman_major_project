{{
    config(
        tags=['basic', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT

        id,
        designation,
        training_name,
        trainer_name,
        start_date,
        end_date,
        no_of_days

    FROM {{ source('etms', 'training_plans') }}

)

SELECT * FROM required_fields