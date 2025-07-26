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

    const organizationId = (User.organization_id ?? undefined) as string | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      ownerId: User.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  }
})

export const get = query({
  args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx,{search, paginationOpts}) => {
    const User = await ctx.auth.getUserIdentity();

    if (!User) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (User.organization_id ?? undefined) as | string | undefined;

    //search within an organization
    if(search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex('search_title',(q)=>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    //search within the user's documents
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex('search_title',(q)=>
          q.search("title", search).eq("ownerId", User.subject)
        )
        .paginate(paginationOpts);
    }

    //All docs inside an organization
    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("byOrganization", (q) => q.eq("organizationId", organizationId))
        .paginate(paginationOpts);
    }

    //All personal docs
    return await ctx.db
        .query("documents")
        .withIndex("byOwner", (q) => q.eq("ownerId", User.subject))
        .paginate(paginationOpts);
    // do something with `documents`
  },
});

export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const User = await ctx.auth.getUserIdentity();

    if (!User) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === User.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized: You are not the owner of this document");
    }

    await ctx.db.delete(args.id);
  }
})

export const updateById = mutation({
  args: { id: v.id("documents") , title: v.string()},
  handler: async (ctx, args) => {
    const User = await ctx.auth.getUserIdentity();

    if (!User) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === User.subject;
    if (!isOwner) {
      throw new ConvexError("Unauthorized: You are not the owner of this document");
    }

    await ctx.db.patch(args.id, { title: args.title });
  }
})