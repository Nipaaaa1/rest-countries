"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import getCurrencies from "@/utils/getCurrencies";
import { getData } from "@/utils/getData";
import getLanguages from "@/utils/getLanguages";
import getNativeName from "@/utils/getNativeName";
import { DetailedCountry } from "@/utils/types";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const [data, setData] = useState<DetailedCountry[]>();
  const params = useParams<{
    slug: string;
  }>();
  let nativeName: string[] = [];
  let currencies: string[] = [];
  let languages: string[] = [];
  useEffect(() => {
    getData(
      `https://restcountries.com/v3.1/name/${params.slug}?fields=name,tld,currencies,languages,flags,borders,population,region,subregion,capital`,
      setData,
    );
  }, []);
  if (data) {
    nativeName = getNativeName(data[0]);
    currencies = getCurrencies(data[0]);
    languages = getLanguages(data[0]);
  }
  return (
    <>
      <Button
        asChild
        variant={"ghost"}
        className="flex w-max gap-2 bg-white px-6 shadow-md dark:bg-card"
      >
        <Link href="/">
          <ArrowLeftIcon className="size-3" />
          Back
        </Link>
      </Button>
      <div className="grid w-full grid-cols-1 gap-10">
        {data ? (
          <>
            <Image
              src={data[0].flags.svg as string}
              alt={`${data[0].name.common}'s flag`}
              width={0}
              height={0}
              className="h-max w-full shadow-md"
            />
            <div className="space-y-6">
              <h1 className="text-xl font-extrabold">{data[0].name.common}</h1>
              <ul>
                <li className="space-x-1">
                  <span className="font-semibold">Native Name: </span>
                  {nativeName.join(", ")}
                </li>
                <li>
                  <span className="font-semibold">Population: </span>
                  {data[0].population.toLocaleString("en-US")}
                </li>
                <li>
                  <span className="font-semibold">Region: </span>
                  {data[0].region}
                </li>
                <li>
                  <span className="font-semibold">Sub Region: </span>
                  {data[0].subregion}
                </li>
                <li>
                  <span className="font-semibold">Capital: </span>
                  {data[0].capital}
                </li>
              </ul>
              <ul>
                <li>
                  <span className="font-semibold">Top Level Domain: </span>
                  {data[0].tld.join(", ")}
                </li>
                <li>
                  <span className="font-semibold">Currencies: </span>
                  {currencies.join(", ")}
                </li>
                <li>
                  <span className="font-semibold">Languages: </span>
                  {languages.join(", ")}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Border Countries: </h2>
              <div className="flex flex-wrap gap-2">
                {data[0].borders.map((value, index) => (
                  <span
                    key={index}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "bg-white px-6 dark:bg-card",
                    })}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
