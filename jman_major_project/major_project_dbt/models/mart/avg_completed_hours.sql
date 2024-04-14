{{
    config(
        tags=['mart']
    )
}}

WITH

avg_completed_hours AS (
    SELECT email, AVG(hours) AS avg_hours_to_complete
    FROM {{ ref("stg_completed_hours") }}
    GROUP BY email
    ORDER BY avg_hours_to_complete
)

SELECT * FROM avg_completed_hours
