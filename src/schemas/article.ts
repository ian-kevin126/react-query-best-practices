import { z } from "zod";

/**
 * Zod 是一个功能强大的 TypeScript 模式验证库，可轻松定义和验证数据模式。它为验证数据提供了简单直观的 API，
 * 确保数据符合特定的规则和约束。这使我们更容易在开发过程的早期发现错误和 bug。
 */

// 有些时候，即使数据不存在，TypeScript 也会尝试显示它而不会出错。
// 如果你要对不正确的字段进行某些操作，这可能会造成问题。这就是 Zod 的作用所在。

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  twitter_username: z.string(),
  github_username: z.string(),
  user_id: z.number(),
  website_url: z.string(),
  profile_image: z.string(),
  profile_image_90: z.string(),
});

export const ArticleSchema = z.object({
  type_of: z.string(),
  id: z.number(),
  title: z.string(),
  description: z.string(),
  readable_publish_date: z.string(),
  slug: z.string(),
  path: z.string(),
  url: z.string(),
  comments_count: z.number(),
  public_reactions_count: z.number(),
  published_timestamp: z.string(),
  // collection_id: z.string(),
  // 改回正确的类型校验：可能为空
  collection_id: z.nullable(z.string()),
  positive_reactions_count: z.number(),
  cover_image: z.string(),
  social_image: z.string(),
  canonical_url: z.string(),
  created_at: z.string(),
  // edited_at: z.string(),
  // 改回正确的类型校验：可能为空
  edited_at: z.nullable(z.string()),
  published_at: z.string(),
  last_comment_at: z.string(),
  reading_time_minutes: z.number(),
  tag_list: z.array(z.string()),
  tags: z.string(),
  user: UserSchema,
});

export const ArticlesSchema = z.array(ArticleSchema);
