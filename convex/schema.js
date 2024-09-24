import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  meet: defineTable({
    cleanRes: v.string(),
    date: v.string(),
    embedding: v.array(v.float64()),
    fileName: v.string(),
    img: v.string(),
    jsonText: v.string(),
    userId: v.string(),
  })
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 768, 
       filterFields: ["cleanRes"]
    })
    .index("by_cleanRes", ["cleanRes"]),
});
