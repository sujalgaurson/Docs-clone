import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const User = await ctx.auth.getUserIdentity();

    if (!User) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: User.subject,
      initialContent: args.initialContent,
    });
  }
})

export const get = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
    // do something with `documents`
  },
});

export const removeById = mutation({
  args: { Id: v.id("documents") },
  handler: async (ctx, args) => {
    const User = await ctx.auth.getUserIdentity();

    if (!User) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.Id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === User.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized: You are not the owner of this document");
    }

    await ctx.db.delete(args.Id);
  }
})

export const updateById = mutation({
  args: { Id: v.id("documents") , title: v.string()},
  handler: async (ctx, args) => {
    const User = await ctx.auth.getUserIdentity();

    if (!User) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.Id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === User.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized: You are not the owner of this document");
    }

    await ctx.db.patch(args.Id, { title: args.title });
  }
})