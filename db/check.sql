SELECT *
FROM "Player"
JOIN "Injured" ON "Player"."player_id" = "Injured"."player_id"
WHERE "Injured"."injured" = TRUE;