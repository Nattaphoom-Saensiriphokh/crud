import Blogs from "@/app/ui/blogs";
import MyFallback from "../ui/my-fallback";
import { Suspense } from "react";
import { BlogListSkeleton } from "../ui/my-skeleton";

<Suspense fallback={<BlogListSkeleton />}>
  <Blogs />
</Suspense>;
export default function BlogPage() {
  return (
    <main style={{ padding: "24px" }}>
      <header style={{ marginBottom: "16px", borderBottom: "1px solid #eee" }}>
        <h1>ยินดีต้อนรับสู่บล็อกข่าวสาร</h1>
        <p>บทความเทคโนโลยีและข่าวสารอัปเดตล่าสุด</p>
      </header>

      <section>
        <h2>รายการบทความ</h2>
        <Blogs />
      </section>
    </main>
  );
}