# iot-monitor

This project contains a stack to collect and display data from IoT-devices.

The components are:
* Node.js backend to receive from IoT-devices and write it to database
* InfluxDB database
* Grafana to display data

![Grafana dashboard](/readme_images/grafana_1.png?raw=true)

# Installation

clone this repository
```
git clone https://github.com/TeemuTT/iot-monitor.git
```
install dependencies
```
npm install
```
Start services with docker-compose
```
docker-compose up
```
All the services should now be up and running. Point your browser to https://localhost:8083 to enter InfluxDB admin interface and create a new database named "raspberrypi".

![influxdb admin interface](/readme_images/influxdb.png?raw=true)

Next, go to https://localhost:8082 to access Grafana. default username and password is "admin".

Create a new data source with the following information:
* Name: influx
* Type: InfluxDB
* Url: http://influx:8086
* Database: raspberrypi

![Grafana data source settings](/readme_images/grafana_2.png?raw=true)

Now you can create a new dashboard with Grafana. Add a graph element and open the settings by clicking the top edge of the panel and click "edit".

In the "Metrics" tab, set the panel data source to "influx" and add a query according to the image below.

![Grafana graph settings](/readme_images/grafana_3.png?raw=true)

You can feed data by using the testdata.sh script included in this repository. The script sends random values to the Node.js API every minute.

```
./testdata.sh
```
Enter ctrl+c to stop the script.

You now have a basic example up and running. Next steps would be to restrict access for reading and writing the database.
