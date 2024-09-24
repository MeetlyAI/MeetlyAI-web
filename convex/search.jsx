import { v } from "convex/values";
import { action } from "./_generated/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");


export const vectorSearchMeet = action({
  args: { 
    query: v.string(),
    id: v.optional(v.string()),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const { query, id, limit = 10 } = args;
    
    
      const genAI = new GoogleGenerativeAI("AIzaSyCTRZ4q_hKvggvM_rApR_10l3nMr6OtASM");
      const modelE = genAI.getGenerativeModel({ model: "text-embedding-004" });
          const resultE = await modelE.embedContent(query);
          const searchEmbedding = resultE.embedding;
          
    
    // let filterQuery = (q) => q;
    // if (id) {
    //   filterQuery = (q) => q.eq("cleanRes", id);
    // }
    
    const results = await ctx.vectorSearch("meet", "by_embedding", {
      vector: searchEmbedding.values,
      limit: limit,
      filter: (q) => q.eq("cleanRes", id),
    });

    // return results.map(result => ({
    //   id: result._id,
    //   score: result._score,
    //   userId: result.document.userId,
    //   img: result.document.img,
    //   date: result.document.date,
    //   cleanRes: result.document.cleanRes,
    //   fileName: result.document.fileName,
    //   jsonText: result.document.jsonText
    // }));
     return results.map(result => result.document.jsonText);

  },
});
