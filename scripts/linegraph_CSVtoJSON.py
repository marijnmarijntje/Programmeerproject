# This file converts a CSV document to a JSON 
# The data will be used for vis. 2 (worldmap) and vis. 4 (piechart)

import csv
import json


information ={}

json_file = open("../worldwide carbon emissions/data/linegraph.json", "w")

def writeDataJSON(year, countrycode, country, seriesname, value):
        key = ""
        if year not in information:
                information[year] = {}
        if countrycode not in information[year]:
                information[year][countrycode] = {}
                information[year][countrycode]["piechart"] = []
        if country not in information[year][countrycode]:
                information[year][countrycode]["country"] = country
        if countrycode not in information[year][countrycode]:
                information[year][countrycode]["code"] = countrycode
        if seriesname == "EN.ATM.CO2E.PC": 
                if "co2emissions" not in information[year][countrycode]:
                        information[year][countrycode]["co2emissions"] = value
                if value == "nd":
                        key = "noData"
                elif float(value) <= 1:
                        key = "low"
                elif float(value) <= 5:
                        key = "medLow"
                elif float(value) <= 10:
                        key = "medium"
                elif float(value) <= 20:
                        key = "medHigh"
                else:
                        key = "high"
                information[year][countrycode]["fillKey"] = key
        if seriesname == "NY.GDP.PCAP.CD":
                if "gdp" not in information[year][countrycode]:
                        information[year][countrycode]["gdp"] = value
        if seriesname == "EN.CO2.MANF.ZS":                
                piechart_dict = {}
                piechart_dict["seriesname"] = "Manufacturing industries and construction"
                piechart_dict["value"] = value
                information[year][countrycode]["piechart"].append(piechart_dict)
        if seriesname == "EN.CO2.OTHX.ZS":                
                piechart_dict = {}
                piechart_dict["seriesname"] = "Other sectors"
                piechart_dict["value"] = value
                information[year][countrycode]["piechart"].append(piechart_dict)
        if seriesname == "EN.CO2.TRAN.ZS":                
                piechart_dict = {}
                piechart_dict["seriesname"] = "Transport"
                piechart_dict["value"] = value
                information[year][countrycode]["piechart"].append(piechart_dict)
        if seriesname == "EN.CO2.ETOT.ZS":                
                piechart_dict = {}
                piechart_dict["seriesname"] = "Electricity and heat production"
                piechart_dict["value"] = value
                information[year][countrycode]["piechart"].append(piechart_dict)
        if seriesname == "EN.CO2.BLDG.ZS":                
                piechart_dict = {}
                piechart_dict["seriesname"] = "Residential buildings and public & commercial services"
                piechart_dict["value"] = value
                information[year][countrycode]["piechart"].append(piechart_dict)        


with open("../worldwide carbon emissions/data/linegraph.csv", "rU") as infile:
        reader = csv.reader(infile)
        next(infile)
        years = [1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,
                1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,
                1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,
                2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013]

        for row in reader:
                country = row[2]
                countrycode = row[3]
                seriesname = row[1]
                index = 0
                for i in range (0, len(years)):
                        year = years[i]                 
                        value = row[4+i]
                        writeDataJSON(year, countrycode, country, seriesname, value)


json.dump(information, json_file, ensure_ascii=False)