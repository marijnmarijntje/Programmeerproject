# Styleguide

## Algemeen
Boven elk bestand naam en functie van bestand neerzetten

## HTML
Gebruik kleine letters, bijvoorbeeld <section> en niet <SECTION>
Sluit alle tags
Maak gebruik van indentatie. Gebruik hiervoor twee spaties, niet de tab
Zet geen onnodige witregels in je bestand
Zet alle waarden in quotes, bijvoorbeeld class = “striped” en niet class = striped
Zet geen spaties tussen = tekens. Bijvoorbeeld <link rel="stylesheet" href="styles.css"> en niet <link rel = "stylesheet" href  = "styles.css">
Lines niet langer dan 80 characters (algemeen?)
Korte comments van 1 regel opschrijven als <!-- This is a comment -->
Lange comments als: 
<!-- 
  This is a long comment example. This is a long comment example.
  This is a long comment example. This is a long comment example.
-->

## CSS
Korte namen, maar wel lang genoeg: (#nav en niet #navigation, .author en niet .atr)
Schrijf dingen als .demo-image en niet als .demoimage of .demo_image
Zorg dat je consistent bent in het gebruik van witregels. Wissel niet tussen spaties en tabs voor indentatie. 
Plaats Comments op een nieuwe regel boven de code die het beschrijft.  Breek ook je unit css in stukjes zodat het goed leesbaar is. Voor verdere uitleg zie https://github.com/necolas/idiomatic-css 
Het format is denk ik vanzelfsprekend, maar kijk voor de zekerheid even op bovenstaande site
De volgorde van je items worden wisselend beschreven, maar qua format kan iets vergelijkbaars aangehouden worden:
https://developer.mozilla.org/en-US/docs/Web/CSS/order 
Javascript
Gebruik variabelen met hoofdletters voor contstanten en globals
Gebruik altijd var en ;
Comments: // comment bla bla
Comments boven de line
camelCase voor variabelenamen
Zet spaties na operators en comma’s
Gebruik {} haakjes na functies e.d. op deze manier:
function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
}
conditionals:
if (time < 20) {
	greeting = "Good day";
} else {
    greeting = "Good evening";
}
Lines niet langer dan 80 tekens
Geen tabs, maar spaties voor indentation (tabs worden door verschillende interpreters anders geinterpreteerd)

## Python
Comment: # Hier zet je de comment neer 
DO: foo = long_function_name(var_one, var_two,
                         var_three, var_four)
DON’T: foo = long_function_name(var_one, var_two,
    var_three, var_four)
Gebruik voor indentatie of spaties, of tabs om te indenteren. Mix deze twee vormen van indentatie niet door elkaar in één Python-file.
Na een ‘:’, altijd indentatie
Invoegen van lijsten:
my_list = [
    1, 2, 3,
    4, 5, 6,
]
result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
)
DO: # Yes: easy to match operators with operands
income = (gross_wages
          + taxable_interest)
DON’T: # No: operators sit far away from their operands
income = (gross_wages +
          taxable_interest) 
DO : def munge(sep: AnyStr = None): ...
def munge(input: AnyStr, sep: AnyStr = None, limit=1000): ...
DON’T: def munge(input: AnyStr=None): ...
def munge(input: AnyStr, limit = 1000): ...
Limit all lines to a maximum of 79 characters and for comments limit it to 72.
Maak kleine blokken code met hierboven één comment die functionaliteit van de code beschrijft.
Zet alle import files onder elkaar en niet: import csv, json.
Probeer een variabele te laten beschrijven door de naam van deze variabele. Als dit niet kan: Kleine comment erboven die variabele beschrijft.
Function met kleine letters en met een laagstreepje als het nodig is. 
Comment block boven iedere Python-file met informatie over functionaliteit file en maker van file:
	# Naam: Piet
	# Datum: 27/09/2016
	


