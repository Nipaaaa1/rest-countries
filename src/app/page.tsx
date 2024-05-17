"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { getData } from "@/utils/getData";
import { Country } from "@/utils/types";

export default function Home() {
  const [data, setData] = useState<Country[]>();
  const [search, setSearch] = useState<string>();
  const [region, setRegion] = useState<string>("Asia");

  let searchTimeout: any;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };

  useEffect(() => {
    if (search) {
      getData(
        `https://restcountries.com/v3.1/name/${search.toLowerCase()}?fields=flags,name,population,region,capital`,
        setData,
      );
    }
  }, [search]);

  return (
    <>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="flex w-full max-w-96 items-center gap-2 rounded-md bg-white px-6 py-2 shadow-md dark:bg-card">
          <MagnifyingGlassIcon className="size-5 opacity-60" />
          <Input
            className="border-0 shadow-none"
            type="text"
            onChange={handleSearch}
            placeholder="Search for a country..."
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="flex w-max justify-between gap-8 bg-white px-6 py-6 text-foreground shadow-md dark:bg-card"
            >
              Filter by Region
              <ChevronDownIcon className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 p-4 dark:bg-card">
            <DropdownMenuLabel>
              <span className="font-semibold">Region:</span> {region}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-foreground/20" />
            <DropdownMenuRadioGroup value={region} onValueChange={setRegion}>
              <DropdownMenuRadioItem value="Africa">
                Africa
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Americas">
                Americas
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Asia">Asia</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Europe">
                Europe
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Oceania">
                Oceania
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data
          ? data
              .filter((data) => data.region == region)
              .map((country) => (
                <Link
                  href={`/detail/${country.name.common}`}
                  key={country.name.common}
                >
                  <Card className="overflow-clip transition ease-in-out hover:scale-105">
                    <CardHeader className="p-0">
                      <Image
                        src={country.flags.svg}
                        alt={`${country.name.common}'s flag`}
                        width={0}
                        height={0}
                        className="h-max w-full border-b"
                      />
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <span className="font-extrabold">
                        {country.name.common}
                      </span>
                      <ul>
                        <li>
                          <span className="font-semibold">Population:</span>{" "}
                          {country.population.toLocaleString("en-US")}
                        </li>
                        <li>
                          <span className="font-semibold">Region:</span>{" "}
                          {country.region}
                        </li>
                        <li>
                          <span className="font-semibold">Capital:</span>{" "}
                          {country.capital}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              ))
          : ((<p>Start searching</p>) as any)}
      </main>
    </>
  );
}
