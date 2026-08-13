import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Background } from "@/components/portfolio/Background";
import { Hero } from "@/components/portfolio/Hero";
import { About, Education, Experience, Projects, Services, Skills, Stats } from "@/components/portfolio/Sections";
import { Contact, Footer } from "@/components/portfolio/Contact";

const TITLE = "Samiksha Zelkar — Backend & Data Science Developer";
const DESC =
  "Portfolio of Samiksha Sunil Zelkar: backend developer working with C#, ASP.NET Core Web API, PostgreSQL, and machine learning with Python.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
