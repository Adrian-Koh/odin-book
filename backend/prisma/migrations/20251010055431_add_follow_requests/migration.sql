-- CreateTable
CREATE TABLE "public"."FollowRequest" (
    "requesterId" INTEGER NOT NULL,
    "responderId" INTEGER NOT NULL,

    CONSTRAINT "FollowRequest_pkey" PRIMARY KEY ("requesterId","responderId")
);

-- AddForeignKey
ALTER TABLE "public"."FollowRequest" ADD CONSTRAINT "FollowRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FollowRequest" ADD CONSTRAINT "FollowRequest_responderId_fkey" FOREIGN KEY ("responderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
