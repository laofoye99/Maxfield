"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/components/blog/MdxComponents";

type Props = {
  source: MDXRemoteSerializeResult;
};

export function MdxContent({ source }: Props) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
