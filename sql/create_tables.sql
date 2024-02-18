
---------------------
-- Table: public.Team
CREATE SEQUENCE IF NOT EXISTS public."Team_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."Team"
(
    id integer NOT NULL DEFAULT nextval('"Team_id_seq"'::regclass),
    "teamOptaId" text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    "coachOptaId" text COLLATE pg_catalog."default",
    CONSTRAINT "Team_pkey" PRIMARY KEY (id)
);

-- Index: Team_teamOptaId_key
CREATE UNIQUE INDEX IF NOT EXISTS "Team_teamOptaId_key"
    ON public."Team" USING btree
    ("teamOptaId" COLLATE pg_catalog."default" ASC NULLS LAST)
;


-----------------------
-- Table: public.Player
CREATE SEQUENCE IF NOT EXISTS public."Player_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
    
CREATE TABLE IF NOT EXISTS public."Player"
(
    id integer NOT NULL DEFAULT nextval('"Player_id_seq"'::regclass),
    "playerOptaId" text COLLATE pg_catalog."default" NOT NULL,
    firstname text COLLATE pg_catalog."default" NOT NULL,
    lastname text COLLATE pg_catalog."default" NOT NULL,
    "position" varchar(255) NOT NULL,
    "optaPosition" text COLLATE pg_catalog."default" NOT NULL,
    "teamId" integer,
    "teamOptaId" text COLLATE pg_catalog."default" NOT NULL,
    attack double precision NOT NULL DEFAULT 0,
    defense double precision NOT NULL DEFAULT 0,
    strength double precision NOT NULL DEFAULT 0,
    impact double precision NOT NULL DEFAULT 0,
    skills double precision NOT NULL DEFAULT 0,
    scoring double precision NOT NULL DEFAULT 0,
    CONSTRAINT "Player_pkey" PRIMARY KEY (id),
    CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId")
        REFERENCES public."Team" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

-- Index: Player_playerOptaId_key
CREATE UNIQUE INDEX IF NOT EXISTS "Player_playerOptaId_key"
    ON public."Player" USING btree
    ("playerOptaId" COLLATE pg_catalog."default" ASC NULLS LAST)
;


-------------------------
-- Table: public.RealGame
CREATE SEQUENCE IF NOT EXISTS public."RealGame_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public."RealGame"
(
    id integer NOT NULL DEFAULT nextval('"RealGame_id_seq"'::regclass),
    "realGameOptaId" text COLLATE pg_catalog."default" NOT NULL,
    "awayScore" integer NOT NULL DEFAULT 0,
    "awayTeamName" text COLLATE pg_catalog."default",
    "awayTeamOptaId" text COLLATE pg_catalog."default",
    "awayTeamId" integer,
    "homeScore" integer NOT NULL DEFAULT 0,
    "homeTeamId" integer,
    "homeTeamName" text COLLATE pg_catalog."default" NOT NULL,
    "homeTeamOptaId" text COLLATE pg_catalog."default" NOT NULL,
    "compName" text COLLATE pg_catalog."default" NOT NULL,
    datetime timestamp(3) without time zone,
    date text COLLATE pg_catalog."default",
    "winnerTeamOptaId" text COLLATE pg_catalog."default",
    "seasonOptaId" text COLLATE pg_catalog."default" NOT NULL,
    status varchar(255) NOT NULL,
    round integer NOT NULL DEFAULT 0,
    "roundType" varchar(255) NOT NULL DEFAULT 'UNKNOWN',
    "championshipSeasonId" integer NOT NULL,
    CONSTRAINT "RealGame_pkey" PRIMARY KEY (id),
    CONSTRAINT "RealGame_awayTeamId_fkey" FOREIGN KEY ("awayTeamId")
        REFERENCES public."Team" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT "RealGame_homeTeamId_fkey" FOREIGN KEY ("homeTeamId")
        REFERENCES public."Team" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);
-- Index: RealGame_realGameOptaId_key
CREATE UNIQUE INDEX IF NOT EXISTS "RealGame_realGameOptaId_key"
    ON public."RealGame" USING btree
    ("realGameOptaId" COLLATE pg_catalog."default" ASC NULLS LAST)
;


-------------------------------
-- Table: public.RealGamePlayer
CREATE TABLE IF NOT EXISTS public."RealGamePlayer"
(
    "realGameId" integer NOT NULL,
    "realGameOptaId" text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    "optaPosition" text COLLATE pg_catalog."default",
    "playerOptaId" text COLLATE pg_catalog."default" NOT NULL,
    "position" varchar(255) NOT NULL,
    "positionOptaId" text COLLATE pg_catalog."default" NOT NULL,
    "playerStats" jsonb NOT NULL,
    "teamId" integer,
    "teamOptaId" text COLLATE pg_catalog."default" NOT NULL,
    "playerId" integer,
    "playerPoints" double precision,
    "playerStatusUpdateAt" timestamp(3) without time zone,
    CONSTRAINT "RealGamePlayer_pkey" PRIMARY KEY ("realGameOptaId", "playerOptaId"),
    CONSTRAINT "RealGamePlayer_playerId_fkey" FOREIGN KEY ("playerId")
        REFERENCES public."Player" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT "RealGamePlayer_realGameId_fkey" FOREIGN KEY ("realGameId")
        REFERENCES public."RealGame" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
