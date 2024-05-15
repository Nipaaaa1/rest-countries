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

interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  capital: string[];
}

export default function Home() {
  const [data, setData] = useState<Country[]>();
  const [search, setSearch] = useState<string>();
  const [region, setRegion] = useState<string>("asia");

  let searchTimeout: any;

  const getData = async (url: string) => {
    try {
      const response = await axios.get<Country[]>(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };

  useEffect(() => {
    if (search) {
      console.log(search);
      getData(
        `https://restcountries.com/v3.1/name/${search.toLowerCase()}?fields=flags,name,population,region,capital`,
      );
    }
    console.log(data);
  }, [search]);

  return (
    <>
      <div className="flex items-center gap-2 rounded-md bg-white px-6 py-2 shadow-md">
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
            className="flex justify-between gap-8 bg-white px-6 py-6 text-foreground shadow-md"
          >
            Filter by Region
            <ChevronDownIcon className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 p-4">
          <DropdownMenuLabel>
            <span className="font-semibold">Region:</span> {region}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={region} onValueChange={setRegion}>
            <DropdownMenuRadioItem value="Africa">Africa</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="America">
              America
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Asia">Asia</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Europe">Europe</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Oceania">
              Oceania
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <main className="grid w-full grid-cols-1 gap-6">
        {data
          ? data
              .filter((data) => data.region == region)
              .map((country) => (
                <Card key={country.name.common} className="overflow-clip">
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
                        {country.population}
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
              ))
          : ((<p>Start searching</p>) as any)}
      </main>
    </>
  );
}
