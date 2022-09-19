import { z } from "zod";
import { createRouter } from "./context";

export const eventRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.event.findMany({ orderBy: { createdAt: "desc" } })
      } catch (error) {
        console.log("error", error)
      }
    }
  })
  .query("getOne", {
    input: z.object({
      eventId: z.string()
    }),
    async resolve({ ctx, input }) {
      try {
        return await ctx.prisma.event.findFirst({ where: { id: input.eventId } })
      } catch (error) {
        console.log("error", error)
      }
    }
  })
  .mutation("postEvent", {
    input: z.object({
      name: z.string(),
      description: z.string(),
      location: z.string(),
      contactEmail: z.string(),
      contactPhone: z.string(),
      private: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.event.create({
          data: {
            name: input.name,
            description: input.description,
            location: input.location,
            contactEmail: input.contactEmail,
            contactPhone: input.contactPhone,
            private: input.private,
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  });