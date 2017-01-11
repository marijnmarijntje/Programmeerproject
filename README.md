# Programmeerproject Proposal
## Data visualisatie voor de minor programmeren
## Door Marijn Gulpen 09-07-2017

### CO2 uitstoot

De data visualisatie van dit project zal informatie verstrekken over de CO2 emissies over de hele wereld. De gebruiker komt dingen te weten per land maar ook zal er een algemeen beeld worden geschetst. Dit zal door middel van een wereldkaart en verschillende soorten grafieken gevisualiseerd worden. 
De [worldbank databases](http://databank.worldbank.org/data/home.aspx) zullen worden gebruikt voor de informatie per land. Voor de temperatuurstijging zal een database van de [NASA](http://climate.nasa.gov/vital-signs/global-temperature) gebruikt worden. De data zal omgezet worden naar JSON waarbij de landen worden ingedeeld op hun landcode en daarnaast krijgen ze een fillkey voor hun kleur op de wereld kaart. 

Alle visualisaties worden met D3 gemaakt. De wereldkaart die wordt gebruikt staat in de map javascript. 

#### Visualisaties

###### **Visualisatie 1 Lijngrafiek** 
De grafiek laat temperatuurstijging zien. Onder de grafiek wordt verteld wat de effecten zijn van de temperatuurstijging en de oorzaken. Één van de oorzaken is CO2 emissies en daar wordt dan verder op voortborduurt. Deze visualisatie heeft verder geen interactie met de andere visualisaties en aangezien het een extra visualisatie is zal hier pas op het laatst aandacht aan worden besteed. Het valt dus niet onder het *minimum viable product*. 
 
###### **Visualisatie 2 Wereldkaart**
Wereldkaart visualisatie met CO2 emissies van verschillende jaren (= *interactive component*) (maximaal tot 2013 ivm data). Kleurgebruik met verschillende klasses van hoog naar laag.
Met een tooltip wordt wat algemene informatie gegeven over het land (zoals naam, totale populatie en gdp)
Per landkaart wordt gevisualiseerd welke landen de grootste CO2 uitstoot hadden en ook welke de minst grote uitstoot hadden. In een tabel of in een barchart (= *interactive component*). 

###### **Visualisatie 3 Lijngrafiek (2 y-assen)**
Ook wordt er een lijngrafiek laten zien van de CO2 emissies van een x aantal jaren (lijn 1) en iets van inkomen of gdp van hetzelfde aantal jaren (lijn 2).

###### **Visualisatie 4 Piechart**
Als er op een land geklikt wordt komt er een piechart met % CO2 emissies van verschillende bronnen, samen wordt dit 100%.

Visualisatie 2, 3 en 4 zullen met elkaar gelinkt worden. 

Door te kijken naar de landen met de grootste uitstoot en de minste uitstoot zal er gekeken worden of er een link is met de bronnen en/of met de GDP van het land.

![GitHub Logo](/doc/readme1.jpg)

