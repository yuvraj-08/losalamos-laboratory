"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllCategories, getPopularTests } from "@/data/mock-data";
import type { Test, TestCategory } from "@/types";
import { TestCard } from "@/components/TestCard";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<TestCategory[]>([]);
  const [popularTests, setPopularTests] = useState<Test[]>([]);

  useEffect(() => {
    // Fetch data
    const fetchedCategories = getAllCategories();
    const fetchedPopularTests = getPopularTests();

    setCategories(fetchedCategories);
    setPopularTests(fetchedPopularTests);

    // Animate header
    const headerTimeline = gsap.timeline();
    headerTimeline.fromTo(
      ".page-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // Animate search bar
    headerTimeline.fromTo(
      ".search-container",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );

    // Set up scroll animations for categories
    gsap.utils.toArray(".category-section").forEach((section: any, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            section.querySelector(".category-header"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        },
      });
    });
  }, []);

  // Filter tests based on search query and active category
  const getFilteredTests = () => {
    if (!searchQuery && !activeCategory) {
      return null; // Show all categories
    }

    const filteredTests: Test[] = [];

    categories.forEach((category) => {
      if (category.tests) {
        category.tests.forEach((test) => {
          // Filter by search query
          const matchesSearch = searchQuery
            ? test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              test.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

          // Filter by category
          const matchesCategory = activeCategory
            ? category.id === activeCategory
            : true;

          if (matchesSearch && matchesCategory) {
            filteredTests.push(test);
          }
        });
      }
    });

    return filteredTests;
  };

  const filteredTests = getFilteredTests();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="page-header mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lab Tests</h1>
        <p className="text-gray-500 mt-2">
          Browse our comprehensive range of diagnostic tests
        </p>
      </div>

      <div className="search-container mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              className={
                activeCategory === null ? "bg-teal-600 hover:bg-teal-700" : ""
              }
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={
                  activeCategory === category.id
                    ? "bg-teal-600 hover:bg-teal-700"
                    : ""
                }
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredTests ? (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No tests found
              </h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Popular Tests Section */}
          {popularTests.length > 0 && (
            <div className="mb-12 category-section">
              <div className="category-header mb-6">
                <h2 className="text-2xl font-semibold">Popular Tests</h2>
                <p className="text-gray-500 mt-1">
                  Most frequently booked diagnostic tests
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </div>
          )}

          {/* Categories Sections */}
          {categories.map((category) => (
            <div key={category.id} className="mb-12 category-section">
              <div className="category-header mb-6">
                <h2 className="text-2xl font-semibold">{category.name}</h2>
                <p className="text-gray-500 mt-1">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tests?.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
              <Separator className="mt-12" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
