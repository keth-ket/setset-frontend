"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { business } from "@/lib/sampleData";
import { BusinessInfo } from "@/lib/types";
<<<<<<< HEAD
import { BusinessPaginate} from "../business/business-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

//some icons that needed
import { MessageSquareText, Search } from "lucide-react";
=======
import { BusinessPaginate } from "../business/business-pagination";

//some icons that needed
import { MessageSquareText, Search, Funnel, Folders} from "lucide-react";
>>>>>>> businesses-page-bugfix

//shadcn card ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const layoutFormat = "flex flex-items";
<<<<<<< HEAD
const paginationItemformat = "bg-card text-card-foreground rounded-lg";
=======
const DropdownMenuTriggerFormat =
  "flex flex-row gap-x-3 items-center p-3 rounded-lg bg-card text-card-foreground text-sm";
const DropdownMenuContentFormat =
  "p-2 rounded-lg bg-foreground text-accent text-sm";

const DropdownMenuIconSize = 15;
>>>>>>> businesses-page-bugfix

//Format value for money and satisfaction
const formatValue = (value: number, type: string) => {
  if (type === "money-saved") {
    return `$${value.toLocaleString()}`;
  }
  if (type === "satisfaction") {
    // Keep decimal places for satisfaction score
    return `${value.toFixed(2)}/10`;
  }
  return value.toLocaleString(); // Add commas for large numbers
};

<<<<<<< HEAD
const getFilteredBusiness = (search: string, business: BusinessInfo[]) => {
  if (!search) {
=======
//filtered based on search and Category
const getFilteredBusiness = (
  search: string,
  category: string,
  business: BusinessInfo[],
) => {
  if (!search && !category) {
>>>>>>> businesses-page-bugfix
    return business;
  }

  return business.filter((b) => {
    const matchesSearch = search
      ? b.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = category ? b.content === category : true;
    return matchesSearch && matchesCategory;
  });
};

<<<<<<< HEAD
=======
const getSortedBusiness = (
  filteredBusiness: BusinessInfo[],
  filterPicked: string,
) => {
  switch (filterPicked) {
    case "Most Money Saved":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[0].value - a.cards[0].value,
      );
    case "Most Satisfied":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[1].value - a.cards[1].value,
      );
    case "Most Minutes Saved":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[2].value - a.cards[2].value,
      );
    case "Most New Callers":
      return [...filteredBusiness].sort(
        (a, b) => b.cards[3].value - a.cards[3].value,
      );
    default:
      return filteredBusiness;
  }
};

>>>>>>> businesses-page-bugfix
const Business = ({ isAdminPage }: { isAdminPage: boolean }) => {
  //calculation for pagination
  //if admin show 5 otherwise show 6
  const itemsPerPage = isAdminPage ? 5 : 6;
<<<<<<< HEAD
  const maxPages = Math.ceil(business.length / itemsPerPage);
=======
>>>>>>> businesses-page-bugfix
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(itemsPerPage);
  const [activePage, setActivePage] = useState(1);

  //handle searching
  const [search, setSearch] = useState("");

  //handle category
  // Extract unique categories from business descriptions
  const uniqueCategories = [...new Set(business.map((b) => b.content))];
  const [selectedCategory, setSelectedCategory] = useState("");

  //handle filter
  const filters = [
    "Most Money Saved",
    "Most Satisfied",
    "Most Minutes Saved",
    "Most New Callers",
  ];
  const [filterPicked, setFilterValue] = useState("");

  const handlePageChange = (page: number) => {
    setActivePage(page);
    setStartIndex((page - 1) * itemsPerPage);
    setEndIndex(page * itemsPerPage);
  };

  let filteredBusiness = getFilteredBusiness(
    search,
    selectedCategory,
    business,
  );

  filteredBusiness = getSortedBusiness(filteredBusiness, filterPicked);

  const maxPages = Math.ceil(filteredBusiness.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    setStartIndex((page - 1) * itemsPerPage);
    setEndIndex(page * itemsPerPage);
  };
  
  return (
<<<<<<< HEAD
    <div className="flex h-full flex-grow flex-col flex-wrap gap-y-8">
      <div className="flex w-[20%] flex-row items-center gap-0 rounded-lg border-2 bg-card pb-0 text-card-foreground">
        <Search className="ml-2" />
        <Input
          type="text"
          placeholder="Search Business"
          className="border-none focus-visible:ring-0"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-16 flex flex-grow flex-col gap-y-6">
        {filteredBusiness.slice(startIndex, endIndex).map((business) => (
          <div className={layoutFormat} key={business.id}>
            <Card className="flex w-full flex-row justify-between">
              <CardContent className="ml-6 flex w-[20%] items-center gap-[1vw] p-0">
                <div className="flex items-center justify-center">
                  <img
                    src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1197025.jpg"
                    alt="business logo"
                    className="h-12 w-12 rounded-lg"
                  />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-lg font-light">
                    {business.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Card Description
                  </CardDescription>
                </div>
              </CardContent>

              <CardContent className="flex w-[70%] flex-row justify-between gap-x-10 p-3">
                {business.cards.map((card) => (
                  <div key={card.id} className="flex w-[15%] gap-x-2">
                    <div className="flex items-center justify-center rounded-xl p-3">
                      {card.icon}
                    </div>
                    <div className="flex flex-col justify-center lg:gap-1">
                      <p className="text-xs">{card.title}</p>
                      <p className="text-2xl font-bold">
                        {formatValue(card.value, card.id)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardContent className="mr-6 flex w-[10%] flex-row items-center justify-end p-0">
                <Button className="bg-sidebar-ring text-accent hover:bg-sidebar-ring/50">
                  <MessageSquareText />
                  <p>Chat</p>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {!isAdminPage && (
        <div className="absolute bottom-6 flex w-full items-center">
          <BusinessPaginate
            activePage={activePage}
            maxPages={maxPages}
            onPageChange={handlePageChange}
          />
        </div>
=======
    <div className="flex flex-grow flex-col gap-y-8">

      <div className="flex flex-row justify-between">
        <div className="flex w-fit flex-row items-center gap-0 rounded-lg border-2 bg-card pb-0 text-card-foreground">
          <Search className="ml-2" />
          <Input
            type="text"
            placeholder="Search Business"
            className="border-none focus-visible:ring-0"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-row gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger className={DropdownMenuTriggerFormat}>
              <Folders size={DropdownMenuIconSize}/> 
              {selectedCategory || "Category"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={DropdownMenuContentFormat}>
              <DropdownMenuItem onSelect={() => setSelectedCategory("")}>
                All Category
              </DropdownMenuItem>
              {uniqueCategories.map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className={DropdownMenuTriggerFormat}>
              <Funnel size={DropdownMenuIconSize}/> 
              {filterPicked || "Filter"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={DropdownMenuContentFormat}>
              <DropdownMenuItem onSelect={() => setFilterValue("")}>
                No Filter
              </DropdownMenuItem>
              {filters.map((filter, index) => (
                <DropdownMenuItem
                  key={index}
                  onSelect={() => setFilterValue(filter)}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>  
        </div>
      </div>
      <div className="mb-14 flex flex-col gap-y-6">
        {filteredBusiness.slice(startIndex, endIndex).map((business) => (
          <div className={layoutFormat} key={business.id}>
            <Card className="flex w-full flex-row flex-wrap justify-between">
              <CardContent className="flex flex-initial flex-row flex-wrap items-center gap-x-4 p-6 lg:ml-6 lg:w-[18%] lg:p-0">
                <div className="flex items-center justify-center">
                  <img
                    src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1197025.jpg"
                    alt="business logo"
                    className="h-10 w-10 rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <CardTitle className="text-sm font-light">
                    {business.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {business.content}
                  </CardDescription>
                </div>
              </CardContent>

              <CardContent className="flex flex-initial flex-row flex-wrap justify-between p-3 lg:w-[65%]">
                {business.cards.map((card) => (
                  <div key={card.id} className="flex flex-initial gap-x-1">
                    <div className="flex items-center justify-center rounded-xl p-3">
                      {card.icon}
                    </div>
                    <div className="flex flex-col justify-center lg:gap-1">
                      <p className="text-xs">{card.title}</p>
                      <p className="text-base font-bold">
                        {formatValue(card.value, card.id)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <CardContent className="mr-6 flex flex-initial flex-row items-center justify-end lg:w-[10%] lg:p-0">
                <Button className="bg-sidebar-ring text-accent hover:bg-sidebar-ring/50">
                  <MessageSquareText />
                  <p className="text-xs">Chat</p>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {!isAdminPage && (
        <div className="absolute bottom-6 flex w-full items-center">
          <BusinessPaginate
            activePage={activePage}
            maxPages={maxPages}
            onPageChange={handlePageChange}
          />
        </div>
>>>>>>> businesses-page-bugfix
      )}
    </div>
  );
};

export default Business;
