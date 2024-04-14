{{
    config(
        tags=['mart']
    )
}}

WITH

completion_efficiency AS (
    SELECT email, (total_hours-hours) AS hours_to_complete,
    CASE
        WHEN (total_hours - hours) < 0 THEN 'deadline crossed'
        ELSE 'Completed on time'
    END AS status
    FROM {{ ref("stg_completed_hours") }}
    ORDER BY hours_to_complete desc
)

SELECT * FROM completion_efficiency
