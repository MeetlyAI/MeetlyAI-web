import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createMeet = mutation({
    args: {
        userId: v.string(),
        img: v.string(),
        date: v.string(),
        cleanRes: v.string(),
        embedding: v.optional(v.array(v.float64())),
        jsonText: v.optional(v.string()),
        fileName:v.string() // Make jsonText optional
    },
  
    handler: async (ctx, args) => {
        return await ctx.db.insert("meet", args);
    },
});
export const getMeet=query({
    args:{
        userId:v.string()
    },

    handler:async(ctx, args)=> {
    const result=await ctx.db.query('meet')
    .filter((q)=>q.eq(q.field('userId'),args.userId))
    .collect() 

    return result;
    },
})