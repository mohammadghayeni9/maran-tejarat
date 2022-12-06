<template>
    <div class="area-chart" ref="areaChart" dir="ltr"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

export default {
    props: {
        data: {
            required: true
        }
    },
    mounted() {
        // static section
        am4core.useTheme(am4themes_animated)
        am4core.addLicense("ch-custom-attribution")
        let chart = am4core.create(this.$refs.areaChart, am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.data;
        chart.padding(10, 30, 0, 0);

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "year";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.grid.template.strokeWidth = 10;
        categoryAxis.startLocation = 0.5;
        categoryAxis.endLocation = 0.5;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        valueAxis.rangeChangeEasing = am4core.ease.linear;
        valueAxis.renderer.grid.template.strokeWidth = 1;
        valueAxis.rangeChangeDuration = 1500;

        let gradient1 = new am4core.LinearGradient();
        gradient1.rotation = 90;
        gradient1.addColor(am4core.color("#6d6dbf"));
        gradient1.addColor(am4core.color("#3e9de1"));

        let series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.categoryX = "year";
        series1.dataFields.valueY = "average";
        series1.name = "ارزیابی";
        series1.fill = gradient1;
        series1.fillOpacity = 0.8;
        series1.strokeWidth = 0;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
        chart.cursor.behavior = "none";
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
</script>

<style lang="scss">
.area-chart {
    width: 100%;
}
</style>
